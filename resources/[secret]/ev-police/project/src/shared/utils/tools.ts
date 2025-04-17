export let Delay = (ms: any) => new Promise(res => setTimeout(res, ms));

export const taskBarSkill = (pDifficulty: number, pSkillGap: number, pSkipRagdoll = false): Promise<number> => {
    return new Promise(resolve => {
        global.exports['ev-ui'].taskBarSkill(pDifficulty, pSkillGap, resolve, false, false, pSkipRagdoll);
    });
};

export const GetRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export function GetClosestPlayer() {
    const activePlayers = GetActivePlayers();
    const playerId = PlayerId();
    const plyCoords = GetEntityCoords(PlayerPedId(), false);

    let foundDistance: number = 9999;
    let foundPlayer: number = 0;
    let foundPed: number = 0;

    activePlayers.forEach((activePlayer: number) => {
        if (activePlayer !== playerId) {
            const activePlyPed = GetPlayerPed(activePlayer);
            const activePlyCoords = GetEntityCoords(activePlyPed, false);
            const distance = GetDistance(plyCoords, activePlyCoords);
            if (!foundPlayer || distance < foundDistance) {
                foundPlayer = activePlayer;
                foundPed = activePlyPed;
                foundDistance = distance;
            }
        }
    });

    return [
        foundPlayer,
        foundDistance,
        foundPed
    ];
};

export async function LoadAnimDict(pDict: string) {
    if (!HasAnimDictLoaded(pDict)) {
        RequestAnimDict(pDict);
        let timeout = false;
        setTimeout(() => timeout = true, 60000);
        while (!HasAnimDictLoaded(pDict) && !timeout) {
            await Delay(10);
        }
    }
};

export function taskBar(length: number, name: string, runCheck = false, moveCheck?: { distance?: number, entity?: number }): Promise<number> {
    return new Promise(resolve => {
        name ? global.exports["ev-taskbar"].taskBar(length, name, runCheck, true, null, false, resolve, moveCheck?.distance, moveCheck?.entity) : setTimeout(() => resolve(100), length);
    });
};

export const GetDistance = (pCoord1: number[], pCoord2: number[]) => {
    const [x, y, z] = [pCoord1[0] - pCoord2[0], pCoord1[1] - pCoord2[1], pCoord1[2] - pCoord2[2]];
    return Math.sqrt(x * x + y * y + z * z);
};

export function GetPedVehicleSeat(pPed: number, pVehicle: number): any {
    const seats = GetVehicleModelNumberOfSeats(GetEntityModel(pVehicle));
    for (let i = -1; i < seats - 1; i += 1) {
        const ped = GetPedInVehicleSeat(pVehicle, i);
        if (ped && ped === pPed) return i;
    }
}