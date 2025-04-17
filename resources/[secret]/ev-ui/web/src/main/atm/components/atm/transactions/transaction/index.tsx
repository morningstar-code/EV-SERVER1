import { TextField, Tooltip } from "@mui/material";
import { formatCurrency } from "lib/format";
import moment from "moment";
import useStyles from "../index.styles";
import Text from "components/text/text";

interface TransactionProps {
    transaction?: Transaction;
    smaller?: boolean;
}

const TaxComponent: React.FC<{ options: { amount: any, amountStyle: any }, transaction: Transaction }> = (props) => {
    const options = props.options;
    const transaction = props.transaction;

    let taxText = null;
    let amount = options.amount;

    if (
        transaction.direction === 'out' &&
        transaction.tax_id !== 1 &&
        transaction.tax_id !== 6 &&
        transaction.tax_percentage > 0
    ) {
        const taxedAmount = Math.ceil(transaction.amount / 100) * transaction.tax_percentage;

        amount += taxedAmount;

        taxText = `Taxes: ${formatCurrency(taxedAmount)} / Type: ${transaction.tax_type} (${transaction.tax_percentage}%)`;
    } else {
        if (transaction.direction === 'in' && transaction.tax_id === 6) {
            const taxedAmount = Math.ceil(transaction.amount / 100) * transaction.tax_percentage;
            taxText = `Taxes: ${formatCurrency(taxedAmount)} / Type: ${transaction.tax_type} (${transaction.tax_percentage}%)`;
        }
    }

    amount = transaction.direction === 'in' ? formatCurrency(amount ?? 0) : `-${formatCurrency(amount ?? 0)}`

    return taxText ? (
        <Tooltip title={taxText} placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
            <div>
                <Text variant="h5" style={{ width: 240, ...options.amountStyle }}>
                    {amount}
                </Text>
            </div>
        </Tooltip>
    ) : (
        <Text variant="h5" style={{ width: 240, ...options.amountStyle }}>
            {amount}
        </Text>
    )
}

export default (props: TransactionProps) => {
    const classes = useStyles();
    const smaller = props?.smaller ?? false;
    const transaction = props?.transaction;

    const accountTypes = {
        1: 'State Account',
        7: 'San Andreas Crypto Exchange'
    };

    const transactionData = transaction.direction === 'in' ? {
        accountId: transaction.from_account_id,
        accountName: accountTypes[transaction.from_account_id] || transaction.from_account_name,
        amount: transaction.amount,
        amountStyle: { color: '#95ef77' },
        civName: transaction.from_civ_name,
        sourceName: transaction.to_civ_name
    } : {
        accountId: transaction.to_account_id,
        accountName: accountTypes[transaction.to_account_id] || transaction.to_account_name,
        amount: transaction.amount,
        amountStyle: { color: '#f2a365' },
        civName: transaction.type !== 'withdraw' ? transaction.to_civ_name : transaction.from_civ_name,
        sourceName: transaction.from_civ_name
    }

    return (
        <div className={classes.transaction}>
            <div className={`${!smaller && 'flex-row'} flex-space-between`}>
                <Tooltip title="Account Name / Account ID [TYPE]" placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                    <div>
                        <Text variant="body1">
                            {transactionData.accountName} / {transactionData.accountId} [{transaction.type.toUpperCase()}]
                        </Text>
                    </div>
                </Tooltip>
                <Tooltip title="Transaction ID" placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                    <div>
                        <Text variant="body1">
                            {transaction.id}
                        </Text>
                    </div>
                </Tooltip>
            </div>
            <hr />
            <div style={{ display: 'flex', flexDirection: smaller ? 'column' : 'row', width: '100%', justifyContent: 'space-between' }}>
                <TaxComponent
                    transaction={transaction}
                    options={transactionData}
                />
                <Text variant="h6" style={{ flex: 1 }}>
                    {transactionData.civName}
                </Text>
                <div style={{ maxWidth: 280, textAlign: smaller ? 'left' : 'right' }}>
                    <Text variant="h6">
                        {moment(transaction.date * 1000).fromNow()}
                    </Text>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: smaller ? 'column' : 'row', width: '100%', justifyContent: 'space-between' }}>
                <Text variant="h6" style={{ flex: 1, textAlign: 'right' }}>
                    {transactionData.sourceName}
                </Text>
            </div>
            {transaction.comment && (
                <div style={{ marginTop: 16 }}>
                    <TextField
                        disabled
                        fullWidth
                        sx={{ width: "100%" }}
                        id="standard-disabled"
                        label="Message"
                        defaultValue={transaction.comment}
                        variant="standard"
                    />
                </div>
            )}
        </div>
    )
}