import { PoliceConfig } from "@shared/config";
import { IsZoneActive } from "./zones";

type CallsignModTypes = {
    [key: string]: string;
};

const callsignModTypes = {
    '1': "ArchCover",
    '2': "ExteriorTrim",
    '3': "Tank"
} as CallsignModTypes;

export const updateVehicleCallsign = async (pCallsign: string) => {
    if (!IsZoneActive('police_station')) return emit('DoLongHudText', 'You must be in a police station to do this!', 2);
    if (isNaN(Number(pCallsign)) || pCallsign.length < 3 || pCallsign.length > 3) return emit('DoLongHudText', 'Please enter a valid callsign!', 2);

    const vehicle = GetVehiclePedIsIn(PlayerPedId(), false);
    if (vehicle === 0) return;
    if (GetPedInVehicleSeat(vehicle, -1) !== PlayerPedId()) return;

    const model = GetEntityModel(vehicle);

    const policeModels = PoliceConfig!.policeVehicles.map((model) => GetHashKey(model));
    if (!policeModels.includes(model)) return;

    const mods = pCallsign.split('').map((modIndex, index) => {
        return {
            modType: callsignModTypes[index + 1],
            modIndex: Number(modIndex)
        };
    });

    const success = await RPC.execute('ev-police:server:saveVehicleMods', NetworkGetNetworkIdFromEntity(vehicle), mods);
    return success ? emit('DoLongHudText', 'Callsign updated!', 1) : emit('DoLongHudText', 'Failed to update callsign!', 2);
};