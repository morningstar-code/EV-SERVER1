import { LoadDynamicObjects, RemoveObject, SaveObject, UpdateObject } from "./object";


RPC.register('ev-objects:SaveObject', async (
    pSource: number,
    pNamespace: string,
    pModel: string | number,
    pCoords: Vector3Format,
    pRotation: Vector3Format,
    pPublic: { [key: string]: any },
    pExpiryTime?: number
): Promise<string> => {
    return await SaveObject(pSource, pNamespace, pModel, pCoords, pRotation, pPublic, null, 'dynamic', pExpiryTime);
});

RPC.register(
    'ev-objects:DeleteObject',
    async (pSource: number, pId: string): Promise<boolean> => {
        return await RemoveObject(pId);
    },
);

RPC.register(
    'ev-objects:UpdateObject', async (
        pSource: number,
        id: string,
        pPublic?: { [key: string]: any },
        pModel?: string | number,
        pCoords?: Vector3Format,
        pRotation?: Vector3Format,
    ): Promise<boolean> => {
        return await UpdateObject(id, pPublic, null, pModel, null, pCoords, pRotation);
    }
);

RPC.register(
    'ev-objects:SeedObjects',
    async (pSource: number): Promise<void> => {
        return await LoadDynamicObjects(pSource);
    }
);