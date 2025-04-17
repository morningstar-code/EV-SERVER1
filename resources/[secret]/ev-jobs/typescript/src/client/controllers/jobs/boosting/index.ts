import { InitBoostingEvents } from "./events";

export async function InitBoosting(): Promise<void> {
    await InitBoostingEvents();
}