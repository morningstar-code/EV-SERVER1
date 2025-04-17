import { InitEvents } from "./events"

export const Init = async (): Promise<void> => {
    await InitEvents();
}