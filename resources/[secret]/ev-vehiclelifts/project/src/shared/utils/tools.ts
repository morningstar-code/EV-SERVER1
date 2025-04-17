export let Delay = (ms:any) => new Promise(res => setTimeout(res, ms));

export function taskBar(length: number, name: string, runCheck = false): Promise<number> {
    return new Promise(resolve => {
        name ? global.exports["ev-taskbar"].taskBar(length, name, runCheck, true, null, false, resolve) : setTimeout(() => resolve(100), length);
    });
}

export async function loadAnimDict(dict: string) {
    while(!HasAnimDictLoaded(dict)) {
        RequestAnimDict(dict)
        await Delay(5)
    }
}

export const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
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