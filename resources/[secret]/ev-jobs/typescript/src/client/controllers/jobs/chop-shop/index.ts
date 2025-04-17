import { InitChopEvents } from "./events";

export async function InitChopShop(): Promise<void> {
    await InitChopEvents();
}