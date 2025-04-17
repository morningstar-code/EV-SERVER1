import { Typography } from "@mui/material";
import { formatCurrency } from "lib/format";
import Account from "./account";
import useStyles from "./index.styles";

type ModalActions = {
    deposit: (account: Account | null, action: string | null) => void;
    withdraw: (account: Account | null, action: string | null) => void;
    transfer: (account: Account | null, action: string | null) => void;
    exportTx: (account: Account | null, action: string | null) => void;
}

interface AccountsProps {
    accounts: Account[];
    actions: ModalActions;
    cash: number;
    isAtm: boolean;
    getTransactions: (account: Account) => void;
    selectedAccount: Account;
}

export default (props: AccountsProps) => {
    const classes = useStyles();
    const accounts = props.accounts;
    const actions = props.actions;
    const cash = props.cash;
    const isAtm = props.isAtm;
    const getTransactions = props.getTransactions;
    const selectedAccount = props.selectedAccount;

    return (
        <div className={classes.accounts}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, height: 40 }}>
                <Typography variant="h5" style={{ color: 'white' }}>
                    Accounts
                </Typography>
            </div>
            <div className={classes.accountsHolder}>
                {accounts && accounts.map((account: Account) => (
                    <Account
                        key={account?.id}
                        account={account}
                        actions={actions}
                        active={selectedAccount?.id === account?.id}
                        isAtm={isAtm}
                        getTransactions={getTransactions}
                    />
                ))}
            </div>
            <div style={{ height: 40, display: 'flex', alignItems: 'flex-end' }}>
                <Typography variant="body1" style={{ color: 'white' }}>
                    Cash: {formatCurrency(cash ?? 0)}
                </Typography>
            </div>
        </div>
    )
}