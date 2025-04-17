export let isPolice = false;
export let currentCallsign = '';
export let currentDepartment = 'lspd';

onNet('police:setCallSign', (pCallsign: string, pDepartment: string) => {
    currentCallsign = pCallsign ? pCallsign : '';
    currentDepartment = pDepartment ? pDepartment : 'lspd';
});

onNet('police:noLongerCop', () => {
    currentCallsign = '';
    currentDepartment = 'lspd';
});

onNet('ev-jobmanager:playerBecameJob', (pJob: string) => {
    let isPolice = false;

    if (pJob === 'police' || pJob === 'doc') isPolice = true;

    isPolice = isPolice;
});

export function GetStreetAndZone(pCoords: number[]) {
    const [x, y, z] = pCoords;
    const [streetName, crossingRoad] = GetStreetNameAtCoord(x, y, z);
    return GetStreetNameFromHashKey(streetName) + ', ' + GetLabelText(GetNameOfZone(x, y, z));
}

export function SendDistressSignal(pDispatchCode?: string) {
    if (!isPolice) return false;

    const playerPedId = PlayerPedId();

    const plyCoords = GetEntityCoords(playerPedId, false);

    emitNet('dispatch:svNotify', {
        dispatchCode: pDispatchCode ?? '10-78',
        firstStreet: GetStreetAndZone(plyCoords),
        callSign: currentCallsign,
        cid: global.exports.isPed.isPed('cid'),
        origin: {
            x: plyCoords[0],
            y: plyCoords[1],
            z: plyCoords[2]
        }
    });

    return true;
}