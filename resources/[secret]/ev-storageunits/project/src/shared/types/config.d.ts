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

interface UnitsConfig {
    units: Unit[];
}