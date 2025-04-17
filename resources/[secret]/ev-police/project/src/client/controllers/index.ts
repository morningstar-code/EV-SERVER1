import { InitConfig } from "@shared/config";
import { InitEvents } from "./events";
import { InitItems } from "./items";
import { InitCells } from "./cells";
import { InitBarriers } from "./barriers";
import { InitSuspensions } from "./suspensions";
import { InitCuffs } from "./cuffs";
import { InitDrag } from "./drag";
import { InitDragVehicle } from "./dragVehicle";
import { InitMegaphone } from "./megaphone";
import { InitPanic } from "./panic";
import { InitTrunk } from "./trunk";
import { InitSeating } from "./seating";
import { InitFakeId } from "./fakeid";

export const Init = async (): Promise<void> => {
    await InitConfig();
    await InitEvents();
    InitItems();
    InitCells();
    InitBarriers();
    InitSuspensions();
    InitCuffs();
    InitDrag();
    InitDragVehicle();
    InitMegaphone();
    InitPanic();
    InitTrunk();
    InitSeating();
    await InitFakeId();
}