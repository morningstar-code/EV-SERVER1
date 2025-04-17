import { InitConfig, liftConfig } from "@shared/config";
import { InitEvents } from "./events";
import { InitZones } from "./lift_zones";
import { InitLiftModels } from "./lift_models";
import { InitLiftInteracts } from "./lift_interacts";

export const Init = async (): Promise<void> => {
    await InitConfig();
    await InitEvents();
    await InitZones();
    await InitLiftModels(liftConfig.liftModels);
    InitLiftInteracts();
}