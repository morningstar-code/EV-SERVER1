import { Base } from "@cpx/server";
import { Helpers } from "server/helpers/utils";
import { Activities } from "./activities";
import { givePaycheck } from "./jobs/npcs";
import { getPlayerIdByCharacterId } from "server/helpers/tools";

//Key is the activity id, value is the activity data
export const activityData: Map<number, any> = new Map();

export function InitActivity(): void { };

export const startActivity = (pActivityId: number, pGroupId: number) => {
    const [group, job_id] = Helpers.getGroupById(pGroupId);
    if (!group || !job_id) return;

    const currentJobActivity = Activities[job_id];
    if (!currentJobActivity) return;

    const copiedActivity = JSON.parse(JSON.stringify(currentJobActivity));
    group.activity = copiedActivity;

    const activity = group.activity;
    if (!activity) return;

    if (!activity.id) {
        activity.id = pActivityId;
    }

    //TODO: Cleanup this mess, and make it 1 if, and just check referenceActivity.type and put it where its data/settings [type]
    const referenceActivity = activityData.get(pActivityId);
    if (referenceActivity && referenceActivity?.references && referenceActivity?.type === "data") {
        if (Array.isArray(referenceActivity?.references)) {
            referenceActivity?.references?.forEach((reference: any) => {
                const ref: any = activity?.references?.find((ref: any) => ref.key === reference.key);
                if (ref && ref?.value && ref?.value?.data) {
                    ref.value.data[reference.type] = reference.value;
                }
            });
        }
    } else if (referenceActivity && referenceActivity?.references && referenceActivity?.type === "settings") {
        if (Array.isArray(referenceActivity?.references)) {
            referenceActivity?.references?.forEach((reference: any) => {
                const ref: any = activity?.references?.find((ref: any) => ref.key === reference.key);
                if (ref && ref?.value && ref?.value?.settings) {
                    ref.value.settings[reference.type] = reference.value;
                }
            });
        }
    }

    for (const phoneObjective of activity.objectives) {
        for (const phoneTask of activity.activity.tasks) {
            if (phoneTask.id === phoneObjective.key) {
                phoneTask.count = phoneObjective.value.data.count;
                phoneTask.wanted = phoneObjective.value.settings.wanted;
            }
        }
    }

    const objective = activity?.objectives[0];

    if (!objective) return;

    objective.value.data.status = "waiting";

    for (const member of group.members) {
        const memberSrc = getPlayerIdByCharacterId(member.id);
        if (memberSrc === -1) continue;

        emitNet("ev:jobs:setActivityData", memberSrc, pActivityId, {
            references: activity?.references,
            objectives: activity?.objectives,
        });

        emitNet("ev:jobs:startTask", memberSrc, pActivityId, group.activity?.objectives[0].key, {
            ...group.activity?.objectives[0].value,
            objectives: activity?.objectives.map((objective: JobGroupActivityTaskObjective) => objective.key)
        });

        emitNet("ev-ui:updateJobState", memberSrc, {
            activity: activity?.activity
        });
    }
}

export function getObjective(pSource: number, pTaskCode: string, pStatus: string, p2: any, p3: any) { }

RPC.register("ev:jobs:getObjective", async (pSource: number, pTaskCode: string, pStatus: string, p2: any, p3: any): Promise<any> => {
    return getObjective(pSource, pTaskCode, pStatus, p2, p3);
});

export function objectiveCompleted(pSource: number, pActivityId: number, pTaskCode: string, pObjectiveId: any) {
    //I feel like, taskcode and objectiveId isnt the same thing.....? fuck me

    const src = global.source;
    const user = Base.getModule<PlayerModule>("Player").GetUser(src);
    if (!user) return;

    const [group, isLeader] = Helpers.getGroupByCharacterId(user.character.id);
    if (!group) return;

    const activity = group.activity;
    if (!activity) return;

    if (activity === "none" as any) return;

    const objective = activity.objectives.find((objective: JobGroupActivityTaskObjective) => objective.key === pObjectiveId);
    if (!objective) return;

    for (const obj of activity.objectives) {
        if (obj?.value?.data?.count !== undefined && obj?.value?.data?.count >= obj?.value?.settings?.wanted) {
            obj.value.data.count = obj.value.settings.wanted;
        }
    }

    const isAlreadyCompleted = objective.value.data.status === "completed";

    if (objective.value.data.status === "waiting") { //Make sure...
        console.log("[JOBS] Objective is still waiting... send out objectiveCompleted");
        emit("ev:server:objectiveCompleted", src, pTaskCode, pObjectiveId, pActivityId);
    }

    if (objective.value.data.status === "completed") return console.log("[JOBS] Objective is already completed!");

    objective.value.data.status = "completed";

    if (objective?.value?.data?.count !== undefined) {
        if (objective?.value?.data?.count >= objective?.value?.settings?.wanted) {
            objective.value.data.count = objective.value.settings.wanted;
        } else if (objective?.value?.settings?.wanted == 1) {
            objective.value.data.count = 1
        } else {
            objective.value.data.count += 1;
        }

        if (objective.value.data.count >= objective.value.settings.wanted) {
            objective.value.data.count = objective.value.settings.wanted;
        }

        const phoneActivityTask = activity.activity.tasks.find(task => task.id === pTaskCode);
        if (phoneActivityTask !== undefined) {
            phoneActivityTask.count = objective.value.data.count;
        }
    }

    const nextObjectiveId = activity.objectives.findIndex((objective: JobGroupActivityTaskObjective) => objective.key === pObjectiveId) + 1;
    if (nextObjectiveId === -1) return;

    const nextObjective: any = activity.objectives[nextObjectiveId];

    if (!nextObjective) {
        console.log("[JOBS] Next objective is invalid, activity completed");
        const [_, job_id] = Helpers.getGroupById(group.id);
        group.activity = "none" as any;
        for (const member of group.members) {
            const memberSrc = getPlayerIdByCharacterId(member.id);
            if (memberSrc === -1) continue;

            emitNet("ev:jobs:updateObjectiveData", memberSrc, pActivityId, pObjectiveId, "status", "completed");

            emitNet("ev:jobs:updateTask", memberSrc, "taskCompleted", pTaskCode);

            emitNet("ev-ui:updateJobState", memberSrc, {
                activity: "none"
            });

            emitNet("ev:jobs:activityCompleted", memberSrc, pActivityId);

            emitNet("ev-ui:server-relay", memberSrc, {
                source: "ev-nui",
                app: "phone",
                data: {
                    action: "notification",
                    target_app: "home-screen",
                    title: "Job Offer",
                    body: "The offer was completed successfully.",
                    show_even_if_app_active: true
                }
            });

            givePaycheck(member.id, job_id as JobIds);
        }

        //TODO: Find a way to dismiss the left over "CURRENT" notification

        activityData.delete(pActivityId);

        emit("ev:server:activityCompleted", src, pTaskCode, pObjectiveId);

        return;
    }

    const nextPhoneActivityTask = activity.activity.tasks.find(task => task.id === nextObjective.key);
    if (nextObjective && nextPhoneActivityTask) {
        if (nextPhoneActivityTask?.descriptionExtraReference) {
            const ref = activity.references.find((ref: any) => ref.key === nextPhoneActivityTask?.descriptionExtraReference);
            if (ref) {
                const desc = nextPhoneActivityTask.description;
                nextPhoneActivityTask.description = `${desc} (${ref.value.settings.id})`;
            }
        }
    }

    nextObjective.value.data.status = "waiting";

    for (const member of group.members) {
        const memberSrc = getPlayerIdByCharacterId(member.id);
        if (memberSrc === -1) continue;

        emitNet("ev:jobs:updateObjectiveData", memberSrc, pActivityId, pObjectiveId, "status", "completed");
        emitNet("ev:jobs:updateObjectiveData", memberSrc, pActivityId, nextObjective.key, "status", "waiting");

        emitNet("ev:jobs:updateTask", memberSrc, "taskCompleted", pTaskCode);

        if (nextObjective.value.type !== "spawnEntity") {
            emitNet("ev:jobs:startTask", memberSrc, pActivityId, group.activity?.objectives[nextObjectiveId].key, {
                ...group.activity?.objectives[nextObjectiveId].value,
                objectives: activity?.objectives.map((objective: JobGroupActivityTaskObjective) => objective.key)
            });
        }

        emitNet("ev-ui:updateJobState", memberSrc, {
            activity: activity?.activity
        });
    }

    if (nextObjective.value.type === "spawnEntity") { // && !isAlreadyCompleted
        console.log("[JOBS] Type of objectie is spawnEntity and is not already completed, sending out startTask");
        emitNet("ev:jobs:startTask", pSource, pActivityId, group.activity?.objectives[nextObjectiveId].key, {
            ...group.activity?.objectives[nextObjectiveId].value,
            objectives: activity?.objectives.map((objective: JobGroupActivityTaskObjective) => objective.key)
        });
    }

    //emit("ev:server:objectiveCompleted", src, pTaskCode, pObjectiveId, pActivityId);
}

onNet("ev:jobs:objectiveCompleted", (pActivityId: number, pTaskCode: string, pObjectiveId: any): void => {
    const src = global.source;
    objectiveCompleted(src, pActivityId, pTaskCode, pObjectiveId);
});

export function updateObjectiveData(pSource: number, pActivityId: number, pTaskCode: string, pCurrentObjectiveName: string, pType: any, pValue: any) {
    const user = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const [group, isLeader] = Helpers.getGroupByCharacterId(user.character.id);
    if (!group) return;

    const activity = group.activity;
    if (!activity) return;

    if (activity === "none" as any) return;

    const objective = activity.objectives.find((objective: JobGroupActivityTaskObjective) => objective.key === pCurrentObjectiveName);
    if (!objective) return;

    objective.value.data[pType] = pValue;

    if (pType === "count") {
        if (objective?.value?.data?.count !== undefined) {
            objective.value.data.count = pValue;
            if (objective?.value?.settings?.wanted !== undefined && objective?.value?.data?.count >= objective?.value?.settings?.wanted) {
                objectiveCompleted(pSource, pActivityId, pTaskCode, pCurrentObjectiveName);
            }

            const phoneActivityTask = activity.activity.tasks.find(task => task.id === pCurrentObjectiveName);
            if (phoneActivityTask !== undefined) {
                phoneActivityTask.count = objective.value.data.count;

                for (const member of group.members) {
                    const memberSrc = getPlayerIdByCharacterId(member.id);
                    if (memberSrc === -1) continue;

                    emitNet("ev:jobs:updateObjectiveData", memberSrc, pActivityId, pCurrentObjectiveName, pType, objective.value.data.count);

                    emitNet("ev-ui:updateJobState", memberSrc, {
                        activity: activity?.activity
                    });
                }
            }
        }
    } else {
        for (const member of group.members) {
            const memberSrc = getPlayerIdByCharacterId(member.id);
            if (memberSrc === -1) continue;

            emitNet("ev:jobs:updateObjectiveData", memberSrc, pActivityId, pCurrentObjectiveName, pType, pValue);
        }
    }

    emit("ev:server:updateObjectiveData", pSource, pActivityId, pCurrentObjectiveName);
}

onNet("ev:jobs:updateObjectiveData", (pActivityId: number, pTaskCode: string, pCurrentObjectiveName: string, pType: any, pValue: any): void => {
    return updateObjectiveData(global.source, pActivityId, pTaskCode, pCurrentObjectiveName, pType, pValue);
});

export function updateData(pSource: number, pActivityId: number, pReferenceId: any, pType: any, pValue: any) {
    const user = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const [group, isLeader] = Helpers.getGroupByCharacterId(user.character.id);
    if (!group) return;

    const activity = group.activity;
    if (!activity) return;

    if (activity === "none" as any) return;

    const referenceIdx: any = activity.references.findIndex((reference) => reference.key === pReferenceId);
    if (referenceIdx === -1) return;

    if (activity.references[referenceIdx]?.value && activity.references[referenceIdx]?.value?.data) {
        activity.references[referenceIdx].value.data[pType] = pValue;

        for (const member of group.members) {
            const memberSrc = getPlayerIdByCharacterId(member.id);
            if (memberSrc === -1) continue;

            emitNet("ev:jobs:updateData", memberSrc, pActivityId, pReferenceId, pType, pValue);
        }
    }

    group.activity = activity;
}

onNet("ev:jobs:updateData", (pActivityId: number, pReferenceId: any, pType: any, pValue: any): void => {
    return updateData(global.source, pActivityId, pReferenceId, pType, pValue);
});

global.exports("startActivity", startActivity);
global.exports("getObjective", getObjective);
global.exports("objectiveCompleted", objectiveCompleted);
global.exports("updateObjectiveData", updateObjectiveData);
global.exports("updateData", updateData);