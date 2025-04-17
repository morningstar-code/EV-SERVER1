import { InitBennyInteracts } from "./interacts";
import { InitBennyCatalog } from "./catalog";
import { InitBennyZones } from "./zones";
import { InitBennyEvents } from "./events";
import { InitBennyLaptopShop } from "./laptop-shop";
import { GetBennyTask, HasBennyTask } from "./tasks";

export let CurrentTaskCode: string;
export let CurrentObjectiveName: string;
export let CurrentActivity: number;
export let CurrentCallback: Function;

export async function InitBennys(): Promise<void> {
    await InitBennyInteracts();
    await InitBennyCatalog();
    await InitBennyZones();
    await InitBennyEvents();
    await InitBennyLaptopShop();
}

onNet("ev-jobs:bennys:activity", (pActivityId: number, pTaskCode: string, references: any[], objectives: any[], cb: Function) => {
    const objective = objectives?.pop();
    CurrentCallback = cb;
    CurrentActivity = pActivityId;
    CurrentTaskCode = pTaskCode;
    CurrentObjectiveName = objective?.id;
    if (!HasBennyTask(pTaskCode)) return;
    const task = GetBennyTask(pTaskCode);
    if (!task) return;
    task(CurrentActivity, CurrentTaskCode, CurrentObjectiveName, CurrentCallback);
});