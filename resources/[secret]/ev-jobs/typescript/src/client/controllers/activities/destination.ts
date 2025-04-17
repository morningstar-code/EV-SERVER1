//Classes
import { TaskRunner } from "client/classes/task-runner";
import { Vectors } from "client/classes/vectors";
import { Entity } from "client/classes/entity";
import { ZoneTracker } from "client/classes/zone-tracker";
import { VehicleEvent } from "client/classes/vehicle-event";
import { Interaction } from "client/classes/interaction";
import { Marker } from "client/classes/marker";
import { Blip } from "client/classes/blip";
import { Vector } from "@shared/classes/vector";

import { Delay } from "@shared/utils/tools";
import { GetNetworkedCoords } from "client/lib/infinity";
import { ActivityData, GetWaitingObjective } from ".";

export function destination(pActivityId: number, pTaskData: DestinationTaskData): TaskRunner {    
    const taskRunner = new TaskRunner();
    const activityData = ActivityData.get(pActivityId);
    if (!activityData) return taskRunner;
    const { settings: settings } = pTaskData;

    const location = activityData.references.get(settings.location.reference);
    
    let delay = true;
    const playerPed = PlayerPedId();
    const playerCoords = Vector.fromArray(GetEntityCoords(playerPed, false));
    const locationCoords = location.type == "zone" ? location.settings.id : location instanceof Vectors ? location.vectors : new Vector();

    taskRunner.addThread(async () => {
        playerCoords.setFromArray(GetEntityCoords(playerPed, false));
        if (location instanceof Entity) {
            locationCoords.setFromArray(await GetNetworkedCoords(location.type, location.data.netId));
        }
        if (delay) await Delay(250);
    });

    const zoneTracker = new ZoneTracker(playerCoords, locationCoords);
    taskRunner.addHandler(zoneTracker);

    if (settings.trigger) {
        const vehicleEvent = new VehicleEvent(settings.trigger, activityData);
        const wanted = location.type == "zone" ? locationCoords : settings.trigger.wanted;
        zoneTracker.addCheck("triggerDistance", wanted);
        zoneTracker.on("triggerDistance", bool => {
            bool ? vehicleEvent.enable() : vehicleEvent.disable();
        });

        vehicleEvent.on("trigger", bool => {
            if (bool) {
                const objective = GetWaitingObjective(activityData.objectives, pTaskData.objectives);
                if (objective) {
                    taskRunner.emit("taskEvent", "objectiveCompleted", objective.id, pTaskData.objectives);
                }
            }
        });

        taskRunner.addHandler(vehicleEvent);
    }

    if (settings.notification) {
        const interaction = new Interaction(settings.notification, locationCoords);

        zoneTracker.addCheck("notificationDistance", settings.notification.distance);

        zoneTracker.on("notificationDistance", bool => {
            bool ? interaction.enable() : interaction.disable();
        });

        taskRunner.addHandler(interaction);
    }

    if (settings.marker) {
        const marker = new Marker(settings.marker, locationCoords);

        zoneTracker.addCheck("markerDistance", settings.marker.distance);

        zoneTracker.on("markerDistance", bool => {
            if (bool) {
                delay = false;
                marker.enable();
            } else {
                delay = true;
                marker.disable();
            }
        });

        taskRunner.addHandler(marker);
    }

    if (settings.location.blip) {
        const blip = activityData.references.get(settings.location.blip);
        const blipClass = new Blip(blip.settings, location);
        taskRunner.addHandler(blipClass);
        blipClass.enable();
    }

    zoneTracker.enable();

    return taskRunner;
}