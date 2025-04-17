import { Repository } from "server/controllers/database/repository";
import { fetchReasons } from "./reasons";
import { completeReleaseBill, fetchRequestInfo, impoundLookup, releaseVehicle, sendBillToPlayer } from "./records";
import { Helpers } from "server/helpers/utils";
import { activityData } from "server/controllers/activity";
import { readiedGroups } from "../npcs";
import { getPlayerIdByCharacterId } from "server/helpers/tools";
import { activityIdMappedToTimeGiven } from "../threads";
import { Base } from "@shared/cpx/server";

export async function InitImpoundEvents(): Promise<void> {
    console.log("[JOBS] [IMPOUND] Initializing events...");
}

RPC.register("ev-jobs:impound:requestImpound", async (pSource: number, pNetId: number, pReasonCode: string, pType: string, pNum: number, pIsInDropOffZone: boolean, pStrikes: number, pReportId: number, pWasInWater: boolean): Promise<boolean> => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return false;
    /*
        pNetId - The vehicle's netId
        pReasonCode - The reason code/id of the reason
        pType - "present" | "not_present"
        pNum - IDK
        pIsInDropOffZone - If the vehicle is in the drop off zone
        pStrikes - Number of strikes to add to the vehicle
        pReportId - The report ID (if it's getting striked)
        pWasInWater - If the vehicle was in water
    */

    /*
        If all checks pass, then we can proceed to send out a job offer to readied up impound workers.
        Once accepted, it will pick a random impound worker in the pool of workers who accepted the job offer.
    */
    const request = await Repository.getImpoundRequestByNetId(pNetId);
    if (request) {
        emitNet("DoLongHudText", pSource, "Impound Request Failed (vehicle already requested)", 2);
        return false;
    }

    //TODO: Other checks here

    const results = await Repository.addImpoundRequest(user.character.id, pNetId, pReasonCode, pType, pStrikes, pReportId)


    if (!results) {
        emitNet("DoLongHudText", pSource, "Impound Request Failed (database error)", 2);
        return false;
    }


    const members = Helpers.getAllAvailableGroupMembersByJobId("impound");
    if (members.length > 0) {
        for (const member of members) {
            const memberSrc = getPlayerIdByCharacterId(member.id);
            if (memberSrc === -1) continue;

            emitNet("ev-ui:server-relay", memberSrc, {
                source: "ev-nui",
                app: "phone",
                data: {
                    action: "notification",
                    target_app: "home-screen",
                    title: "Attention Required",
                    body: "Vehicle waiting to be processed.",
                    show_even_if_app_active: true
                }
            });
        }
    }

    const readiedUp = readiedGroups.get("impound");

    if (readiedUp) {
        console.log("[JOBS] Pushing activity Impound");

        const activityId = Math.floor(Math.random() * 1000000);
    
        activityIdMappedToTimeGiven.set(activityId, Date.now());

        activityData.set(activityId, {
            type: "data",
            references: [
                {
                    key: "requestedVehicle",
                    type: "netId",
                    value: pNetId
                }
            ],
        });

        for (const groupId of readiedUp) {
            const [group, job] = Helpers.getGroupById(groupId);
            if (!job || !group) return false;

            const leaderSrc = getPlayerIdByCharacterId(group.leader.id);
            if (leaderSrc === -1) continue;

            emitNet("ev-ui:jobs:groupActivityOffer", leaderSrc, activityId, "Impound Worker", group.id);
        }

        return true;
    }

    return false;
});

RPC.register("ev-jobs:impound:completeImpound", async (pSource: number, pNetId: number, pMultiplier: number): Promise<boolean> => {
    //Only add to the records if it's a personal vehicle, no local vehicles.
    //It's also here were we get the amount of strikes from the reasonId 
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return false;

    const request = await Repository.getImpoundRequestByNetId(pNetId);
    if (!request) {
        emitNet("DoLongHudText", pSource, "Impound Failed (vehicle not requested)", 2);
        return false;
    }

    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag.state.vin) {
        const isVinScratched = bag.state.vinScratched;


        if (bag.state.vin.startsWith("3") && !isVinScratched) {
            const results = await Repository.addImpoundRecord(bag.state.vin, request.reason_id, request.issuer_id, user.character.id);
            if (!results) {
                emitNet("DoLongHudText", pSource, "Impound Failed (database error)", 2);
                return false;
            }
        } else if (bag.state.vin.startsWith("3") && isVinScratched) {
            const removed = await Repository.removeVinScratchedVehicle(bag.state.vin);
            if (!removed) {
                emitNet("DoLongHudText", pSource, "Impound Failed (database error)", 2);
                return false;
            }
        }
    } 

    const success = Repository.removeImpoundReqeust(pNetId)
    if (!success) {
        emitNet("DoLongHudText", pSource, "Impound Failed (DB - Error while removing request)", 2);
        return false;
    }

    DeleteEntity(vehicle)

    return true;
}); 

RPC.register("ev-jobs:impound:sendBill", async (pSource: number, pStateId: number, pFee: number, pVin: string, pRecordId: number): Promise<boolean> => {
    return await sendBillToPlayer(pStateId, pFee, pVin, pRecordId) 
});

RPC.register("ev-jobs:impound:completeReleaseBill", async (pSource: number, pVin: string, pRecordId: number, pBool?: boolean): Promise<boolean> => {
    return await completeReleaseBill(pSource, pVin, pRecordId, pBool); 
});

RPC.register("ev-jobs:impound:releaseVehicle", async (pSource: number, pVin: string, pRecordId: number): Promise<boolean> => {
    return await releaseVehicle(pSource, pVin, pRecordId) 
});

RPC.register("ev-jobs:impound:deliverFromStorage", async (pSource: number, pVin: string, pRecordId: number): Promise<boolean> => {
    return false; // TODO: Implement
});

RPC.register("ev-jobs:impound:lookup", async (pSource: number, pType: ImpoundLookupType, pPlate: string, pStateId: number): Promise<ImpoundVehicleLookup[]> => {    
    return await impoundLookup(pType, pPlate, pStateId);
});

RPC.register("ev-jobs:impound:fetchReasons", async (pSource: number): Promise<ImpoundReason[]> => {
    return await fetchReasons();
});

RPC.register("ev-jobs:impound:fetchRequestInfo", async (pSource: number, pNetId: number): Promise<ImpoundRequestInfo> => {
    return await fetchRequestInfo(pNetId);
});

RPC.register("ev-jobs:impound:requestHelp", async (pSource: number): Promise<void> => {
    // TODO: Implement
});

RPC.register("ev-jobs:impound:selfCheckOut", async (pSource: number, pVin: string, pRecordId: number): Promise<boolean> => {
    return false; // TODO: Implement
});