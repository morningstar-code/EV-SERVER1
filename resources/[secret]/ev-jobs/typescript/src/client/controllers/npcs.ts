let currentJob: any;

export function JobCheckIn(pJobId: string) {
    RPC.execute<any>("ev:jobs:checkIn", pJobId).then((state: any) => {
        if (!state) return;
        currentJob = state?.job?.id ?? "unemployed";
        emit("ev-jobs:jobChanged", currentJob);
        SendUIMessage({
            source: "ev-nui",
            app: "phone",
            data: {
                action: "jobs-update",
                state: state
            }
        });
        if (!state?.job) return;
        emit("ev-ui:jobs:sendNotification", "Job Center", `Checked In as a ${state.job.name}`, true);
    });
}
global.exports("JobCheckIn", JobCheckIn);
on("ev-jobs:signIn", (pData: { jobId: string }) => JobCheckIn(pData.jobId));

export function JobCheckOut() {
    RPC.execute<any>("ev:jobs:checkOut").then((state: any) => {
        currentJob = "unemployed";
        emit("ev-jobs:jobChanged", currentJob);
        SendUIMessage({
            source: "ev-nui",
            app: "phone",
            data: {
                action: "jobs-update",
                state: state
            }
        });
    });
}
global.exports("JobCheckOut", JobCheckOut);
on("ev-jobs:signOut", () => JobCheckOut());

export function GetPlayerJob() {
    return currentJob;
}
global.exports("GetPlayerJob", GetPlayerJob);

export function GetPayCheck(pJob: any) {
    RPC.execute("ev:jobs:getPayCheck", pJob);
}
global.exports("GetPayCheck", GetPayCheck);

export function IsJobProgressionEnabled(pJobId: string) {
    //TODO;
    return true;
}
global.exports("IsJobProgressionEnabled", IsJobProgressionEnabled);

export function GetJobProgression(pJobId: string): any {
    return global.exports["ev-progression"].GetProgression(`jobs:${pJobId}`) || 0;
}
global.exports("GetJobProgression", GetJobProgression);

export function InitNPCs(): void {
    RPC.execute<any>("ev:jobs:getNPCs").then((npcs: any) => {
        emit("ev:jobs:createNPCs", npcs);
    });
}

AddEventHandler("jobs:checkIn", (pArgs: any, pEntity: number, pContext: { job: { id: string } }) => {
    pEntity && pContext.job && JobCheckIn(pContext.job.id);
});

AddEventHandler("jobs:checkOut", (pArgs: any, pEntity: number, pContext: { job: { id: string } }) => {
    pEntity && pContext.job && JobCheckOut();
});

AddEventHandler("jobs:getPaycheck", (pArgs: any, pEntity: number, pContext: { job: { id: string } }) => {
    if (pEntity && pContext.job) {
        GetPayCheck(pContext.job);
    }
});

on("ev:vehicles:hasJobGarageAccess", (garageId: string, cb: Function) => {
    //cb(Object(_0x1bcb9b['a'])(currentJob, garageId));
});