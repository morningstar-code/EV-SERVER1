import { Vector } from "@shared/classes/vector";
import { Delay } from "@shared/utils/tools";

export function SetWayPoint(pCoords: Vector) {
    IsWaypointActive() && DeleteWaypoint();
    SetNewWaypoint(pCoords.x, pCoords.y);
}

export function DisplayTextOnWorldCoord(worldCoord: any, text: any, offset: any) {
    const [screenX, screenY, screenZ] = GetScreenCoordFromWorldCoord(worldCoord['x'] + offset['x'], worldCoord['y'] + offset['y'], worldCoord['z'] + offset['z']);
    screenX && (SetTextScale(0.35, 0.35), SetTextFont(0x4), SetTextProportional(true), SetTextColour(0xff, 0xff, 0xff, 0xd7), SetTextEntry("STRING"), SetTextCentre(true), AddTextComponentString(text), DrawText(screenY, screenZ), DrawRect(screenY, screenZ + 0.0125, 0.015 + text["length"] / 0x172, 0.03, 0x29, 0xb, 0x29, 0x44));
}

export function DrawMarkerOnOffset(_position: any, _type: any, _scale: any, _color: any, _offset: any) {
    DrawMarker(
        _type,
        _position.x + _offset.x,
        _position.y + _offset.y,
        _position.z + _offset.z,
        0,
        0,
        0,
        0,
        0,
        0,
        _scale,
        _scale,
        _scale,
        _color.r,
        _color.g,
        _color.b,
        _color.a,
        false,
        true,
        2,
        false,
        null as any,
        null as any,
        null as any
    );
}

export function CombineNumbers(num1: any, numArray: any) {
    return num1 | Math.floor(numArray[0]) * Math.floor(numArray[1]) << 8;
}

export async function LoadAnimDict(dict: any) {
    if (!HasAnimDictLoaded(dict)) {
        RequestAnimDict(dict);
        while (!HasAnimDictLoaded(dict)) {
            await Delay(10);
        }
    }
}

export function ShowKeyboard(prompt: any, defaultText = '', maxLength = 100) {
    const resourceName = GetCurrentResourceName();
    const windowTitle = resourceName.toUpperCase() + '_WINDOW_TITLE';
    AddTextEntry(windowTitle, (prompt || 'Enter') + ': MAX ' + maxLength + ' Characters');
    DisplayOnscreenKeyboard(1, windowTitle, '', defaultText, '', '', '', maxLength);
    return new Promise(resolve => {
        const tick = setTick(() => {
            const status = UpdateOnscreenKeyboard();
            switch (status) {
                case 3: // error
                case 2: // cancelled
                    clearTick(tick);
                    break;
                case 1: // done
                    resolve(GetOnscreenKeyboardResult());
                    break;
            }
        });
    });
}

export function DoPhoneConfirmation(pTitle: any, pText: any, pIcon: any) {
    return new Promise(resolve => {
        global.exports["ev-phone"].DoPhoneConfirmation(pTitle, pText, pIcon, resolve);
    });
}

export function DoPhoneNotification(pTitle: any, pBody: any, pShowEvenIfActive = true, pTargetApp = "home-screen") {
    SendUIMessage({
        source: "ev-nui",
        app: "phone",
        data: {
            action: "notification",
            target_app: pTargetApp,
            title: pTitle,
            body: pBody,
            show_even_if_app_active: pShowEvenIfActive
        }
    });
}

export async function LoadAnimDictTimeout(dict: any) {
    if (!HasAnimDictLoaded(dict)) {
        RequestAnimDict(dict);
        let failed = false;
        setTimeout(() => failed = true, 60000);
        while (!HasAnimDictLoaded(dict) && !failed) {
            await Delay(10);
        }
    }
}

export function TaskBar(_0x491d41: any, _0xe4ef52: any, _0x114857 = false): Promise<number> {
    return new Promise(resolve => {
        global.exports["ev-taskbar"].taskBar(_0x491d41, _0xe4ef52, _0x114857, true, null, false, resolve);
    });
}

export function TaskBarSkill(_0x500542: any, _0x1704e7: any) {
    return new Promise(resolve => {
        global.exports["ev-ui"].taskBarSkill(_0x500542, _0x1704e7, resolve);
    });
}

export function GiveItemWithInfo(pItem: any, _0x2d66ac = {}, _0x4c1967 = {}) {
    const pInfo = {
        ..._0x2d66ac,
        ..._0x4c1967,
        _hideKeys: Object.keys(_0x4c1967)
    }
    emit("player:receiveItem", pItem, 1, false, {}, JSON.stringify(pInfo));
}

export function IsMyItem(pItems: any) {
    if (pItems.length < 1) return false;
    const cid = global.exports["isPed"].isPed("cid");
    for (const item of pItems) {
        const parsedInfo = JSON.parse(item.information);
        if (parsedInfo.characterId === cid) return true;
    }
    return false;
}