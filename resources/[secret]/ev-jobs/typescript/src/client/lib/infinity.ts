import { arrayToMap } from "@shared/utils/tools";

let PlayerCoords = new Map();
const EntityCoords = new Map();

on("ev:infinity:player:coords:array", (pArray: any) => {
    PlayerCoords = arrayToMap(pArray);
});

on("ev:infinity:entity:coords:array", (pNetId: number, pArray: any) => {
    if (pArray) EntityCoords.set(pNetId, pArray);
    else {
        EntityCoords.delete(pNetId);
    }
});

export function GetNetworkedCoords(pType: string, pNetId: number) {
    let result;
    if (pType === "player") {
        const player = GetPlayerFromServerId(pNetId);
        result = player === -1 ? PlayerCoords.get(pNetId) : GetEntityCoords(GetPlayerPed(player), false);
    } else {
        const entity = NetworkGetEntityFromNetworkId(pNetId);
        if (DoesEntityExist(entity)) result = GetEntityCoords(entity, false);
        else {
            result = EntityCoords.has(pNetId) ? EntityCoords.get(pNetId) : global.exports["ev-infinity"].FetchEntityCoords(pNetId, true);
        }
    }
    return result;
}

export function IsPlayerActive(pServerId: number) {
    return global.exports["ev-infinity"].IsPlayerActive(pServerId);
}