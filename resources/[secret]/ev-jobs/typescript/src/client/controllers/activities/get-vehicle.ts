//Classes
import { TaskRunner } from "client/classes/task-runner";
import { VehicleEvent } from "client/classes/vehicle-event";

import { ActivityData, GetWaitingObjective } from ".";

export function getVehicle(pActivityId: number, pTaskData: any): TaskRunner {
    const taskRunner = new TaskRunner();
    const activityData = ActivityData.get(pActivityId);
    if (!activityData) return taskRunner;
    const { settings: settings } = pTaskData;

    if (settings.trigger) {
        const vehicleEvent = new VehicleEvent(settings.trigger, activityData);
        vehicleEvent.on("trigger", bool => {
            if (bool) {
                const objective = GetWaitingObjective(activityData.objectives, pTaskData.objectives);
                if (objective) {
                    const playerPed = PlayerPedId();
                    const playerVehicle = GetVehiclePedIsIn(playerPed, false);
                    if (playerVehicle !== 0) {
                        const reference = activityData.references.get(objective.reference ?? settings.trigger.vehicle.reference);
                        const foundPed = GetPedInVehicleSeat(playerVehicle, -1);
                        const playerVehicleNetId = NetworkGetNetworkIdFromEntity(playerVehicle);
                        if (foundPed) {
                            if (!reference?.data?.netId) { //reference.netId
                                taskRunner.emit("taskEvent", "updateData", reference.id, "netId", playerVehicleNetId);
                            }
                            taskRunner.emit("taskEvent", "objectiveCompleted", objective.id, objective.reference ?? settings.trigger.vehicle.reference);
                        }
                    }
                }
            }
        });

        taskRunner.addHandler(vehicleEvent);

        vehicleEvent.enable();
    }
    return taskRunner;
}