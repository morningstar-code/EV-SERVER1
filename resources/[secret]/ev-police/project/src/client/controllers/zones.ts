import { maxHungerAndThirst } from "./cells";

const ActiveZones = new Set<string>();
const pEnabled = false;

export function IsZoneActive(pZone: string) {
    return ActiveZones.has(pZone);
}

on('ev-polyzone:enter', (pZone: string, pData: { id: string }) => {
    ActiveZones.add(pZone);
    if (pZone === 'police_cell') maxHungerAndThirst();
    if (pEnabled && pZone === 'police_station' && pData?.id === 'sspd') {
        const interior = GetInteriorAtCoords(1826.05, 3676.26, 36.3928);
        if (IsValidInterior(interior)) {
            if (IsInteriorEntitySetActive(interior, 'sdso_meeting')) {
                DeactivateInteriorEntitySet(interior, 'sdso_meeting');
                ActivateInteriorEntitySet(interior, 'sdso_pizza');
                RefreshInterior(interior);
            }
        }
    }
});

on('ev-polyzone:exit', (pZone: string) => {
    ActiveZones.delete(pZone);
});