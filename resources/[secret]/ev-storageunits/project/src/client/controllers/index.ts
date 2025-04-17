import { InitConfig } from "@shared/config";
import { InitUnits } from "./units";

export const Init = async (): Promise<void> => {
    await InitConfig();
    await InitUnits();
};