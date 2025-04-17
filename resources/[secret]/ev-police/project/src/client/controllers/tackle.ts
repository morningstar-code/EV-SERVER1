import { Delay, GetClosestPlayer, GetRandom, LoadAnimDict } from "@shared/utils/tools";
import { handCuffed, handCuffedWalking } from "./cuffs";

let isTackled = false;
let _0x2390f1 = true;
let isTackling = false;

export const _0x2f5dd1 = (pValue: any) => {
    _0x2390f1 = pValue;
};

const tackleDisableControls = () => {
    isTackling = true;

    const disableTick = setTick(async () => {
        if (!isTackling) {
            clearTick(disableTick);
            return;
        }

        DisableControlAction(1, 140, true);
        DisableControlAction(1, 141, true);
        DisableControlAction(1, 142, true);
        DisableControlAction(1, 37, true);
        DisablePlayerFiring(PlayerPedId(), true);
    });
};

on('ev-police:tackle', async () => {
    if (isTackling) return;

    const [closestPlayer, closestDistance] = GetClosestPlayer();

    if (closestPlayer && closestDistance && closestDistance < 2) {
        const playerPedId = PlayerPedId();
        const plyHeading = GetEntityHeading(playerPedId);
        const plyCoords = GetEntityCoords(playerPedId, false);
        const targetPed = GetPlayerPed(closestPlayer);
        const targetCoords = GetEntityCoords(targetPed, false);
        const angleToTarget = Math.atan2(targetCoords[1] - plyCoords[1], targetCoords[0] - plyCoords[0]) * 180 / Math.PI - 90;
        const angleDifference = Math.abs((plyHeading - angleToTarget + 180) % 360 - 180);

        if (angleDifference < 40) {
            emitNet('ev-police:tackle:server', GetPlayerServerId(closestPlayer));

            const animDict = 'swimming@first_person@diving';

            await LoadAnimDict(animDict);

            TaskPlayAnim(playerPedId, animDict, 'dive_run_fwd_-45_loop', 8, -8, -1, 49, 0, false, false, false);

            await Delay(300);

            ClearPedSecondaryTask(playerPedId);

            const time = handCuffedWalking || handCuffed ? GetRandom(3500, 5000) : 150;

            SetPedToRagdoll(PlayerPedId(), time, time, 0, false, false, false);

            tackleDisableControls();

            await Delay(6000);

            isTackling = false;

            return;
        }
    }

    const delayTime = handCuffedWalking || handCuffed ? GetRandom(2000, 3500) : 1000;

    SetPedToRagdoll(PlayerPedId(), delayTime, delayTime, 0, false, false, false);

    tackleDisableControls();

    await Delay(delayTime);

    isTackling = false;
});

onNet('ev-police:tackle:tackled', async () => {
    if (!_0x2390f1 || isTackled) return;

    const time = handCuffedWalking || handCuffed ? GetRandom(4500, 5000) : GetRandom(3500, 5000);

    SetPedToRagdoll(PlayerPedId(), time, time, 0, false, false, false);

    tackleDisableControls();

    isTackled = true;

    await Delay(10000);

    isTackling = false;
    isTackled = false;
});