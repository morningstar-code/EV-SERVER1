declare interface ServerExports {
    'ev-objects': Objects.ServerExports;
}

declare interface ClientExports {
    'ev-objects': Objects.ClientExports;
}

declare interface ClientFunctions {
    'ev-objects': Objects.ClientFunctions;
}

declare namespace Objects {
    type ServerExports = {
        SaveObjects: (
            objects: SaveObjectData[]
        ) => Promise<string[]>;

        SaveObject: (
            source: number,
            namespace: string,
            model: string | number,
            coords: Vector3,
            rotation: Vector3,
            public: any,
            private: any,
            persistent: string,
            expiryTime?: number,
            world?: string
        ) => Promise<string>;

        UpdateObject: (
            id: string,
            public: any,
            private: any,
            model: string | number | undefined,
            expiryTime: number | null | undefined,
            coords: Vector3 | undefined,
            rotation: Vector3 | undefined,
            pShouldUpdateObjectList?: boolean
        ) => Promise<boolean>;

        UpdateObjects: (
            objects: UpdateObjectData[],
            pShouldUpdateObjectList?: boolean
        ) => Promise<boolean[]>;

        GetObject: (
            id: string
        ) => PlacedObject | null;

        GetObjectsByNamespace: (
            namespace: string
        ) => (PlacedObject | undefined)[];

        GetNumObjectsByNamespace: (
            namespace: string
        ) => number;

        RemoveObject: (
            id: string
        ) => Promise<boolean>;
    }

    type ClientExports = {
        GetObject: (
            id: string
        ) => DatagridObject<any> | null | undefined;

        GetObjectByEntity: (
            entity: number
        ) => DatagridObject<any> | null | undefined;
    
        GetObjectsByNamespace: (
            namespace: string
        ) => DatagridObject<any>[];

        GetEntityByObjectId: (
            id: string
        ) => number | null | undefined;

        UpdateObject: (
            id: string,
            public: boolean,
            model: string | number,
            coords: Vector3,
            rotation: Vector3
        ) => Promise<void>;

        DeleteObject: (
            id: string
        ) => Promise<void>;

        GetVisibleEntities: () => number[];

        GetVisibleObjects: (namespace?: string) => (DatagridObject<unknown> | undefined)[];
    
        PlaceObject: (
            _model: string | number,
            _options: ObjectOptions,
            isValidPlacement?: (coords: Vector3, materialHash: number, ghostObject: number, entityHit: number ) => boolean
        ) => Promise<[boolean, { coords: Vector3, rotation: Vector3, quaternion: [number, number, number, number], heading: number } | null]>;
    
        PlaceAndSaveObject: (
            model: string | number,
            metadata: any,
            options: ObjectOptions,
            isValidPlacement?: (coords: Vector3, materialHash: number, ghostObject: number, entityHit: number ) => boolean,
            namespace?: string,
            expiryTime?: number
        ) => Promise<string | null | undefined>;

        MoveObject: (
            id: string,
            options: ObjectOptions,
            isValidPlacement: (coords: Vector3, materialHash: number, ghostObject: number, entityHit: number ) => boolean,
            model: string | number
        ) => Promise<boolean>;
    }

    type ClientFunctions<T = any> = {
        CreateObject: (
            item: DatagridObject<any>
        ) => Promise<number>;

        AddObject: (
            networkItem: NetworkedDatagridObject<unknown>,
            fromLoad?: boolean
        ) => void;

        CameraToWorld: (
            flags: number,
            ignore: number,
            distance: number
        ) => [number, boolean, number[], number[], number, number];

        IsColliding: (
            ghostObject: number,
            playerPed: number,
            modelSize: T,
            centerCoords: T,
            zOffset?: number
        ) => boolean;
    }

    type DatagridObject<T> = {
        id: string;
        ns: string;
        x: number;
        y: number;
        z: number;
        cellX?: number;
        cellY?: number;
        worldId: string | undefined;
        data: PlacedObjectData<any>;
    }

    type ReceivedObjectData<T> = {
        _b: string;
        _m: string | number;
        _r: string;
        _md: T;
    }

    type NetworkedDatagridObject<T> = {
        id: string;
        ns: string;
        worldId?: string;
        x: number;
        y: number;
        z: number;
        data: {
            _b: string;
            _m: string | number;
            _r: string;
            _md: T;
        };
    }

    type PlacedObjectData<T> = {
        builder: string;
        model: string | number;
        rotation: Vector3;
        metadata: T;
    }

    type ObjectOptions = {
        groundSnap?: boolean;
        forceGroundSnap?: boolean;
        useModelOffset?: boolean;
        adjustZ?: boolean;
        disablePinning?: boolean;
        allowGizmo?: boolean;
        startPinned?: boolean;
        startWithGizmo?: boolean;
        zOffset?: number;
        alignToSurface?: boolean;
        surfaceOffset?: number;
        maxDistance?: number;
        startingCoords?: Vector3;
        startingRotation?: Vector3;
        distance?: number;
        collision?: boolean;
        colZOffset: number;
        allowHousePlacement?: boolean;
        allowEditorPlacement?: boolean;
        checkPropertyAccess?: boolean;
        forceHousePlacement?: boolean;
        afterRender?: (ghostObject: number, hit: boolean, valid: boolean) => void;
    }

    type SaveObjectData = {
        namespace: string;
        public: any;
        private: any;
        persistent: string;
        source: number;
        model: string | number;
        expiryTime?: number;
        world?: string;
        coords: Vector3;
        rotation: Vector3;
    }

    type UpdateObjectData = {
        id: string;
        public: any;
        private: any;
        model?: string | number;
        expiryTime?: number | null;
        coords: Vector3 | undefined;
        rotation: {
            x: number;
            y: number;
            z: number;
        } | undefined;
    }

    type PlacedObject = {
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
        world: string;
        createdAt: number;
        updatedAt?: number;
        expiresAt: number | null;
    }
}