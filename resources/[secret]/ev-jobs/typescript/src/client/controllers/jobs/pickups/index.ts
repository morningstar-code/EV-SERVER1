import { InitPickup } from "./pickup";
import { InitPickupEvents } from "./events";

export async function InitPickups(): Promise<void> {
    await InitPickup();
    await InitPickupEvents();
}