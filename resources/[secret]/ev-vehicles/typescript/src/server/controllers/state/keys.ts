export function AddKey(pSource: number, pVIN: string) {
    emitNet("ev:vehicles:addKey", pSource, pVIN);
}

export function GetVehicleIdentifier(pNetId: number, pHandle? :number) {
    const vehicle = pHandle ? pHandle : NetworkGetEntityFromNetworkId(pNetId);
    if (!DoesEntityExist(Number(vehicle))) return false;
    const ent = Entity(Number(vehicle));
    if (!ent.state) return false;
    const state = ent.state;
    const result = state.vin ? state.vin : false;
    return result;
}