interface ModuleConfigEntry {
    configId: string;
    data: Record<string, any>;
}

interface ActionsReturnPayload {
    message: any;
    success: boolean;
}

interface Charge {
    id: number;
    category_title: string;
    name: string;
    description: string;
    time: number;
    fine: number;
    points: number;
    felony: boolean;
    held_until_trial: boolean;
    accomplicerized: boolean;
    accomplice_description: string;
    accomplice_time: number;
    accomplice_fine: number;
    accomplice_points: number;
    accomplice_felony: boolean;
    accomplice_held_until_trial: boolean;
    accessorized: boolean;
    accessory_description: string;
    accessory_time: number;
    accessory_fine: number;
    accessory_points: number;
    accessory_felony: boolean;
    accessory_held_until_trial: boolean;
}

interface BusinessSQLPayload {
    id: number;
    code: string;
    name: string;
    type_id: number;
    account_id: number;
}

interface Business {
    id: string;
    name: string;
    type_id: number;
    account_id: number;
}

interface BusinessEmployeeSQLPayload {
    cid: number;
    first_name: string;
    last_name: string;
    role: string;
}

interface BusinessEmployee {
    id: number;
    first_name: string;
    last_name: string;
    role: string;
}

interface BusinessLogSQLPayload {
    id: number;
    code: string;
    event: string;
    invoker: string;
    target: string;
    role: string;
    event_time: number;
}

interface BusinessLog {
    id: number;
    event: string;
    invoker: string;
    target: string;
    role: string;
    event_time: number;
}

interface OfficerProfileSQLPayload {
    id?: number;
    profile_id: number;
    character_id: number;
    alias: string;
    name: string;
    callsign: string;
    department: string;
    roles: any;
    permissions?: any;
    rank: string;
    profile_image_url: string;
    phone_number: string;
}

interface OfficerRoleSQLPayload {
    id: number;
    name: string;
    icon: string;
    color: string;
    color_text: string;
}

interface OfficerProfile {
    character_id: number;
    profile_id: number;
    alias: string;
    name: string;
    callsign: string;
    department: string;
    roles: OfficerRole[];
    permissions?: any;
    rank: string;
    profile_image_url: string;
    phone_number: string;
}

interface OfficerRole {
    id: number;
    name: string;
    icon: string;
    color: string;
    color_text: string;
}

interface CivilianProfileSQLPayload {
    id: number;
    character_id: number;
    name: string;
    profile_image_url: string;
    summary: string;
    parole_end_timestamp: number;
    driving_license_points_start_date: number;
    drivers_points: number;
    is_wanted: boolean;
    //tags: any[]; //Seperate table?
    //priors: any[]; //Seperate table?
}

interface CivilianProfile {
    id?: number;
    character_id: number;
    name: string;
    profile_image_url: string;
    summary: string;
    parole_end_timestamp: number;
    driving_license_points_start_date: number;
    drivers_points: number;
    is_wanted: boolean;
    tags: any[]; //Seperate table?
    priors: any[]; //Seperate table?
}

interface ReportCategorySQLPayload {
    id: number;
    name: string;
    description: string;
    template: string;
}

interface ReportCategory {
    id: number;
    name: string;
    description: string;
    template: string;
}

interface ReportsSQLPayload {
    id: number;
    title: string;
    description: string;
    created_by_state_id: number;
    created_by_name: string;
    timestamp: number;
    report_category_id: number;
    report_category_name: string;
}

interface Reports {
    id: number;
    title: string;
    description: string;
    created_by_state_id: number;
    created_by_name: string;
    timestamp: number;
    report_category_id: number;
    report_category_name: string;
}

interface ReportSQLPayload {
    id: number;
    title: string;
    description: string;
    created_by_state_id: number;
    created_by_name: string;
    timestamp: number;
    report_category_id: number;
    report_category_name: string;
    civs: any[];
    tags: any[];
    evidence: any[];
    officers: any[];
    persons: any[];
    vehicles: any[];
}

interface IReport {
    id: number;
    title: string;
    description: string;
    created_by_state_id: number;
    created_by_name: string;
    timestamp: number;
    report_category_id: number;
    report_category_name: string;
    civs: any[];
    tags: any[];
    evidence: any[];
    officers: any[];
    persons: any[];
    vehicles: any[];
}

interface Warrant {
    incident_id: number;
    incident_title: string;
    warrant_expiry_timestamp: number;
    civ_name: string;
    profile_image_url: string;
}