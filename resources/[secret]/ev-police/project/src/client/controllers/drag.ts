import { GetClosestPlayer, LoadAnimDict } from "@shared/utils/tools";
import { handCuffed, handCuffedWalking } from "./cuffs";

export let isDragged = false;
export let isEscorting = false;
export let isCarried = false;
export let escorterServerId = 0;
export let isDead = false;
export let dragRoom = [0, 0];

const cashWeaponHash = -1569615261;

export const InitDrag = (): void => { };

const DisableMovement = () => {
    DisableControlAction(1, 23, true);
    DisableControlAction(1, 106, true);
    DisableControlAction(1, 140, true);
    DisableControlAction(1, 141, true);
    DisableControlAction(1, 142, true);
    DisableControlAction(1, 37, true);
    DisablePlayerFiring(PlayerPedId(), true);
    DisableControlAction(2, 32, true);
    DisableControlAction(1, 33, true);
    DisableControlAction(1, 34, true);
    DisableControlAction(1, 35, true);
    DisableControlAction(1, 37, true);
    emit('actionbar:setEmptyHanded');
};

const dragCarry = async (pCarry = false, pPed?: number, pDistance?: number) => {
    if (handCuffedWalking || handCuffed) return;

    if (isEscorting) {
        emitNet('ev-police:drag:disable');
        return;
    }

    const playerPedId = PlayerPedId();

    if (IsEntityAttachedToAnyPed(playerPedId) || IsPedInAnyVehicle(playerPedId, true) || IsPedRagdoll(playerPedId)) return;

    const [player, distance] = pPed && IsPedAPlayer(pPed) ? [
        NetworkGetPlayerIndexFromPed(pPed),
        pDistance
    ] : GetClosestPlayer();

    if (!player || !distance || distance > (pCarry ? 1 : 2)) return;

    const playerPed = GetPlayerPed(player);

    if (IsPedInAnyVehicle(playerPed, false)) return;

    const serverId = GetPlayerServerId(player);
    //const isCarryingObject = await RPC.execute<any[]>('isPlayerCarryingObject', serverId);

    //if (isCarryingObject[0]) return;

    DetachEntity(playerPedId, true, false);

    emitNet('ev-police:drag:ask', serverId, pCarry);
};

const dragStart = (pEscorter: string, pIsCarried: boolean) => { //Triggered for escort target
    escorterServerId = +pEscorter;
    isDragged = !isDragged;
    isCarried = pIsCarried;

    if (isDragged) {
        const [x, y, z] = GetEntityCoords(GetPlayerPed(GetPlayerFromServerId(escorterServerId)), false);

        SetEntityCoords(PlayerPedId(), x, y, z, false, false, false, false);

        let draggingRoom = [0, 0];

        const draggedPlayerPed = GetPlayerPed(GetPlayerFromServerId(escorterServerId));

        const playerPedId = PlayerPedId();

        const [xPos, yPos, zPos] = pIsCarried ? [
            -0.68,
            -0.2,
            0.94
        ] : [
            0.54,
            0.44,
            0
        ];

        const [xRot, yRot, zRot] = pIsCarried ? [
            180,
            180,
            60
        ] : [
            0,
            0,
            0
        ];

        AttachEntityToEntity(playerPedId, draggedPlayerPed, pIsCarried ? 1 : 11816, xPos, yPos, zPos, xRot, yRot, zRot, true, true, false, true, 0, true);

        const dragTick = setTick(async () => {
            if (!isDragged) {
                clearTick(dragTick);
                return;
            }

            DisableMovement();

            const room = [
                GetInteriorFromEntity(playerPedId),
                GetRoomKeyFromEntity(playerPedId)
            ];

            if (room[0] !== 0 || room[1] !== 0) {
                draggingRoom = room;
            }

            if (dragRoom[0] !== 0 || dragRoom[1] !== 0) {
                const [interior, roomKey] = dragRoom;
                ForceRoomForEntity(playerPedId, interior, roomKey);
                ForceRoomForEntity(draggedPlayerPed, interior, roomKey);
                ForceRoomForGameViewport(interior, roomKey);;
            }

            if (pIsCarried) {
                const animDict = 'amb@world_human_bum_slumped@male@laying_on_left_side@base';
                const animName = 'base';

                if (!IsEntityPlayingAnim(playerPedId, animDict, animName, 3)) {
                    await LoadAnimDict(animDict);
                    TaskPlayAnim(playerPedId, animDict, animName, 8, 8, -1, 1, 999.9, false, false, false);
                }

                if (IsControlJustPressed(0, 38)) {
                    emitNet('ev-police:drag:disable', escorterServerId);
                }

                SetGameplayCamFollowPedThisUpdate(draggedPlayerPed);
            }
        });
    }
};

const stopForced = async (pServerId: string | null) => {
    if (+pServerId! === escorterServerId && isDragged) {
        console.log("pServerId equals escorterServerId and isDragged");
        isEscorting = false;
        isDragged = false;
        isCarried = false;
        escorterServerId = 0;

        const playerPedId = PlayerPedId();

        if (IsPedInAnyVehicle(playerPedId, false)) return;

        DetachEntity(playerPedId, true, false);

        if (isDead) {
            const [offsetX, offsetY, offsetZ] = GetOffsetFromEntityInWorldCoords(playerPedId, 0, 0.5, 0.5);
            global.exports["ev-death"].SetPlayerHealth(200);
            SetEntityCoords(playerPedId, offsetX, offsetY, offsetZ, false, false, false, false);
            return;
        }

        if (IsEntityPlayingAnim(playerPedId, 'amb@world_human_bum_slumped@male@laying_on_left_side@base', 'base', 3)) {
            const animDict = 'amb@world_human_bum_slumped@male@laying_on_left_side@flee';
            const animName = 'forward';
            await LoadAnimDict(animDict);
            TaskPlayAnim(playerPedId, animDict, animName, 1, 1, -1, 0, 0, false, false, false);
        }

        return;
    }

    if (isEscorting && +pServerId! === GetPlayerServerId(PlayerId())) {
        console.log("isEscorting and pServerId equals GetPlayerServerId(PlayerId())");
        isEscorting = false;
        ClearPedTasks(PlayerPedId());
        emitNet('ev-police:drag:disable', escorterServerId);
        return;
    }

    if (!pServerId! && isEscorting) {
        console.log("pServerId is null and isEscorting");
        isEscorting = false;
        ClearPedTasks(PlayerPedId());
        console.log("escorterServerId", escorterServerId);
        emitNet('ev-police:drag:disable', escorterServerId);
        return;
    }

    if (!isDragged && !isEscorting) {
        console.log("not dragged and not escorting");
        emit('ev-police:drag:releaseEscort');
    }
};

const escort = (pServerId: number, pDragging: boolean) => {
    isEscorting = true;
    escorterServerId = pServerId;

    console.log(`escort | pServerId: ${pServerId} | pDragging: ${pDragging}`);

    let moveRateTimeout: NodeJS.Timeout;

    const escortTick = setTick(async () => {
        if (!isEscorting) {
            clearTick(escortTick);
            return;
        }

        DisableMovement();

        const playerPedId = PlayerPedId();

        if (IsEntityDead(GetPlayerPed(GetPlayerFromServerId(escorterServerId)))) {
            DetachEntity(playerPedId, true, false);
            isEscorting = false;
            const [offsetX, offsetY, offsetZ] = GetOffsetFromEntityInWorldCoords(GetPlayerPed(GetPlayerFromServerId(escorterServerId)), 0, 0.8, 2.8);
            SetEntityCoords(playerPedId, offsetX, offsetY, offsetZ, false, false, false, false);
        }

        if (IsPedRunning(playerPedId) || IsPedSprinting(playerPedId)) {
            DisableControlAction(0, 21, true);
            SetPedMoveRateOverride(playerPedId, 0.7);
            clearTimeout(moveRateTimeout);
            moveRateTimeout = setTimeout(() => {
                SetPedMoveRateOverride(playerPedId, 1);
            }, 1000);
        }

        if (IsEntityInAir(playerPedId) || IsPedRagdoll(playerPedId)) {
            isEscorting = false;
            emitNet('ev-police:drag:disable', pServerId);
        }

        const isNotCash = GetSelectedPedWeapon(playerPedId) !== cashWeaponHash;

        if (isNotCash) {
            DisableControlAction(2, 22, true);
        }

        const room = [
            GetInteriorFromEntity(playerPedId),
            GetRoomKeyFromEntity(playerPedId)
        ];

        if (room[0] !== dragRoom[0] || room[1] !== dragRoom[1]) {
            dragRoom = room;
            emitNet('ev-police:drag:setRoom', pServerId, dragRoom);
        }

        if (pDragging) {
            const animDict = 'missfinale_c2mcs_1';
            const animName = 'fin_c2_mcs_1_camman';

            if (!IsEntityPlayingAnim(playerPedId, animDict, animName, 3)) {
                await LoadAnimDict(animDict);
                TaskPlayAnim(playerPedId, animDict, animName, 1, 1, -1, 50, 0, false, false, false);
            }

            if (IsControlJustPressed(0, 38) || isNotCash) {
                emitNet('ev-police:drag:disable', pServerId);
            }
        }
    });
};

const releaseEscort = () => {
    isEscorting = false;

    const playerPedId = PlayerPedId();

    if (IsPedInAnyVehicle(playerPedId, false)) return;

    DetachEntity(playerPedId, true, false);
};

onNet('ev-police:drag:attempt', (p1: any, pPed: number, pDistanceData: { distance?: number }) => {
    dragCarry(false, pPed, pDistanceData?.distance);
});

onNet('ev-police:drag:carry', () => dragCarry(true));

onNet('ev-police:drag:start', dragStart); //Triggered for escort target

onNet('ev-police:drag:stopped', stopForced); //Triggered for escort target

onNet('ev-police:drag:stopForced', () => stopForced(null)); //Triggered for escort target?

onNet('ev-police:drag:escort', escort); //Triggered for escorter

onNet('ev-police:drag:releaseEscort', releaseEscort); //Triggered for escorter

onNet('ev-police:drag:setRoom', (pRoom: number[]) => {
    dragRoom = pRoom;
});

onNet('pd:deathcheck', () => {
    isDead = !isDead;

    if (!isDead) {
        isEscorting = false;
        isDragged = false;
    }
});

on('onClientResourceStop', async (resource: string) => {
    if (resource !== GetCurrentResourceName()) return;

    stopForced(null);
    releaseEscort();

    isEscorting = false;
    isDragged = false;
});

global.exports('IsCarried', () => {
    return isCarried;
});