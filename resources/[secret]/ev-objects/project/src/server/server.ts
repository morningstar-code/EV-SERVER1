import * as Controllers from './controllers';

const ResourceName = GetCurrentResourceName();

on("onResourceStart", async (resource: string) => {
    if (resource !== ResourceName) return;
    setImmediate(async () => {
        await Controllers.Init();
    });
});