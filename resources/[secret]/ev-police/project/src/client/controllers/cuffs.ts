import { Delay, GetClosestPlayer, GetDistance, GetPedVehicleSeat, LoadAnimDict, taskBar, taskBarSkill } from "@shared/utils/tools";
import { isCarried, isDead } from "./drag";
import { GetModuleConfig, GetResourceConfig } from "@shared/config";
import { _0x2f5dd1 } from "./tackle";
import { Utils } from "@shared/cpx/client";

export let isInputBlocked = false;
export let handCuffedWalking = false;
export let handCuffed = false;

let cuffAttempts = 0;
let recentlyAttempted = 0;
let isBeingCuffed = false;
let cuffAnimationIsPlaying = false;
let ragdollImmunityEnabled = false;
let lastCuff = 0;

export const isHandCuffedOrWalking = () => handCuffedWalking || handCuffed;

export const InitCuffs = (): void => { };

const StartCuffingTick = () => {
    const playerPedId = PlayerPedId();
    const animDict = 'mp_arresting';
    const animName = 'idle';

    ClearPedTasksImmediately(playerPedId);

    let moveRateTimeout: NodeJS.Timeout;
    let cuffAnimationTimeout: NodeJS.Timeout;
    let playingAnimation = false;

    const cuffTick = setTick(async () => {
        if (!isHandCuffedOrWalking()) {
            clearTick(cuffTick);
            return;
        }

        if (handCuffed && (IsPedClimbing(playerPedId) || IsEntityInAir(playerPedId))) {
            await Delay(500);

            SetPedToRagdoll(playerPedId, 1500, 1500, 0, false, false, false);

            playingAnimation = true;

            clearTimeout(cuffAnimationTimeout);

            cuffAnimationTimeout = setTimeout(() => {
                playingAnimation = false;
            }, 2000);
        }

        if (handCuffed && (IsPedRunning(playerPedId) || IsPedSprinting(playerPedId))) {
            DisableControlAction(0, 21, true);
            SetPedMoveRateOverride(playerPedId, 0.85);

            clearTimeout(moveRateTimeout);

            moveRateTimeout = setTimeout(() => {
                SetPedMoveRateOverride(playerPedId, 1);
            }, 1000);
        }

        handCuffedWalking ? SetPedCanRagdoll(playerPedId, false) : SetPedCanRagdoll(playerPedId, true);

        DisableControlAction(1, 23, true);
        DisableControlAction(1, 106, true);
        DisableControlAction(1, 140, true);
        DisableControlAction(1, 141, true);
        DisableControlAction(1, 142, true);
        DisableControlAction(1, 37, true);

        for (let i = 59; i <= 76; i++) {
            DisableControlAction(1, i, true);
        }

        DisablePlayerFiring(PlayerPedId(), true);

        const vehicle = GetVehiclePedIsIn(playerPedId, false);

        if (!vehicle && IsDisabledControlJustPressed(1, 23) && handCuffed) {
            const currentEntity = global.exports['ev-target'].GetCurrentEntity(); 
            if (!IsEntityAVehicle(currentEntity)) return;

            const plyCoords = GetEntityCoords(playerPedId, false);

            let foundDist = 99;
            let foundDoorIndex = -2;

            for (let i = 0; i <= 6; i++) {
                const doorCoords = GetEntryPositionOfDoor(currentEntity, i);
                const distance = GetDistance(plyCoords, doorCoords);

                if (distance < foundDist) {
                    foundDist = distance;
                    foundDoorIndex = i - 1;
                }
            }

            if (foundDoorIndex === -2 || foundDist > 2.5) return;

            const doorAngleRatio = GetVehicleDoorAngleRatio(currentEntity, foundDoorIndex + 1);

            if (doorAngleRatio < 0.5 && GetNumberOfVehicleDoors(currentEntity) > 0 && !IsVehicleDoorDamaged(currentEntity, foundDoorIndex + 1)) return;

            TaskEnterVehicle(playerPedId, currentEntity, 5000, foundDoorIndex, 1, 1, 0);
        }

        if (vehicle && DoesEntityExist(vehicle) && IsDisabledControlJustPressed(1, 75) && handCuffed) {
            const seat = GetPedVehicleSeat(playerPedId, vehicle) + 1;

            const doorAngleRatio = GetVehicleDoorAngleRatio(vehicle, IsSeatWarpOnly(vehicle, seat) ? 0 : seat);

            if (doorAngleRatio < 0.5 && GetNumberOfVehicleDoors(vehicle) > 0) return;

            TaskLeaveVehicle(playerPedId, vehicle, 256);
        }

        const inTrunk = global.exports.isPed.isPed('intrunk');
        const inBeatmode = false; //global.exports.police.getIsInBeatmode();

        if ((!IsEntityPlayingAnim(playerPedId, animDict, animName, 3) || IsPedRagdoll(playerPedId) || playingAnimation) && !isDead && !inTrunk && !inBeatmode && !isCarried) {
            await LoadAnimDict(animDict);
            TaskPlayAnim(playerPedId, animDict, animName, 8, 8, -1, handCuffed ? 49 : 17, 0, false, false, false);
        }

        if (isDead || inTrunk || inBeatmode) {
            await Delay(1000);
        }
    });
};

const attemptCuffing = async (pIsSoftCuff: boolean, pPed?: number, pDistance?: number) => {
    if (cuffAnimationIsPlaying || isBeingCuffed || isHandCuffedOrWalking() || Date.now() - lastCuff < 100 || isInputBlocked) return;

    lastCuff = Date.now();

    const playerPedId = PlayerPedId();

    if (IsPedRagdoll(playerPedId) || IsPlayerFreeAiming(PlayerId()) || IsPedInAnyVehicle(playerPedId, false) || IsPedBeingStunned(playerPedId, 0) || IsEntityInAir(playerPedId) || IsPedJumping(playerPedId)) {
        return;
    }

    const [foundPlayer, foundDistance] = pPed && IsPedAPlayer(pPed) ? [
        NetworkGetPlayerIndexFromPed(pPed),
        pDistance
    ] : GetClosestPlayer();

    if (!foundPlayer || !foundDistance || foundDistance > 2) {
        emit('DoLongHudText', 'No player near you (maybe get closer)!', 2);
        return;
    }

    const targetPed = GetPlayerPed(foundPlayer);
    const entity = Entity(targetPed);
    const lastCuffBreakoutTime = entity?.state?.lastCuffBreakoutTime ?? 0;

    if (IsPedInAnyVehicle(targetPed, false) || Date.now() < lastCuffBreakoutTime) {
        emit('DoLongHudText', 'Unable to cuff player', 2);
        return;
    }

    emit('DoLongHudText', pIsSoftCuff ? 'You soft cuffed a player!' : 'You hard cuffed a player!', 2);

    emitNet('ev-police:cuffs:granted', GetPlayerServerId(foundPlayer), pIsSoftCuff);
};

const gettingCuffed = async (pCufferServerId: number) => {
    console.log("CUFFING TAR")
    if (handCuffed) {
        ClearPedTasksImmediately(PlayerPedId());

        const softCuffOnly = GetResourceConfig<boolean>('softCuffOnly');

        handCuffedWalking = softCuffOnly ? false : true;
        handCuffed = softCuffOnly ? true : false;

        emit('ev-police:cuffs:state', handCuffedWalking, handCuffed);
        emit('DoLongHudText', 'Cuffed!', 1);

        return;
    }

    const pCufferPed = GetPlayerPed(GetPlayerFromServerId(pCufferServerId));
    const playerPedId = PlayerPedId();
    const distance = GetDistance(GetEntityCoords(playerPedId, false), GetEntityCoords(pCufferPed, false)) < 2;
    if (!distance) return;

    if (isBeingCuffed || cuffAnimationIsPlaying) return; //Variable names questionable

    emit('isBeingCuffed', true);

    Entity(PlayerPedId()).state.set('isBeingCuffed', true, true);

    isBeingCuffed = true;

    global.exports['ev-taskbar'].taskbarDisableInventory(true);
    global.exports['ev-actionbar'].disableActionBar(true);  

    emit('ev-keybinds:should-execute', false);

    Entity(playerPedId).state.set('waitingForCuff', false, true);
    Entity(playerPedId).state.set('brokeCuffs', false, true);

    await cuffAnimation(pCufferServerId);

    emitNet('InteractSound_SV:PlayWithinDistance', 3, 'handcuff', 0.4);

    await Delay(1500);

    let finished = 0;

    if (recentlyAttempted + 180000 < GetGameTimer()) {
        cuffAttempts = 0;
        recentlyAttempted = 0;
    }

    const maxCuffAttempts = GetModuleConfig<number>('ev-police', 'maxCuffAttempts');

    console.log("isDead", isDead);
    console.log("cuffAttempts", cuffAttempts);
    console.log("maxCuffAttempts", maxCuffAttempts);

    if (!isDead && cuffAttempts < maxCuffAttempts) {
        console.log(`[DEBUG] [POLICE] Isn't dead, and has attempts left. Showing skillcheck`);

        cuffAttempts++;

        recentlyAttempted = GetGameTimer();

        emit('ev-police:cuffs:recentlyAttempted', GetGameTimer());

        const cuffAttemptMapping = GetModuleConfig<[number, number][]>('ev-police', 'cuffAttemptMapping');

        const [pDifficulty, pSkillGap] = cuffAttemptMapping[cuffAttempts - 1];

        finished = await taskBarSkill(pDifficulty, pSkillGap, true);
    }

    global.exports['ev-taskbar'].taskbarDisableInventory(false);
    global.exports['ev-actionbar'].disableActionBar(false); 

    emit('ev-keybinds:should-execute', true);

    if (finished === 100) {
        console.log("[DEBUG] [POLICE] Finished skillcheck, got out of cuffs");

        _0x2f5dd1(false);

        ragdollImmunity(true);

        cuffFinal();

        const cuffRagdollImmunity = GetModuleConfig<number>('ev-police', 'cuffRagdollImmunity');

        Entity(PlayerPedId()).state.set('lastCuffBreakoutTime', Date.now() + cuffRagdollImmunity, true);

        setTimeout(() => {
            _0x2f5dd1(true);

            ragdollImmunity(false);

            SetPedCanRagdoll(PlayerPedId(), true);
        }, cuffRagdollImmunity);
    } else {
        console.log("[DEBUG] [POLICE] Failed skillcheck, got cuffed");
        
        const softCuffOnly = GetResourceConfig('softCuffOnly');

        handCuffedWalking = softCuffOnly ? false : true;
        handCuffed = softCuffOnly ? true : false;

        cuffTransition();

        emit('ev-police:cuffs:state', handCuffedWalking, handCuffed);

        setImmediate(() => emit('DoLongHudText', 'Cuffed!', 1));

        StartCuffingTick();
    }

    isBeingCuffed = false;

    setTimeout(() => {
        emit('isBeingCuffed', false);
    }, 2500);
};

const ragdollImmunity = (pEnabled: boolean) => {
    ragdollImmunityEnabled = pEnabled;

    if (pEnabled) {
        const ragdollImmunityTick = setTick(async () => {
            if (!ragdollImmunityEnabled) {
                clearTick(ragdollImmunityTick);
                return;
            }

            SetPedCanRagdoll(PlayerPedId(), false);
        });
    }
};

const uncuff = async (pPed?: number, pDistance?: number) => {
    if (cuffAnimationIsPlaying || isBeingCuffed || isHandCuffedOrWalking() || isInputBlocked) return;

    const playerPedId = PlayerPedId();

    if (IsPedRagdoll(playerPedId) || IsPlayerFreeAiming(PlayerId()) || IsPedInAnyVehicle(playerPedId, false)) return;

    const [foundPlayer, foundDistance] = pPed && IsPedAPlayer(pPed) ? [
        NetworkGetPlayerIndexFromPed(pPed),
        pDistance
    ] : GetClosestPlayer();

    if (!foundPlayer || !foundDistance || foundDistance > 1.5) {
        emit('DoLongHudText', 'No player near you (maybe get closer)!', 2);
        return;
    }

    emit('animation:PlayAnimation', 'uncuff');

    const foundPlayerPed = GetPlayerPed(foundPlayer);

    const finished = await taskBar(3000, 'Uncuffing', true, {
        distance: 2,
        entity: foundPlayerPed
    });

    if (finished !== 100) return;

    emitNet('ev-police:cuffs:uncuff', GetPlayerServerId(foundPlayer));

    emit('DoLongHudText', 'You uncuffed a player!', 1);
};

const softCuffs = () => {
    if (handCuffed) {
        cuffsReset();
        return;
    }

    handCuffed = true;
    handCuffedWalking = false;

    emitNet('InteractSound_SV:PlayWithinDistance', 3, 'handcuff', 0.4);
    emit('ev-police:cuffs:state', handCuffedWalking, handCuffed);

    ClearPedTasksImmediately(PlayerPedId());

    StartCuffingTick();
};

const cuffsReset = (pBool = false) => {
    if (handCuffedWalking && pBool) {
        softCuffs();
        return;
    }

    handCuffed = false;
    handCuffedWalking = false;

    emit('animation:PlayAnimation', 'cancel');
    emitNet('InteractSound_SV:PlayWithinDistance', 3, 'handcuff', 0.4);

    //global.exports.police.setIsInBeatmode(false);

    emit('ev-police:cuffs:state', false, false);
};

const cuffAnimation = async (pCuffer: number) => {
    const animDict = 'mp_arrest_paired';

    await LoadAnimDict(animDict);

    const playerPedId = PlayerPedId();
    const cufferPed = GetPlayerPed(GetPlayerFromServerId(pCuffer));

    if (IsPedRagdoll(playerPedId) || IsPedBeingStunned(playerPedId, 0)) {
        const offset = GetOffsetFromEntityInWorldCoords(cufferPed, -0.015, 0.45, 0);
        SetEntityCoordsNoOffset(playerPedId, offset[0], offset[1], offset[2], false, false, false);
    }

    SetEntityHeading(playerPedId, GetEntityHeading(cufferPed));
    TaskPlayAnim(playerPedId, animDict, 'crook_p1_idle', 8, -8, -1, 1, 0, false, false, false);
};

const cuffTransition = async () => {
    const animDict = 'mp_arrest_paired';

    await LoadAnimDict(animDict);

    const playerPedId = PlayerPedId();

    Entity(playerPedId).state.set('waitingForCuff', true, true);

    TaskPlayAnim(playerPedId, animDict, 'crook_p2_back_right', 8, -8, -1, 32, 0, false, false, false);

    setTimeout(() => Entity(playerPedId).state.set('waitingForCuff', false, true), 4000);
};

const cuffFinal = async () => {
    const animDict = 'mp_arrest_paired';

    await LoadAnimDict(animDict);

    const playerPedId = PlayerPedId();

    Entity(playerPedId).state.set('brokeCuffs', true, true);

    TaskPlayAnim(playerPedId, animDict, 'crook_p3_getup', 8, -8, -1, 0, 0, false, false, false);

    setTimeout(() => Entity(playerPedId).state.set('brokeCuffs', false, true), 4000);
};

const playCuffingAnimation = async (pCuffer: number) => {
    const animDict = 'mp_arrest_paired';
    const animName = 'mp_arresting';

    await LoadAnimDict(animDict);
    await LoadAnimDict(animName);

    const cufferPed = GetPlayerPed(GetPlayerFromServerId(pCuffer));
    if (!cufferPed) return;

    cuffAnimationIsPlaying = true;

    emit('isBeingCuffed', true);

    TaskTurnPedToFaceEntity(PlayerPedId(), cufferPed, 1000);

    await Delay(1000);

    TaskPlayAnim(PlayerPedId(), animName, 'arresting_cop_shove_left_long', 1, -1, -1, 16, 0, false, false, false);

    const state = Entity(cufferPed).state;
    const result = await Utils.waitForCondition(() => state.waitingForCuff || state.brokeCuffs, 10000);

    if (result || state.brokeCuffs) {
        cuffAnimationIsPlaying = false;

        emit('isBeingCuffed', false);

        ClearPedTasks(PlayerPedId());

        return;
    }

    TaskPlayAnim(PlayerPedId(), animDict, 'cop_p2_back_right', 1, -8, -1, 16, 0, false, false, false);

    await Delay(3700);

    ClearPedTasks(PlayerPedId());

    cuffAnimationIsPlaying = false;

    emit('isBeingCuffed', false);
};

onNet('ev-police:cuffs:attempt', (p1: any, pPed: number, pDistanceData: { distance?: number }) => {
    attemptCuffing(false, pPed, pDistanceData?.distance);
});

onNet('ev-police:cuffs:attemptSoft', () => attemptCuffing(true));

onNet('ev-police:cuffs:cuffed', (pCufferServerId: number) => gettingCuffed(pCufferServerId));

onNet('ev-police:cuffs:uncuff', (p1: any, pPed: number, pDistanceData: { distance?: number }) => {
    uncuff(pPed, pDistanceData?.distance);
});

onNet('ev-police:cuffs:playCuffingAnimation', playCuffingAnimation); //Triggered from server

onNet('ev-police:cuffs:softCuffs', softCuffs); //Triggered from server

onNet('ev-police:cuffs:reset', cuffsReset); //Used in client but also server

on('ev-police:blockInput', (pBlocked: boolean) => {
    isInputBlocked = pBlocked;
});