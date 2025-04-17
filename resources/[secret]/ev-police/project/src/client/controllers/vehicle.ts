export const spawnedVehicle = (pVehicle: number) => {
    const model = GetEntityModel(pVehicle);
    switch (model) {
        case GetHashKey('volatus'):
        case GetHashKey('volatus2'):
        case GetHashKey('hydra2'):
        case GetHashKey('blimp2'):
        case GetHashKey('blimp3'):
        case GetHashKey('cargobob'):
        case GetHashKey('avengercb'):
        case GetHashKey('tula'):
        case GetHashKey('duster'):
            fullyRefuelAndRepairVehicle(pVehicle);
            break;
        case GetHashKey('hydra3'): {
            fullyRefuelAndRepairVehicle(pVehicle);
            SetVehicleExtra(pVehicle, 1, true);
        }
            break;
        default:
            break;
    }
};

export const fullyRefuelAndRepairVehicle = async (pVehicle: number) => {
    const netId = NetworkGetNetworkIdFromEntity(pVehicle);
    SetVehicleDirtLevel(pVehicle, 0);
    RemoveDecalsFromVehicle(pVehicle);
    await RPC.execute('ev-police:server:fullyRefuelVehicle', netId);
    await RPC.execute('ev-police:server:fullyRepairVehicle', netId);
};