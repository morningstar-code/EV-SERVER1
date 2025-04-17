//Classes
import { Entity } from "client/classes/entity";
import { TaskRunner } from "client/classes/task-runner";
import { Vectors } from "client/classes/vectors";

import { ActivityData } from ".";
import { LoadModel } from "@shared/utils/tools";
import { GetNetworkedCoords } from "client/lib/infinity";
import { Vector } from "@shared/classes/vector";

export async function spawnJobVehicle(pType: string, pHashKey: number | string, pIsNetwork: boolean, pCoords: Vector3, pHeading?: number, pExtras?: any, pMods?: any) {
    if (pHashKey) {
        if (pType === "vehicle") {
            const closestVehicle = GetClosestVehicle(pCoords.x, pCoords.y, pCoords.z, 5, 0, 70);
            if (closestVehicle != 0) {
                global.exports["ev-sync"].SyncedExecution("DeleteVehicle", closestVehicle);
            }
            const result = await RPC.execute<{ vehicle: number, stateBag: any, owner: number, netId: number }>("ev:vehicles:basicSpawn", pHashKey, pCoords, pHeading, "job", null, false, pMods);
            const netId = result?.netId ?? false;

            if (pExtras) {
                const vehicle = NetworkGetEntityFromNetworkId(netId);
                for (let i = 0; i < 15; i += 1) {
                    SetVehicleExtra(vehicle, i, true);
                }
                pExtras.forEach((extra: any) => {
                    SetVehicleExtra(vehicle, extra, false);
                });
            }
            return netId;
        } else {
            if (pType === "object") return CreateObject(pHashKey, pCoords.x, pCoords.y, pCoords.z, pIsNetwork, false, true);
            else {
                if (pType === "ped") return CreatePed(4, pHashKey, pCoords.x, pCoords.y, pCoords.z, pHeading ?? 0, pIsNetwork, false);
            }
        }
    }
}

export function spawnEntity(pActivityId: number, pTaskData: any): TaskRunner { //Possibly only runs for the leader?    
    const taskRunner = new TaskRunner();
    const activityData = ActivityData.get(pActivityId);
    if (!activityData) return taskRunner;

    const objectives = pTaskData.objectives.reduce((acc: any, curr: any) => {
        const objective = activityData.objectives.get(curr);
        objective && acc.push(objective);
        return acc;
    }, []);

    let spawnCount = 0;
    for (const spawn of pTaskData.settings.spawn) {
        spawnCount += 1;
        const reference = activityData.references.get(spawn.reference);
        const location = activityData.references.get(spawn.location.reference);
        const objective = objectives.find((objective: any) => {
            if (objective?.settings?.spawn) {
                return objective.settings.spawn[spawnCount - 1].reference === spawn.reference; //It finds the objective that matches the spawn reference (deliveryVehicle)
            } else {
                return false;
            }
            //return objective.reference === spawn.reference; //It finds the objective that matches the spawn reference (deliveryVehicle)
        }); //Why?
        if (!objective) continue;
        if (location) {
            if (reference?.data?.netId !== 0) {
                continue; //Means it was spawned by another group member
            }
            const model = typeof reference.settings.model === "string" ? GetHashKey(reference.settings.model) : reference.settings.model;
            LoadModel(model).then(async () => {
                if (location instanceof Vectors) {
                    const netId = await spawnJobVehicle(spawn.type, model, spawn.networked, location.vectors, location.heading, reference.settings.extras, reference.settings.mods);
                    netId && emitNet("ev:jobs:updateData", pActivityId, reference.id, "netId", netId), reference.data.netId = netId;
                    emitNet("ev:jobs:vehicleSpawned", pActivityId, objective.id, netId);
                } else {
                    if (location instanceof Entity) {
                        const coords = GetNetworkedCoords(location.type, location.netId);
                        const vectors = Vector.fromArray(coords);
                        const netId = await spawnJobVehicle(reference.type, reference.settings.model, spawn.networked, vectors);
                        netId && emitNet("ev:jobs:updateData", pActivityId, reference.id, "netId", netId), reference.data.netId = netId;
                        emitNet("ev:jobs:vehicleSpawned", pActivityId, objective.id, netId);
                    }
                }
                taskRunner.emit("taskEvent", "objectiveCompleted", objective.id);
            });
        }
    }

    return taskRunner;
}