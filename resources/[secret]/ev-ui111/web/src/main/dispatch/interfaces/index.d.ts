interface Ping {
    id?: number;
    ctxId?: number;
    callSign?: string;
    dispatchCode: string;
    dispatchMessage?: string;
    firstStreet?: string;
    secondStreet?: string;
    firstColor?: string;
    flagged_at?: number;
    flagged_by?: {
        callsign: string;
        name: string;
    };
    flagged_reason?: string;
    extraData?: string;
    heading?: string;
    location?: any;
    model?: string;
    origin?: Vector3;
    plate?: string;
    secondColor?: string;
    senderId?: number;
    senderName?: string;
    senderNumber?: string;
    text?: string;
    timestamp?: number;
    title?: string;
    priority?: number;
    unitsPoliceCount?: number;
    unitsPolice?: PoliceUnit[];
    unitsEMSCount?: number;
    unitsEMS?: PoliceUnit[];
}

interface PoliceUnit {
    serverId: number;
    callSign: string;
    name: string;
    attachedTo: any;
    job: string;
    vehicle: string;
    status: string;
    attached?: PoliceUnit[];
}