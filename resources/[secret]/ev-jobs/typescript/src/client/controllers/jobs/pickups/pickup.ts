const PickupBlips = new Map<string, Vector3>();

export async function InitPickup(): Promise<void> { }

export function AddPickupBlip(pName: string, pCoords: Vector3) {
    PickupBlips.set(pName, pCoords);
}

export function GetPickupBlip(pName: string) {
    return PickupBlips.get(pName);
}

export function HasPickupBlip(pName: string) {
    return PickupBlips.has(pName);
}