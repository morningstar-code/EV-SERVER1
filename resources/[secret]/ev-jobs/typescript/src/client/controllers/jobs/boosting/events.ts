let CurrentTaskCode: string;
let CurrentObjectiveName: string;
let CurrentActivity: number;
let CurrentCallback: Function;

export async function InitBoostingEvents(): Promise<void> { }

onNet("ev-jobs:boosting:activity", (pActivityId: number, pTaskCode: string, references: any[], objectives: any[], cb: Function) => {
    const objective = objectives?.pop();
    CurrentCallback = cb;
    CurrentActivity = pActivityId;
    CurrentTaskCode = pTaskCode;
    CurrentObjectiveName = objective?.id;
});

onNet("ev-boosting:client:startContract", (pData: any) => {
    RPC.execute("ev-jobs:boosting:startContract", pData);
});

onNet("ev-boosting:client:contractCompleted", () => {
    RPC.execute("ev-jobs:boosting:completeContract", CurrentActivity);
});

onNet("ev-boosting:client:contractedVehicleLockpicked", (pVehicle: number) => {
    RPC.execute("ev-jobs:boosting:vehicleLockpicked", CurrentActivity, pVehicle);
});

onNet("ev-boosting:client:trackerHackCompleted", () => {
    RPC.execute("ev-jobs:boosting:hackingStage", CurrentActivity, undefined, true);
});

onNet("ev-boosting:client:trackerHackProgress", (pStage: number) => {
    RPC.execute("ev-jobs:boosting:hackingStage", CurrentActivity, pStage);
});

onNet("ev-boosting:client:vehicleOnlineWipeComplete", (pResult: boolean) => {
    RPC.execute("ev-jobs:boosting:vehicleOnlineWipeComplete", CurrentActivity, pResult);
});

onNet("ev-boosting:client:vehiclePhysicalScratchComplete", (pResult: boolean) => {
    RPC.execute("ev-jobs:boosting:vehiclePhysicalScratchComplete", CurrentActivity, pResult);
});