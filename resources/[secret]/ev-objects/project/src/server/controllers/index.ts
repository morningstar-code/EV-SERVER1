import { InitConfig } from "@shared/config";

export const Init = async (): Promise<void> => {
    await InitConfig();
}