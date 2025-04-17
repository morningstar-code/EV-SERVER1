export async function InitWeedManager(idx = 0): Promise<any> {
    const location = await RPC.execute("ev-jobs:weed:getManagerLocation");
    if (location instanceof Array && idx < 5) {
        return setTimeout(() => InitWeedManager(++idx), 3000);
    }
    if (location instanceof Array) return;
    TriggerEvent("ev-jobs:weed:addManagerLocation", location);
}