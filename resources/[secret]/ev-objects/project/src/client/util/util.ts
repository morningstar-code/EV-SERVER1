import { Delay } from "@shared/utils/tools";

export async function LoadAnimDict(dict: string) {
    if (!HasAnimDictLoaded(dict)) {
        RequestAnimDict(dict);
        let timeout = false;
        setTimeout(() => timeout = true, 2500);
        while (!HasAnimDictLoaded(dict) && !timeout) {
            await Delay(10);
        }
    }
}

export async function LoadModel(model: string | number) {
    if (IsModelValid(model)) {
        RequestModel(model);
        let timeout = false;
        setTimeout(() => timeout = true, 3000);
        while (!HasModelLoaded(model) && !timeout) {
            await Delay(10);
        }
        return !timeout;
    }
    return false;
}

export function _0x36496d(_0x4f26fe: any, _0x4813c5: any, _0x318f14 = false) {
    return new Promise(_0x126c13 => {
        exports['np-taskbar'].taskBar(_0x4f26fe, _0x4813c5, _0x318f14, true, null, false, _0x126c13);
    });
}

export function taskBarSkill(_0x1cc2c4: any, _0x1c0141: any) {
    return new Promise(_0x22bb94 => {
        exports['np-ui'].taskBarSkill(_0x1cc2c4, _0x1c0141, _0x22bb94);
    });
}

export async function _0x547187(_0x42e65f: any, _0x4ec736: any, _0x32a6a7: any) {
    let _0x5d8582 = false;
    for (let _0x18b0cb = 0; _0x18b0cb < _0x32a6a7; _0x18b0cb++) {
        if (!_0x5d8582) {
            const _0x3b8205 = await taskBarSkill(_0x42e65f, _0x4ec736);
            if (_0x3b8205 !== 100) _0x5d8582 = true;
        }
    }
    return _0x5d8582;
}

export async function LoadAnimAndPlayAnim(_0x537952: any, _0x7d225: any, _0x8af941: any) {
    await LoadAnimDict(_0x537952);
    TaskPlayAnim(PlayerPedId(), _0x537952, _0x7d225, 8, -8, -1, _0x8af941, 0, false, false, false);
}

export function _0xe7405e(pCoords: Vector3, pModel: string | number, pRadius = 0.5) {
    const model = typeof pModel === 'string' ? GetHashKey(pModel) : pModel;
    const object = GetClosestObjectOfType(pCoords.x, pCoords.y, pCoords.z, pRadius, model, false, false, false);
    if (object !== 0) {
        SetEntityAsMissionEntity(object, true, true);
        DeleteEntity(object);
    }
}

export const deleteObject = (object: number) => {
    if (DoesEntityExist(Number(object))) {
        DeleteEntity(Number(object));
        DeleteObject(object);
    }
};

export function makeEntityMatrix(entity: number): Float32Array {
    const [f, r, u, a] = GetEntityMatrix(entity);

    return new Float32Array([
        r[0], r[1], r[2], 0,
        f[0], f[1], f[2], 0,
        u[0], u[1], u[2], 0,
        a[0], a[1], a[2], 1,
    ]);
}

export function applyEntityMatrix(entity: number, mat: Float32Array | number[]) {
    SetEntityMatrix(
        entity,
        mat[4], mat[5], mat[6], // right
        mat[0], mat[1], mat[2], // forward
        mat[8], mat[9], mat[10], // up
        mat[12], mat[13], mat[14], // at
    );
    SetEntityCoords(entity, mat[12], mat[13], mat[14], false, false, false, false);
}

export function Debug(...args: any) {
    const isDevServer = GetConvar("sv_environment", "prod") === "debug"
    if (isDevServer) {
        console.log(...arguments);
    }
}