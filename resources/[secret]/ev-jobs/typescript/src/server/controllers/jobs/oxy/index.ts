import { InitOxyEvents } from "./events";

export async function InitOxy(): Promise<void> {
    console.log("[JOBS] [OXY] Initializing...")
    await InitOxyEvents();
}