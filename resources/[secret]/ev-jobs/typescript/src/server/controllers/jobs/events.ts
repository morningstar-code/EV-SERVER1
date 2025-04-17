import { Base } from "@shared/cpx/server";
import { Repository } from "../database/repository";
import { calculatePaygrade, groups, readiedGroups, signedIn } from "./npcs";
import { Helpers } from "server/helpers/utils";
import { jobs as dbJobs } from "../database/repository";
import { activityIdMappedToTimeGiven } from "./threads";
import { getPlayerCharacterIdByPlayerId, getPlayerIdByCharacterId } from "server/helpers/tools";

//TODO: Only have RPCs here, and then call functions inside the RPCs. Then we can use the functions in server, aswell as export it for other resources to use.

//Key = activityId, value = groupIds
export const groupsPool = new Map<number, number[]>(); // Map to store leader information, key: groupId, value: leaderIds[]

export async function InitEvents(): Promise<void> {
    console.log("[JOBS] Loading");
}

export async function getJobCenterJobs(pSource: number) {
    const user = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return [null as any, false];

    const jobs = await Repository.getJobs();
    if (!jobs) return [null as any, false];

    const mappedJobs: MappedJob[] = [];
    jobs.forEach((job: MappedJob) => {
        const signedInPlayers = signedIn.get(job.job_id);
        const payGrade = calculatePaygrade(signedInPlayers ?? []); //?? []

        if (groups.hasOwnProperty(job.job_id)) {
            const jobGroups = groups[job.job_id];
            mappedJobs.push({
                ...job,
                groups: jobGroups?.length ?? 0,
                employees: signedIn.get(job.job_id)?.length ?? 0,
                pay_grade: payGrade
            });
        } else {
            mappedJobs.push({
                ...job,
                groups: 0,
                employees: signedIn.get(job.job_id)?.length ?? 0,
                pay_grade: payGrade
            });
        }
    });

    const hasVpn = await Repository.hasVpn(user.character.id);

    if (!hasVpn) {
        return [mappedJobs.filter((job: MappedJob) => !job.vpn), true];
    }

    return [mappedJobs, true];
}

RPC.register("phone:getJobCenterJobs", async (pSource: number): Promise<[MappedJob[], boolean]> => {
    const [jobs, success] = await getJobCenterJobs(pSource);
    return [jobs, success];
});

// RPC.register("phone:getJobCenterGroups", async (pSource: number): Promise<[MappedJob[], boolean]> => {

// });

RPC.register("phone:createJobCenterGroup", async (pSource: number, requestId: number, characterId: number): Promise<void> => {
    const user: User = await Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    let job: any;
    signedIn.forEach((players: number[], jobId: string) => {
        if (players.includes(user.character.id)) {
            job = jobId;
        }
    });

    if (!job) return;

    const jobData = await Repository.getJob(job);
    if (!jobData) return;

    const [first_name, last_name] = await Helpers.getCharacterName(characterId);
    if (!first_name || !last_name) return;

    const group = {
        id: Math.floor(Math.random() * 1000000),
        jobId: job,
        leader: {
            id: characterId,
            first_name: first_name,
            last_name: last_name,
        },
        status: 'idle',
        public: true,
        members: [
            {
                id: characterId,
                first_name: first_name,
                last_name: last_name,
                is_leader: true,
                is_online: true
            }
        ],
        ready: false,
        capacity: jobData.capacity ?? 0,
        size: 1
    } as JobGroup;

    // const jobGroups = groups.get(job);
    // if (!jobGroups) {
    //     groups.set(job, [group]);
    // } else {
    //     jobGroups.push(group);
    // }

    if (!groups.hasOwnProperty(job)) {
        groups[job] = [group];
    } else {
        groups[job].push(group);
    }

    const players = signedIn.get(job);
    if (!players) return;

    players.forEach(async (characterId: number) => {
        const playerId = getPlayerIdByCharacterId(characterId);

        emitNet("ev-ui:updateJobState", playerId, {
            groups: groups[job] ?? []
        });
    });

    emitNet("ev-ui:updateJobState", pSource, {
        group: group
    });

    emitNet("ev-ui:jobs:groupInviteCompleted", pSource, requestId, true);
});

RPC.register("phone:requestToJoinJobCenterGroup", async (pSource: number, requestId: number, characterId: number, groupId: number): Promise<any> => {
    const user: User = await Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const leader = Helpers.getGroupLeaderByGroupId(groupId);
    if (!leader) return;

    const leaderSrc = getPlayerIdByCharacterId(leader.id);
    if (leaderSrc === -1) return;

    const [first_name, last_name] = await Helpers.getCharacterName(characterId);
    if (!first_name || !last_name) return;

    emitNet("ev-ui:jobs:groupInviteRequest", leaderSrc, requestId, groupId, {
        id: characterId,
        first_name: first_name,
        last_name: last_name
    });

    return true;
});

RPC.register("phone:requestToJoinJobCenterGroupCancel", async (pSource: number, requestId: number, characterId: number, groupId: number): Promise<void> => {
    //TODO; Close leaders notification
    //This is when the requester cancels the request to join a group

    const leader = Helpers.getGroupLeaderByGroupId(groupId);
    if (!leader) return;

    const leaderSrc = getPlayerIdByCharacterId(leader.id);
    if (leaderSrc === -1) return;
});

RPC.register("phone:requestToJoinJobCenterGroupAccept", async (pSource: number, requestId: number, groupId: number, memberId: number): Promise<void> => {
    //This is when the leader accepts the request to join a group

    const requestee = getPlayerIdByCharacterId(memberId);

    const user: User = await Base.getModule<PlayerModule>("Player").GetUser(requestee);
    if (!user) return;

    const [group, job] = Helpers.getGroupById(groupId);
    if (!job || !group) return;

    const [first_name, last_name] = await Helpers.getCharacterName(memberId);
    if (!first_name || !last_name) return;

    const player = {
        id: memberId,
        first_name: first_name,
        last_name: last_name,
        is_leader: false,
        is_online: true
    }

    group.members.push(player);
    group && group.size && group.size++;

    const players = signedIn.get(job);
    if (!players) return;

    players.forEach(async (characterId: number) => {
        const playerId = getPlayerIdByCharacterId(characterId);

        emitNet("ev-ui:updateJobState", playerId, {
            groups: groups[job] ?? []
        });
    });

    for (const member of group.members) {
        const memberSrc = getPlayerIdByCharacterId(member.id);
        if (memberSrc === -1) continue;
        emitNet("ev-ui:updateJobState", memberSrc, {
            group: group
        });
    }

    emitNet("ev-ui:jobs:groupInviteCompleted", requestee, requestId, true);
});

RPC.register("phone:requestToJoinJobCenterGroupReject", async (pSource: number, requestId: number, groupId: number, memberId: number): Promise<void> => {
    const requestee = getPlayerIdByCharacterId(memberId);
    emitNet("ev-ui:jobs:groupInviteCompleted", requestee, requestId, false);
});

export const jobCenterGroupDisband = async (source: number, groupId: number, characterId: number): Promise<void> => {
    const [group, job] = Helpers.getGroupById(groupId);
    if (!job || !group) return;

    if (!groups.hasOwnProperty(job)) return;
    const jobGroups = groups[job];

    for (const member of group.members) {
        const memberSrc = getPlayerIdByCharacterId(member.id);
        if (memberSrc === -1) continue;
        emitNet("ev-ui:updateJobState", memberSrc, {
            group: "none"
        });
    }

    const newGroups = jobGroups.filter((jobGroup: JobGroup) => jobGroup.id !== groupId);
    groups[job] = newGroups;

    const [jobs, success] = await getJobCenterJobs(source);
    if (!success) return;

    const players = signedIn.get(job);
    if (!players) return;

    players.forEach(async (characterId: number) => {
        const playerId = getPlayerIdByCharacterId(characterId);

        emitNet("ev-ui:updateJobState", playerId, {
            groups: groups[job] ?? [],
            jobs: jobs ?? []
        });
    });

    const readied = readiedGroups.get(job);
    if (!readied) return;

    const index = readied.findIndex((g: number) => g === groupId);
    if (index === -1) return;

    readied.splice(index, 1);

    readiedGroups.set(job, readied);
};

RPC.register("phone:jobCenterGroupDisband", async (pSource: number, groupId: number, characterId: number): Promise<void> => {
    jobCenterGroupDisband(pSource, groupId, characterId);
});

export const jobCenterGroupLeave = async (source: number, groupId: number, characterId: number): Promise<void> => {
    const [group, job] = Helpers.getGroupById(groupId);
    if (!job || !group) return;

    group.members = group.members.filter((member: JobGroupMember) => member.id !== characterId);
    group && group.size && group.size--;

    const [jobs, success] = await getJobCenterJobs(source);
    if (!success) return;

    const players = signedIn.get(job);
    if (!players) return;

    players.forEach(async (characterId: number) => {
        const playerId = getPlayerIdByCharacterId(characterId);

        emitNet("ev-ui:updateJobState", playerId, {
            groups: groups[job] ?? [],
            jobs: jobs ?? []
        });
    });

    for (const member of group.members) {
        const memberSrc = getPlayerIdByCharacterId(member.id);
        if (memberSrc === -1) continue;
        emitNet("ev-ui:updateJobState", memberSrc, {
            group: group
        });
    }

    emitNet("ev-ui:updateJobState", source, {
        group: "none"
    });
}

RPC.register("phone:jobCenterGroupLeave", async (pSource: number, groupId: number, characterId: number): Promise<void> => {
    jobCenterGroupLeave(pSource, groupId, characterId);
});

RPC.register("phone:jobCenterGroupRemove", async (pSource: number, groupId: number, characterId: number): Promise<void> => {
    const kickee = getPlayerIdByCharacterId(characterId);
    if (kickee === -1) return;

    jobCenterGroupLeave(kickee, groupId, characterId);

    emitNet("ev-ui:jobs:sendNotification", kickee, "GROUP", "You have been removed from the group!", true);
});

RPC.register("phone:jobCenterGroupPromote", async (pSource: number, groupId: number, characterId: number): Promise<void> => {
    const [group, job] = Helpers.getGroupById(groupId);
    if (!job || !group) return;

    const newLeaderSrc = getPlayerIdByCharacterId(characterId);
    if (newLeaderSrc === -1) return;

    const user: User = await Base.getModule<PlayerModule>("Player").GetUser(newLeaderSrc);
    if (!user) return;

    group.members = group.members.map((member: JobGroupMember) => {
        if (member.id === group.leader.id) {
            member.is_leader = false;
        }
        if (member.id === characterId) {
            member.is_leader = true;
        }
        return member;
    });

    const [first_name, last_name] = await Helpers.getCharacterName(characterId);
    if (!first_name || !last_name) return;

    group.leader = {
        id: characterId,
        first_name: first_name,
        last_name: last_name
    };

    // Helpers.updateGroupJobState(group.members, {
    //     group: group
    // });

    for (const member of group.members) {
        const memberSrc = getPlayerIdByCharacterId(member.id);
        if (memberSrc === -1) continue;
        emitNet("ev-ui:updateJobState", memberSrc, {
            group: group
        });
    }

    const players = signedIn.get(job);
    if (!players) return;

    players.forEach(async (characterId: number) => {
        const playerId = getPlayerIdByCharacterId(characterId);

        emitNet("ev-ui:updateJobState", playerId, {
            groups: groups[job] ?? []
        });
    });

    emitNet("ev-ui:jobs:sendNotification", newLeaderSrc, "GROUP", "You have been promoted!", true);
});

RPC.register("phone:jobCenterGroupReady", async (pSource: number, groupId: number, characterId: number): Promise<void> => {
    const [group, job_id] = Helpers.getGroupById(groupId);
    if (!group || !job_id) return;

    group.ready = true;
    group.public = false;
    group.status = "busy";

    const players = signedIn.get(job_id);
    if (!players) return;

    players.forEach(async (characterId: number) => {
        const playerId = getPlayerIdByCharacterId(characterId);

        emitNet("ev-ui:updateJobState", playerId, {
            groups: groups[job_id] ?? []
        });
    });

    group.members.forEach(async (member: JobGroupMember) => {
        const memberSrc = getPlayerIdByCharacterId(member.id);
        if (memberSrc === -1) return;
        emitNet("ev-ui:updateJobState", memberSrc, {
            group: group
        });
    });

    if (!readiedGroups.has(job_id)) {
        readiedGroups.set(job_id, [group.id]);
    } else {
        const groups = readiedGroups.get(job_id);
        if (groups) {
            groups.push(group.id);
            readiedGroups.set(job_id, groups);
        }
    }
});

RPC.register("phone:jobCenterGroupNotReady", async (pSource: number, groupId: number, characterId: number): Promise<void> => {
    const [group, job_id] = Helpers.getGroupById(groupId);
    if (!group || !job_id) return;

    group.ready = false;
    group.public = true;
    group.status = "idle";

    const players = signedIn.get(job_id);
    if (!players) return;

    players.forEach(async (characterId: number) => {
        const playerId = getPlayerIdByCharacterId(characterId);

        emitNet("ev-ui:updateJobState", playerId, {
            groups: groups[job_id] ?? []
        });
    });

    for (const member of group.members) {
        const memberSrc = getPlayerIdByCharacterId(member.id);
        if (memberSrc === -1) continue;
        emitNet("ev-ui:updateJobState", memberSrc, {
            group: group
        });
    }

    const readied = readiedGroups.get(job_id);
    if (!readied) return;

    const index = readied.findIndex((g: number) => g === groupId);
    if (index === -1) return;

    readied.splice(index, 1);

    readiedGroups.set(job_id, readied);
});

RPC.register("phone:jobCenterActivityAccept", async (pSource: number, activityId: number, groupId: number, characterId: number): Promise<boolean> => {
    console.log(`[JOBS] ${characterId} accepted activity ${activityId}`);

    const currentTime = Date.now();
    const notificationSentTime = activityIdMappedToTimeGiven.get(activityId) || 0;

    if (currentTime - notificationSentTime <= 5000) {
        console.log(`[JOBS] ${characterId} accepted activity ${activityId} within 10 seconds of notification being sent`);
        const groups = groupsPool.get(activityId) || [];

        if (groups.length === 0) {
            groupsPool.set(activityId, [groupId]);
        } else {
            groups.push(groupId);
            groupsPool.set(activityId, groups);
        }

        return true;
    } else {
        console.log(`[JOBS] ${characterId} accepted activity ${activityId} after 10 seconds of notification being sent`);
        return false;
    }
});

RPC.register("phone:jobCenterActivityReject", async (pSource: number, activityId: number, characterId: number): Promise<void> => {

});

RPC.register("phone:jobCenterActivityAbandon", async (pSource: number, activityId: number, characterId: number): Promise<void> => {
    //TODO: Need to handle this, reset activity to "none" for all group members
    const [group, isLeader] = Helpers.getGroupByCharacterId(characterId);
    if (!group || !isLeader) return;

    const waitingObjective = group.activity?.objectives.filter((objective: JobGroupActivityTaskObjective) => objective.value.data.status === "waiting");
    if (waitingObjective && waitingObjective.length == 1) {
        const objective = waitingObjective[0];
        if (objective) {
            for (const member of group.members) {
                const memberSrc = getPlayerIdByCharacterId(member.id);
                if (memberSrc === -1) continue;
                emitNet("ev-ui:server-relay", memberSrc, {
                    source: "ev-nui",
                    app: "phone",
                    data: {
                        action: "notification",
                        target_app: "home-screen",
                        title: "Job Offer",
                        body: "The offer was not completed.",
                        show_even_if_app_active: true
                    }
                });
                emitNet("ev:jobs:abortActivity", memberSrc, activityId, objective.key);
            }
        }
    }

    group.activity = "none" as any;

    for (const member of group.members) {
        const memberSrc = getPlayerIdByCharacterId(member.id);
        if (memberSrc === -1) continue;
        emitNet("ev-ui:updateJobState", memberSrc, {
            group: group,
            activity: group.activity
        });
    }
});

onNet("playerDropped", () => { // TODO: Just kill their group
    const src = global.source;
    const characterId = getPlayerCharacterIdByPlayerId(src);
    if (!characterId) return;

    console.log(`[JOBS] ${characterId} dropped, updating job state... | Source: ${src} | CharacterId: ${characterId}`);

    const [group, isLeader] = Helpers.getGroupByCharacterId(characterId);
    if (!group) return;

    console.log("[JOBS] Valid group");

    for (const member of group.members) {
        if (member.id === characterId) {
            console.log(`[JOBS] ${characterId} is no longer online`);
            member.is_online = false;
        }

        const memberSrc = getPlayerIdByCharacterId(member.id);
        if (memberSrc === -1) continue;

        emitNet("ev-ui:updateJobState", memberSrc, {
            group: group
        });
    }

    console.log("[JOBS] Updated job state");
});

onNet("ev-spawn:characterSpawned", async (cid?: number) => { // TODO: Remove...
    const pSource = global.source;
    const characterId = cid ?? getPlayerCharacterIdByPlayerId(pSource);
    if (characterId === -1) return;

    console.log(`[JOBS] ${characterId} spawned, updating job state... | Source: ${pSource} | CharacterId: ${characterId}`);

    let foundJob: any;
    signedIn.forEach((players: number[], jobId: string) => {
        if (players.includes(characterId)) {
            foundJob = jobId;
        }
    });

    if (!foundJob) return;

    console.log("[JOBS] Valid job");

    const jobData = dbJobs.get(foundJob);
    if (!jobData) return;

    emitNet("ev-ui:updateJobState", pSource, {
        job: {
            id: jobData.id,
            name: jobData.name
        },
        groups: groups[foundJob] ?? [] //groups.get(foundJob) ?? [],
    });

    const [group, isLeader] = Helpers.getGroupByCharacterId(characterId);
    if (!group) return;

    console.log("[JOBS] Valid group");

    emitNet("ev-ui:updateJobState", pSource, {
        job: {
            id: jobData.id,
            name: jobData.name
        },
        groups: groups[group.jobId] ?? []
    });

    if (group) {
        emitNet("ev-ui:updateJobState", pSource, {
            group: group,
            activity: group?.activity?.activity ?? "none"
        });
    }

    emitNet("ev-jobs:jobChanged", pSource, group.jobId);

    for (const member of group.members) {
        if (member.id === characterId) {
            console.log(`[JOBS] ${characterId} is now online`);
            member.is_online = true;
        }

        const memberSrc = getPlayerIdByCharacterId(member.id);
        if (memberSrc === -1) continue;

        console.log("[JOBS] Updating state for group member:", member.id);
        emitNet("ev-ui:updateJobState", memberSrc, {
            group: group
        });
    }

    //TODO: Start task again if it was in progress
    console.log("[JOBS] Updated job state for members and player that just spawned");
});

onNet("ev-ui:restarted", async () => {
    const pSource = global.source;
    const characterId = getPlayerCharacterIdByPlayerId(pSource);
    if (!characterId) return;

    let foundJob: any;
    signedIn.forEach((players: number[], jobId: string) => {
        if (players.includes(pSource)) { //characterId, should swap signedIn to charIds and not playerIds
            foundJob = jobId;
        }
    });

    if (!foundJob) return;

    const jobData = dbJobs.get(foundJob);
    if (!jobData) return;

    emitNet("ev-ui:updateJobState", pSource, {
        job: {
            id: jobData.id,
            name: jobData.name
        },
        groups: groups[foundJob] ?? [] //groups.get(foundJob) ?? [],
    });

    const [group, isLeader] = Helpers.getGroupByCharacterId(characterId);
    if (group) {
        emitNet("ev-ui:updateJobState", pSource, {
            group: group,
            activity: group?.activity?.activity ?? "none"
        });
    }
});