import { Delay, FormatCurrency } from "@shared/utils/tools";
import { OpenInputMenu } from "client/lib/input";
import { DoPhoneConfirmation, TaskBar } from "client/utils/tools";
import { IsInImpoundDropOffZone } from "./zones";
import { ImpoundLookup, OpenImpoundRecords } from "./records";

let hasRequestedHelp = false;

export async function InitImpoundUI(): Promise<void> { }

RegisterUICallback("ev-jobs:menu:impound:requestHelp", async ({
    key: pKey = {}
}, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });
    if (hasRequestedHelp) return;
    hasRequestedHelp = true;
    RPC.execute("ev-jobs:impound:requestHelp");
    setTimeout(() => hasRequestedHelp = false, 120000);
});

RegisterUICallback("ev-jobs:menu:impound:lookupBook", (data: any, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });
    setTimeout(() => OpenImpoundRecords(), 250);
});

RegisterUICallback("ev-jobs:menu:impound:lookup", async ({
    key: pType = "" as ImpoundLookupType
}, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });

    let pPlate, pStateId;

    await Delay(100);

    switch (pType) {
        case "personal": {
            pStateId = global.exports["isPed"].isPed("cid");
            break;
        }
        case "owner": {
            const pPrompt = await OpenInputMenu<{ stateId: number }>([{
                name: "stateId",
                label: "State ID",
                icon: "address-card"
            }], (pValues: any) => {
                return pValues.stateId = Number(pValues === null || pValues === void 0 ? void 0 : pValues.stateId), !isNaN(pValues === null || pValues === void 0 ? void 0 : pValues.stateId);
            });
            pStateId = pPrompt.stateId;
            break;
        }
        case "plate": {
            const pPrompt = await OpenInputMenu<{ plate: string }>([{
                name: "plate",
                label: "Vehicle Plate",
                icon: "car-alt"
            }], (pValues: any) => {
                return pValues.plate && pValues.plate.length <= 8 && pValues.plate.length > 0;
            });
            pPlate = pPrompt.plate;
            break;
        }
    }

    await ImpoundLookup(pType, pPlate === null || pPlate === void 0 ? void 0 : pPlate.toUpperCase(), pStateId);
});

RegisterUICallback("ev-jobs:menu:impound:sendBill", async ({
    key: pKey = {} as { fee: number, vin: string, recordId: number }
}, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });

    await Delay(100);

    const pPrompt = await OpenInputMenu<{ stateId: number }>([{
        name: "stateId",
        label: "State ID",
        icon: "address-card" 
    }], (pValues: any) => { 
        if (!pValues.stateId || pValues.stateId.length > 9 || pValues.stateId.length === 0) return false;
        return pValues.stateId = Number(pValues === null || pValues === void 0 ? void 0 : pValues.stateId), !isNaN(pValues === null || pValues === void 0 ? void 0 : pValues.stateId);
    })

    const stateId = pPrompt.stateId;
    if (!stateId || !Number(stateId)) return emit("DoLongHudText", "Invalid State ID.", 2);
    const success = await RPC.execute("ev-jobs:impound:sendBill", stateId, pKey.fee, pKey.vin, pKey.recordId);
    if (!success) emit("DoLongHudText", "Unable to Charge release fee.", 2);
});

RegisterUICallback("ev-jobs:menu:impound:releaseVehicle", async ({
    key: pKey = {} as { vin: string, recordId: number }
}, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });
    const success = await RPC.execute("ev-jobs:impound:releaseVehicle", pKey.vin, pKey.recordId);
    emit("DoLongHudText", success ? "Approved Vehicle Release." : "Unable to Approve Release", success ? 1 : 2);
});

RegisterUICallback("ev-jobs:menu:impound:deliverFromStorage", async ({
    key: pKey = {} as { vin: string, recordId: number }
}, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });
    const success = await RPC.execute("ev-jobs:impound:deliverFromStorage", pKey.vin, pKey.recordId);
    emit("DoLongHudText", success ? "Vehicle Delivered." : "Unable to Deliver Vehicle", success ? 1 : 2);
});

RegisterUICallback("ev-jobs:menu:impound:markForImpound", async ({
    key: pKey = {} as { netId: number, reason: string, type: string, strikes: number }
}, cb: Function) => {
    var _0x3ab61d;
    cb({ data: {}, meta: { ok: true, message: "" } });
    const length = pKey.reason === "scuff" ? 10000 : 5000;
    const finished = await TaskBar(length, "Requesting Impound...");
    if (finished !== 100) return;
    emit("ev-ui:jobs:sendNotification", "Impound", "Alerted all nearby drivers.", true); 
    const entity = NetworkGetEntityFromNetworkId(pKey.netId);
    const success = await RPC.execute("ev-jobs:impound:requestImpound", pKey.netId, pKey.reason, pKey.type, 0, IsInImpoundDropOffZone(), (_0x3ab61d = pKey.strikes) !== null && _0x3ab61d !== void 0 ? _0x3ab61d : 0, 0, WasInWater());
    if (success) {
        SetEntityAsMissionEntity(entity, true, true);
        global.exports["ev-sync"].SyncedExecution("SetVehicleDoorsLocked", entity, 3);
        emit("DoLongHudText", success ? "Impound Request Accepted." : "Impound Request Failed.", success ? 1 : 2)
    }
});

RegisterUICallback("ev-jobs:menu:impound:markForStrike", async ({
    key: pKey = {} as { netId: number, reason: string, type: string, strikes: number }
}, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });

    await Delay(100);

    const pPrompt = await OpenInputMenu<{ reportId: number }>([{
        name: "reportId",
        label: "Report ID",
        icon: "address-card"
    }], (pValues: any) => {
        if (!pValues.reportId || pValues.reportId.length === 0) return false;
        return pValues.reportId = Number(pValues === null || pValues === void 0 ? void 0 : pValues.reportId), !isNaN(pValues === null || pValues === void 0 ? void 0 : pValues.reportId);
    });
    const reportId = pPrompt.reportId;
    const finished = await TaskBar(10000, "Requesting Impound...");
    if (finished !== 100) return;
    const success = await RPC.execute("ev-jobs:impound:requestImpound", pKey.netId, pKey.reason, pKey.type, 0, IsInImpoundDropOffZone(), pKey.strikes, reportId, WasInWater());
    if (success) {
        const vehicle = NetworkGetEntityFromNetworkId(pKey.netId);
        SetEntityAsMissionEntity(vehicle, true, true);
        global.exports["ev-sync"].SyncedExecution("SetVehicleDoorsLocked", vehicle, 3);
        emit("DoLongHudText", success ? "Impound Request Accepted." : "Impound Request Failed.", success ? 1 : 2);
    }
});

RegisterUICallback("ev-jobs:menu:impound:selfCheckOut", async ({
    key: pKey = {} as { fee: number, paid: boolean, vin: string, recordId: number }
}, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });
    await Delay(250);
    if (!pKey.paid) {
        const result = await DoPhoneConfirmation("Impound Release Fee", `${FormatCurrency(pKey.fee)} incl. tax`, "file-invoice-dollar");
        if (!result) return;
        const success = await RPC.execute("ev-jobs:impound:completeReleaseBill", pKey.vin, pKey.recordId, true); 
        if (!success) return emit("DoLongHudText", "Unable to Pay Release Fee.", 2);
    }
    const success = await RPC.execute("ev-jobs:impound:selfCheckOut", pKey.vin, pKey.recordId);
    emit("DoLongHudText", success ? "Vehicle Delivered." : "Unable to Deliver Vehicle", success ? 1 : 2);
});

const WasInWater = () => {
    return { wasInWater: IsEntityInWater(PlayerPedId()) ? true : false };
};