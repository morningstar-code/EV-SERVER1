import { InitBennyEvents } from "./events";

export async function InitBennys(): Promise<void> {
    await InitBennyEvents();
}