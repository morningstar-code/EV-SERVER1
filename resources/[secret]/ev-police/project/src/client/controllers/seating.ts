import { Delay, GetClosestPlayer, GetDistance, taskBar } from "@shared/utils/tools";
import { escorterServerId, isEscorting } from "./drag";
import { isInputBlocked } from "./cuffs";

export const InitSeating = (): void => { };

const GetPedSeatOrAvailable = (pEntity: number, pIsUnseating: boolean, pIsDriver: boolean) => {
    const seats = GetVehicleModelNumberOfSeats(GetEntityModel(pEntity)) - 2;

    for (let i = seats; i >= (pIsDriver ? -1 : 0); i--) {
        const isSeatFree = IsVehicleSeatFree(pEntity, i);

        if (pIsUnseating) {
            if (!isSeatFree) return i;
            continue;
        }

        if (!isSeatFree) continue;

        return i;
    }

    return null;
};

on('ev-police:vehicle:unseat', async () => {
    const currentEntity = global.exports['ev-target'].GetCurrentEntity();

    if (!IsEntityAVehicle(currentEntity)) return;
    if (IsEntityAttachedToAnyPed(PlayerPedId())) return;

    

    const finished = await taskBar(5000, 'Unseating from vehicle', true, {
        distance: 7,
        entity: currentEntity
    });

    if (finished !== 100) return;

    const foundSeat = GetPedSeatOrAvailable(currentEntity, true, true);

    if (foundSeat === null) return;

    const foundPed = GetPedInVehicleSeat(currentEntity, foundSeat);

    if (!foundPed || !IsPedAPlayer(foundPed)) return;

    const foundServerId = GetPlayerServerId(NetworkGetPlayerIndexFromPed(foundPed));

    const entityNetId = NetworkGetNetworkIdFromEntity(currentEntity);

    emitNet('ev-police:vehicle:svUnseat', foundServerId, entityNetId);

    while (IsPedInAnyVehicle(foundPed, false)) {
        await Delay(100);
    }

    if (!isEscorting) {
        emitNet('ev-police:drag:ask', foundServerId);
    }
});

on('ev-police:vehicle:seat', async () => {
    console.log("ev-police:vehicle:seat", isInputBlocked);
    if (isInputBlocked) return;

    console.log("ev-police:vehicle:seat");

    const playerPedId = PlayerPedId();

    if (IsEntityAttachedToAnyPed(playerPedId)) return;

    const [foundPlayer, foundDistance] = GetClosestPlayer();

    if (!foundPlayer || !foundDistance || foundDistance > 3) {
        emit('DoLongHudText', 'No player near you (maybe get closer)!', 2);
        return;
    }

    const foundPlayerPed = GetPlayerPed(foundPlayer);
    const currentEntity = global.exports['ev-target'].GetCurrentEntity();

    if (!IsEntityAVehicle(currentEntity)) return;

    const finished = await taskBar(5000, 'Seating in vehicle', true, {
        distance: 5,
        entity: currentEntity
    });

    if (finished !== 100 || GetDistance(GetEntityCoords(playerPedId, true), GetEntityCoords(foundPlayerPed, true)) > 3) return;

    const isInSeat = IsPedInAnyVehicle(foundPlayerPed, false);
    const foundServerId = GetPlayerServerId(NetworkGetPlayerIndexFromPed(foundPlayerPed));
    const entityNetId = NetworkGetNetworkIdFromEntity(currentEntity);

    if (isInSeat) {
        emitNet('ev-police:vehicle:svUnseat', foundServerId, entityNetId);

        while (IsPedInAnyVehicle(foundPlayerPed, false)) {
            await Delay(100);
        }

        if (!isEscorting) {
            emitNet('ev-police:drag:ask', foundServerId);
        }

        return;
    }

    if (GetVehicleEngineHealth(currentEntity) < 100) {
        return emit('DoLongHudText', 'That vehicle is too damaged!', 2);
    }

    if (!AreAnyVehicleSeatsFree(currentEntity)) return emit('DoLongHudText', 'That vehicle is full!', 2);

    const foundSeat = GetPedSeatOrAvailable(currentEntity, false, false);

    if (foundSeat === null) return;

    emit('ev-police:drag:releaseEscort');

    emitNet('ev-police:vehicle:svSeat', foundServerId, entityNetId, foundSeat);
});

onNet('ev-police:vehicle:enterSeat', async (pVehicleNetId: number, pSeatIndex: number) => {
    const vehicle = NetworkGetEntityFromNetworkId(pVehicleNetId);

    if (!IsEntityAVehicle(vehicle)) return;

    emitNet('ev-police:drag:disable', escorterServerId);

    await Delay(100);

    TaskWarpPedIntoVehicle(PlayerPedId(), vehicle, pSeatIndex);
});

onNet('ev-police:vehicle:leaveSeat', (pVehicleNetId: number) => {
    const vehicle = NetworkGetEntityFromNetworkId(pVehicleNetId);

    if (!IsEntityAVehicle(vehicle)) return;

    TaskLeaveVehicle(PlayerPedId(), vehicle, 16);
});