import { QueueManager } from "client/util/queue-manager";
import { Debug, LoadModel, deleteObject } from "client/util/util";
import { Vector3 } from "@shared/classes/vector3";
import { GetDistance } from "@shared/utils/tools";

const objectMap = new Map<string, number>(); //Holds object id to object data (visible only)
const reverseMap = new Map<number, string>(); //Holds visible entity id to object id (visible only)
const dataStore = new Map<string, Objects.DatagridObject<unknown>>(); //Holds all objects in memory

const queueManager = new QueueManager();
let activeZones: any = [];

const createObject: Objects.ClientFunctions['CreateObject'] = async (item) => {
    Debug(`[OBJECTS] Spawning object ${item?.id} at ${item?.x},${item?.y},${item?.z}`);

    await LoadModel(item?.data?.model);
    if (!HasModelLoaded(item?.data?.model)) {
        throw new Error(`Unable to load model ${item?.data?.model} (id: ${item?.id}) at ${item?.x},${item?.y},${item?.z}`);
    }

    const handle = CreateObjectNoOffset(item?.data?.model, item?.x, item?.y, item?.z, false, false, false);

    const netId = NetworkGetNetworkIdFromEntity(handle);
    
    if (typeof item?.worldId === 'string' && item?.worldId !== 'world') {
        await RPC.execute("ev-infinity:setEntityWorld", netId, item?.worldId);
    }

    SetEntityRotation(handle, item?.data?.rotation?.x, item?.data?.rotation?.y, item?.data?.rotation?.z, 2, true);
    FreezeEntityPosition(handle, item?.data?.metadata?.freeze ?? true);
    Entity(handle).state.DontClear = true;
    SetEntityAsMissionEntity(handle, true, true);
    SetModelAsNoLongerNeeded(item?.data?.model);
    // ActivatePhysics(handle);
    return handle;
};

export const getObject: Objects.ClientExports['GetObject'] = (id) => {
    return dataStore.get(id);
};

export const getObjectByEntity: Objects.ClientExports['GetObjectByEntity'] = (entity) => {
    const id = reverseMap.get(entity);
    if (!id) return null;
    return dataStore.get(id);
};

export const getObjectsByNamespace: Objects.ClientExports['GetObjectsByNamespace'] = (namespace) => {
    return [...dataStore.values()].filter(o => o.ns === namespace);
}

export const getEntityByObjectId: Objects.ClientExports['GetEntityByObjectId'] = (pId) => {
    return objectMap.get(pId);
};

export const updateObject: Objects.ClientExports['UpdateObject'] = async (pId, pPublic, pModel, pCoords, pRotation) => {
    return await RPC.execute('ev-objects:UpdateObject', pId, pPublic, pModel, pCoords, pRotation);
};

export const removeObject: Objects.ClientExports['DeleteObject'] = async (id) => {
    return await RPC.execute('ev-objects:DeleteObject', id);
};

export const getVisibleEntities: Objects.ClientExports['GetVisibleEntities'] = () => {
    return Array.from(objectMap.values());
};

export const getVisibleObjects: Objects.ClientExports['GetVisibleObjects'] = (namespace?) => {
    console.log(JSON.stringify([...objectMap.keys()], null, 2));
    const objects = [...objectMap.keys()].map(id => dataStore.get(id));
    if (!namespace) return objects;
    return objects.filter(o => o?.ns === namespace);
};

export const addObject: Objects.ClientFunctions['AddObject'] = (networkItem, fromLoad = false) => {
    Debug(`[OBJECTS] Adding object (ID: ${networkItem.id})`);

    const item = networkItem as unknown as Objects.NetworkedDatagridObject<unknown>;
    if (!item.data || !item.data._b) {
        return;
    }

    const _item = {
        id: item.id,
        ns: item.ns,
        x: item.x,
        y: item.y,
        z: item.z,
        worldId: item.worldId,
        data: {
            builder: item.data._b,
            model: item.data._m,
            rotation: Vector3.fromArray(item.data._r.split(',').map(v => parseFloat(v))),
            metadata: item.data._md
        },
    };

    dataStore.set(item.id, _item);

    emit('ev-objects:objectLoaded', _item);

    PolyZone.addCircleZone(
        'object_zone',
        { x: _item.x, y: _item.y, z: _item.z },
        Math.max(75, 2 * 20),
        { data: { id: _item.id, ns: _item.ns, worldId: item.worldId } }
    );

    const plyCoords = GetEntityCoords(PlayerPedId());
    const objCoords = [_item.x, _item.y, _item.z];
    if (GetDistance(plyCoords, objCoords) <= 25) {
        fromLoad && emit('ev-polyzone:enter', 'object_zone', { id: _item.id, ns: _item.ns, worldId: item.worldId });
        activeZones.push({
            id: _item.id,
            vector: { x: _item.x, y: _item.y, z: _item.z }
        });
    }
}

onNet('ev-objects:loadDynamicObjects', async (objects: Objects.NetworkedDatagridObject<unknown>[]) => {
    objects.forEach((object) => {
        addObject(object, true);
    });

    Debug(`[OBJECTS] Loaded ${objects.length} objects.`);
});

onNet('ev-objects:addDynamicObject', async (objects: Objects.NetworkedDatagridObject<unknown>[]) => {
    objects.forEach((object) => {
        addObject(object);
    });
});

onNet('ev-objects:removeDynamicObject', async (id: string) => {
    const item = dataStore.get(id);
    const handle = objectMap.get(id);

    if (item && !handle) {
        Debug(`[OBJECTS] Removing object (ID: ${id})`);
        dataStore.delete(id);
    } else if (item && handle) {
        Debug(`[OBJECTS] Removing object (ID: ${id}) [${handle}] | Exists: ${DoesEntityExist(handle)}`);
        emit('ev-objects:objectDeleting', item, handle);

        if (WasEventCanceled()) return;
    
        deleteObject(handle);
        objectMap.delete(id);
        reverseMap.delete(handle);
        dataStore.delete(id);
        emit('ev-objects:objectDeleted', item);
    }
});

onNet('ev-objects:updateDynamicObjects', async (itemsToUpdate: UpdatedObject[]) => {
    const itemToUpdate = itemsToUpdate[0];
    const id = itemToUpdate.id;
    const data = itemToUpdate.data;
    const newCoords = itemToUpdate.newCoords;
    const item = dataStore.get(itemToUpdate.id);
    const handle = objectMap.get(itemToUpdate.id);

    Debug(`[OBJECTS] Updating object (ID: ${id}) [${handle}] | Old Model: ${item?.data?.model} | New Model: ${data?._m}`);

    if (item && !handle) {
        //They are not in the zone, so we just need to update the dataStore.
        const _data = {
            builder: data._b,
            model: data._m,
            rotation: Vector3.fromArray(data._r.split(',').map(v => parseFloat(v))),
            metadata: data._md
        }

        item.data = _data;

        if (newCoords) {
            item.x = newCoords.x;
            item.y = newCoords.y;
            item.z = newCoords.z;
        }

        dataStore.set(id, item);
    } else if (item && handle) {
        //They are in zone, update objectMap, reverseMap, and dataStore.
        const _data = {
            builder: data._b,
            model: data._m,
            rotation: Vector3.fromArray(data._r.split(',').map(v => parseFloat(v))),
            metadata: data._md
        }
        
        item.data = _data;

        if (newCoords) {
            item.x = newCoords.x;
            item.y = newCoords.y;
            item.z = newCoords.z;
            SetEntityCoords(handle, item.x, item.y, item.z, false, false, false, false);
            SetEntityRotation(handle, _data.rotation.x, _data.rotation.y, _data.rotation.z, 2, true);
            dataStore.set(id, item);

            emit('ev-objects:objectUpdated', item, handle);

            //if (item?.data?.model === data?._m) return;
        }

        emit('ev-objects:objectRecreating', item, handle);

        if (WasEventCanceled()) return;

        deleteObject(handle);
        const object = await createObject(item);
        objectMap.set(id, object);
        reverseMap.delete(handle);
        reverseMap.set(object, id);

        emit('ev-objects:objectRecreated', item, object);
    }

    //emit('ev-objects:objectUpdated', item, handle);
});

on('ev-polyzone:enter', async (name: string, data: { id: string, ns: string, worldId: string }) => {
    if (name !== 'object_zone') return;

    const item = dataStore.get(data.id);
    if (!item) return;

    Debug(`[OBJECTS] Entered zone (ID: ${data.id})`);

    emit('ev-objects:objectCreating', item);

    if (WasEventCanceled()) return;
    if (item.data.model === 0) return;

    if (objectMap.has(item.id)) objectMap.delete(item.id);

    reverseMap.forEach((objectId, key) => {
        if (objectId === item.id) {
            reverseMap.delete(key);
        }
    });

    Debug(`[OBJECTS] Attempting to create object (ID: ${item.id})`);

    const object = await createObject(item);
    objectMap.set(item.id, object);
    reverseMap.set(object, item.id);

    activeZones.push({
        id: item.id,
        vector: { x: item.x, y: item.y, z: item.z }
    });

    emit('ev-objects:objectCreated', item, object);
});

on('ev-polyzone:exit', (name: string, data: { id: string, ns: string, worldId: string }) => {
    if (name !== 'object_zone') return;
    if (!dataStore.has(data.id)) return;

    Debug(`[OBJECTS] Exited zone (ID: ${data.id})`);

    const item = dataStore.get(data.id);
    const handle = objectMap.get(data.id);
    if (!item || !handle) return;

    emit('ev-objects:objectDeleting', item, handle);

    if (WasEventCanceled()) return;

    deleteObject(handle);
    objectMap.delete(data.id);
    reverseMap.delete(handle);

    activeZones = activeZones.filter((z: { id: string, vector: Vector3 }) => z.id !== item.id);

    emit('ev-objects:objectDeleted', item, handle);
});

on('onResourceStop', async (resource: string) => {
    if (resource !== GetCurrentResourceName()) return;

    for (const [handle, id] of reverseMap) {
        Debug(`[OBJECTS] Deleting object (ID: ${id}) [${handle}] | Exists: ${DoesEntityExist(handle)}`);
        deleteObject(handle);
        objectMap.delete(id);
    }

    reverseMap.clear();
    dataStore.clear();
    activeZones = [];
});

global.exports('GetObject', getObject);
global.exports('GetObjectByEntity', getObjectByEntity);
global.exports('GetVisibleEntities', getVisibleEntities);
global.exports('GetVisibleObjects', getVisibleObjects);
global.exports('GetEntityByObjectId', getEntityByObjectId);
global.exports('GetObjectsByNamespace', getObjectsByNamespace);
global.exports('DeleteObject', removeObject);
global.exports('UpdateObject', updateObject);