import { Typography } from "@mui/material";
import Button from "components/button/button";
import Spinner from "components/spinner/spinner";
import useStyles from "./index.styles";
import Transaction from "./transaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ModalActions = {
    deposit: (account: Account | null, action: string | null) => void;
    withdraw: (account: Account | null, action: string | null) => void;
    transfer: (account: Account | null, action: string | null) => void;
    exportTx: (account: Account | null, action: string | null) => void;
}

interface TransactionsProps {
    account: Account;
    transactions: Transaction[];
    transactionsLoading: boolean;
    showTransactionsAccessWarning: boolean;
    isAtm: boolean;
    actions: ModalActions;
}

export default (props: TransactionsProps) => {
    const classes = useStyles();
    const showTransactionsAccessWarning = props.showTransactionsAccessWarning ?? true;
    const transactions = props.transactions ?? [];
    const transactionsLoading = props.transactionsLoading ?? true;
    const isAtm = props.isAtm ?? true;

    return (
        <div className={classes.transactions}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Typography variant="h5" style={{ color: 'white' }}>
                    Transaction History
                </Typography>
                {!isAtm && !showTransactionsAccessWarning && (
                    <Button.Tertiary onClick={(e: React.ChangeEvent) => {
                        e.stopPropagation();
                        props.actions['exportTx'](props.account, 'exportTx');
                    }}>
                        Export
                    </Button.Tertiary>
                )}
                <div className={classes.title}>
                    <FontAwesomeIcon icon="university" size="2x" fixedWidth />
                    <Typography variant="h5" style={{ color: 'white', marginLeft: 16 }}>Chafe Bank</Typography>
                </div>
            </div>
            {showTransactionsAccessWarning && (
                <Typography variant="h5" style={{ color: 'white', marginTop: 32, textAlign: 'center' }}>NO ACCESS TO VIEW TRANSACTIONS FOR THIS ACCOUNT</Typography>
            )}
            {!showTransactionsAccessWarning && !!transactions && transactions.length === 0 && !transactionsLoading && (
                <Typography variant="h5" style={{ color: 'white', marginTop: 32, textAlign: 'center' }}>NO TRANSACTIONS FOUND FOR SELECTED ACCOUNT</Typography>
            )}
            {transactionsLoading && (
                <Spinner />
            )}
            {!!transactions && transactions.length > 0 && !transactionsLoading && (
                <>
                    {transactions.map((transaction) => (
                        <Transaction
                            key={transaction.id}
                            transaction={transaction}
                        />
                    ))}
                </>
            )}
        </div>
    )
}