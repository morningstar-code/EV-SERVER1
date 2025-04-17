import { Events, Procedures } from "@cpx/server";
import { cuffsGranted, cuffsUncuff, recentCuffs } from "./cuffs";
import { dragAsk, dragDisable } from "./drag";
import { saveVehicleMods } from "./callsign";
import { addLog, getCreationLogs } from "./fakeid";
import { getCurrentSuspensions } from "./suspensions";
import { fullyRefuelVehicle, fullyRepairVehicle } from "./vehicle";

export async function InitEvents(): Promise<void> {
    onNet("ev-police:cuffs:granted", (pTargetServerId: number, pIsSoftCuff: boolean) => {
        const pSource = global.source;
        cuffsGranted(pSource, pTargetServerId, pIsSoftCuff);
    });
    onNet("ev-police:cuffs:uncuff", (pTargetServerId: number) => {
        const pSource = global.source;
        cuffsUncuff(pSource, pTargetServerId);
    });
    onNet("ev-police:drag:ask", (pTargetServerId: number, pIsCarry: boolean) => {
        const pSource = global.source;
        dragAsk(pSource, pTargetServerId, pIsCarry);
    });
    onNet("ev-police:drag:disable", (pTargetServerId: number) => {
        const pSource = global.source;
        dragDisable(pSource, pTargetServerId);
    });
    onNet("ev-police:drag:setRoom", (pTargetServerId: number, pRoom: number[]) => {
        emitNet("ev-police:drag:setRoom", pTargetServerId, pRoom);
    });
    onNet("ev-police:vehicle:svSeat", (pTargetServerId: number, pEntityNetId: number, pSeat: number) => {
        emitNet("ev-police:vehicle:enterSeat", pTargetServerId, pEntityNetId, pSeat);
    });
    onNet("ev-police:vehicle:svUnseat", (pTargetServerId: number, pEntityNetId: number) => {
        emitNet("ev-police:vehicle:leaveSeat", pTargetServerId, pEntityNetId);
    });
    onNet("ev-police:tackle:server", (pTargetServerId: number) => {
        emitNet("ev-police:tackle:tackled", pTargetServerId);
    });
    onNet("ev-police:vehicle:trunkEnter", (pVehicleNetId: number) => {

    });
    onNet("ev-police:vehicle:trunkExit", (pVehicleNetId: number) => {

    });
    onNet("ev-police:vehicle:releaseTrunkAsk", (pVehicleNetId: number) => {

    });
    onNet("ev-police:vehicle:forceTrunkAsk", (pTargetServerId: number, pVehicleNetId: number) => {
        emitNet("ev-police:vehicle:forceEnteringVehicle", pTargetServerId, pVehicleNetId);
    });
    RegisterCommand("barrier", (src: number) => {
        emitNet("ev-police:client:placeBarrier", src);
    }, false);
    Events.onNet("ev-police:server:placedBarrier", (pId: string, pPlacedAt: number) => {

    });
    Events.onNet("ev-police:server:pickedUpBarrier", (pId: string, pPlacedAt: number, pPickedUpAt: number) => {

    });
    Procedures.register("ev-police:getRecentCuffs", (pSource: number, pServerId: number) => {
        const recentCuff = recentCuffs && recentCuffs[pServerId] && recentCuffs[pServerId].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5) || [];
        return recentCuff;
    });
    Procedures.register("ev-police:cid:getCreationLogs", (pSource: number, pType: string) => {
        return getCreationLogs(pSource, pType);
    });
    Procedures.register("ev-police:cid:addLog", (pSource: number, pType: string, pAction: string) => {
        return addLog(pSource, pType, pAction);
    });
    Procedures.register("ev-police:getCurrentSuspensions", (pSource: number) => {
        return getCurrentSuspensions(pSource);
    });
    RPC.register("ev-police:server:saveVehicleMods", (pSource: number, pVehicleNetId: number, pMods: any) => {
        return saveVehicleMods(pSource, pVehicleNetId, pMods);
    });
    RPC.register("ev-police:server:fullyRefuelVehicle", (pSource: number, pNetId: number) => {
        return fullyRefuelVehicle(pSource, pNetId);
    });
    RPC.register("ev-police:server:fullyRepairVehicle", (pSource: number, pNetId: number) => {
        return fullyRepairVehicle(pSource, pNetId);
    });
};