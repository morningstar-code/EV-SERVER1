export const Events = {
    on: (event: string, callback: Function) => {
        return APX.Events.on(event, callback);
    },
    onNet: (event: string, callback: Function) => {
        return APX.Events.onNet(event, callback);
    },
    emit: (event: string, ...args: any[]) => {
        return APX.Events.emit(event, ...args);
    },
    emitNet: (event: string, ...args: any[]) => {
        return APX.Events.emitNet(event, ...args);
    },
    remove: (event: string, callback: Function) => {
        return APX.Events.remove(event, callback);
    }
}

export const Procedures = {
    register: (name: string, callback: Function) => {
        return APX.Procedures.register(name, callback);
    },
    execute: (name: string, ...args: any[]) => {
        return APX.Procedures.execute(name, ...args);
    }
}

export const Zones = {
    isActive: (zone: string, data: any) => {
        return APX.Zones.isActive(zone, data);
    },
    onEnter: (zone: string, callback: Function) => {
        return APX.Zones.onEnter(zone, callback);
    },
    onExit: (zone: string, callback: Function) => {
        return APX.Zones.onExit(zone, callback);
    },
    addBoxZone: (id: string, zone: string, pCoords: any, pLength: number, pWidth: number, pOptions: any, pData = {}) => {
        return APX.Zones.addBoxZone(id, zone, pCoords, pLength, pWidth, pOptions, pData);
    },
    addBoxTarget: (id: string, event: string, pCoords: any, pLength: number, pWidth: number, pOptions: any, pData = {}) => {
        return APX.Zones.addBoxTarget(id, event, pCoords, pLength, pWidth, pOptions, pData);
    }
}

export const Streaming = {
    loadModel: (model: string) => {
        return APX.Streaming.loadModel(model);
    },
    loadTexture: (texture: string) => {
        return APX.Streaming.loadTexture(texture);
    },
    loadAnim: (anim: string) => {
        return APX.Streaming.loadAnim(anim);
    },
    loadClipSet: (clipSet: string) => {
        return APX.Streaming.loadClipSet(clipSet);
    },
    loadWeaponAsset: (weaponAsset: string, p1: any, p2: any) => {
        return APX.Streaming.loadWeaponAsset(weaponAsset);
    },
    loadNamedPtfxAsset: (asset: string) => {
        return APX.Streaming.loadNamedPtfxAsset(asset);
    }
}

export const Utils = {
    cache: (callback: any, options: any) => {
        return APX.Utils.cache(callback, options);
    },
    cacheableMap: (callback: any, options: any) => {
        return APX.Utils.cacheableMap(callback, options);
    },
    waitForCondition: (condition: any, timeout: number) => {
        return APX.Utils.waitForCondition(condition, timeout);
    },
    getMapRange: (p1: any, p2: any, p3:any) => {
        return APX.Utils.getMapRange(p1, p2, p3);
    },
    getDistance: ([x1, y1, z1]: number[], [x2, y2, z2]: number[]) => {
        return APX.Utils.getDistance([x1, y1, z1], [x2, y2, z2]);
    },
    getRandomNumber: (min: number, max: number) => {
        return APX.Utils.getRandomNumber(min, max);
    }
}

export const Interface = {
    addPeekEntryByModel: (model: string | string[] | number[], data: any, options: any) => {
        return APX.Interface.addPeekEntryByModel(model, data, options);
    },
    addPeekEntryByTarget: (event: string, data: any, options: any) => {
        return APX.Interface.addPeekEntryByTarget(event, data, options);
    },
    addPeekEntryByFlag: (flag: string[], data: any, options: any) => {
        return APX.Interface.addPeekEntryByFlag(flag, data, options);
    },
    taskBar: (length: number, name: string, runCheck = false, moveCheck = null) => {
        return APX.Interface.taskBar(length, name, runCheck, moveCheck);
    },
    phoneConfirmation: (title: string, text: string, icon?: string) => {
        return APX.Interface.phoneConfirmation(title, text, icon);
    },
    phoneNotification: (app: string, title: string, body: string, showEvenIfActive = true) => {
        return APX.Interface.phoneNotification(app, title, body, showEvenIfActive);
    }
}

export const Hud = {
    createBlip: (type: any, ...args: any) => {
        return APX.Hud.createBlip(type, ...args);
    },
    applyBlipSettings: (blip: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any) => {
        return APX.Hud.applyBlipSettings(blip, p1, p2, p3, p4, p5, p6, p7);
    }
}