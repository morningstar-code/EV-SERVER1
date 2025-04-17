import { Thread } from "server/classes/thread";
import { readiedGroups } from "./npcs";
import { Helpers } from "server/helpers/utils";
import { activityData, startActivity } from "../activity";
import { getRandomInArray } from "@shared/utils/tools";
import { Config } from "../config";
import { groupsPool } from "./events";
import { getPlayerIdByCharacterId } from "server/helpers/tools";
import { Repository } from "../database/repository";

//TODO: Activity expiry checker thread

export const ActivityCheckerThread = new Thread(async function () { }, 5000, "tick");

export const SanitationWorkerActivityThread = new Thread(async function () { }, 20000, "tick"); // 5 minutes //300000 //20000 //60000
export const StoreDeliveriesActivityThread = new Thread(async function () { }, 20000, "tick"); // 5 minutes //300000 //20000 //60000
export const FishingActivityThread = new Thread(async function () { }, 20000, "tick"); // 5 minutes //300000 //20000 //60000
export const ChopShopActivityThread = new Thread(async function () { }, 20000, "tick"); // 5 minutes //300000 //20000 //60000
export const DarkmarketActivityThread = new Thread(async function () { }, 20000, "tick"); // 5 minutes //300000 //20000 //60000

export async function InitThreads(): Promise<void> {
    console.log("[JOBS] Threads loaded");

    ActivityCheckerThread.start();

    SanitationWorkerActivityThread.start();
    StoreDeliveriesActivityThread.start();
    FishingActivityThread.start();
    ChopShopActivityThread.start();
    DarkmarketActivityThread.start();
}

//Save activity ids, so we can check what player accepted it first
//Key is the activity id, value is status (true = taken | false = not taken)
export const activityIdMappedToTimeGiven = new Map<number, number>();

const checkActivityAndPickGroup = (activityId: number) => {
    const notificationSentTime = activityIdMappedToTimeGiven.get(activityId) || 0;
    const currentTime = Date.now();

    if (currentTime - notificationSentTime >= 5000) {
        console.log(`[JOBS] Activity ${activityId} has been active for 10 seconds, picking a group`);
        // Pick a random group from the pool for the specific activity
        const groupIds = groupsPool.get(activityId) || [];
        const randomGroupId = groupIds[Math.floor(Math.random() * groupIds.length)];

        if (groupIds.length > 0 && randomGroupId) {
            console.log(`[JOBS] Picked group ${randomGroupId} for activity ${activityId}`);
            const [group, job_id] = Helpers.getGroupById(randomGroupId);
            if (!group || !job_id) return false;

            const readied = readiedGroups.get(job_id);
            if (!readied) return false;

            const index = readied.findIndex((g: number) => g === randomGroupId);
            if (index === -1) return false;

            readied.splice(index, 1);

            group.ready = false;

            // Helpers.updateGroupJobState(group.members, {
            //     group: group
            // });

            for (const member of group.members) {
                const memberSrc = getPlayerIdByCharacterId(member.id);
                if (memberSrc === -1) continue;
                emitNet("ev-ui:updateJobState", memberSrc, {
                    group: group
                });
            }

            for (const member of group.members) {
                const memberSrc = getPlayerIdByCharacterId(member.id);
                if (memberSrc === -1) continue;
                emitNet("ev-ui:jobs:pendingSelection", memberSrc, activityId, true);
            }

            console.log(`[JOBS] Starting activity ${activityId} for group ${randomGroupId}`);
            startActivity(activityId, randomGroupId);
        } else {
            console.log(`[JOBS] No group accepted activity ${activityId}`)
        }

        // Remove the activityId from activityIdMappedToTimeGiven after the group has been picked
        activityIdMappedToTimeGiven.delete(activityId);
        groupsPool.delete(activityId);
    }
};

ActivityCheckerThread.addHook("active", function (this: Thread) {
    if (activityIdMappedToTimeGiven.size === 0) return;

    for (const activityId of activityIdMappedToTimeGiven.keys()) {
        checkActivityAndPickGroup(activityId);
    }
});

SanitationWorkerActivityThread.addHook("active", function (this: Thread) {
    const readiedUp = readiedGroups.get("sanitation_worker");
    if (readiedUp && readiedUp.length > 0) {
        console.log("[JOBS] Pushing activity Sanitation Worker");
        const activityId = Math.floor(Math.random() * 1000000);
        for (const groupId of readiedUp) {
            const [group, job] = Helpers.getGroupById(groupId);
            if (!job || !group) continue;

            activityIdMappedToTimeGiven.set(activityId, Date.now());

            if (!Config.Jobs.sanitation_worker || !Config.Jobs.sanitation_worker.zones) return;

            const zone = getRandomInArray(Config.Jobs.sanitation_worker.zones);
            const zone2 = getRandomInArray(Config.Jobs.sanitation_worker.zones, zone);

            activityData.set(activityId, {
                type: "settings",
                references: [
                    {
                        key: "assignedZone1",
                        type: "id",
                        value: zone
                    },
                    {
                        key: "assignedZone2",
                        type: "id",
                        value: zone2
                    }
                ],
            });

            const leaderSrc = getPlayerIdByCharacterId(group.leader.id);
            if (leaderSrc === -1) continue;

            emitNet("ev-ui:jobs:groupActivityOffer", leaderSrc, activityId, "Sanitation Worker", group.id);
        }
    }
});

StoreDeliveriesActivityThread.addHook("active", function (this: Thread) {
    const readiedUp = readiedGroups.get("store_deliveries");
    if (readiedUp && readiedUp.length > 0) {
        console.log("[JOBS] Pushing activity Store Deliveries");
        const activityId = Math.floor(Math.random() * 1000000);
        for (const groupId of readiedUp) {
            const [group, job] = Helpers.getGroupById(groupId);
            if (!job || !group) continue;

            activityIdMappedToTimeGiven.set(activityId, Date.now());

            if (!Config.Jobs.store_deliveries || !Config.Jobs.store_deliveries.locations) return;

            const location = getRandomInArray(Config.Jobs.store_deliveries.locations);

            activityData.set(activityId, {
                type: "settings",
                references: [
                    {
                        key: "storeLocation",
                        type: "vectors",
                        value: location
                    }
                ],
            });

            const leaderSrc = getPlayerIdByCharacterId(group.leader.id);
            if (leaderSrc === -1) continue;

            emitNet("ev-ui:jobs:groupActivityOffer", leaderSrc, activityId, "24/7 Deliveries", group.id);
        }
    }
});

FishingActivityThread.addHook("active", function (this: Thread) {
    const readiedUp = readiedGroups.get("fishing");
    if (readiedUp && readiedUp.length > 0) {
        console.log("[JOBS] Pushing activity Fishing");
        const activityId = Math.floor(Math.random() * 1000000);
        for (const groupId of readiedUp) {
            const [group, job] = Helpers.getGroupById(groupId);
            if (!job || !group) continue;

            activityIdMappedToTimeGiven.set(activityId, Date.now());

            const location = global.exports["ev-fishing"].getActiveLocation();
            if (!location) return;

            activityData.set(activityId, {
                type: "settings",
                references: [
                    {
                        key: "fishingSpot",
                        type: "vectors",
                        value: location
                    }
                ],
            });

            const leaderSrc = getPlayerIdByCharacterId(group.leader.id);
            if (leaderSrc === -1) continue;

            emitNet("ev-ui:jobs:groupActivityOffer", leaderSrc, activityId, "Fishing", group.id);
        }
    }
});

ChopShopActivityThread.addHook("active", function (this: Thread) {
    const readiedUp = readiedGroups.get("chopshop");
    if (readiedUp && readiedUp.length > 0) {
        console.log("[JOBS] Pushing activity Chop Shop");
        const activityId = Math.floor(Math.random() * 1000000);
        for (const groupId of readiedUp) {
            const [group, job] = Helpers.getGroupById(groupId);
            if (!job || !group) continue;

            activityIdMappedToTimeGiven.set(activityId, Date.now());

            if (!Config.Jobs.chopshop || !Config.Jobs.chopshop.dropOffLocations || !Config.Jobs.chopshop.vehicleLocations || !Config.Jobs.chopshop.vehicles) return;

            const dropOffLocation = getRandomInArray(Config.Jobs.chopshop.dropOffLocations) as Vector3;
            const vehicleLocation = getRandomInArray(Config.Jobs.chopshop.vehicleLocations) as Vector4;
            const vehicleModel = getRandomInArray(Config.Jobs.chopshop.vehicles) as string;

            activityData.set(activityId, {
                type: "settings",
                references: [
                    {
                        key: "target_dropoff",
                        type: "vectors",
                        value: dropOffLocation
                    },
                    {
                        key: "target_pickup",
                        type: "vectors",
                        value: { x: vehicleLocation.x, y: vehicleLocation.y, z: vehicleLocation.z }
                    },
                    {
                        key: "target_pickup",
                        type: "heading",
                        value: vehicleLocation.h
                    },
                    {
                        key: "target_vehicle",
                        type: "model",
                        value: vehicleModel
                    }
                ],
            });

            const leaderSrc = getPlayerIdByCharacterId(group.leader.id);
            if (leaderSrc === -1) continue;

            emitNet("ev-ui:jobs:groupActivityOffer", leaderSrc, activityId, "Chop Wanted Vehicle", group.id);
        }
    }
});

DarkmarketActivityThread.addHook("active", async function (this: Thread) {
    const readiedUp = readiedGroups.get("darkmarket");
    if (readiedUp && readiedUp.length > 0) {
        console.log("[JOBS] Pushing activity Darkmarket");
        const activityId = Math.floor(Math.random() * 1000000);
        for (const groupId of readiedUp) {
            const [group, job] = Helpers.getGroupById(groupId);
            if (!job || !group) continue;

            const [hasItem, message] = await Repository.hasItem(group.leader.id, "darkmarketdeliveries", true);
            if (!hasItem) continue;

            //TODO: Fix quality check

            activityIdMappedToTimeGiven.set(activityId, Date.now());

            if (!Config.Jobs.darkmarket || !Config.Jobs.darkmarket.locations) return;

            const pickupLocation = await global.exports["ev-npcs"].getNpcLocationById("darkmarket_goods");
            if (!pickupLocation) return;

            const handOffLocation1 = getRandomInArray(Config.Jobs.darkmarket.locations) as Vector3;
            const handOffLocation2 = getRandomInArray(Config.Jobs.darkmarket.locations, handOffLocation1) as Vector3;

            activityData.set(activityId, {
                type: "settings",
                references: [
                    {
                        key: "pick_up_goods_location",
                        type: "vectors",
                        value: pickupLocation
                    },
                    {
                        key: "first_handoff_location",
                        type: "vectors",
                        value: handOffLocation1
                    },
                    {
                        key: "second_handoff_location",
                        type: "vectors",
                        value: handOffLocation2
                    }
                ],
            });

            const leaderSrc = getPlayerIdByCharacterId(group.leader.id);
            if (leaderSrc === -1) continue;

            emitNet("ev-ui:jobs:groupActivityOffer", leaderSrc, activityId, "Dark Market Transports", group.id);
        }
    }
});