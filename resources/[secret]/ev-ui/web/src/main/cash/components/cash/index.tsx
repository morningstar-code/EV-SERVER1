import useStyles from './index.styles';
import Number from './number';

export default (props: any) => {
    const classes = useStyles(props);

    return (
        <div className={classes.cashWrapper}>
            {props.amountAdjustment !== null && (
                <Number
                    adjustment={true}
                    amount={props.amountAdjustment}
                    duration={props.duration}
                />
            )}
            {props.cash !== null && (
                <Number
                    adjustment={false}
                    amount={props.cash}
                    duration={props.duration}
                />
            )}
            {props.bankAmount !== null && (
                <Number
                    adjustment={false}
                    amount={props.bankAmount}
                    duration={props.duration}
                />
            )}
            {props.bankName !== null && (
                <p>
                    {props.bankName}
                </p>
            )}
        </div>
    )
}