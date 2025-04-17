import { GetModuleConfig } from "@shared/config";
import { FormatCurrency } from "@shared/utils/tools";
import { RegisterInteractionZone } from "../../interaction-zones";
import { isCop } from "../../job-listener";
import { GetPlayerJob, IsJobProgressionEnabled } from "../../npcs";
import { ShowConfirmation } from "client/lib/input";
import { GetImpoundRank, GetImpoundRankMultiplier, IsImpoundRank } from "./progression";
import { GetImpoundReason, GetImpoundReasons } from "./reasons";

export async function InitImpoundRecords(): Promise<void> {
    RegisterInteractionZone("ev-jobs:impound:records", "[E] Impound Records", 38, OpenImpoundRecords);
}

export function OpenImpoundRecords(): void {
    const policeManaged = GetModuleConfig("ev-jobs:impound", "policeManaged"); //GetModuleConfig
    const hasJob = GetPlayerJob() === "impound" || GetPlayerJob() === "pd_impound" || policeManaged && isCop;
    const menuData = [
        {
            key: "recent",
            title: "Recently Impounded",
            description: "List with the last 10 impounded vehicles.",
            action: "ev-jobs:menu:impound:lookup"
        },
        {
            key: "personal",
            title: "Personal Vehicles",
            description: "List of owned vehicles currently impounded..",
            action: "ev-jobs:menu:impound:lookup"
        },
        {
            key: "plate",
            title: "Browse by Plate",
            description: "Look up for vehicles by the license plate.",
            action: "ev-jobs:menu:impound:lookup"
        },
        {
            key: "owner",
            title: "Browse by Owner",
            description: "Look up for vehicles by the owner's State ID.",
            action: "ev-jobs:menu:impound:lookup"
        },
        {
            key: "help",
            title: "Request Help",
            description: "",
            action: "ev-jobs:menu:impound:requestHelp"
        }
    ];
    if (hasJob) menuData.pop();
    global.exports["ev-ui"].showContextMenu(menuData);
}

export async function ImpoundLookup(pType: string, pPlate: string | undefined, pStateId: number) {
    if (!pType) return; // || !pPlate || !pStateId
    const foundVehicles = await RPC.execute<ImpoundVehicleLookup[]>("ev-jobs:impound:lookup", pType, pPlate, pStateId);
    //const policeManaged = GetModuleConfig("ev-jobs:impound", "policeManaged");
    const policeManaged = false;
    const hasJob = GetPlayerJob() === "impound" || GetPlayerJob() === "pd_impound" || policeManaged && isCop;

    const mappedMenuData = foundVehicles.map((vehicle) => {
        const menuData = {
            title: `${vehicle.name} | ${vehicle.plate}`,
            description: `Impounded: ${new Date(vehicle.record.impoundDate * 1000).toLocaleString("en-US")}`,
            children: [
                {
                    title: "Vehicle Information",
                    description: `Plate: ${vehicle.plate} | VIN: ${vehicle.vin}`
                },
                {
                    title: "Impound Information",
                    description: `Reason: ${vehicle.reason.name} | Issuer ID: ${vehicle.issuer} |  Worker ID: ${vehicle.worker}`
                },
                {
                    title: "Retention Information",
                    description: `Strikes: ${vehicle.strikes} | Retained Until: ${new Date(vehicle.record.lockedUntil * 1000).toLocaleString("en-US")}`
                },
                {
                    title: "Release Fee",
                    description: `Total Cost: ${FormatCurrency(vehicle.fee)} | Tax: ${vehicle.tax}% | Paid: ${Boolean(vehicle.record.paid)} | Released: ${Boolean(vehicle.record.released)}`
                }
            ]
        } as any;

        if (hasJob) {
            const _0x18b5eb = false;
            const currentDate = new Date();
            const lockedUntil = new Date(vehicle.record.lockedUntil);
            let isVehicleLocked = true;
            vehicle.state === "seized" ? isVehicleLocked = lockedUntil.getTime() - currentDate.getTime() <= 0 : isVehicleLocked = lockedUntil.getTime() - currentDate.getTime() <= 0 || vehicle.reason.strikes > 0;
            //let enabled = !IsJobProgressionEnabled("impound") || IsImpoundRank("Apprentice");
            let enabled = true;
            if (policeManaged) enabled = isCop;
            if (!vehicle.record.paid) {
                menuData.children.push({
                    title: "Send Release Bill",
                    action: "ev-jobs:menu:impound:sendBill",
                    key: { vin: vehicle.vin, recordId: vehicle.record.id, fee: vehicle.fee },
                    disabled: !enabled || !isVehicleLocked
                });
            } else {
                if (vehicle.record.paid && !vehicle.record.released && !_0x18b5eb) {
                    menuData.children.push({
                        title: "Approve Vehicle Release",
                        action: "ev-jobs:menu:impound:releaseVehicle",
                        key: { vin: vehicle.vin, recordId: vehicle.record.id },
                        disabled: !enabled || !isVehicleLocked
                    });
                }
            }
        }

        const now = new Date(GetCloudTimeAsInt() * 1000);
        const lockedUntil = new Date(vehicle.record.lockedUntil * 1000);
        let isVehicleLocked = true;

        if (vehicle.state === "seized") isVehicleLocked = lockedUntil.getTime() - now.getTime() <= 0;
        else {
            isVehicleLocked = lockedUntil.getTime() - now.getTime() <= 0 || vehicle.reason.strikes > 0;
        }
        if (vehicle.state === "seized" && !isVehicleLocked) {
            menuData.children.push({
                title: "Vehicle is seized",
                description: "Your vehicle has been temporarily seized by hitting the strikes limit."
            });
        }
        const selfCheckout = GetModuleConfig("ev-jobs:impound", "selfcheckout");
        if (!selfCheckout) return menuData;
        menuData.children.push({
            title: "Retrieve Impounded Vehicle",
            description: `By self-retrieving the fee will be doubled to $${vehicle.fee * 2}`,
            action: isVehicleLocked ? "ev-jobs:menu:impound:selfCheckOut" : undefined,
            disabled: !isVehicleLocked,
            key: { vin: vehicle.vin, recordId: vehicle.record.id, paid: vehicle.record.paid, fee: vehicle.fee * 2 }
        })

        return menuData;
    });

    mappedMenuData.unshift({
        title: "Look Up Results",
        description: "Found " + mappedMenuData.length + " results.",
        children: []
    });

    mappedMenuData.unshift({
        title: "← Go Back",
        description: "",
        action: "ev-jobs:menu:impound:lookupBook",
        children: []
    });

    global.exports["ev-ui"].showContextMenu(mappedMenuData);
}

export async function OpenImpoundRequestMenu(pEntity: number, pReasons: string[]) {
    const netId = NetworkGetNetworkIdFromEntity(pEntity);
    const reasons = pReasons === undefined || pReasons?.length === 0 ? GetImpoundReasons() : GetImpoundReasons()?.filter((reason) => pReasons.some(pCode => reason.code === pCode));
    if (!reasons) return;

    const menuData: any = [];
    const isStolenVehicle = global.exports["ev-flags"].HasVehicleFlag(pEntity, "isStolenVehicle");
    reasons.forEach(reason => {
        const entries = {
            key: { netId: netId, reason: reason.code, type: "normal", retention: false },
            title: reason.name,
            description: reason.description,
            action: reason.felony || reason.strikes > 0 ? undefined : "ev-jobs:menu:impound:markForImpound",
            children: []
        } as any;
        if (reason.strikes > 0 || reason.felony) {
            entries.children.push({
                title: isStolenVehicle ? "Vehicle has signs of forced break in" : "Vehicle does not have signs of forced break in",
                description: isStolenVehicle ? "It looks like the vehicle was unlocked forcibly" : "The vehicle looks like it was entered normally",
                disabled: true,
            });
        }
        if (reason.strikes > 0 && reason.code !== "assetfees") {
            entries.children.push({
                title: "Owner was present/aware of the crime",
                description: "",
                action: "ev-jobs:menu:impound:markForStrike",
                key: { netId: netId, reason: reason.code, type: "present", retention: true, strikes: reason.strikes }
            });
            entries.children.push({
                title: "Vehicle was tampered with, Owner not present",
                description: "Only 1 strike point can be issued",
                action: "ev-jobs:menu:impound:markForStrike",
                key: { netId: netId, reason: reason.code, type: "not_present", retention: true, strikes: 1 }
            });
            entries.children.push({
                title: "Vehicle was not tampered with, Owner not present",
                description: "",
                action: "ev-jobs:menu:impound:markForStrike",
                key: { netId: netId, reason: reason.code, type: "not_present", retention: true, strikes: reason.strikes }
            });
        } else {
            if (reason.felony) {
                entries.children.push({
                    title: "Normal Impound",
                    description: "",
                    action: "ev-jobs:menu:impound:markForImpound",
                    key: { netId: netId, reason: reason.code, type: "normal", retention: false, strikes: reason.strikes }
                });
            }
        }
        menuData.push(entries);
    });

    global.exports["ev-ui"].showContextMenu(menuData);
}

//TODO: Not getting correct data maybe?

export async function OpenImpoundMenu(pEntity: number) {
    const netId = NetworkGetNetworkIdFromEntity(pEntity);
    const requestInfo = await RPC.execute<ImpoundRequestInfo>("ev-jobs:impound:fetchRequestInfo", netId);
    if (!requestInfo) return;
    const reason = GetImpoundReason(requestInfo.reason_id);
    if (!reason) return;
    const date = new Date();
    date.setHours(date.getHours() + requestInfo.retention);
    const retainedUntil = date.toLocaleString("en-US");
    const confirmed = await ShowConfirmation(reason.name, `Retained Until: ${retainedUntil}`);
    if (!confirmed) return;
    const rank = GetImpoundRank();
    const multiplier = GetImpoundRankMultiplier(rank);
    const result = await RPC.execute("ev-jobs:impound:completeImpound", netId, multiplier);
    emit("DoLongHudText", result ? "Vehicle was impounded." : "Unable to impound vehicle.", result ? 1 : 2);
}