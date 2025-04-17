interface ATMOnShowPayload {
    isAtm: boolean;
}

interface ATMGetTransactionsPayload {
    id: number;
    access: string[];
}

interface AtmState extends ReduxProps {
    accounts: Account[];
    cash: number;
    defaultAccount: Account | null;
    initialLoadComplete: boolean;
    initialWidthComplete: boolean;
    isAtm: boolean;
    modalAccount: Account | null;
    modalAction: string | null;
    showModalError: string | boolean;
    selectedAccount: Account | null;
    showTransactionsAccessWarning: boolean;
    transactions: Transaction[];
    transactionsLoading: boolean;
}

//TODO: Rename typings to "ATMAccount etc."
interface Account {
    id: number;
    bank_account_id: number;
    cid?: number;
    type: string;
    name: string;
    owner_first_name: string;
    owner_last_name: string;
    balance: number;
    is_frozen: boolean;
    is_monitored: boolean;
    access: string[];
}

interface AccountCharacter {
    id: number;
    name: string;
    is_owner: boolean;
    access: string[];
}

interface AccountType {
    id: number;
    name: string;
    public?: boolean;
}

interface Transaction {
    id: string;
    type: string;
    amount: number;
    comment: string;
    date: number;
    direction: string;
    from_account_id: number;
    to_account_id: number;
    from_account_name: string;
    to_account_name: string;
    from_civ_name: string;
    to_civ_name: string;
    tax_type: string;
    tax_percentage: number;
    tax_id: number;
}

interface TransactionPayload {
    data: Transaction[];
    meta: {
        ok: boolean;
        message: string
    };
}

interface AccountPayload {
    data: {
        accounts: Account[];
    };
    meta: {
        ok: boolean;
        message: string
    };
}

interface CashPayload {
    data: {
        cash: number;
    },
    meta: {
        ok: boolean;
        message: string
    };
}

interface DepositPayload {
    data: {},
    meta: {
        ok: boolean;
        message: string
    };
}

interface WithdrawPayload {
    data: {},
    meta: {
        ok: boolean;
        message: string
    };
}

interface TransferPayload {
    data: {},
    meta: {
        ok: boolean;
        message: string
    };
}