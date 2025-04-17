import { Base, Procedures } from "@cpx/server";
import { getRandom, getRandomInArray } from "@shared/utils/tools";
import { objectiveCompleted, updateObjectiveData } from "server/controllers/activity";
import { Config } from "server/controllers/config";
import { Helpers } from "server/helpers/utils";

export async function InitChopShopEvents(): Promise<void> {
    console.log("[JOBS] [CHOPSHOP] Initializing events...");
}

RPC.register("ev-jobs:chopshop:chopVehicle", (pSource: number, pVehicleModel: number, pBoneType: string) => { // pListId: any, 
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const [group, isLeader] = Helpers.getGroupByCharacterId(user.character.id);
    if (!group) return;

    const [_, jobId] = Helpers.getGroupById(group.id);
    if (jobId !== "chopshop") return;

    const currentObjective = group.activity?.objectives?.find((objective) => {
        return objective?.value?.data?.status === "waiting";
    });
    if (!currentObjective) return;
    if (currentObjective.key !== "chop_vehicle") return;

    if (group.activity?.id === undefined) return;

    if (!Config.Jobs.chopshop || !Config.Jobs.chopshop.dropRateConfig) return;

    const dropRateConfig = Config.Jobs.chopshop.dropRateConfig;

    let item = "recyclablematerial";
    let randomNumber = 0;
    let randomNumer2 = 0;

    //TODO; Make it based off of the vehicle class (how many materials it gives)
    //The bigger the vehicle, the more materials it gives
    //Make it based off of vehicle class
    switch (pBoneType) {
        case "door":
            randomNumber = getRandom(dropRateConfig.door.min, dropRateConfig.door.max);
            randomNumer2 = getRandom(dropRateConfig.door.min, dropRateConfig.door.max);
            break;
        case "tyre":
            randomNumber = getRandom(dropRateConfig.tyre.min, dropRateConfig.tyre.max);
            randomNumer2 = getRandom(dropRateConfig.tyre.min, dropRateConfig.tyre.max);
            break;
        case "remains":
            item = "rollcash";
            randomNumber = getRandom(dropRateConfig.remains.min, dropRateConfig.remains.max);
            updateObjectiveData(pSource, group.activity.id, currentObjective.key, currentObjective.key, "count", 1);
            break;
    }

    if (randomNumber === 0) return;

    if (pBoneType !== "remains") {
        emitNet("player:receiveItem", pSource, item, randomNumber);
        emitNet("player:receiveItem", pSource, item, randomNumer2);
    } else {
        emitNet("player:receiveItem", pSource, item, randomNumber);
        const items = ["turbotempkit", "enginetempkit", "transmissiontempkit"];
        const randomItem = getRandomInArray(items);
        emitNet("player:receiveItem", pSource, randomItem, 1);
    }
});

onNet("ev-vehicles:vehicleHotwired", (pNetId: number) => {
    const pSource = source;
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const [group, isLeader] = Helpers.getGroupByCharacterId(user.character.id);
    if (!group) return;

    const [_, jobId] = Helpers.getGroupById(group.id);
    if (jobId !== "chopshop") return;

    const foundReference = group.activity?.references?.find((reference) => {
        return reference?.key === "target_vehicle"
    });
    if (!foundReference) return;

    if (foundReference.value.data?.netId !== Number(pNetId)) return;

    const currentObjective = group.activity?.objectives?.find((objective) => {
        return objective?.value?.data?.status === "waiting";
    });
    if (!currentObjective) return;
    if (currentObjective.key !== "find_and_steal_the_wanted_vehicle") return;

    if (group.activity?.id === undefined) return;

    objectiveCompleted(pSource, group.activity.id, currentObjective.key, currentObjective.key);
});

onNet("ev:jobs:vehicleSpawned", (pActivityId: number, pObjectiveId: string, pNetId: number) => {
    const pSource = source;
    if (pObjectiveId !== "spawn_chop_vehicle") return;
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const [group, isLeader] = Helpers.getGroupByCharacterId(user.character.id);
    if (!group) return;

    if (group.activity?.id === undefined) return;
    if (group.activity?.id !== pActivityId) return;

    const vin = global.exports["ev-vehicles"].GetVehicleIdentifier(pNetId);
    if (!vin) return;

    emitNet("ev:vehicles:removeKey", pSource, vin);
});