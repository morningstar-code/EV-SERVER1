const useRaidReceipt = (pData: { pExtraInfo: string }) => {
    const parsedInfo = JSON.parse(pData.pExtraInfo);
    if (!parsedInfo) return;
    return emit('ev-police:client:showTextPopup', {
        show: true,
        text: parsedInfo.info
    });
};

const ItemCallbacks = new Map();

export async function InitItems(): Promise<void> {
    RegisterItemCallback('raidreceipt', useRaidReceipt);
}

export function RegisterItemCallback(pItem: string, pCallback: Function) {
    ItemCallbacks.set(pItem, pCallback);
}

onNet('RunUseItem', async (pItemId: string, pSlot: number, pInvName: string, pIsWeapon: boolean, pItemInfo: any) => {
    if (!ItemCallbacks.has(pItemId)) return;
    const pInfo = global.exports['ev-inventory'].GetItemInfo(pSlot);
    const cb = ItemCallbacks.get(pItemId);
    cb({
        pItemId: pItemId,
        pItemSlot: pSlot,
        pInventory: pInvName,
        pQuality: pInfo.quality,
        pIsWeapon: pIsWeapon,
        pInfo: pInfo,
        pExtraInfo: pItemInfo
    });
});