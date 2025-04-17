import { liftConfig } from "@shared/config";

export async function InitEvents(): Promise<void> { };

const syncedLifts = new Map<any, { name: string, direction: string, netId: number }>();

RPC.register("ev-lifts:moveLift", async (pSource: number, pLiftName: string, pDirection: string, pNetId: number) => {
    const startTime = Date.now();
    const endTime = startTime + 10000;
    const elapsedTime = 0;
    const pauseTime = 0;
    const lastUpdateTime = 0;

    const lift = liftConfig.lifts.find(lift => lift.name === pLiftName);

    syncedLifts.set(lift?.polyZone, { name: pLiftName, direction: pDirection, netId: pNetId });

    emitNet("ev-vehiclelifts:client:StartMovingLift", -1, pLiftName, pDirection, startTime, endTime, elapsedTime, pauseTime, lastUpdateTime, pNetId);
});

RPC.register("ev-lifts:enteredPolyZone", async (pSource: number, pZone: string) => {
    if (!syncedLifts.has(pZone)) return;

    const lift = syncedLifts.get(pZone);
    if (!lift) return;

    emitNet("ev-vehiclelifts:client:StartMovingLift", pSource, lift.name, lift.direction, 0, 0, 0, 0, 0, lift.netId);
});

onNet('ev-lifts:server:playerEnteredZone', (pZone: string) => {
    if (!syncedLifts.has(pZone)) return;
    
    const lift = syncedLifts.get(pZone);
    if (!lift) return;

    emitNet("ev-vehiclelifts:client:StartMovingLift", -1, lift.name, lift.direction, 0, 0, 0, 0, 0, lift.netId);
});