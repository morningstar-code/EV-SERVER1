let CurrentTaskCode: string;
let CurrentObjectiveName: string;
let CurrentActivity: number;
let CurrentCallback: Function;

export async function InitChopEvents(): Promise<void> {
    global.exports["ev-interact"].AddPeekEntryByEntityType(2, [{
        id: "chopshop_chop_vehicle_cool", // chopshop_chop_vehicle
        label: "chop vehicle",
        icon: "boxes",
        event: "ev-jobs:chopshop:chopVehicle",
        parameters: {}
    }], {
        job: ["chopshop"],
        distance: { radius: 2.5 },
        isEnabled: () => CurrentObjectiveName === "chop_vehicle"
    });
}

onNet("ev-jobs:chopshop:activity", (pActivityId: number, pTaskCode: string, references: any[], objectives: any[], cb: Function) => {
    CurrentCallback = cb;
    CurrentActivity = pActivityId;
    CurrentTaskCode = pTaskCode;
    CurrentObjectiveName = objectives.find(objective => {
        return objective.data.status === "waiting";
    })?.id; //objectives.pop().id
    emit(`ev-jobs:chopshop:${CurrentTaskCode}`);
});

on("ev-jobs:chopshop:chopVehicle", (pArgs: any, pEntity: number) => {
    if (CurrentCallback === undefined) return;
    const targetVehicle = CurrentCallback("getReferenceData", "target_vehicle");
    const entity = NetworkGetEntityFromNetworkId(targetVehicle.data.netId);
    if (pEntity !== entity) return emit("DoLongHudText", "This is not the wanted vehicle!", 2);
    global.exports["ev-chopshop"].InteractiveChopping(entity);
});

on("ev-jobs:chopshop:leave_chop_area", () => {
    if (CurrentCallback === undefined) return;
    const targetDropOff = CurrentCallback("getReferenceData", "target_dropoff");
    const coords = targetDropOff.settings["vectors"];
    const pInterval = setInterval(() => {
        const playerCoords = GetEntityCoords(PlayerPedId(), false);
        const distance = GetDistanceBetweenCoords(coords.x, coords.y, coords.z, playerCoords[0], playerCoords[1], playerCoords[2], true);
        if (distance < 100) return;
        CurrentCallback("updateObjectiveData", "leave_chop_area", "count", 1); //leave_area
        CurrentCallback("updateObjectiveData", "leave_chop_area", "status", "completed"); //leave_area
        clearInterval(pInterval);
        CurrentCallback = undefined as any;
        CurrentActivity = undefined as any;
        CurrentTaskCode = undefined as any;
        CurrentObjectiveName = undefined as any;
    }, 1000);
});