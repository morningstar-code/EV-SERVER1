import { InitConfig } from "@shared/config";
import { Delay } from "@shared/utils/tools";

export const Init = async (): Promise<void> => {
    await Delay(5000);
    await RPC.execute("ev-objects:SeedObjects");
    await InitConfig();
}