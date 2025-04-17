export const Delay = (ms: any) => new Promise(res => setTimeout(res, ms));

export const now = () => Math.ceil(Date.now() / 1000);

export const GetRandomArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

export const GetRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export function GetDistance(pCoord1: number[], pCoord2: number[]) {
    const [x, y, z] = [pCoord1[0] - pCoord2[0], pCoord1[1] - pCoord2[1], pCoord1[2] - pCoord2[2]];
    return Math.sqrt(x * x + y * y + z * z);
}