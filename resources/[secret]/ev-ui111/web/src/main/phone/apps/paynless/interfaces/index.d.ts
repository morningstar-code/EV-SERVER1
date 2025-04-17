interface Unit {
    id: string;
    business_id: string;
    business_name: string;
    size: number;
    tenant_cid: number | null;
    due_date: number;
    due_amount: number;
    has_paid: boolean;
    location: Vector3;
    password: number;
    phone_number: number;
}