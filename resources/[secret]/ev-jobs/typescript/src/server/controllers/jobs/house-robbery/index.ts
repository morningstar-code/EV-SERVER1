import { Thread } from "server/classes/thread";
import { readiedGroups } from "../npcs";
import { Helpers } from "server/helpers/utils";
import { activityData, startActivity } from "../../activity";
import { getRandomInArray } from "@shared/utils/tools";
import { groupsPool } from "../events";
import { getPlayerIdByCharacterId } from "server/helpers/tools";
import { activityIdMappedToTimeGiven } from "../threads";
import { Repository } from "server/controllers/database/repository";

export let Config: HouseRobberyConfig;

export async function InitHouseRobbery(): Promise<void> {
    console.log("[JOBS] [HOUSE ROBBERY] Initializing...");

    const config = global.exports["ev-housing"].getRobberyConfig();
    if (!config) return console.error("[JOBS] [HOUSE ROBBERY] Config not found");

    Config = config;

    const HouseRobberyActivityThread = new Thread(async function () { }, Config.secondsPerJobCreated * 1000, "tick"); //3 minutes

    HouseRobberyActivityThread.start();

    HouseRobberyActivityThread.addHook("active", function (this: Thread) {
        //TODO: Also need to check all active house robberies and if it exceeds Config.maxJobsAtAGivenTime, then don't start a new one
        const readiedUp = readiedGroups.get("house_robbery");
        if (readiedUp && readiedGroups.size > 0) {
            console.log("[JOBS] Pushing activity House Robbery");

            const activityId = Math.floor(Math.random() * 1000000);

            activityIdMappedToTimeGiven.set(activityId, Date.now());

            for (const groupId of readiedUp) {
                const [group, job] = Helpers.getGroupById(groupId);
                if (!job || !group) continue;

                const hasVpn = Repository.hasVpn(group.leader.id);
                if (!hasVpn) continue;

                const leaderSrc = getPlayerIdByCharacterId(group.leader.id);
                if (leaderSrc === -1) continue;

                emitNet("ev-ui:jobs:groupActivityOffer", leaderSrc, activityId, "House Robbery", group.id);
            }

            //TODO: Need to pick a location that is available and wasn't used in time of Config.reuseTime

            activityData.set(activityId, {});
        }
    });
}