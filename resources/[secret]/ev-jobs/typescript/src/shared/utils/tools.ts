import { Chance } from 'chance';

export let Delay = (ms:any) => new Promise(res => setTimeout(res, ms));

export function GetEntityFromNetId(pEntityType: string, pNetId: number) {
    return pEntityType !== "player" ? NetworkGetEntityFromNetworkId(pNetId) : GetPlayerFromServerId(pNetId);
}

export function arrayToMap(pData: any) {
    const _0x2876f3 = new Map();
    pData.forEach((data: any) => _0x2876f3.set(data.key, data.value))
    return _0x2876f3;
}

export const GetRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const GetRandom2 = (min: number, max?: number) => {
    return Math.floor(max ? Math.random() * (max - min) + min : Math.random() * min);
}

export async function LoadModel(pModel: string | number) {
    const model = typeof pModel === "string" ? GetHashKey(pModel) : pModel;
    if (model && !HasModelLoaded(model)) {
        let failed = false;
        RequestModel(model);
        setTimeout(() => failed = true, 10000);
        while (!HasModelLoaded(model) && !failed) {
            await Delay(0);
        }
    }
}

export function FormatCurrency(pAmount = 0) {
    return '$' + new Intl[("NumberFormat")]().format(pAmount);
}

export function LinearInterpolate(range1: number[], range2: number[], value: number) {
    return range2[0] + (value - range1[0]) * (range2[1] - range2[0]) / (range1[1] - range1[0]);
}

export function GetDistance(pCoord1: number[], pCoord2: number[]) {
    const [x, y, z] = [pCoord1[0] - pCoord2[0], pCoord1[1] - pCoord2[1], pCoord1[2] - pCoord2[2]];
    return Math.sqrt(x * x + y * y + z * z);
}

export function Capitalize(pString: string) {
    if (typeof pString !== "string") return;
    return pString.toLowerCase().replace(/^\w|\s\w/g, function (string) {
        return string.toUpperCase();
    });
}

export async function loadAnimDict(dict: string) {
    while(!HasAnimDictLoaded(dict)) {
        RequestAnimDict(dict)
        await Delay(5)
    }
}

export const genNumbers = (length: number) => {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 1; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const getRandomInArray = (array: any[], excludedResult?: any) => {
    const filtered = excludedResult ? array.filter((item) => item !== excludedResult) : array;
    const chance = new Chance();
    const randomIndex = chance.integer({ min: 0, max: filtered.length - 1 });
    return filtered[randomIndex];
}

export const getRandom = (min: number, max: number) => {
    const chance = new Chance();
    return chance.integer({ min, max });
}