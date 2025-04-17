import { InitImpound } from "./impound";
import { InitBennys } from "./bennys";
import { InitChopShop } from "./chop-shop";
import { InitOxy } from "./oxy";

export async function InitJobs(): Promise<void> {
    await InitImpound();
    await InitBennys();
    await InitChopShop();
    await InitOxy();
}