import * as Controllers from './controllers';

const ResourceName = GetCurrentResourceName();

(async () => {
    on('onClientResourceStart', async (resource: string) => {
        if (resource !== ResourceName)
            return;

        console.log(`[${ResourceName}] Starting resource, initializing controllers...`);

        await Controllers.Init();
    });
})();