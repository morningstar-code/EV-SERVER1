import { Repository } from "./database/repository";
import { InitJobConfig } from "./config";
import { InitConfig } from "@shared/config";
import { InitEvents } from "./jobs/events";
import { InitNPCs } from "./jobs/npcs";
import { InitActivity } from "./activity";
import { InitJobs } from "./jobs";
import { InitThreads } from "./jobs/threads";

export const Init = async (): Promise<void> => {
    await Repository.seedJobs();
    await InitJobConfig();
    await InitConfig();
    await InitEvents();
    await InitNPCs();
    await InitActivity();
    await InitJobs();
    await InitThreads();
}