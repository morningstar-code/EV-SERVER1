import { v4 as uuidv4 } from 'uuid';
import { Vector3 } from '@shared/classes/vector3';
import { now } from '@shared/utils/tools';
import { getCid } from 'server/util/util';
import { Repository } from './repository';
import { AddStaticObject, RemoveStaticObject } from './static';

export const isDevEnv = GetConvar('sv_saveStaticObjects', '0') === '1';

export const ObjectList = new Map<string, PlacedObject>();
export const NamespacedObjects = new Map<string, Set<string>>();
export const ExpiryObjects = new Set<string>();

const globalExports = global.exports as ServerExports;

export const AddObjects = (objects: PlacedObject[]): void => {
    objects.forEach((object) => {
        ObjectList.set(object.id, object);
    });
};

export const RemoveObjects = (objects: (PlacedObject | undefined)[]): void => {
    if (!objects || objects.length === 0) return;
    objects.forEach(({ id, ns }: any) => {
        ObjectList.delete(id);
        if (NamespacedObjects.has(ns)) {
            NamespacedObjects.get(ns)?.delete(id);
        }
        ExpiryObjects.delete(id);
    });
};

export const SaveObjects: Objects.ServerExports['SaveObjects'] = async (pObjects: Objects.SaveObjectData[]) => {    
    const cidAndWorldCache = new Map<number, [number, string]>();
    const objects = await Promise.all(
        pObjects.map(async (obj) => {
            // Set defaults for namespace, public, private, and persistent properties.
            obj.namespace ??= 'objects';
            obj.public ??= {};
            obj.private ??= {};
            obj.persistent ??= 'dynamic';

            if (obj.source !== -1 && !cidAndWorldCache.has(obj.source)) {
                const cid = await getCid(obj.source);
                const world = global.exports['ev-infinity'].GetWorld(obj.source);
                cidAndWorldCache.set(obj.source, [cid, world]);
            }

            const _model = typeof obj.model === 'number' ? obj.model : GetHashKey(obj.model);
            const _expires = obj.expiryTime ? now() + obj.expiryTime : null;
            const _owner = obj.source === -1 ? -1 : cidAndWorldCache.get(obj.source)![0];
            const _world = obj.world ? obj.world : obj.source === -1 ? 'default' : cidAndWorldCache.get(obj.source)![1];

            const placedObj: PlacedObject = {
                id: uuidv4(),
                model: _model,
                ns: obj.namespace,
                coords: obj.coords,
                rotation: obj.rotation,
                persistent: obj.persistent,
                public: obj.public,
                private: { ...obj.private, owner: _owner },
                createdAt: now(),
                expiresAt: _expires,
                world: _world,
            };

            ObjectList.set(placedObj.id, placedObj);

            if (_expires) {
                ExpiryObjects.add(placedObj.id);
            }

            if (obj.persistent === 'dynamic') {
                await AddDynamicObject(placedObj);
            } else if (isDevEnv && obj.persistent === 'static') {
                await AddStaticObject(placedObj);
            } else {
                ObjectList.set(placedObj.id, placedObj);
            }

            return placedObj;
        }),
    );

    SendObjectsAdded(objects);

    return objects.map((obj) => obj.id);
};

export const SaveObject: Objects.ServerExports['SaveObject'] = async (
    pSource,
    pNamespace,
    pModel,
    pCoords,
    pRotation,
    pPublic,
    pPrivate,
    pPersistent,
    pExpiryTime?,
    pWorld?,
) => {
    const savedObjects = await SaveObjects([
        {
            source: pSource,
            namespace: pNamespace,
            model: pModel,
            coords: pCoords,
            rotation: pRotation,
            public: pPublic,
            private: pPrivate,
            persistent: pPersistent,
            expiryTime: pExpiryTime,
            world: pWorld,
        }
    ]);

    return savedObjects[0];
};

export const LoadDynamicObjects = async (pSource: number): Promise<void> => {
    await Repository.removeExpired();
    const dbObjects = await Repository.getObjects();
    AddObjects(dbObjects.map((o) => ({ ...o, persistent: 'dynamic' })));
    SendObjectsLoaded(pSource, dbObjects);
    console.log(`[OBJECTS] Loaded ${dbObjects.length} objects from database.`);
};

export const AddDynamicObject = async (object: PlacedObject): Promise<void> => {
    await Repository.addObject(object);
};

export const RemoveDynamicObject = async (pId: string): Promise<void> => {
    RemoveObjects([GetObject(pId)!]);
    await Repository.removeObject(pId);
    SendObjectsRemoved(pId);
};

const getDatagridData = (pObject: PlacedObject): { [key: string]: any } => {
    const rotation = Vector3.fromObject(pObject.rotation);
    return {
        _b: true,
        _m: Number(pObject.model),
        _r: rotation
            .getArray()
            .map((r) => r.toFixed(3))
            .join(','),
        _md: pObject.public
    };
};

export const SendObjectsLoaded = (pSource: number, pObjects: PlacedObject[]) => {
    if (!pObjects || pObjects.length === 0) return;

    pObjects.forEach((obj) => {
        if (!NamespacedObjects.has(obj.ns)) {
            NamespacedObjects.set(obj.ns, new Set());
        }
        NamespacedObjects.get(obj.ns)?.add(obj.id);
    });

    const mappedObjects = pObjects
        .map((obj) => {
            try {
                const object = {
                    id: obj.id,
                    ns: obj.ns,
                    worldId: obj.world,
                    x: obj.coords.x,
                    y: obj.coords.y,
                    z: obj.coords.z,
                    data: getDatagridData(obj),
                };
                return object as any; //Dirty fix
            } catch (e) {
                console.error(`[OBJECTS] Malformed JSON on object: ${obj.id} --------------------------------------------`);
            }
            return null;
        })
        .filter((obj) => obj !== null) as Objects.NetworkedDatagridObject<unknown>[];

    emitNet("ev-objects:loadDynamicObjects", pSource, mappedObjects);
};

export const SendObjectsAdded = (pObjects: PlacedObject[]) => {
    if (!pObjects || pObjects.length === 0) return;
    
    pObjects.forEach((obj) => {
        if (!NamespacedObjects.has(obj.ns)) {
            NamespacedObjects.set(obj.ns, new Set());
        }
        NamespacedObjects.get(obj.ns)?.add(obj.id);
    });

    const mappedObjects = pObjects
        .map((obj) => {
            try {
                const object = {
                    id: obj.id,
                    ns: obj.ns,
                    worldId: obj.world,
                    x: obj.coords.x,
                    y: obj.coords.y,
                    z: obj.coords.z,
                    data: getDatagridData(obj),
                };
                return object as any; //Dirty fix
            } catch (e) {
                console.error(`[OBJECTS] Malformed JSON on object: ${obj.id} --------------------------------------------`);
            }
            return null;
        })
        .filter((obj) => obj !== null) as Objects.NetworkedDatagridObject<unknown>[];

    emitNet("ev-objects:addDynamicObject", -1, mappedObjects); //Hmm...
};

export const SendObjectsUpdated = (pItemsToUpdate: UpdatedObject[]) => {
    emitNet("ev-objects:updateDynamicObjects", -1, pItemsToUpdate);
};

export const SendObjectsRemoved = (pIds: string | string[]) => {
    emitNet("ev-objects:removeDynamicObject", -1, pIds);
};

export const UpdateObject: Objects.ServerExports['UpdateObject'] = async (
    pId,
    pPublic?,
    pPrivate?,
    pModel?,
    pExpiryTime?,
    pCoords?,
    pRotation?,
    pShouldUpdateObjectList = false
) => {
    const object = GetObject(pId);
    if (!object) return false;
    const successes = await UpdateObjects([{ id: pId, public: pPublic, private: pPrivate, model: pModel, expiryTime: pExpiryTime, coords: pCoords, rotation: pRotation }], pShouldUpdateObjectList);
    return successes?.[0] || false;
};

export const UpdateObjects: Objects.ServerExports['UpdateObjects'] = async (pObjects, pShouldUpdateObjectList = false) => {
    const itemsToUpdate: { id: string, data: any, newCoords?: Vector3Format }[] = [];
    const successes = await Promise.all(pObjects.map(async (object) => {
        const savedObject = GetObject(object.id);
        if (!savedObject) return false;

        savedObject.public = { ...savedObject.public, ...object.public ?? {} };
        savedObject.private = { ...savedObject.private, ...object.private ?? {} };
        savedObject.model = object.model ? (typeof object.model === 'number' ? object.model : GetHashKey(object.model)) : savedObject.model;
        savedObject.updatedAt = now();
        savedObject.expiresAt = object.expiryTime ? (savedObject.expiresAt ? savedObject.expiresAt + object.expiryTime : now() + object.expiryTime) : savedObject.expiresAt;
        savedObject.coords = object.coords ? object.coords : savedObject.coords;
        savedObject.rotation = object.rotation ? object.rotation : savedObject.rotation;

        if (object.public || object.model || object.coords || object.rotation) {
            itemsToUpdate.push({ id: object.id, data: getDatagridData(savedObject), newCoords: object.coords });
        }

        if (savedObject.persistent === 'dynamic') {
            await Repository.updateObject(
                object.id,
                savedObject.public,
                savedObject.private,
                savedObject.model,
                savedObject.expiresAt,
                savedObject.coords,
                savedObject.rotation
            );

            /*
                object.public ? savedObject.public : null,
                object.private ? savedObject.private : null,
                object.model ? savedObject.model : null,
                object.expiryTime ? savedObject.expiresAt : null,
                object.coords ? savedObject.coords : null,
                object.rotation ? savedObject.rotation : null,
            */
        }

        if (savedObject.expiresAt && !ExpiryObjects.has(savedObject.id)) {
            ExpiryObjects.add(savedObject.id);
        }

        if (pShouldUpdateObjectList) {
            ObjectList.set(savedObject.id, savedObject);
        }

        return true;
    }));

    //globalExports['ev-datagrid'].updateItems(itemsToUpdate);
    SendObjectsUpdated(itemsToUpdate);

    return successes;
};

export const GetObject: Objects.ServerExports['GetObject'] = (pId) => {
    const object = ObjectList.get(pId);
    if (!object || (object.expiresAt && object.expiresAt < now())) return null;
    return object;
};

export const GetObjectsByNamespace: Objects.ServerExports['GetObjectsByNamespace'] = (pNamespace) => {
    return Array.from(NamespacedObjects.get(pNamespace) || [])
        .map((id) => ObjectList.get(id))
        .filter((o) => (o && o.expiresAt ? o.expiresAt > now() : true));
};

export const GetNumObjectsByNamespace: Objects.ServerExports['GetNumObjectsByNamespace'] = (pNamespace) => {
    return GetObjectsByNamespace(pNamespace).length;
};

export const RemoveObject: Objects.ServerExports['RemoveObject'] = async (pId) => {
    const object = GetObject(pId);
    if (!object) return false;

    if (object.persistent === 'dynamic') {
        await RemoveDynamicObject(pId);
    } else if (object.persistent === 'static') {
        RemoveStaticObject(pId);
    } else {
        RemoveObjects([ObjectList.get(pId)!]);
    }

    return true;
};

export const CheckExpiredObjects = async (): Promise<void> => {
    const expiredObjects = Array.from(ExpiryObjects)
        .map((id) => ObjectList.get(id))
        .filter((object) => object && object.expiresAt && object.expiresAt < now());

    if (expiredObjects.length > 0) {
        // expiredObjects.forEach((o) => {
        //     globalExports['ev-datagrid'].removeItem(o?.id || '');
        // });
        expiredObjects.forEach((o) => {
            //TODO;
        });
        RemoveObjects(expiredObjects);
    }
};

global.exports('SaveObject', SaveObject);
global.exports('SaveObjects', SaveObjects);
global.exports('DeleteObject', RemoveObject);
global.exports('UpdateObject', UpdateObject);
global.exports('UpdateObjects', UpdateObjects);
global.exports('GetObject', GetObject);
global.exports('GetObjectsByNamespace', GetObjectsByNamespace);
global.exports('GetNumObjectsByNamespace', GetNumObjectsByNamespace);

global.exports('SaveObjectPromise', (
    pCallback: Function,
    pSource: number,
    pNamespace: string,
    pModel: string | number,
    pCoords: Vector3Format,
    pRotation: Vector3Format,
    pPublic: any,
    pPrivate: any,
    pPersistent: 'dynamic' | 'static',
    pExpiryTime?: number,
    pWorld?: string,
) => {
    return new Promise(async (resolve, reject) => {
        const object = await SaveObject(
            pSource,
            pNamespace,
            pModel,
            pCoords,
            pRotation,
            pPublic,
            pPrivate,
            pPersistent,
            pExpiryTime,
            pWorld
        );
        
        if (object) {
            pCallback(object);
        }
    });
});

global.exports('UpdateObjectPromise', async (
    pCallback: Function,
    pShouldUpdateObjectList: boolean,
    pId: string,
    pPublic?: any,
    pPrivate?: any,
    pModel?: string | number,
    pExpiryTime?: number,
    pCoords?: Vector3Format,
    pRotation?: Vector3Format,
) => {
    const result = await UpdateObject(
        pId,
        pPublic,
        pPrivate,
        pModel,
        pExpiryTime,
        pCoords,
        pRotation,
        pShouldUpdateObjectList
    );

    pCallback(result);
});

global.exports('DeleteObjectPromise', async (
    pCallback: Function,
    pId: string
) => {
    const object = await RemoveObject(pId);

    if (object) {
        pCallback(object);
    }
});

AsyncExports('SaveObjectAsync', SaveObject);
AsyncExports('SaveObjectsAsync', SaveObjects);
AsyncExports('DeleteObjectAsync', RemoveObject);
AsyncExports('UpdateObjectAsync', UpdateObject);
AsyncExports('UpdateObjectsAsync', UpdateObjects);
AsyncExports('GetObjectAsync', GetObject);
AsyncExports('GetObjectsByNamespaceAsync', GetObjectsByNamespace);
AsyncExports('GetNumObjectsByNamespaceAsync', GetNumObjectsByNamespace);