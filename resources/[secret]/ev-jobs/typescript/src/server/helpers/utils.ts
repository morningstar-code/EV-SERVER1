import { availabeJobs } from "server/controllers/config";
import { groups, sourceMappedToFakeName } from "server/controllers/jobs/npcs";
import { getPlayerIdByCharacterId } from "./tools";
import { Repository } from "server/controllers/database/repository";
import { Chance } from "chance";

export abstract class Helpers {
    //export const jobGroups: { [jobId: string]: JobGroup[] } = {};
    static getGroupById(pGroupId: number): [JobGroup | null, string | null] {
        let group: JobGroup | null = null;
        let job: string | null = null;

        // groups.forEach((jobGroups: JobGroup[], jobId: string) => {
        //     jobGroups.forEach((jobGroup: JobGroup) => {
        //         if (jobGroup.id === pGroupId) {
        //             group = jobGroup;
        //             job = jobId;
        //         }
        //     });
        // });

        for (let i = 0; i < availabeJobs.length; i++) {
            const jobId = availabeJobs[i];
            if (groups.hasOwnProperty(jobId)) { //groups[jobId] && groups[jobId].length > 0
                const jobGroup = groups[jobId].find((p) => p.id === pGroupId);
                if (jobGroup) {
                    group = jobGroup;
                    job = jobId;
                }
            }
        }

        return [group, job];
    }

    static getGroupByCharacterId(pCharacterId: number): [JobGroup | null, boolean] {
        let group: JobGroup | null = null;
        let isLeader: boolean = false;

        // groups.forEach((jobGroups: JobGroup[], jobId: string) => {
        //     jobGroups.forEach((jobGroup: JobGroup) => {
        //         if (jobGroup.leader.id === pCharacterId) {
        //             group = jobGroup;
        //             isLeader = true;
        //         } else {
        //             jobGroup.members.forEach((member: JobGroupMember) => {
        //                 if (member.id === pCharacterId) {
        //                     group = jobGroup;
        //                 }
        //             });
        //         }
        //     });
        // });

        for (let i = 0; i < availabeJobs.length; i++) {
            const jobId = availabeJobs[i];
            if (groups.hasOwnProperty(jobId)) {
                const jobGroup = groups[jobId].find((p) => p.members.find((m) => m.id === pCharacterId));
                if (jobGroup) {
                    group = jobGroup;
                    isLeader = jobGroup.leader.id === pCharacterId;
                }
            }
        }

        return [group, isLeader];
    }

    static getAllGroupMembersByJobId(pJobId: string): JobGroupMember[] {
        let members: JobGroupMember[] = [];

        // groups.forEach((jobGroups: JobGroup[], jobId: string) => {
        //     if (jobId === pJobId) {
        //         jobGroups.forEach((jobGroup: JobGroup) => {
        //             members = members.concat(jobGroup.members);
        //         });
        //     }
        // });

        if (groups.hasOwnProperty(pJobId)) {
            groups[pJobId].forEach((jobGroup: JobGroup) => {
                members = members.concat(jobGroup.members);
            });
        }

        return members;
    }

    static getAllAvailableGroupMembersByJobId(pJobId: string): JobGroupMember[] {
        let members: JobGroupMember[] = [];

        // groups.forEach((jobGroups: JobGroup[], jobId: string) => {
        //     if (jobId === pJobId) {
        //         jobGroups.forEach((jobGroup: JobGroup) => {
        //             if (jobGroup.activity) return;
        //             members = members.concat(jobGroup.members);
        //         });
        //     }
        // });

        if (groups.hasOwnProperty(pJobId)) {
            groups[pJobId].forEach((jobGroup: JobGroup) => {
                if (jobGroup.activity) return;
                members = members.concat(jobGroup.members);
            });
        }

        return members;
    }

    static getGroupLeaderByGroupId(pGroupId: number): JobGroupLeader | null {
        let leader: JobGroupLeader | null = null;

        // groups.forEach((jobGroups: JobGroup[], jobId: string) => {
        //     jobGroups.forEach((jobGroup: JobGroup) => {
        //         if (jobGroup.id === pGroupId) {
        //             leader = jobGroup.leader;
        //         }
        //     });
        // });

        for (let i = 0; i < availabeJobs.length; i++) {
            const jobId = availabeJobs[i];
            if (groups.hasOwnProperty(jobId)) {
                const jobGroup = groups[jobId].find((p) => p.id === pGroupId);
                if (jobGroup) {
                    leader = jobGroup.leader;
                }
            }
        }

        return leader;
    }

    static updateGroupJobState(pMembers: JobGroupMember[], pJobState: any) {
        for (const member of pMembers) {
            const memberSrc = getPlayerIdByCharacterId(member.id);
            if (memberSrc === -1) continue;
            emitNet("ev-ui:updateJobState", memberSrc, pJobState);
        }
    }

    static async getCharacterName(pCharacterId: number): Promise<[string, string]> {
        const memberSrc = getPlayerIdByCharacterId(pCharacterId);
        if (memberSrc === -1) return ["Jerry", "Smith"];

        const character = await Repository.getCharacterById(pCharacterId);
        if (!character) return ["Jerry", "Smith"];
        
        const hasVpn = await Repository.hasVpn(pCharacterId);
        if (!hasVpn) return [character.first_name, character.last_name];

        const fakeName = sourceMappedToFakeName.get(memberSrc);
        if (fakeName) return [fakeName.split(" ")[0], fakeName.split(" ")[1]];

        const chance = new Chance();

        const name = `${chance.first({ nationality: 'en' })} ${chance.last(({ nationality: 'en' }))}`;

        sourceMappedToFakeName.set(memberSrc, name);

        return [name.split(" ")[0], name.split(" ")[1]];
    }
}