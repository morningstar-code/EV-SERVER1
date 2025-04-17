interface ModuleConfigEntry {
    configId: string;
    data: Record<string, any>;
}

interface JobSQL {
    id?: number;
    name: string;
    label: string;
    checkInName: string;
    icon: string;
    headquarters: Vector4;
    npc: JobNPC;
    acceptPendingTimeout: number;
    vpn: boolean;
    enabled: boolean;
    capacity: number;
}

interface Job {
    id: number;
    name: string;
    label: string;
    checkInName: string;
    icon: string;
    headquarters: Vector4;
    npc: JobNPC;
    acceptPendingTimeout: number;
    vpn: boolean;
    enabled: boolean;
    capacity: number;
}

interface MappedJob {
    id: number;
    job_id: string;
    name: string;
    checkInName: string;
    icon: string;
    vpn: boolean;
    headquarters: Vector4;
    npc: JobNPC;
    acceptPendingTimeout: number;
    capacity: number;
    groups?: number;
    employees?: number;
    pay_grade?: number;
}

interface MappedNPC {
    jobId: string;
    headquarters: Vector4;
    data: JobData;
}

interface JobNPC {
    jobId: string;
    headquarters: Vector4;
    data: JobData;
}

interface JobData {
    pedType: number;
    model: string;
    distance: number;
    settings: JobSettings[];
    flags: Record<string, boolean>;
}

interface JobSettings {
    mode: string;
    active: boolean;
}

interface JobGroup { //TODO: Add jobId
    id: number;
    jobId: string;
    leader: JobGroupLeader,
    status: string;
    public: boolean;
    members: JobGroupMember[];
    ready: boolean;
    capacity?: number; //Determined by the job
    size?: number; //Depends on how many members are in the group
    activity?: JobGroupActivity;
    activityData?: any;
}

interface JobGroupLeader {
    id: number;
    first_name: string;
    last_name: string;
}

interface JobGroupMember extends JobGroupLeader {
    is_leader: boolean;
    is_online: boolean;
}

interface JobGroupActivity {
    id: number;
    name: string;
    deadline: number;
    references: JobGroupActivityTaskReference[];
    objectives: JobGroupActivityTaskObjective[];
    tasks: JobGroupActivityTask[];
    activity: {
        name: string;
        deadline: number;
        tasks: JobGroupActivityPhoneTask[];
    }
}

interface JobGroupActivityPhoneTask {
    id: string;
    description: string;
    descriptionExtraReference?: string;
    wanted: number;
    count: number;
    tracked: any[];
}

interface JobGroupActivityTask {
    key: string;
    taskData: {
        type: string;
        settings?: any;
    },
    extraTaskData?: any;
    whenCompleted?: string;
}

interface JobGroupActivityTaskReference {
    key: string;
    value: {
        id: string;
        type: string;
        settings?: any;
        data?: any;
    }
}

interface JobGroupActivityTaskObjective {
    key: string;
    value: {
        id: string;
        type: string;
        settings?: any;
        data?: any;
    }
}

interface ImpoundReason {
    code: string;
    name: string;
    description: string;
    felony: boolean;
    strikes: number;
    fee: number;
    retention: number;
}

interface ImpoundVehicleLookup {
    name: string;
    plate: string;
    vin: string;
    strikes: number;
    fee: number;
    tax: number;
    issuer: number;
    worker: number;
    state: string;
    reason: ImpoundReason;
    record: ImpoundVehicleRecord;
}

interface ImpoundVehicleRecord {
    id: number;
    impoundDate: number;
    lockedUntil: number;
    paid: boolean;
    released: boolean;
}

interface SQLImpoundVehicleRecord {
    id: number;
    reason_id: string;
    vin: string;
    impound_date: number;
    locked_until: number;
    paid: boolean;
    released: boolean;
    issuer_id: number;
    worker_id: number;
    fee: number;
    strike: number;
}

interface ImpoundRequestInfo {
    id: number;
    netId: number;
    name: string;
    reason_id: string;
    retention: number;
    issuer_id: number;
}

type ImpoundLookupType = "recent" | "personal" | "owner" | "plate";

type JobIds = "sanitation_worker" | "store_deliveries" | "fishing" | "impound" | "house_robbery" | "chopshop" | "darkmarket";

type GetConfig = {
    Jobs: Config;
};

type JobPayCheck = {
    base: number;
    nerf: number;
};

type Config = { //TODO: Make data generic, so we can pass in the specific data type for each job
    [jobId in JobIds]: {
        paycheck: JobPayCheck | boolean;
        items: { name: string; amount: { baseAmount: number, maxAmount: number, perMemberMultiplier: number } }[];
        locations?: { x: number; y: number; z: number }[];
        zones?: string[];
        vehicles?: string[];
        vehicleLocations?: { x: number; y: number; z: number, h: number }[];
        dropOffLocations?: { x: number; y: number; z: number }[];
        dropRateConfig?: {
            door: {
                min: number;
                max: number;
            },
            tyre: {
                min: number;
                max: number;
            },
            remains: {
                min: number;
                max: number;
            }
        }
    };
};

type HouseRobberyConfig = {
    missionTimeout: number;
    reuseTime: number;
    staticObjectsChance: number;
    secondsPerJobCreated: number;
    maxJobsAtAGivenTime: number;
};

interface DestinationTaskData {
    settings: {
        location: {
            reference: string;
            blip: any;
        },
        trigger: {
            type: string;
            key: number;
            vehicle: any;
            wanted: any;
            weapon: any;
        },
        notification?: any;
        marker?: any;
    },
    objectives: any[]
}

interface BennyCatalogItem {
    name: string;
    itemId: string;
    category: string;
    type: string;
    part: string;
    importPrice: number;
    infinite: boolean;
}

interface BennyCatalog { }

interface BennyPriceModifiers {
    rating: number;
}

interface BennyInteract {
    type: string;
    group: number | number[];
    data: BennyInteractData[];
    options: BennyInteractOptions;
}

interface BennyInteractData {
    id: string;
    label: string;
    icon: string;
    event: string;
    parameters: any;
}

interface BennyInteractOptions {
    job?: string;
    npcIds?: string[];
    isEnabled?: (pEntity: number) => boolean;
    distance: { radius: number } | number;
}

interface Paycheck {
    jobId: string;
    amount: number;
    totalRuns: number;
    lastRun: number | undefined;
}