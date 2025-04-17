import { InitChopShopEvents } from "./events";

export async function InitChopShop(): Promise<void> {
    console.log("[JOBS] [CHOPSHOP] Initializing...")
    await InitChopShopEvents();
}