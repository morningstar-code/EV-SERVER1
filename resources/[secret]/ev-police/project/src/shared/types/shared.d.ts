interface ModuleConfigEntry {
    configId: string;
    data: Record<string, any>;
}

interface ProximityOverride {
    mode: number;
    range: number;
    priority: number;
}

type DatagridObject<T> = {
    id: string;
    ns: string;
    x: number;
    y: number;
    z: number;
    cellX?: number;
    cellY?: number;
    data: PlacedObjectData<any>;
}

type PlacedObjectData<T> = {
    builder: string;
    model: string | number;
    rotation: Vector3;
    metadata: T;
}

type TrunkOffset = {
    y: number;
    z: number;
};

type TrunkOffsets = {
    [key: string]: TrunkOffset;
};

interface RecentCuff {
    cuffer: { fullName: string };
    action: string;
    timestamp: number;
}