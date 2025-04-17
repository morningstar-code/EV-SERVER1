import { Events } from "@shared/cpx/client";
import { FindPhotoInPhotobook } from "./photobook";
import { FirstPersonThread } from "./polaroid";

export async function InitUI(): Promise<void> { };

RegisterUICallback('ev-polaroid-capture:setFilter', async ({ key: pKey }: any, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: 'done' } });
    pKey?.filter && (FirstPersonThread.data.filter = pKey?.filter);
});

RegisterUICallback('ev-polaroid:setDescription', async (data: any, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: 'done' } });

    let success = false;
    if (data?.description && data.description.length > 0) {
        const [photos, photo] = await FindPhotoInPhotobook(data?.photobookId, data?.id);

        if (photo) {
            photo.description = data.description;

            //Events.emitNet('ev-polaroid:setDescription', data?.photobookId, photo.id, photo.description);
            emitNet('ev-polaroid:setDescription', data?.photobookId, photo.id, photo.description);

            success = true;
        }
    }
    if (!success) {
        emit('DoLongHudText', 'Could not set description.', 2);
    }
});

RegisterUICallback('ev-polaroid:showOthers', async (data: any, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: 'done' } });

    //Events.emitNet('ev-polaroid:showOthers', data?.photoInfo, data?.fromBinder);
    emitNet('ev-polaroid:showOthers', data?.photoInfo, data?.fromBinder);
});

RegisterUICallback('ev-polaroid:moveToInventory', async (data: any, cb: Function) => {    
    cb({ data: {}, meta: { ok: true, message: 'done' } });

    if (data?.id && data?.photoBookId) {
        const [photos, photo] = await FindPhotoInPhotobook(data?.photoBookId, data?.id);

        if (photo) {
            delete photos[photos.indexOf(photo)];
            delete photo.photobook_id;
            //Events.emitNet('ev-polaroid:moveToInventory', data?.id, data?.uuid, data?.photoBookId);
            emitNet('ev-polaroid:moveToInventory', data?.id, data?.uuid, data?.photoBookId);
        }
    }
});

RegisterUICallback('ev-polaroid:deletePhoto', async (data: any, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: 'done' } });

    if (data?.id && data?.photoBookId) {
        const [photos, photo] = await FindPhotoInPhotobook(data?.photoBookId, data?.id);

        if (photo) {
            delete photos[photos.indexOf(photo)];
            //Events.emitNet('ev-polaroid:deletePhoto', data?.id, data?.uuid, data?.photoBookId);
            emitNet('ev-polaroid:deletePhoto', data?.id, data?.uuid, data?.photoBookId);
        }
    }
});

RegisterUICallback('ev-polaroid:getConfig', async (data: any, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: 'done' } });
});