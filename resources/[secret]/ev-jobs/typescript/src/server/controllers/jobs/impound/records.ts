import { Base } from "@shared/cpx/server";
import { Repository } from "server/controllers/database/repository";
import { getPlayerIdByCharacterId } from "server/helpers/tools";

export async function InitImpoundRecords(): Promise<any> {}

export async function impoundLookup(pType: ImpoundLookupType, pPlate: string, pStateId: number): Promise<ImpoundVehicleLookup[]> {
    return await Repository.impoundLookup(pType, pPlate, pStateId);
}

export async function fetchRequestInfo(netId: number): Promise<ImpoundRequestInfo> {
    return await Repository.fetchRequestInfo(netId);
}

export async function completeImpound(netId: number, multiplier: number): Promise<boolean> {
    return false; // TODO: Implement
}

export async function sendBillToPlayer(pStateId: number, pFee: number, pVin: string, pRecordId: number): Promise<boolean> {
    const pSrc = getPlayerIdByCharacterId(pStateId);

    emitNet("ev-jobs:impound:openBillConfirmation", pSrc, pFee, pVin, pRecordId);

    return true;
}

export async function completeReleaseBill(pSource: number, pVin: string, pRecordId: number, pBool?: boolean): Promise<boolean> {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return false;

    const record = await Repository.getImpoundRecordById(pRecordId);
    if (!record) return false;

    const accountId = await global.exports["ev-financials"].getDefaultBankAccount(user.character.id, true);
    if (typeof accountId === "string") {
        emitNet("ev-ui:server-relay", pSource, {
            source: "ev-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: "home-screen",
                title: "Impound Release",
                body: accountId,
                show_even_if_app_active: true
            }
        });
        return false;
    }
     
    const { success, message } = await global.exports["ev-financials"].DoTransaction(-1, accountId, 1, record.fee, `Impound Release Bill`, 2, "transfer", false)
    if (!success) {
        emitNet("ev-ui:server-relay", pSource, {
            source: "ev-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: "home-screen",
                title: "Impound Release",
                body: message,
                show_even_if_app_active: true
            }
        });
        return false;
    }

    const updated = await Repository.updateImpoundRecordById(pRecordId, {
        ...record,
        paid: true
    });
    if (!updated) {
        emitNet("ev-ui:server-relay", pSource, {
            source: "ev-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: "home-screen",
                title: "Impound Release",
                body: "Records failed to update",
                show_even_if_app_active: true
            }
        });
        return false;
    }

    return true;
}

export async function releaseVehicle(pSource: number, pVin: string, pRecordId: number): Promise<boolean> {
    const ownerCharacterId = await Repository.getCharacterIdByVehicleVin(pVin);
    if (!ownerCharacterId) return false;

    const ownerSource = getPlayerIdByCharacterId(ownerCharacterId);
    if (ownerSource === -1) return false;

    const record = await Repository.getImpoundRecordById(pRecordId);
    if (!record) return false;

    const updated = await Repository.updateImpoundRecordById(pRecordId, {
        ...record,
        released: true
    });

    if (!updated) {
        emitNet("ev-ui:server-relay", pSource, {
            source: "ev-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: "home-screen",
                title: "Impound Release",
                body: "Records failed to update",
                show_even_if_app_active: true
            }
        });
        return false;
    }

    const { success, netId } = await global.exports["ev-vehicles"].SpawnPlayerVehicle(ownerSource, pVin, [-222.0911, -1165.169, 22.60], 357.155, true);
    if (!success) {
        emitNet("ev-ui:server-relay", pSource, {
            source: "ev-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: "home-screen",
                title: "Impound Release",
                body: "Vehicle failed to spawn",
                show_even_if_app_active: true
            }
        });
        return false;
    }

    if (pSource != ownerSource) {
        emitNet("ev-ui:server-relay", pSource, {
            source: "ev-nui",
            app: "phone",
            data: {
                action: "notification",
                target_app: "home-screen",
                title: "Impound Release",
                body: "Vehicle released to the owner.",
                show_even_if_app_active: true
            }
        });
    }

    emitNet("ev-ui:server-relay", ownerSource, {
        source: "ev-nui",
        app: "phone",
        data: {
            action: "notification",
            target_app: "home-screen",
            title: "Impound Release",
            body: "Vehicle has been released.",
            show_even_if_app_active: true
        }
    });

    return true;
}