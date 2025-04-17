import { Delay } from "@shared/utils/tools";

export function GetClosestBone(pEntity: number, pArray: any[]) {
    let pBoneIndex = 0;
    let pBoneName = "";
    let pDistance = 0;
    let pWorldPos: any;
    const entCoords = GetEntityCoords(PlayerPedId(), false);
    return pArray.forEach(pItem => {
        let boneIndex = GetEntityBoneIndexByName(pEntity, pItem);
        if (boneIndex === -1) return;
        const worldPos = GetWorldPositionOfEntityBone(pEntity, boneIndex);
        const distance = GetDistBetweenCoords(entCoords, worldPos, false);
        if (!pBoneIndex || distance < pDistance) {
            pBoneIndex = boneIndex, pBoneName = pItem, pWorldPos = worldPos, pDistance = distance;
        }
    }), [pBoneIndex, pBoneName, pDistance, pWorldPos];
}

export async function TurnPedCoords(pPlayerPed: number, [pCoordX, pCoordY, pCoordZ]: number[]) {
    TaskTurnPedToFaceCoord(pPlayerPed, pCoordX, pCoordY, pCoordZ, 0);
    await Delay(100);
    while (GetScriptTaskStatus(pPlayerPed, 0x574bb8f5) === 1) {
        await Delay(0);
    }
}

export async function TurnPedEntity(pPlayerPed: number, pEntity: number) {
    TaskTurnPedToFaceEntity(pPlayerPed, pEntity, 0);
    await Delay(100);
    while (GetScriptTaskStatus(pPlayerPed, 0xcbce4595) === 1) {
        await Delay(0);
    }
}

export function GetDistBetweenCoords([pCoord1X, pCoord1Y, pCoord1Z]: number[], [pCoord2X, pCoord2Y, pCoord2Z]: number[], pUseZ = false) {
    return GetDistanceBetweenCoords(pCoord1X, pCoord1Y, pCoord1Z, pCoord2X, pCoord2Y, pCoord2Z, pUseZ);
}