import { liftConfig } from "@shared/config";
import { IsEmployedAtBusiness } from "client/utils/tools";
import { deleteLift, createLift, startMovingLift } from "./lift";

export async function InitEvents(): Promise<void> {
    onNet("ev-lifts:client:attemptMoveLift", async (pData: { liftName: string, direction: string }) => {
        const lift = liftConfig.lifts.find(lift => lift.name === pData.liftName);
        if (!lift) return;

        const cid = global.exports["isPed"].isPed("cid");
        const isEmployed = await IsEmployedAtBusiness(lift.business, cid);
        if (!isEmployed) return emit("DoLongHudText", "I don't know how to use this.", 2);

        const pCoords = lift!?.coords;
        const pVehicle = GetClosestVehicle(pCoords.x, pCoords.y, pCoords.z, 3, 0, 70);
        const success = await RPC.execute("ev-lifts:moveLift", pData.liftName, pData.direction, NetworkGetNetworkIdFromEntity(pVehicle));

        if (!success) {
            DetachEntity(pVehicle, true, true);
        }

        return;
    });

    on("ev-polyzone:enter", (pZone: string) => {
        const foundLift = liftConfig.lifts.map(lift => lift.polyZone);
        if (!foundLift.includes(pZone)) return;
        return RPC.execute("ev-lifts:enteredPolyZone", pZone);
    });

    on("ev-polyzone:exit", (pZone: string) => {
        return deleteLift(pZone);
    });

    on("ev-polyzone:enter", (pZone: string) => {
        emitNet("ev-lifts:server:playerEnteredZone", pZone);
        return createLift(pZone);
    });

    onNet("ev-vehiclelifts:client:StartMovingLift", (liftName: string, liftDirection: string, startTime: any, endTime: any, elapsedTime: any, pauseTime: any, lastUpdateTime: any, netId: number) => {
        return startMovingLift(liftName, liftDirection, startTime, endTime, elapsedTime, pauseTime, lastUpdateTime, netId);
    });

    onNet("ev-vehiclelifts:client:DetachLiftVehicle", (pNetId: number) => {
        return DetachEntity(NetworkGetEntityFromNetworkId(pNetId), false, false);
    });
};