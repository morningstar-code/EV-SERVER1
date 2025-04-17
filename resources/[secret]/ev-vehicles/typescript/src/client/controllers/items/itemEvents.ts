const ItemCallbacks = new Map<string, Function>();

export async function InitItemEvents(): Promise<void> {};

export function RegisterItemCallback(pItem: string, pCallback: Function) {
    ItemCallbacks.set(pItem, pCallback);
}

onNet("RunUseItem", async (pItemId: string, pSlot: number, pInvName: string, pIsWeapon: boolean, pItemInfo: any[]) => {
    console.log("HELLO") 
    if (!ItemCallbacks.has(pItemId)) return;
    console.log("Got it")
    const pInfo = global.exports["ev-inventory"].GetItemInfo(pSlot);
    const cb = ItemCallbacks.get(pItemId);
    if (!cb) return;
    cb(pItemId, pSlot, pInvName, pInfo.quality, pIsWeapon, pItemInfo, pInfo);
});