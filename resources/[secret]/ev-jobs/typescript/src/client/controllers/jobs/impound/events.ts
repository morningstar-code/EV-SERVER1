import { Vector } from "@shared/classes/vector";
import { FormatCurrency } from "@shared/utils/tools";
import { GetPlayerJob } from "../../npcs";
import { DoPhoneConfirmation } from "client/utils/tools";
import { GetImpoundCurAndNext } from "./progression";
import { OpenImpoundMenu, OpenImpoundRequestMenu } from "./records";
import { spawnJobVehicle } from "client/controllers/activities/spawn-entity";

let ImpoundTruck = null as any;

export async function InitImpoundEvents(): Promise<void> { }

export const GetImpoundTruck = (): number => ImpoundTruck;

const allowedJobs = ["police", "doc", "judge"];

on("ev-jobs:impound:openImpoundRequestMenu", (pArgs: any, pEntity: number, pContext: any) => {
    let pReasons: string[] = [];
    if (!allowedJobs.includes(pContext.stateJob)) pReasons = ["scuff", "parking"];
    OpenImpoundRequestMenu(pEntity, pReasons);
});

on("ev-jobs:impound:openImpoundMenu", (pArgs: any, pEntity: number, pContext: any) => {
    const job = GetPlayerJob();
    if (job !== "impound" && job !== "pd_impound") return;
    OpenImpoundMenu(pEntity);
});

onNet("ev-jobs:impound:openBillConfirmation", async (pAmount: number, pVin: string, pRecordId: number) => {
    const result = await DoPhoneConfirmation("Impound Release Fee", `${FormatCurrency(pAmount)} incl. tax`, "file-invoice-dollar");
    if (!result) return;
    const success = await RPC.execute("ev-jobs:impound:completeReleaseBill", pVin, pRecordId); 
    emit("DoLongHudText", success ? "Release Fee Paid." : "Unable to Pay Release Fee.", success ? 1 : 2);
});

on("ev-jobs:pdimpound:paycheck", () => {
    const job = GetPlayerJob();
    if (job !== "pd_impound") return;
    global.exports["ev-jobs"].GetPayCheck("pd_impound");
});

on("ev-jobs:pdimpound:spawnTruck", async () => {
    const job = GetPlayerJob();
    if (job !== "pd_impound") return;
    const closestVehicle = GetClosestVehicle(425.45, -1029.22, 29.04, 3, 0, 70);
    if (DoesEntityExist(closestVehicle)) return TriggerEvent("DoLongHudText", "The area is crowded", 2);
    const netId = await spawnJobVehicle("vehicle", GetHashKey("flatbed"), true, new Vector(425.45, -1029.22, 29.04), 95.1, []);
    if (!netId) return;
    const entity = NetworkGetEntityFromNetworkId(netId);
    if (!DoesEntityExist(entity)) return;
    SetPedIntoVehicle(PlayerPedId(), entity, -1);
    ImpoundTruck = netId;
});

on("ev-jobs:pdimpound:returnTruck", () => {
    const job = GetPlayerJob();
    if (job !== "pd_impound") return;
    if (ImpoundTruck) {
        const entity = NetworkGetEntityFromNetworkId(ImpoundTruck);
        if (entity && DoesEntityExist(entity)) {
            global.exports["ev-sync"].SyncedExecution("DeleteVehicle", entity);
        }
        ImpoundTruck = null;
        return;
    }
});

RegisterUICallback("ev-jobs:towing:getProgression", (data: any, cb: Function) => {
    const progression = GetImpoundCurAndNext();
    return cb({ data: progression, meta: { ok: true, message: "done" } });
});