import { Delay } from "@shared/utils/tools";
import { CombineNumbers, LoadAnimDict } from "client/utils/tools";

let CurrentCallback: Function;
let CurrentEntity: number | null;
let CurrentZone: string;
let CurrentObjectiveName: string;
let TrashBinCache: Set<number>;

onNet("ev-jobs:sanitationWorker:collect", (pActivityId: number, pTaskCode: string, references: any[], objectives: any[], cb: Function) => { //TODO; references & objectives types
    TrashBinCache = new Set();
    CurrentCallback = cb;
    CurrentZone = references.find((reference: any) => reference.type == "zone").settings.id;
    CurrentObjectiveName = objectives.find(objective => {
        return objective.data.status === "waiting" && objective.id.startsWith("collect_trash");
    })?.id; //objectives.pop().id
});

onNet("ev-jobs:sanitationWorker:pickupTrash", (pArgs: any, pEntity: number, pContext: PeekContext) => {
    if (!CurrentCallback) {
        emit("DoLongHudText", "You are not assigned to that job.", 3);
        return;
    }

    const entity = CombineNumbers(GetEntityModel(pEntity), GetEntityCoords(pEntity, false));
    const objective = CurrentCallback("getObjectiveData", CurrentObjectiveName);
    const playerCoords = GetEntityCoords(PlayerPedId(), false);

    if (!objective.data.entities) objective.data.entities = [];
    if (TrashBinCache.has(pEntity) || objective.data.entities.some((pObjectId: number) => pObjectId == entity)) {
        emit("DoLongHudText", "This is empty.", 3);
        return;
    }

    if (GetLabelText(GetNameOfZone(playerCoords[0], playerCoords[1], playerCoords[2])) != CurrentZone) {
        emit("DoLongHudText", "This isn't your assigned zone.", 3);
        return;
    }
    CarryTrashAnimation();
    TrashBinCache.add(pEntity);
    CurrentEntity = entity;
    objective.data.entities.push(CurrentEntity);
    CurrentCallback("updateObjectiveData", CurrentObjectiveName, "entities", objective.data.entities);
    emitNet("ev-gallery:generateGem", "trash");
});

onNet("ev-jobs:sanitationWorker:vehicleTrash", async (pArgs: any, pEntity: number, pContext: PeekContext) => {
    if (!CurrentCallback) {
        emit("DoLongHudText", "You are not assigned to that job.", 3);
        return;
    }
    if (CurrentEntity === null) {
        emit("DoLongHudText", "You might wanna get some trash...", 3);
        return;
    }
    const objective = CurrentCallback("getObjectiveData", CurrentObjectiveName);

    CurrentCallback("updateObjectiveData", CurrentObjectiveName, "count", objective.data.count = objective.data.count + 1);
    if (objective.data.count >= objective.settings.wanted) CurrentCallback("updateObjectiveData", CurrentObjectiveName, "status", "completed");
    CurrentEntity = null;
    ClearPedTasksImmediately(PlayerPedId());
    await Delay(1500);
    //global.exports["ev-sync"].SyncedExecution("SetVehicleDoorShut", pEntity, 5, false);
    SetVehicleDoorShut(pEntity, 5, false);
});

export function InitSanitationWorker(): void { }

async function CarryTrashAnimation() {
    const ped = PlayerPedId();
    const dict = "anim@heists@narcotics@trash";
    const anim = "walk";
    emit("attachItem", "trashbag");
    await LoadAnimDict(dict);
    while (CurrentEntity !== null) {
        if (!IsEntityPlayingAnim(ped, dict, anim, 3)) {
            TaskPlayAnim(ped, dict, anim, 8, 0, -1, 48, 0, false, false, false);
        }
        await Delay(10);
    }
    StopAnimTask(ped, dict, anim, 3);
    ThrowTrashAnimation();
}

async function ThrowTrashAnimation() {
    const ped = PlayerPedId();
    const dict = "anim@heists@narcotics@trash";
    const anim = "throw_b";
    const delay = 0x320;
    await LoadAnimDict(dict);
    !IsEntityPlayingAnim(ped, dict, anim, 3) && TaskPlayAnim(ped, dict, anim, 8, 0, delay, 48, 0, false, false, false);
    await Delay(delay);
    StopAnimTask(ped, dict, anim, 3);
    emit("destroyProp");
}