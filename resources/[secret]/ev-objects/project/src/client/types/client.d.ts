interface UpdatedObject {
    id: string;
    data: Objects.ReceivedObjectData<unknown>;
    newCoords?: Vector3Format;
}

interface Vector3Format {
    x: number;
    y: number;
    z: number;
}