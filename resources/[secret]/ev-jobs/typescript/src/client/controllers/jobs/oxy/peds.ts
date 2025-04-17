import { Delay, GetDistance } from "@shared/utils/tools";

export async function InitOxyPeds(): Promise<void> { }

const validVehicleClasses = new Set([10, 11, 14, 15, 16, 17, 18, 19, 20, 21]);

function IsValidVehicleClass(pEntity: number) {
    const vehicleClass = GetVehicleClass(pEntity);
    return !validVehicleClasses.has(vehicleClass);
}

RPC.register("ev-jobs:findHandOffCandidate", async (pExcludedNetIds: number[]) => {
    let pedNetId, vehicleNetId;

    PopulateNow();

    await Wait(10);

    const vehicles = GetGamePool("CVehicle");

    for (const vehicle of vehicles) {
        if (IsValidVehicleClass(vehicle) && !pExcludedNetIds.includes(NetworkGetNetworkIdFromEntity(vehicle))) {
            const ped = GetPedInVehicleSeat(vehicle, -1);
            if (!IsPedAPlayer(ped) && !IsPedDeadOrDying(ped, true)) {
                const speed = GetEntitySpeed(vehicle);
                const distance = GetDistance(GetEntityCoords(PlayerPedId(), false), GetEntityCoords(vehicle, false));
                if (distance < 95 && speed < 16) {
                    pedNetId = NetworkGetNetworkIdFromEntity(ped);
                    vehicleNetId = NetworkGetNetworkIdFromEntity(vehicle);
                    SetEntityAsMissionEntity(ped, true, true);
                    SetEntityAsMissionEntity(vehicle, true, true);
                    break;
                }
            }
        }
    }

    return {
        vehicle: vehicleNetId,
        driver: pedNetId
    };
});

RPC.register("TaskVehicleDriveToCoord", (pedNetId: number, vehicleNetId: number, coords: Vector3) => {
    const ped = NetworkGetEntityFromNetworkId(pedNetId);
    const vehicle = NetworkGetEntityFromNetworkId(vehicleNetId);
    TaskVehicleDriveToCoord(ped, vehicle, coords.x, coords.y, coords.z, 16, 1, 0, 786603, 15.0, 1);
});

RPC.register("TaskVehicleDriveWander", async (pedNetId: number, vehicleNetId: number) => {
    console.log("pnetclient", pedNetId)
    console.log("vehicleNetIdClient", vehicleNetId)
    const ped = NetworkGetEntityFromNetworkId(pedNetId);
    const vehicle = NetworkGetEntityFromNetworkId(vehicleNetId);
    TaskVehicleDriveWander(ped, vehicle, 60.0, 786603);
});