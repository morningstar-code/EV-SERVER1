const pZones = new Set();

export function isInZone(pId: string) {
    return pZones.has(pId);
}

export async function InitZones(): Promise<void> {
    on("ev-polyzone:enter", (pZone: string, pData: { id: string | number }) => {
        if (!pData.id) return;
        pZones.add(pZone);
        if (pData.id) pZones.add(pData.id);
    });
    on("ev-polyzone:exit", (pZone: string, pData: { id: string | number }) => {
        if (!pData.id) return;
        pZones.delete(pZone);
        if (pData.id) pZones.delete(pData.id);
    });
};