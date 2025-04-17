import { Tooltip, Typography } from "@mui/material";
import Button from "components/button/button";
import { formatCurrency } from "lib/format";
import useStyles from "../index.styles";

function hasAccess(account: Account, access: string) {
    return account?.access.indexOf(access) !== -1;
}

const noAccessText = 'You do not have access to do this, bitch.';

type ModalActions = {
    deposit: (account: Account | null, action: string | null) => void;
    withdraw: (account: Account | null, action: string | null) => void;
    transfer: (account: Account | null, action: string | null) => void;
    exportTx: (account: Account | null, action: string | null) => void;
}

interface AccountProps {
    account: Account;
    active: boolean;
    isAtm: boolean;
    actions: ModalActions;
    getTransactions: (account: Account) => void;
}

export default (props: AccountProps) => {
    const classes = useStyles();
    const actions = props.actions;
    const active = props.active;
    const account = props.account;
    const isAtm = props.isAtm;
    const getTransactions = props.getTransactions;

    function executeAction(e: React.ChangeEvent, action: string) {
        e.stopPropagation();
        actions[action](account, action);
    }

    return (
        <div className={`${classes.account} ${active ? classes.accountActive : ''}`} onClick={() => getTransactions(account)}>
            <Tooltip title="Account Name / Account ID" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                <Typography variant="body1" style={{ color: 'white', backgroundColor: 'transparent' }}>
                    {account?.name} / {account?.id}
                </Typography>
            </Tooltip>
            <div className={classes.balanceContainer}>
                <div>
                    <Tooltip title="Account Type" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <Typography variant="body2" style={{ color: 'white', backgroundColor: 'transparent' }}>
                            {account?.type}
                        </Typography>
                    </Tooltip>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        {account?.owner_first_name} {account?.owner_last_name}
                    </Typography>
                </div>
                <div style={{ margin: '8px 0' }}>
                    <Typography variant="h5" style={{ color: 'white', textAlign: 'right', textDecoration: account?.is_frozen ? 'line-through' : '' }}>
                        {hasAccess(account, 'balance') ? formatCurrency(account?.balance ?? 0) : '$??.??'}
                    </Typography>
                    <Typography variant="body1" style={{ color: 'white', textAlign: 'right' }}>
                        {account?.is_frozen ? 'Frozen Balance' : 'Available Balance'}
                    </Typography>
                </div>
            </div>
            <div className="flex-row flex-space-between flex-vertical-center" style={{ width: '100%' }}>
                {!isAtm && hasAccess(account, 'deposit') && (
                    <Button.Primary onClick={(e: React.ChangeEvent) => executeAction(e, 'deposit')}>
                        Deposit
                    </Button.Primary>
                )}
                {!isAtm && !hasAccess(account, 'deposit') && (
                    <Tooltip title={noAccessText} placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div>
                            <Button.Primary disabled>
                                Deposit
                            </Button.Primary>
                        </div>
                    </Tooltip>
                )}
                {hasAccess(account, 'withdraw') ? (
                    <Button.Secondary onClick={(e: React.ChangeEvent) => executeAction(e, 'withdraw')}>
                        Withdraw
                    </Button.Secondary>
                ) : (
                    <Tooltip title={noAccessText} placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div>
                            <Button.Secondary disabled>
                                Withdraw
                            </Button.Secondary>
                        </div>
                    </Tooltip>
                )}
                {hasAccess(account, 'transfer') ? (
                    <Button.Tertiary onClick={(e: React.ChangeEvent) => executeAction(e, 'transfer')}>
                        Transfer
                    </Button.Tertiary>
                ) : (
                    <Tooltip title={noAccessText} placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div>
                            <Button.Tertiary disabled>
                                Transfer
                            </Button.Tertiary>
                        </div>
                    </Tooltip>
                )}
            </div>
        </div>
    )
}