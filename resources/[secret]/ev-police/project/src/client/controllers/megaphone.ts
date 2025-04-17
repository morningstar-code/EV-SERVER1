import { PoliceConfig } from "@shared/config";

let isMegaphoneActivated = false;
let policeVehicles: number[] = [];

export const InitMegaphone = (): void => { };

const isVehicleMegaphoneActive = () => isMegaphoneActivated;

const megaphoneUp = () => {
    const playerPedId = PlayerPedId();
    const vehicle = GetVehiclePedIsIn(playerPedId, false);
    const myjob = global.exports.isPed.isPed('myjob');

    if (policeVehicles.length === 0) {
        policeVehicles = Object.keys(PoliceConfig!.policeVehicles).map(model => GetHashKey(model));
    }

    const model = GetEntityModel(vehicle);
    const isPoliceVehicle = policeVehicles.includes(model);

    if (vehicle !== 0 && isPoliceVehicle && myjob === 'police') {
        MumbleSetAudioInputIntent(GetHashKey('music'));
        TriggerEvent('ev:voice:proximity:override', 'megaphone', model === GetHashKey('polas350') && PoliceConfig!.megaphoneRangesHeli || PoliceConfig!.megaphoneRanges);
        TriggerServerEvent('ev:voice:transmission:state', -1, 'megaphone', true, 'megaphone');
        isMegaphoneActivated = true;
    }
};

const megaphoneDown = () => {
    if (isMegaphoneActivated) {
        MumbleSetAudioInputIntent(GetHashKey('speech'));
        TriggerEvent('ev:voice:proximity:override', 'megaphone', PoliceConfig!.megaphoneRanges, -1, -1);
        TriggerServerEvent('ev:voice:transmission:state', -1, 'megaphone', false, 'gag');
    }

    isMegaphoneActivated = false;
};

(() => {
    global.exports['ev-keybinds'].registerKeyMapping('', 'Gov', 'Vehicle Megaphone', '+ev-police:vehicle-megaphone', '-ev-police:vehicle-megaphone');
    RegisterCommand('+ev-police:vehicle-megaphone', megaphoneUp, false);
    RegisterCommand('-ev-police:vehicle-megaphone', megaphoneDown, false);
})();

global.exports('isVehicleMegaphoneActive', isVehicleMegaphoneActive);