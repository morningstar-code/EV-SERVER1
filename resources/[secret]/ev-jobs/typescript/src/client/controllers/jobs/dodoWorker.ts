import { GetDistance } from "@shared/utils/tools";

let CurrentCallback: Function;
let CurrentObjectiveName: string;
let CurrentReferences: any;
let CurrentBlip: number;
let CurrentActivity: number;

onNet("ev-jobs:dodo:deliver", (pActivityId: number, pTaskCode: string, references: any[], objectives: any[], cb: Function) => {
    CurrentCallback = cb;
    CurrentActivity = pActivityId;
    CurrentReferences = references;
    CurrentObjectiveName = objectives.pop().id;
    if (CurrentReferences === undefined) return;
    const blip = CurrentReferences.find((reference: any) => reference.type === "vectors");
    if (blip === undefined) return;
    CurrentBlip = AddBlipForCoord(blip.settings.vectors.x, blip.settings.vectors.y, blip.settings.vectors.z);
});

onNet("ev-jobs:dodo:deliver:completed", () => {
    CurrentObjectiveName = undefined as any;
    CurrentCallback = undefined as any;
    CurrentActivity = undefined as any;
    if (CurrentBlip) RemoveBlip(CurrentBlip);
    emit("ev-jobs:dodo:canDropGoods", false);
    emit("animation:carry", "none");
});

onNet("ev-jobs:dodo:takeGoods", (pArgs: any, pEntity: number) => {
    if (CurrentCallback === undefined) {
        return emit("DoLongHudText", "I cannot take packages right now.", 2);
    }
    const objective = CurrentCallback("getObjectiveData", CurrentObjectiveName);
    const vehicle = CurrentReferences.find((reference: any) => reference.id === "cargo_vehicle");
    const entity = NetworkGetEntityFromNetworkId(vehicle.data.netId);
    if (pEntity !== entity) return emit("DoLongHudText", "This is not my delivery truck.", 2);
    if (objective.data.status === "completed" || objective.data.count >= objective.settings.wanted) {
        return emit("DoLongHudText", "Already dropped off all the packages from this customer.");
    }
    emit("ev-jobs:dodo:canDropGoods", true);
    emit("ev-dodo:client:holdRandomBox");
});

onNet("ev-jobs:dodo:dropGoods", () => {
    const objective = CurrentCallback("getObjectiveData", CurrentObjectiveName);
    const blip = CurrentReferences.find((reference: any) => reference.type === "vectors");
    const playerCoords = GetEntityCoords(PlayerPedId(), false);
    const blipCoords = blip ? [blip.settings.vectors.x, blip.settings.vectors.y, blip.settings.vectors.z] : undefined as any;
    if (blip && GetDistance(blipCoords, playerCoords) > 5) return emit("DoLongHudText", "Get closer to the drop off location", 2);
    emitNet("ev-dodo:server:dropGoods");
    CurrentCallback("updateObjectiveData", CurrentObjectiveName, "count", objective.data.count = objective.data.count + 1);
    emitNet("ev-dodo:server:packagedDelivered", CurrentActivity, 1);
    if (objective.data.count >= objective.settings.wanted) {
        CurrentCallback("updateObjectiveData", CurrentObjectiveName, "status", "completed");
    }
    emit("ev-jobs:dodo:canDropGoods", false);
    emit("animation:carry", "none");
});

export function InitDodoWorker(): void { }