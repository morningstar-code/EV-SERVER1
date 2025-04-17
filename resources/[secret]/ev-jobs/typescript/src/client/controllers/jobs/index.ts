import { InitSanitationWorker } from "./sanitationWorker";
import { InitDodoWorker } from "./dodoWorker";
import { InitStoreDeliveryWorker } from "./storeDeliveryWorker";
import { InitImpound } from "./impound";
import { InitOxy } from "./oxy";
import { InitBoosting } from "./boosting";
import { InitChopShop } from "./chop-shop";
import { InitBennys } from "./bennys";
import { InitWeed } from "./weed";
import { InitPickups } from "./pickups";

export async function InitJobs(): Promise<void> {
    InitSanitationWorker();
    InitDodoWorker();
    InitStoreDeliveryWorker();
    await InitImpound();
    await InitOxy();
    await InitBoosting();
    await InitChopShop();
    await InitBennys();
    await InitWeed();
    await InitPickups();
}