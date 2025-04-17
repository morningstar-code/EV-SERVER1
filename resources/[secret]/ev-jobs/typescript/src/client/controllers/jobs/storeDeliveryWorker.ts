let CurrentCallback: Function;
let CurrentObjectiveName: string;

onNet("ev-jobs:247delivery:deliver", (pActivityId: number, pTaskCode: string, references: any[], objectives: any[], cb: Function) => {
    CurrentCallback = cb;
    CurrentObjectiveName = objectives.find(objective => {
        return objective.id === "drop_off_goods" //pTaskCode
    })?.id; //objectives.pop().id
});

onNet("ev-jobs:247delivery:takeGoods", () => {
    emit("attach:box");
});

onNet("ev-jobs:247delivery:dropGoods", () => {
    const objective = CurrentCallback("getObjectiveData", CurrentObjectiveName);

    CurrentCallback("updateObjectiveData", CurrentObjectiveName, "count", objective.data.count = objective.data.count + 1);
    if (objective.data.count >= objective.settings.wanted) CurrentCallback("updateObjectiveData", CurrentObjectiveName, "status", "completed");
    emit("animation:carry", "none");
});

export function InitStoreDeliveryWorker(): void { }