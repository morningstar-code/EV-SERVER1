import { Listener } from ".";

const InteractionZoneMap = new Map();
const InteractionActiveZones = new Set();

function AddInteractionZone(name: string, func: any) {
    InteractionZoneMap.set(name, func);
}

function RemoveInteractionZone(name: string) {
    InteractionZoneMap.delete(name);
}

export function IsInteractionZoneActive(name: string) {
    return InteractionActiveZones.has(name);
}

export function RegisterInteractionZone(pName: string, pMessage: string, pKey: number, cb: Function) {
    let cbData: any;
    const ControlPressed = (pControl: number) => {
        if (pControl !== pControl) return;
        cb(cbData);
    };
    AddInteractionZone(pName, {
        enter: (pData: any) => {
            if (Listener.hasKey(pName, pKey)) return;
            global.exports["ev-ui"].showInteraction(pMessage);
            cbData = pData;
            Listener.addKey(pName, pKey);
            Listener.on("IsControlJustReleased", ControlPressed);
        },
        exit: () => {
            global.exports["ev-ui"].hideInteraction();
            if (!Listener.hasKey(pName, pKey)) return;
            Listener.removeKey(pName, pKey);
            Listener.removeListener("IsControlJustReleased", ControlPressed);
        }
    });
}

on("ev-polyzone:enter", (pZone: string, pData: any) => {
    InteractionActiveZones.add(pZone);
    if (!InteractionZoneMap.has(pZone)) return;
    InteractionZoneMap.get(pZone).enter(pData);
});

on("ev-polyzone:exit", (pZone: string) => {
    InteractionActiveZones.delete(pZone);
    if (!InteractionZoneMap.has(pZone)) return;
    InteractionZoneMap.get(pZone).exit();
});