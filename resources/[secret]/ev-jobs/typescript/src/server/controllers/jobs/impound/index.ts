import { InitImpoundEvents } from "./events";
import { InitImpoundReasons } from "./reasons";
import { InitImpoundRecords } from "./records";

export async function InitImpound(): Promise<void> {
    console.log("[JOBS] [IMPOUND] Initializing...")
    await InitImpoundEvents();
    await InitImpoundReasons();
    await InitImpoundRecords();
}