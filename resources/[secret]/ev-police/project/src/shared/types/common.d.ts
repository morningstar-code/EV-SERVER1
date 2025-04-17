//RPC registers always looks like this:
// RPC.register("ev-police:server:myRpc", (source: number, ...args: any) => {

declare const RPC: {
    register<T>(name: string, cb: (source: number, ...args: any) => T): T;
    execute<T>(name: string, ...args: any): T;
};

//    register<T>(name: string, callback: Function): T,

declare const SQL: { 
    execute<T>(name: string, ...args: any): T;
    query<T>(name: string, ...args: any): T;
};

//declare const PolyZone: any;

//Declare AsyncExports["ev-base"] with key index
declare const AsyncExports: Record<string, Record<string, any>>;

declare function CacheableMap(func: Function, options: { timeToLive: number }): any;

declare function RegisterUICallback(name: string, cb: any): any;

declare function SendUIMessage(data: any): any;

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface Vector4 extends Vector3 {
    h: number;
}

declare const CPX: any;

interface PeekContext {
    flags: string[];
    model: number;
    type: number;
    isDead: boolean;
    zones: any;
    meta: { id?: string; data?: any };
}