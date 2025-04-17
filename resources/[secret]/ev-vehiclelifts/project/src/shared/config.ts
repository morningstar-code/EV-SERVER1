export let GlobalConfig: any = global.exports["ev-config"].GetModuleConfig("main");

export let liftConfig: LiftConfig = null as any;

const TrackedModules = new Map<string, any>();

const ResourceName = GetCurrentResourceName();

export async function InitConfig(): Promise<void> {
    while (liftConfig === null) {
        await new Promise(resolve => setTimeout(resolve, 1000)), liftConfig = GetResourceConfig<LiftConfig>();
    }
};

on("ev-config:configLoaded", (pModule: string, pConfig: any) => {
    if (pModule === "main") {
        GlobalConfig = pConfig;
    } else if (TrackedModules.has(pModule)) {
        TrackedModules.set(pModule, pConfig);
    }
});

export function GetConfig<T>(pKey: string): T {
    return GlobalConfig[pKey];
}

export function GetModuleConfig<T>(pModule: string, pKey?: any): T {
    if (!TrackedModules.has(pModule)) {
        const config = global.exports["ev-config"].GetModuleConfig(pModule);

        if (config === undefined) return <any>false;

        TrackedModules.set(pModule, config);
    }

    const config = TrackedModules.get(pModule);    
    return pKey ? config?.[pKey] : config;
}

export function GetResourceConfig<T>(pKey?: string): T {
    return GetModuleConfig(ResourceName, pKey);
}

export const IsConfigReady = (): Promise<boolean> => {
    return new Promise(resolve => {
        let pIndex = 0;
        const pInterval = setInterval(() => {
            if (global.exports["ev-config"].IsConfigReady()) clearInterval(pInterval), resolve(true)
            else {
                pIndex++;
                if (pIndex > 10) {
                    clearInterval(pInterval), resolve(false);
                }
            }
        }, 3000);
    });
}