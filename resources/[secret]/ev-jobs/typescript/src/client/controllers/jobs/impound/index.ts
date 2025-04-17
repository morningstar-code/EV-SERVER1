import { InitImpoundEvents } from "./events";
import { InitImpoundRecords } from "./records";
import { InitImpoundZones } from "./zones";
import { InitImpoundReasons } from "./reasons";
import { InitImpoundUI } from "./ui";

export async function InitImpound(): Promise<void> {
    await InitImpoundEvents();
    await InitImpoundRecords();
    await InitImpoundZones();
    await InitImpoundReasons();
    await InitImpoundUI();
}