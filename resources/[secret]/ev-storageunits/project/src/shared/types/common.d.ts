declare const CPX: any;

declare const RPC: { 
    register<T>(name: string, callback: Function): T,
    execute<T>(name: string, ...args: any): T
};

declare const SQL: { 
    execute<T>(name: string, ...args: any): T;
    query<T>(name: string, ...args: any): T;
};

//declare const PolyZone: any;

//Declare AsyncExports["arp-base"] with key index
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

interface PeekContext {
    flags: string[];
    model: number;
    type: number;
    isDead: boolean;
    zones: { [key: string]: any };
}

interface ContextMenu<T> {
    title: string;
    description?: string;
    icon?: string;
    action?: string;
    key?: T;
}

type UnitKey = {
    id?: string;
    business?: string;
    size?: number;
}

interface CallbackData {
    values?: { [key: string]: any };
    inputKey?: { [key: string]: any };
}