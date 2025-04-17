import * as Controllers from './controllers';
import { InitBinds } from './util/binds';

const ResourceName = GetCurrentResourceName();

on('onClientResourceStart', async (resource: string) => {
    if (resource !== ResourceName) return;
    setImmediate(async () => {
        await Controllers.Init();
        InitBinds();
    });
});