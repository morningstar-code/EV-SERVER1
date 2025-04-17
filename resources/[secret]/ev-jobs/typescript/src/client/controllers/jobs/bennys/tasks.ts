import { GetDistance } from "@shared/utils/tools";
import { IsInteractionZoneActive } from "client/controllers/interaction-zones";
import { CurrentCallback, CurrentObjectiveName, CurrentTaskCode } from ".";

const BennyTasks = new Map<string, Function>();

export function GetBennyTask(pName: string) {
    return BennyTasks.get(pName);
}

export function HasBennyTask(pName: string) {
    return BennyTasks.has(pName);
}

function RegisterBennyTask(pName: string, pFunc: Function) {
    BennyTasks.set(pName, pFunc);
}

RegisterBennyTask("move_vehicle_workstation", (pActivityId: number, pTaskCode: string, pObjectiveName: string, cb: Function) => {
    const targetVehicle = cb("getReferenceData", "target_vehicle");
    const playerPed = PlayerPedId();
    const targetVehicleEntity = NetworkGetEntityFromNetworkId(targetVehicle.data.netId);
    const pInterval = setInterval(() => {
        if (CurrentTaskCode !== pTaskCode) clearInterval(pInterval);
        const playerPedVehicle = GetVehiclePedIsIn(playerPed, false);
        if (playerPedVehicle === 0) return;
        const foundPed = GetPedInVehicleSeat(playerPedVehicle, -1) === playerPed;
        if (!foundPed || !IsInteractionZoneActive("bennys_bodywork") && !IsInteractionZoneActive("bennys_respray") || targetVehicleEntity !== playerPedVehicle) return;
        cb("updateObjectiveData", pObjectiveName, "count", 1);
        cb("updateObjectiveData", pObjectiveName, "status", "completed");
    }, 2000);
});

on("ev-jobs:bennys:completeInstallTask", (pActivityId: number, pVehicle: number, p3: any) => {
    const targetVehicle = CurrentCallback("getReferenceData", "target_vehicle");
    const bennysActivity = CurrentCallback("getReferenceData", "bennys_activity");
    const targetVehicleEntity = NetworkGetEntityFromNetworkId(targetVehicle.data.netId);
    if (pVehicle !== targetVehicleEntity) {
        return emit("DoLongHudText", "This is not the vehicle your team is working on.", 2);
    }
    if (bennysActivity.data.installed === 0) return emit("DoLongHudText", "The vehicle is not ready for delivery.", 2);
    CurrentCallback("updateObjectiveData", CurrentObjectiveName, "count", 1);
    CurrentCallback("updateObjectiveData", CurrentObjectiveName, "status", "completed");
});

RegisterBennyTask("send_off_vehicle", (pActivityId: number, pTaskCode: string, pObjectiveName: string, cb: Function) => {
    const targetVehicle = cb("getReferenceData", "target_vehicle");
    const targetVehicleEntity = NetworkGetEntityFromNetworkId(targetVehicle.data.netId);
    const pInterval = setInterval(() => {
        if (CurrentTaskCode !== pTaskCode) clearInterval(pInterval);
        const vehicleCoords = GetEntityCoords(targetVehicleEntity, false);
        const distance = GetDistance([-29.94, -1052.64, 28.4], vehicleCoords);
        if (distance < 20) return;
        cb("updateObjectiveData", pObjectiveName, "count", 1);
        cb("updateObjectiveData", pObjectiveName, "status", "completed");
    }, 2000);
});