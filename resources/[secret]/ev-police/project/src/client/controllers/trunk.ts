import { GetModuleConfig } from "@shared/config";
import { isEscorting } from "./drag";
import { handCuffedWalking } from "./cuffs";
import { Streaming } from "@shared/cpx/client";
import { Delay, GetClosestPlayer, GetDistance, taskBar } from "@shared/utils/tools";

let vehiclesDisabledTrunks: number[] = [];
let vehiclesTrunkOffsets = new Map<number, { y: number, z: number }>();

const trunkAnimDict = 'mp_common_miss';
const trunkAnimName = 'dead_ped_idle';

let inTrunk = false;
let trunkVehicle: number;

export const InitTrunk = (): void => { };

onNet('ev-police:vehicle:forceTrunkCheck', (pArgs: any, pEntity: number) => { //Triggered by interact
    if (isEscorting && pEntity) {
        emitNet('ev-police:drag:disable');

        forceTrunkCheck(null, null, pEntity);

        return;
    }

    forceTrunkCheck();
});

on('ev-config:configLoaded', (pModule: string) => {
    if (pModule !== 'ev-police:trunks') return;

    const disabledTrunks = GetModuleConfig<string[]>('ev-police:trunks', 'disabledTrunks');
    const trunkOffsets = GetModuleConfig<TrunkOffsets>('ev-police:trunks', 'trunkOffsets');

    if (disabledTrunks === undefined) return;

    vehiclesDisabledTrunks = disabledTrunks.map(model => GetHashKey(model));

    if (trunkOffsets === undefined) return;

    vehiclesTrunkOffsets = Object.keys(trunkOffsets).reduce((acc, curr) => {
        acc.set(GetHashKey(curr), {
            y: trunkOffsets[curr].y,
            z: trunkOffsets[curr].z
        });

        return acc;
    }, new Map());
});

const startInTrunkTick = () => {
    const playerPedId = PlayerPedId();

    const trunkTick = setTick(() => {
        if (!inTrunk) {
            ClearPedTasks(playerPedId);
            clearTick(trunkTick);
            return;
        }

        if (!trunkVehicle) return;

        SetInVehicleCamStateThisUpdate(trunkVehicle, 1);

        const doorAngleRatio = GetVehicleDoorAngleRatio(trunkVehicle, 5);

        if (doorAngleRatio === 0) {
            DrawRect(0, 0, 10, 10, 1, 1, 1, 128);
        }

        if (GetVehicleEngineHealth(trunkVehicle) < 100 || !DoesEntityExist(trunkVehicle)) {
            exitTrunk();
        }

        if (!IsEntityPlayingAnim(playerPedId, trunkAnimDict, trunkAnimName, 3)) {
            TaskPlayAnim(playerPedId, trunkAnimDict, trunkAnimName, 8, -8, -1, 0, 0, false, false, false);
        }
    });
};

const startVehicleTrunkTick = () => {
    const vehicleTrunkTick = setTick(() => {
        if (!inTrunk) {
            clearTick(vehicleTrunkTick);
            return;
        }

        if (!trunkVehicle) return;

        if (handCuffedWalking) return;

        if (IsControlJustPressed(0, 23)) {
            exitTrunk();
        }

        if (IsControlJustPressed(0, 47)) {
            if (GetVehicleDoorAngleRatio(trunkVehicle, 5) > 0) {
                global.exports['ev-sync'].SyncedExecution('SetVehicleDoorShut', trunkVehicle, 5, false, true);
            } else {
                global.exports['ev-sync'].SyncedExecution('SetVehicleDoorOpen', trunkVehicle, 5, false, true);
            }
        }
    });
};

const forceEnteringVehicle = async (pVehicle: number) => {
    const model = GetEntityModel(pVehicle);

    if (vehiclesDisabledTrunks.includes(model)) {
        return;
    }

    if (!(DoesVehicleHaveDoor(pVehicle, 5) || DoesVehicleHaveDoor(pVehicle, 6)) || !IsThisModelACar(model)) return;

    global.exports['ev-sync'].SyncedExecution('SetVehicleDoorOpen', pVehicle, 5, true, true);

    const playerPedId = PlayerPedId();

    const [minDim, maxDim] = GetModelDimensions(model);

    let maxY = maxDim[2];

    if (maxY > 1.4) {
        maxY = 1.4 - (maxDim[2] - 1.4);
    }

    inTrunk = true;

    emit('ped:intrunk', inTrunk);

    await Streaming.loadAnim(trunkAnimDict);

    SetBlockingOfNonTemporaryEvents(playerPedId, true);
    SetPedSeeingRange(playerPedId, 0);
    SetPedHearingRange(playerPedId, 0);
    SetPedFleeAttributes(playerPedId, 0, false);
    SetPedKeepTask(playerPedId, true);
    DetachEntity(playerPedId, true, true);
    ClearPedTasks(playerPedId);
    TaskPlayAnim(playerPedId, trunkAnimDict, trunkAnimName, 8, 8, -1, 2, 999, false, false, false);

    const trunkOffset = vehiclesTrunkOffsets?.get(model) ?? { y: 0, z: 0 };

    AttachEntityToEntity(playerPedId, pVehicle, 0, -0.1, minDim[1] + 0.85 + trunkOffset.y, maxY - 0.87 + trunkOffset.z, 0, 0, 40, false, false, true, true, 1, true);

    trunkVehicle = pVehicle;

    startInTrunkTick();
    startVehicleTrunkTick();

    emitNet('ev-police:vehicle:trunkEnter', NetworkGetNetworkIdFromEntity(pVehicle));

    const isDead = global.exports.isPed.isPed('dead');

    if (!handCuffedWalking || isDead) {
        global.exports['ev-ui'].showInteraction('[F] Exit | [G] Open/Close');
    }
};

onNet('ev-police:vehicle:getInTrunk', async (pArgs: any, pEntity: number) => { //Triggered by interact
    const lockStatus = GetVehicleDoorLockStatus(pEntity);
    const hasTrunk = DoesVehicleHaveDoor(pEntity, 5);

    if (lockStatus !== 1 && lockStatus !== 0) {
        emit('DoLongHudText', 'The vehicle is locked!', 2);
        return;
    }

    if (!hasTrunk) {
        emit('DoLongHudText', 'The vehicle has no trunk!', 2);
        return;
    }

    if (GetVehicleDoorAngleRatio(pEntity, 5) == 0) {
        emit('DoLongHudText', 'The trunk is closed!', 2);
        return;
    }

    if (Entity(pEntity).state.PlayerInTrunk) {
        emit('DoLongHudText', 'The trunk is full!', 2);
        return;
    }

    const finished = await taskBar(3000, 'Getting in trunk...', true, {
        distance: 5,
        entity: pEntity
    });

    if (finished !== 100) return;

    if (Entity(pEntity).state.PlayerInTrunk) {
        emit('DoLongHudText', 'The trunk is full!', 2);
        return;
    }

    forceEnteringVehicle(pEntity);
});

const forceTrunkCheck = async (pPed?: number | null, pDistance?: number | null, pEntity?: number) => {
    const [foundPlayer, foundDistance] = pPed && IsPedAPlayer(pPed) ? [
        NetworkGetPlayerIndexFromPed(pPed),
        pDistance
    ] : GetClosestPlayer();

    if (foundDistance! > 3) {
        emit('DoLongHudText', 'No player near you (maybe get closer)!', 2);
        return;
    }

    const currentEntity = pEntity ?? global.exports['ev-target'].GetCurrentEntity();

    if (!IsEntityAVehicle(currentEntity)) return;

    const model = GetEntityModel(currentEntity);

    if (!(DoesVehicleHaveDoor(currentEntity, 5) || DoesVehicleHaveDoor(currentEntity, 6)) || !IsThisModelACar(model)) {
        emit('DoLongHudText', 'The vehicle has no trunk!', 2);
        return;
    }

    if (Entity(currentEntity).state.PlayerInTrunk) {
        emit('DoLongHudText', 'The trunk is full!', 2);
        return;
    }

    const [minDim, maxDim] = GetModelDimensions(model);

    const finished = await taskBar(5000, 'Putting in trunk', true, {
        distance: 5,
        entity: currentEntity
    });

    if (finished !== 100) return;

    const offset = GetOffsetFromEntityInWorldCoords(currentEntity, 0, minDim[1] - 0.5, 0);

    if (GetDistance(offset, GetEntityCoords(PlayerPedId(), true)) > 1.5) {
        emit('DoLongHudText', 'You are too far away from the trunk!', 2);
        return;
    }

    const driverPed = GetPedInVehicleSeat(currentEntity, -1);
    const lockStatus = GetVehicleDoorLockStatus(currentEntity);

    if (DoesEntityExist(driverPed) && !IsPedAPlayer(driverPed) || lockStatus !== 1 && lockStatus !== 0) {
        emit('DoLongHudText', 'The vehicle is locked!', 2);
        return;
    }

    if (GetVehicleDoorAngleRatio(currentEntity, 5) == 0) {
        emit('DoLongHudText', 'The trunk is closed!', 2);
        return;
    }

    const entityNetId = NetworkGetNetworkIdFromEntity(currentEntity);

    emitNet('ev-police:vehicle:forceTrunkAsk', GetPlayerServerId(foundPlayer), entityNetId);
};

onNet('ev-police:vehicle:forceEnteringVehicle', (pVehicleNetId: number) => {
    const vehicle = NetworkGetEntityFromNetworkId(pVehicleNetId);

    if (!DoesEntityExist(vehicle)) return;

    forceEnteringVehicle(vehicle);
});

onNet('ev-police:vehicle:releaseFromTrunk', () => {
    const playerPedId = PlayerPedId();

    if (IsPedInAnyVehicle(playerPedId, false)) return;

    const currentEntity = global.exports['ev-target'].GetCurrentEntity();

    if (!IsEntityAVehicle(currentEntity)) return;

    if (IsEntityAttachedToAnyPed(playerPedId)) return;

    if (GetVehicleDoorAngleRatio(currentEntity, 5) === 0) {
        emit('DoLongHudText', 'The trunk is closed!', 2);
        return;
    }

    const netId = NetworkGetNetworkIdFromEntity(currentEntity);

    emitNet('ev-police:vehicle:releaseTrunkAsk', netId);
});

onNet('ev-police:vehicle:releaseTrunkSelf', () => {
    const isDead = global.exports.isPed.isPed('dead');

    if (handCuffedWalking || isDead || !inTrunk) return;

    const netId = NetworkGetNetworkIdFromEntity(trunkVehicle);

    emitNet('ev-police:vehicle:releaseTrunkAsk', netId);
});

const exitTrunk = async () => {
    global.exports['ev-ui'].hideInteraction();

    DoScreenFadeOut(500);

    await Delay(1000);

    DetachEntity(PlayerPedId(), true, true);

    if (DoesEntityExist(trunkVehicle)) {
        emitNet('ev-police:vehicle:trunkExit', NetworkGetNetworkIdFromEntity(trunkVehicle));

        global.exports['ev-sync'].SyncedExecution('SetVehicleDoorOpen', trunkVehicle, 5, true, true);

        const [minDim, maxDim] = GetModelDimensions(GetEntityModel(trunkVehicle));

        const offset = GetOffsetFromEntityInWorldCoords(trunkVehicle, 0, minDim[1] - 0.5, 0);

        SetEntityCoords(PlayerPedId(), offset[0], offset[1], offset[2] - 0.5, true, false, false, true);
    }

    emit('ped:intrunk', false);

    trunkVehicle = null as any;

    inTrunk = false;

    DoScreenFadeIn(2000);
};

onNet('ev-police:vehicle:releaseTrunk', (pNetId: number) => {
    if (!inTrunk || pNetId !== NetworkGetNetworkIdFromEntity(trunkVehicle)) return;

    exitTrunk();
});