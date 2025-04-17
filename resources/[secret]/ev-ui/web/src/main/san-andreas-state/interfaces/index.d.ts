interface License {
    id: number;
    name: string;
    status: number;
}

interface Loan {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: number;
    amount: number;
    last_payment: number;
    payments_count: number;
    payments_total: number;
    payments_schedule_days: number;
    state_owed: number;
    state_paid: number;
    civ_owed: number;
    interest_state: number;
    interest_civ: number;
    business_name: string;
    note: string;
    defaulted: boolean;
    tracked_by: string;
    created_at: number;
}

interface Tax {
    id: number;
    name: string;
    level: number;
    new_level: number;
}

interface Ballot {
    id: number;
    name: string;
    description: string;
    multi: boolean;
    start_date: number;
    end_date: number;
    options: BallotOption[];
}

interface BallotOption {
    id: number;
    name: string;
    description: string;
    icon: any;
    party: string;
    vote_count: number;
}

interface FarmerItem {
    id: number;
    image: string;
    name: string;
    description: string;
    type: string;
    item_type: string;
}