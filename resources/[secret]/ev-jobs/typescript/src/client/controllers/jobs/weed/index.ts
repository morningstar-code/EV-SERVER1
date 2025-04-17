import { InitWeedManager } from "./manager";

export async function InitWeed(): Promise<void> {
    await InitWeedManager();
}