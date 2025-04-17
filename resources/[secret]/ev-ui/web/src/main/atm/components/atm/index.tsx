import Spinner from "components/spinner/spinner";
import Accounts from "./accounts";
import useStyles from "./index.styles";
import Modal from "./modal";
import Transactions from "./transactions";

type ModalActions = {
    deposit: (account: Account | null, action: string | null) => void;
    withdraw: (account: Account | null, action: string | null) => void;
    transfer: (account: Account | null, action: string | null) => void;
    exportTx: (account: Account | null, action: string | null) => void;
}

interface ATMProps {
    initialLoadComplete: boolean;
    modalAction: string | null;
    modalAccount: Account;
    actions: ModalActions;
    showModalError: string | boolean;
    accounts: Account[];
    transactions: Transaction[];
    cash: number;
    isAtm: boolean;
    selectedAccount: Account;
    showTransactionsAccessWarning: boolean;
    transactionsLoading: boolean;
    performAction: (type: string, account: Account, amount: number, comment: string, accountId: number, stateId: number) => void;
    performExportAction: () => void;
    getTransactions: (account: Account) => void;
}

export default (props: ATMProps) => {
    const classes = useStyles();
    const height = props.initialLoadComplete ? '75vh' : 200;

    return (
        <div className={classes.container} style={{ height: height }}>
            {!props.initialLoadComplete && (
                <Spinner />
            )}
            {props.initialLoadComplete && (
                <>
                    {props.modalAction && (
                        <Modal
                            account={props.modalAccount}
                            action={props.modalAction}
                            closeModal={() => props.actions.deposit(null, null)}
                            performAction={props.performAction}
                            showModalError={props.showModalError}
                            performExportAction={props.performExportAction}
                        />
                    )}
                    <Accounts
                        accounts={props.accounts}
                        actions={props.actions}
                        cash={props.cash}
                        isAtm={props.isAtm}
                        getTransactions={props.getTransactions}
                        selectedAccount={props.selectedAccount}
                    />
                    <Transactions
                        actions={props.actions}
                        account={props.selectedAccount}
                        isAtm={props.isAtm}
                        showTransactionsAccessWarning={props.showTransactionsAccessWarning}
                        transactions={props.transactions}
                        transactionsLoading={props.transactionsLoading}
                    />
                </>
            )}
        </div>
    )
}