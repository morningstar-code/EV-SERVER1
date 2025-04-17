interface Unit {
    id: string;
    business: string;
    size: number;
    unitId?: number;
    polyZone: {
        coords: Vector3;
        length: number;
        width: number;
        minZ: number;
        maxZ: number;
        heading: number;
    };
}

interface SQLUnit {
    id?: string;
    unit_id?: string;
    password: number;
    business_id?: string;
    business_name?: string;
    location?: Vector3;
    due_date?: number;
    due_amount?: number;
    has_paid?: boolean;
    tenant_cid?: number;
    phone_number?: number;
    size: number;
    cid?: number;
    name?: string;
}

interface CasinoHotelConfig {
    size: string;
    coords: Vector3;
}