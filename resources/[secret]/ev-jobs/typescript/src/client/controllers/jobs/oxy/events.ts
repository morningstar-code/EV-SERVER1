import { GetRandom2 } from "@shared/utils/tools";

let CurrentObjectiveName: string;
let CurrentTaskCode: string;
let CurrentActivity: number;
let CurrentCallback: Function;

export async function InitOxyEvents(): Promise<void> {
    global.exports["ev-interact"].AddPeekEntryByEntityType([2], [{
        id: "crime_oxy_handoff",
        label: "handoff package",
        icon: "hand-holding",
        event: "ev-jobs:crim:oxyrun:handoff",
        parameters: {}
    }], {
        job: ["darkmarket"],
        distance: { radius: 2.5 },
        isEnabled: () => {
            return CurrentTaskCode === "first_handoff_oxy" || CurrentTaskCode === "second_handoff_oxy";
        }
    });

    global.exports["ev-interact"].AddPeekEntryByFlag(["isNPC"], [{ //isNPC //isDarkmarket
        id: "crim_oxy_collect",
        label: "collect package",
        icon: "box",
        event: "ev-jobs:crim:oxyrun:collect",
        parameters: {}
    }], {
        job: ["darkmarket"],
        distance: { radius: 2.5 },
        isEnabled: () => {
            return CurrentTaskCode === "load_packages";
        }
    });

    //global.exports["ev-density"].RegisterDensityReason("darkmarketdeliveries", 10);
}

onNet("ev-jobs:crim:oxyrun", (pActivityId: number, pTaskCode: string, references: any[], objectives: any[], cb: Function) => {
    CurrentCallback = cb;
    CurrentTaskCode = pTaskCode;
    CurrentActivity = pActivityId;
    CurrentObjectiveName = objectives.find(objective => {
        return objective.data.status === "waiting"
    })?.id; //objectives.pop().id

    if (pTaskCode === "get_rid_of_vehicle") {
        emit("ev-jobs:crim:oxyrun:get_rid_of_vehicle")
    }
});

onNet("ev-jobs:crim:oxyrun:status", (pStatus: boolean) => {
    if (typeof pStatus !== "boolean") return;
    const density = pStatus ? 1 : -1;
    global.exports["ev-density"].ChangeDensity("darkmarketdeliveries", density);
    if (pStatus) return;
    CurrentCallback = undefined as any;
    CurrentActivity = undefined as any;
    CurrentObjectiveName = undefined as any;
});

onNet("ev-jobs:crim:oxyrun:collect", (pArgs: any, pEntity: number, pContext: PeekContext) => {
    if (CurrentTaskCode !== "load_packages") return;
    const hasEnough = global.exports["ev-inventory"].hasEnoughOfItem("darkmarketpackage", 1, false); //Idk?
    if (hasEnough) return;
    if (CurrentCallback === undefined) {
        return emit("DoLongHudText", "You are not assigned to that job.", 2);
    }
    const objective = CurrentCallback("getObjectiveData", CurrentObjectiveName);
    if (objective.data.count >= objective.settings.wanted) return;
    CurrentCallback("updateObjectiveData", CurrentObjectiveName, "count", objective.data.count = objective.data.count + 1);
    emitNet("ev-jobs:crim:run:collect", CurrentActivity);
    objective.data.count >= objective.settings.wanted && CurrentCallback("updateObjectiveData", CurrentObjectiveName, "status", "completed");
});

onNet("ev-jobs:crim:oxyrun:handoff", (pArgs: any, pEntity: number, pContext: PeekContext) => {
    if (CurrentCallback === undefined || CurrentTaskCode !== "first_handoff_oxy" && CurrentTaskCode !== "second_handoff_oxy") return emit("DoLongHudText", "You are not assigned to that job.", 2);
    const npcEntity = GetPedInVehicleSeat(pEntity, -1);
    if (npcEntity === 0) return;
    const hasEnough = global.exports["ev-inventory"].hasEnoughOfItem("darkmarketpackage", 1, false);
    if (!hasEnough) return emit("DoLongHudText", "You need the package.", 2);
    const vehicleNetId = NetworkGetNetworkIdFromEntity(pEntity);
    const npcNetId = NetworkGetNetworkIdFromEntity(npcEntity);
    const objective = CurrentCallback("getObjectiveData", CurrentObjectiveName);
    const validEntities = CurrentCallback("getReferenceData", "oxy_valid_entities");
    if (!objective.data.entities) objective.data.entities = [];
    if (objective.data.entities.some((entity: number) => entity == vehicleNetId)) return emit("DoLongHudText", "The customer already received the goods.", 3);
    else {
        if (!validEntities.data.valid.some((entity: number) => entity === vehicleNetId)) return emit("DoLongHudText", "This person is not a customer, stick to the list.", 2);
    }
    objective.data.entities.push(vehicleNetId);
    CurrentCallback("updateObjectiveData", CurrentObjectiveName, "entities", objective.data.entities);
    emitNet("ev-jobs:crim:oxyrun:handoff", CurrentActivity, CurrentObjectiveName, npcNetId, vehicleNetId); //Probs initiates another rpc handoff
    TriggerEvent("money:clean", 0.4);
    const hours = GetClockHours();
    const valid = hours > 19 || hours < 9;
    const chance = valid ? 98 : 96;
    GetRandom2(100) > chance && TriggerEvent("civilian:alertPolice", 8, "Suspicious", 0);
});

on("ev-jobs:crim:oxyrun:get_rid_of_vehicle", () => {
    if (CurrentCallback === undefined) return;
    const transportVehicle = CurrentCallback("getReferenceData", "transport_vehicle");
    const transportVehicleNetId = transportVehicle.data.netId;
    const vehicle = NetworkGetEntityFromNetworkId(transportVehicleNetId);
    if (vehicle === 0) return;
    const pInterval = setInterval(() => {
        const playerCoords = GetEntityCoords(PlayerPedId(), false);
        const coords = GetEntityCoords(vehicle, false);
        const distance = GetDistanceBetweenCoords(playerCoords[0], playerCoords[1], playerCoords[2], coords[0], coords[1], coords[2], true);
        if (distance < 500) return;
        CurrentCallback("updateObjectiveData", "get_rid_of_vehicle", "count", 1);
        CurrentCallback("updateObjectiveData", "get_rid_of_vehicle", "status", "completed");
        clearInterval(pInterval);
        DoesEntityExist(vehicle) && DeleteEntity(vehicle);
        CurrentCallback = undefined as any;
        CurrentActivity = undefined as any;
        CurrentTaskCode = undefined as any;
        CurrentObjectiveName = undefined as any;
    }, 1000);
});