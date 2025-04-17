import { InitOxyPeds } from "./peds";
import { InitOxyEvents } from "./events";

export async function InitOxy(): Promise<void> {
    await InitOxyPeds();
    await InitOxyEvents();
}