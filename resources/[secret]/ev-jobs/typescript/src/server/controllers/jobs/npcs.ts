import { Base } from "@shared/cpx/server";
import { Repository } from "../database/repository";
import { getJobCenterJobs, jobCenterGroupDisband, jobCenterGroupLeave } from "./events";
import { Helpers } from "server/helpers/utils";
import { Config } from "../config";
import { Delay, FormatCurrency, getRandom } from "@shared/utils/tools";
import { getPlayerIdByCharacterId } from "server/helpers/tools";

//TODO: Make it store a server id and character id
//Key is the job id, value is an array of players
export const signedIn = new Map<string, number[]>();

//Key is the job id, value is an array of groups
//export const groups = new Map<string, JobGroup[]>();

export const groups: { [jobId: string]: JobGroup[] } = {};

//Key is the job id, value is the groupId
//Every 5 minutes, it will check readied groups, and pick one at random for the activity of the job
//Each job has a seperate timer/loop
export const readiedGroups = new Map<string, number[]>();

//Key is the cid, value is an array of paychecks
//If totalRuns > 3 then nerf the paycheck
export const paychecks = new Map<number, Paycheck[]>();

export const sourceMappedToFakeName = new Map<number, string>(); //Character ids also?

// paychecks.set(1, [
//     {
//         jobId: "store_deliveries",
//         amount: 550,
//         totalRuns: 0,
//         lastRun: undefined
//     }
// ]);

export function calculatePaygrade(signedInPlayers: number[]) {
    if (signedInPlayers.length <= 4) return 5;
    const additionalPlayers = signedInPlayers.length - 4;
    const paygrade = 5 - (0.3 * additionalPlayers);
    return paygrade >= 0 ? paygrade : 0;
}

//TODO: Modify paycheck system
/*
    It needs to work based on paygrade and how many people are in your group
    For example, you make ~$600 for a store delivery with you and 1 other person
    If your alone you make ~$300
*/

//If totalRuns is more than 3 set paycheck to config.paycheck.nerf
//If not, set paycheck to config.paycheck.base * paygrade
export function calculatePaycheck(pCharacterId: number, jobId: JobIds): number {
    console.log(`[JOBS] Calculating paycheck for ${pCharacterId} in job ${jobId}`);

    if (Config.Jobs[jobId].paycheck === false) return 0;

    const jobPayCheckConfig = Config.Jobs[jobId].paycheck as JobPayCheck;

    if (!paychecks.has(pCharacterId)) {
        console.log("[JOBS] No paychecks found for character, creating new");
        paychecks.set(pCharacterId, [
            {
                jobId: jobId,
                amount: 0,
                totalRuns: 0,
                lastRun: undefined
            }
        ]);
    }

    const paycheck = paychecks.get(pCharacterId);
    if (!paycheck) return 0;

    if (!paycheck?.find((p) => p.jobId === jobId)) {
        console.log("[JOBS] No paycheck found for job, creating new");
        paycheck.push({
            jobId: jobId,
            amount: 0,
            totalRuns: 0,
            lastRun: undefined
        });
    }

    const job = paycheck.find((p) => p.jobId === jobId);
    if (!job) return 0;

    const signedInPlayers = signedIn.get(jobId) || [];
    const paygrade = calculatePaygrade(signedInPlayers);

    console.log(`[JOBS] Paygrade for ${jobId} is ${paygrade}`);

    if (job.totalRuns >= 3 && job.lastRun !== undefined && Date.now() - job.lastRun <= 3600000) {
        return jobPayCheckConfig.nerf;
    } else { //else if (lastRun !== undefined)
        job.lastRun = undefined;
    }

    paychecks.set(pCharacterId, paycheck);

    return jobPayCheckConfig.base * paygrade;
}

export function updatePaycheckRuns(pCharacterId: number, jobId: string): void {
    const paycheck = paychecks.get(pCharacterId);
    if (!paycheck) return;

    const job = paycheck.find((p) => p.jobId === jobId);
    if (!job) return;

    job.totalRuns += 1;

    if (job.totalRuns >= 3) {
        job.lastRun = Date.now();
    }

    //when lastRun is more than 60 minutes ago, reset totalRuns to 0
    if (job.lastRun !== undefined && Date.now() - job.lastRun > 3600000) {
        job.totalRuns = 0;
    }

    paychecks.set(pCharacterId, paycheck);
}

export function addPaycheck(pCharacterId: number, jobId: string, amount: number): void {
    const paycheck = paychecks.get(pCharacterId);
    if (!paycheck) return;

    const job = paycheck.find((p) => p.jobId === jobId);
    if (!job) return;

    job.amount += amount;

    paychecks.set(pCharacterId, paycheck);
}

export async function givePaycheck(pCharacterId: number, jobId: JobIds): Promise<void> {
    const pSource = getPlayerIdByCharacterId(pCharacterId);
    if (!pSource) return;

    if (Array.isArray(Config.Jobs[jobId].items) && Config.Jobs[jobId].items.length > 0) {
        const [group, _] = Helpers.getGroupByCharacterId(pCharacterId);
        if (!group) return;
        for (let i = 0; i < Config.Jobs[jobId].items.length; i++) {
            const item = Config.Jobs[jobId].items[i];
            const baseAmount = item.amount.baseAmount;
            const maxAmount = item.amount.maxAmount;
            const perMemberMultiplier = item.amount.perMemberMultiplier;
            const amount = getRandom(baseAmount, maxAmount);
            const totalAmount = amount + (group.members.length * perMemberMultiplier);
            emitNet("player:receiveItem", pSource, item.name, totalAmount);
        }
    }

    if (Config.Jobs[jobId].paycheck === false) return;
    await Delay(500);
    const paycheck = calculatePaycheck(pCharacterId, jobId);
    if (paycheck !== undefined) {
        emitNet("ev-ui:server-relay", pSource, {
            source: "ev-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: "home-screen",
                title: "Paycheck",
                body: `${FormatCurrency(paycheck)} added to your paycheck.`,
                show_even_if_app_active: true
            }
        });

        addPaycheck(pCharacterId, jobId, paycheck);
        updatePaycheckRuns(pCharacterId, jobId);
    }
}

RPC.register("ev:jobs:checkIn", async (pSource: number, pJobId: string): Promise<any> => {
    const user: User = await Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const jobs = await Repository.getJobs();
    if (!jobs) return;

    const job = jobs.get(pJobId);
    if (!job) return;

    const signedInPlayers = signedIn.get(pJobId);
    if (!signedInPlayers) {
        //job doesn't exist in the map, create it
        signedIn.set(pJobId, [user.character.id]);
    } else {
        //job exists in the map, check if the player is already signed in
        if (signedInPlayers.includes(user.character.id)) return;

        //player is not signed in, add them to the array
        signedInPlayers.push(user.character.id);
    }

    //Updates employee count for all job
    //TODO; Calculate paygrade (if 0-1 it's 5)
    const [jobCenterJobs, success] = await getJobCenterJobs(pSource);
    emitNet("ev-ui:updateJobState", pSource, { //-1
        jobs: jobCenterJobs.map((job: any) => {
            const signedInPlayers = signedIn.get(job.id);
            if (!signedInPlayers) return job;

            return {
                ...job, //calculate paygrade based on employee count
                pay_grade: calculatePaygrade(signedInPlayers ?? []) ?? 0
            }
        })
    });

    return {
        job: {
            id: job.job_id,
            name: job.checkInName,
        },
        groups: groups[pJobId] ?? [] //groups.get(pJobId) ?? []
    }
});

RPC.register("ev:jobs:checkOut", async (pSource: number): Promise<any> => {
    //TODO; Check if player is either in a group or owns a group
    //If they do, delete group, and or remove player from group
    //And update the ui for all players in group, and all players in job (+employee count for others)
    const user = await Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    signedIn.forEach((players: number[], jobId: string) => {
        const index = players.indexOf(user.character.id);
        if (index > -1) {
            players.splice(index, 1);
        }
    });

    //Updates employee count for all job
    //TODO; Calculate paygrade (if 0-1 it's 5)
    const [jobs, success] = await getJobCenterJobs(pSource);
    emitNet("ev-ui:updateJobState", -1, {
        jobs: jobs.map((job: any) => {
            const signedInPlayers = signedIn.get(job.id);
            if (!signedInPlayers) return job;

            return {
                ...job, //calculate paygrade based on employee count
                pay_grade: calculatePaygrade(signedInPlayers ?? []) ?? 0
            }
        })
    });

    const [group, isLeader] = Helpers.getGroupByCharacterId(user.character.id);
    if (group) {
        if (isLeader) {
            //Disband group
            jobCenterGroupDisband(pSource, group.id, user.character.id);
        } else {
            //Leave group
            jobCenterGroupLeave(pSource, group.id, user.character.id);
        }
    }

    sourceMappedToFakeName.delete(pSource); //New name per check in

    return {
        job: "none",
        groups: []
    }
});

//JOB: You get 300; 2 times for garbage (then it caps to 100 for 1 hour then reset.)

RPC.register("ev:jobs:getPayCheck", async (pSource: number, pJob: { id: JobIds }): Promise<any> => {
    const user = await Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    if (Config.Jobs[pJob.id].paycheck === false) {
        TriggerClientEvent("DoLongHudText", pSource, "You can't get a paycheck from this job cuh.");
        return;
    }

    const paycheck = paychecks.get(user.character.id);
    if (!paycheck) {
        emitNet("ev-ui:server-relay", pSource, {
            source: "ev-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: "home-screen",
                title: "Paycheck",
                body: `$0 transferred from your paycheck.`,
                show_even_if_app_active: true
            }
        });
        return;
    }

    const job = paycheck.find((p) => p.jobId === pJob.id);
    if (!job) {
        emitNet("ev-ui:server-relay", pSource, {
            source: "ev-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: "home-screen",
                title: "Paycheck",
                body: `$0 transferred from your paycheck.`,
                show_even_if_app_active: true
            }
        });
        return;
    }

    const paycheckAmount = job.amount;

    if (paycheckAmount === 0) {
        emitNet("ev-ui:server-relay", pSource, {
            source: "ev-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: "home-screen",
                title: "Paycheck",
                body: `${FormatCurrency(paycheckAmount)} transferred from your paycheck.`,
                show_even_if_app_active: true
            }
        });
        return;
    }

    const jobData = await Repository.getJob(pJob.id);
    if (!jobData) return;

    const accountId = await global.exports["ev-financials"].getDefaultBankAccount(user.character.id, true);
    if (typeof accountId === "string") {
        emitNet("ev-ui:server-relay", pSource, {
            source: "ev-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: "home-screen",
                title: "Paycheck",
                body: accountId,
                show_even_if_app_active: true
            }
        });
        return;
    }

    const success = await global.exports["ev-financials"].DoJobPayTransaction(accountId, paycheckAmount, `Job: ${jobData.name}`);
    if (typeof success === "string") {
        return emitNet("DoLongHudText", pSource, success, 2);
    }

    job.amount = 0;
    paychecks.set(user.character.id, paycheck);

    emitNet("ev-ui:server-relay", pSource, {
        source: "ev-nui",
        app: "phone",
        data: {
            action: "notification",
            target_app: "home-screen",
            title: "Paycheck",
            body: `${FormatCurrency(paycheckAmount)} transferred from your paycheck.`,
            show_even_if_app_active: true
        }
    });
});

export function InitNPCs(): void {
    console.log("[JOBS] Jobs Loaded");
}

RPC.register("ev:jobs:getNPCs", async (pSource: number): Promise<JobNPC[]> => {
    const npcs = await Repository.getNpcs();
    if (!npcs) return [];

    const mappedNpcs: JobNPC[] = [];
    npcs.forEach((npc: JobNPC) => {
        mappedNpcs.push(npc);
    });

    return mappedNpcs;
});

RegisterCommand("addjob", () => {
    Repository.addJob({
        name: "store_deliveries",
        label: "Store Deliveries",
        checkInName: "Store Deliverer",
        icon: "store-alt",
        headquarters: {
            x: 919.13482666016,
            y: -1256.0007324219,
            z: 0.0,
            h: 0.0
        },
        npc: {
            jobId: "store_deliveries",
            headquarters: {
                x: 919.92041015625,
                y: -1256.6762695312,
                z: 24.519781112671,
                h: 31.363286972046
            },
            data: {
                pedType: 4,
                model: "s_m_y_ammucity_01",
                distance: 150.0,
                settings: [
                    { mode: "invincible", active: true },
                    { mode: "ignore", active: true },
                    { mode: "freeze", active: true }
                ],
                flags: {
                    isJobEmployer: true
                }
            }
        },
        vpn: false,
        acceptPendingTimeout: 30000,
        enabled: true,
        capacity: 2
    });
    // Repository.addJob({
    //     id: 1,
    //     name: "sanitation_worker",
    //     label: "Sanitation Worker",
    //     icon: "recycle",
    //     headquarters: {
    //         x: -353.0,
    //         y: -1545.0,
    //         z: 26.0,
    //         h: 264.0
    //     },
    //     npc: {
    //         jobid: "sanitation_worker",
    //         headquarters: {
    //             x: -353.0,
    //             y: -1545.0,
    //             z: 27.0,
    //             h: 264.0
    //         },
    //         data: {
    //             pedType: 4,
    //             model: "s_m_y_garbage",
    //             distance: 150.0,
    //             settings: [
    //                 { mode: "invincible", active: true },
    //                 { mode: "ignore", active: true },
    //                 { mode: "freeze", active: true }
    //             ],
    //             flags: {
    //                 isJobEmployer: true
    //             }
    //         }
    //     },
    //     vpn: false,
    //     acceptPendingTimeout: 30000,
    //     enabled: true,
    //     capacity: 4
    // });
}, false);