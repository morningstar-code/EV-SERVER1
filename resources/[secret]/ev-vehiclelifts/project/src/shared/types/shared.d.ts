interface ModuleConfigEntry {
    configId: string;
    data: Record<string, any>;
}

interface Lift {
    name: string;
    business: string;
    coords: Vector3;
    heading: number;
    polyZone: string;
    panelPoly: {
        coords: Vector3;
        length: number;
        width: number;
        minZ: number;
        maxZ: number;
        heading: number;
    }
}

interface CreatedLift {
    name: string;
    zone: string;
    objectFrame: number;
    objectBase: number;
    objectPanel: number;
}

interface LiftConfig {
    liftModels: string[];
    lifts: Lift[];
}