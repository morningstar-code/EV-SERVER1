import { GetModuleConfig } from "@shared/config";
import { GetRandom, taskBarSkill } from "@shared/utils/tools";

let lastDrag = 0;
let isDragging = false;

export const InitDragVehicle = (): void => { };

(() => {
    global.exports['ev-keybinds'].registerKeyMapping('', 'Police', 'Drag Suspect Out Vehicle', '+dragOutVehicle', '-dragOutVehicle');
})();

RegisterCommand('+dragOutVehicle', () => dragOutVehicle(), false);
RegisterCommand('-dragOutVehicle', () => { }, false);

const dragOutVehicle = async () => {
    if (isDragging) return;

    const dragCooldownMili = GetModuleConfig<number>('ev-police', 'dragCooldownMili');

    if (GetGameTimer() < lastDrag + dragCooldownMili) return;

    const myjob = global.exports.isPed.isPed('myjob');
    if (myjob !== 'police') return;

    const vehicle = global.exports.isPed.TargetVehicle();
    if (vehicle === 0) return;

    const ped = GetPedInVehicleSeat(vehicle, -1);
    if (ped === 0) return;

    if (GetSelectedPedWeapon(PlayerPedId()) !== 1737195953) return emit('DoLongHudText', "Seems like I don't have a nightstick.", 2);

    isDragging = true;

    global.exports['ev-sync'].SyncedExecution('SetVehicleDoorsLocked', vehicle, 7);

    const finished = await taskBarSkill(1000, GetRandom(10, 15));

    ClearPedTasksImmediately(PlayerPedId());

    lastDrag = GetGameTimer();

    isDragging = false;

    if (finished !== 100) return;

    TaskEnterVehicle(PlayerPedId(), vehicle, 20000, -1, 5, 524296, 0);
};