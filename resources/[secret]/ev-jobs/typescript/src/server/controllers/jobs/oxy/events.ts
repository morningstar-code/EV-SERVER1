import { Base } from "@cpx/server";
import { Delay, getRandom } from "@shared/utils/tools";
import { objectiveCompleted, updateData, updateObjectiveData } from "server/controllers/activity";
import { Helpers } from "server/helpers/utils";

export async function InitOxyEvents(): Promise<void> { };

onNet("ev-vehicles:vehicleHotwired", (pNetId: number) => {
    const pSource = source;
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const [group, isLeader] = Helpers.getGroupByCharacterId(user.character.id);
    if (!group) return;

    const [_, jobId] = Helpers.getGroupById(group.id);
    if (jobId !== "darkmarket") return;

    const currentObjective = group.activity?.objectives?.find((objective) => {
        return objective?.value?.data?.status === "waiting";
    });
    if (!currentObjective) return;
    if (currentObjective.key !== "find_vehicle") return;

    if (group.activity?.id === undefined) return;

    const foundReference = group.activity?.references?.find((reference) => {
        return reference?.key === "transport_vehicle"
    });
    if (!foundReference) return;

    updateData(pSource, group.activity.id, "transport_vehicle", "netId", pNetId);

    objectiveCompleted(pSource, group.activity.id, currentObjective.key, currentObjective.key);
});

on("ev:server:objectiveCompleted", async (pSource: number, pTaskCode: string, pObjectiveId: string, pActivityId: number) => {
    //We need to initiate findHandOffCandidate when they finish either drive_to_handoff_location_with_transport_vehicle_1 or drive_to_handoff_location_with_transport_vehicle_2
    if (pTaskCode !== "drive_to_handoff_location_with_transport_vehicle_1" && pTaskCode !== "drive_to_handoff_location_with_transport_vehicle_2") return;

    console.log("[JOBS] [OXY] Objective completed [drive_to_handoff_location_with_transport_vehicle_1 || drive_to_handoff_location_with_transport_vehicle_2]");

    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const [group, isLeader] = Helpers.getGroupByCharacterId(user.character.id);
    if (!group) return;

    if (group.activity?.id === undefined) return;
    if (group.activity.id !== pActivityId) return;

    //Need to make sure this hasnt been completed already

    console.log("[JOBS] [OXY] Finding handoff candidate...");

    const entities = group.activity?.references?.find((reference) => {
        return reference?.key === "oxy_valid_entities"
    });
    if (!entities) return;

    console.log("Im gay now")

    let handOffCandidate = await RPC.execute<{ vehicle: number, driver: number }>("ev-jobs:findHandOffCandidate", pSource, entities.value.data.valid);
    if (!handOffCandidate) return;

    while (handOffCandidate.driver === null || handOffCandidate.vehicle === null) {
        handOffCandidate = await RPC.execute<{ vehicle: number, driver: number }>("ev-jobs:findHandOffCandidate", pSource, entities.value.data.valid);
        await Delay(1);
    }

    while (entities.value.data.valid.includes(handOffCandidate.vehicle)) {
        handOffCandidate = await RPC.execute<{ vehicle: number, driver: number }>("ev-jobs:findHandOffCandidate", pSource, entities.value.data.valid);
        await Delay(1);
    }

    console.log("found valid candidate", JSON.stringify(handOffCandidate))

    if (pTaskCode === "drive_to_handoff_location_with_transport_vehicle_1") {
        const handoffReference = group.activity?.references?.find((reference) => {
            return reference?.key === "first_handoff_location"
        });
        if (!handoffReference) return;
        if (!handoffReference.value) return;
        if (!handoffReference.value.settings) return;
        if (!handoffReference.value.settings.vectors) return;

        const vectors = handoffReference.value.settings.vectors;

        RPC.execute("TaskVehicleDriveToCoord", pSource, handOffCandidate.driver, handOffCandidate.vehicle, vectors);
        //TaskVehicleDriveToCoord(handOffCandidate.driver, handOffCandidate.vehicle, vectors.x, vectors.y, vectors.z, 16, 1, 0, 786603, 15.0, 1);
    } else {
        const handoffReference = group.activity?.references?.find((reference) => {
            return reference?.key === "second_handoff_location"
        });
        if (!handoffReference) return;
        if (!handoffReference.value) return;
        if (!handoffReference.value.settings) return;
        if (!handoffReference.value.settings.vectors) return;

        const vectors = handoffReference.value.settings.vectors;

        RPC.execute("TaskVehicleDriveToCoord", pSource, handOffCandidate.driver, handOffCandidate.vehicle, vectors);
        //TaskVehicleDriveToCoord(handOffCandidate.driver, handOffCandidate.vehicle, vectors.x, vectors.y, vectors.z, 16, 1, 0, 786603, 15.0, 1);
    }

    const entitiesReference = group.activity?.references?.find((reference) => {
        return reference?.key === "oxy_valid_entities"
    });
    if (!entitiesReference) return;

    const validEntities = entitiesReference?.value?.data?.valid;
    if (!Array.isArray(validEntities)) return;

    if (validEntities.length > 0) {
        validEntities.push(handOffCandidate.vehicle);
        updateData(pSource, pActivityId, "oxy_valid_entities", "valid", validEntities);
    } else {
        updateData(pSource, pActivityId, "oxy_valid_entities", "valid", [handOffCandidate.vehicle]);
    }
});

onNet("ev-jobs:crim:run:collect", (pActivityId: number) => {
    const pSource = source;

    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const [group, isLeader] = Helpers.getGroupByCharacterId(user.character.id);
    if (!group) return;

    if (group.activity?.id === undefined) return;
    if (group.activity.id !== pActivityId) return;

    emitNet("player:receiveItem", pSource, "darkmarketpackage", 1);
});

onNet("ev-jobs:crim:oxyrun:handoff", async (pActivityId: number, pObjectiveId: string, pNpcNetId: number, pVehicleNetId: number) => {
    const pSource = source;

    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const [group, isLeader] = Helpers.getGroupByCharacterId(user.character.id);
    if (!group) return;

    if (group.activity?.id === undefined) return;
    if (group.activity.id !== pActivityId) return;

    emitNet("inventory:removeItem", pSource, "darkmarketpackage", 1);

    const currentObjective = group.activity?.objectives?.find((objective) => {
        return objective?.key === pObjectiveId;
    });
    if (!currentObjective) return;
    if (!currentObjective?.value) return;
    if (!currentObjective?.value?.data) return;
    if (currentObjective?.value?.data?.count === undefined) return;

    const count = currentObjective.value.data.count + 1;

    updateObjectiveData(pSource, pActivityId, pObjectiveId, pObjectiveId, "count", count);

    emitNet("player:receiveItem", pSource, "oxy", getRandom(1, 3));

    emitNet("money:clean", pSource); 

    //TODO: dongle, also maybe other gne sticks but lower chance
    if (Math.random() < 0.05) {
        emitNet("player:receiveItem", pSource, "cryptostick4", 1);
    }
    
    //global.exports["ev-heists"].generateSafeCrackingTool(pSource);

    //console.log("pNpcNetId", pNpcNetId)
    //console.log("pVehicleNetId", pVehicleNetId)

    RPC.execute("TaskVehicleDriveWander", pSource, pNpcNetId, pVehicleNetId);
  
    if (count >= currentObjective?.value?.settings?.wanted) {
        return;
    }

    const entities = group.activity?.references?.find((reference) => {
        return reference?.key === "oxy_valid_entities"
    });
    if (!entities) return;

    let handOffCandidate = await RPC.execute<{ vehicle: number, driver: number }>("ev-jobs:findHandOffCandidate", pSource, entities.value.data.valid);
    if (!handOffCandidate) return;

    while (handOffCandidate.driver === null || handOffCandidate.vehicle === null) {
        handOffCandidate = await RPC.execute<{ vehicle: number, driver: number }>("ev-jobs:findHandOffCandidate", pSource, entities.value.data.valid);
        await Delay(1);
    }

    while (entities.value.data.valid.includes(handOffCandidate.vehicle)) {
        handOffCandidate = await RPC.execute<{ vehicle: number, driver: number }>("ev-jobs:findHandOffCandidate", pSource, entities.value.data.valid);
        await Delay(1);
    }

    if (pObjectiveId === "first_handoff_oxy") {
        const handoffReference = group.activity?.references?.find((reference) => {
            return reference?.key === "first_handoff_location"
        });
        if (!handoffReference) return;
        if (!handoffReference.value) return;
        if (!handoffReference.value.settings) return;
        if (!handoffReference.value.settings.vectors) return;

        const vectors = handoffReference.value.settings.vectors;

        RPC.execute("TaskVehicleDriveToCoord", pSource, handOffCandidate.driver, handOffCandidate.vehicle, vectors);
        //TaskVehicleDriveToCoord(handOffCandidate.driver, handOffCandidate.vehicle, vectors.x, vectors.y, vectors.z, 16, 1, 0, 786603, 15.0, 1);
    } else {
        const handoffReference = group.activity?.references?.find((reference) => {
            return reference?.key === "second_handoff_location"
        });
        if (!handoffReference) return;
        if (!handoffReference.value) return;
        if (!handoffReference.value.settings) return;
        if (!handoffReference.value.settings.vectors) return;

        const vectors = handoffReference.value.settings.vectors;

        RPC.execute("TaskVehicleDriveToCoord", pSource, handOffCandidate.driver, handOffCandidate.vehicle, vectors);
        //TaskVehicleDriveToCoord(handOffCandidate.driver, handOffCandidate.vehicle, vectors.x, vectors.y, vectors.z, 16, 1, 0, 786603, 15.0, 1);
    }

    const reference = group.activity?.references?.find((reference) => {
        return reference?.key === "oxy_valid_entities"
    });
    if (!reference) return;

    const validEntities = reference?.value?.data?.valid;
    if (!Array.isArray(validEntities)) return;

    if (validEntities.length > 0) {
        validEntities.push(handOffCandidate.vehicle);
        updateData(pSource, pActivityId, "oxy_valid_entities", "valid", validEntities);
    } else {
        updateData(pSource, pActivityId, "oxy_valid_entities", "valid", [handOffCandidate.vehicle]);
    }
});