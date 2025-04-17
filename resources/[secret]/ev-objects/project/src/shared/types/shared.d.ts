interface ModuleConfigEntry {
    configId: string;
    data: Record<string, any>;
}

interface MainConfig {
    payoutFactor: number;
    characterLimit: number;
    progression: any;
    restartLength: number;
}

declare const RPC: { 
    register<T>(name: string, callback: Function): T,
    execute<T>(name: string, ...args: any): T
};

declare const SQL: { 
    execute<T>(name: string, ...args: any): T;
    query<T>(name: string, ...args: any): T;
};

declare const PolyZone: any;

//Declare AsyncExports["ev-base"] with key index
//declare const AsyncExports: Record<string, Record<string, any>>;
declare function AsyncExports(name: string, callback: Function): any;

declare function CacheableMap(func: Function, options: { timeToLive: number }): any;

declare function RegisterUICallback(name: string, cb: any): any;

declare function SendUIMessage(data: any): any;

interface PeekContext {
    flags: string[],
    model: number,
    type: number,
    isDead: boolean,
    zones: any
}

interface Vector3 {
    x: number;
    y: number;
    z: number;
}


declare const CPX: any;