//Classes
import { TaskRunner } from "client/classes/task-runner";

import { ActivityData } from ".";
import { Delay } from "@shared/utils/tools";

export function despawnEntity(pActivityId: number, pTaskData: any): TaskRunner {
    const taskRunner = new TaskRunner();
    const activityData = ActivityData.get(pActivityId);
    if (!activityData) return taskRunner;

    const objectives = pTaskData.objectives.reduce((acc: any, curr: any) => {
        const objective = activityData.objectives.get(curr);
        objective && acc.push(objective);
        return acc;
    }, []);

    taskRunner.addThread(async () => {
        for (const spawn of pTaskData.settings.spawn) {
            const reference = activityData.references.get(spawn.reference);
            const netId = reference.data.netId;
            const entity = NetworkGetEntityFromNetworkId(netId);
            //const objective = objectives.find((objective: any) => objective.reference == spawn.reference);
            const objective = objectives.find((objective: any) => {
                if (objective?.settings?.spawn && objective.data?.status === "waiting") {
                    return objective.settings.spawn[0].reference === spawn.reference;
                } else {
                    return false;
                }
            });
            if (!objective) {
                continue;
            }
            if (objective.status === "waiting" && netId && IsEntityAVehicle(entity) && GetVehicleNumberOfPassengers(entity) == 0 && IsVehicleSeatFree(entity, -1)) {
                SetEntityAsMissionEntity(entity, true, true);
                global.exports["ev-sync"].SyncedExecution("DeleteVehicle", entity);
                if (!DoesEntityExist(entity)) {
                    taskRunner.emit("taskEvent", "objectiveCompleted", objective.id);
                }
            }
        }
        await Delay(5000);
    });

    return taskRunner;
}