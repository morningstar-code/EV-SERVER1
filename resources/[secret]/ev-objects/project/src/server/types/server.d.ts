interface PlacedObject {
    id: string;
    model: string | number;
    ns: string;
    coords: Vector3;
    rotation: {
        x: number;
        y: number;
        z: number;
    };
    persistent: string;
    public: any;
    private: any;
    createdAt: number;
    expiresAt: number | null;
    updatedAt?: number;
    world: string;
}

interface UpdatedObject {
    id: string;
    data: any;
    newCoords?: Vector3Format;
}

interface PlacedObjectSQL {
    id: string;
    model: string | number;
    ns: string;
    x: number;
    y: number;
    z: number;
    rotX: number;
    rotY: number;
    rotZ: number;
    persistent: string;
    public: any;
    private: any;
    createdAt: number;
    expiresAt: number | null;
    updatedAt?: number;
    world: string;
}

interface Vector3Format {
    x: number;
    y: number;
    z: number;
}