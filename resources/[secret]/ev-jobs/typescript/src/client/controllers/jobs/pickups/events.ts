import { GetPickupBlip, HasPickupBlip } from "./pickup";

const blips = new Map<string, number>();

export async function InitPickupEvents(): Promise<void> { }

onNet("ev-jobs:shop:markCollectLocation", (location: string) => {
    if (!HasPickupBlip(location)) return;
    const coords = GetPickupBlip(location);
    if (!coords) return;
    const loc = blips.get(location);
    if (!loc) return;
    if (blips.has(location)) RemoveBlip(loc);
    const blip = AddBlipForCoord(coords.x, coords.y, coords.z);
    SetBlipSprite(blip, 0x1b8);
    SetBlipScale(blip, 1.2);
    SetBlipColour(blip, 5);
    SetBlipAsShortRange(blip, true);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("Item Pickup");
    EndTextCommandSetBlipName(blip);
    blips.set(location, blip);
});

on("ev-polyzone:enter", (pZone: string, pData: any) => {
    if (!HasPickupBlip(pZone)) return;
    RPC.execute("ev-jobs:shop:collectItems", pZone);
});

on("ev-polyzone:exit", (pZone: string) => {
    if (!HasPickupBlip(pZone)) return;
    const blip = blips.get(pZone);
    if (blip === undefined) return;
    RemoveBlip(blip);
});