import useStyles from '../index.styles';

export default (props: any) => {
    const classes = useStyles({
        adjustment: props.adjustment ?? false,
        amount: props.amount ?? 0,
        duration: props.duration ?? 0
    });

    const absoluteAmount = Math.abs(props.amount ?? 0);

    if (isNaN(absoluteAmount)) {
        return null;
    }

    const amount = absoluteAmount.toString().split('');

    return (
        <p className={classes.money}>
            {props.adjustment && props.amount >= 0 && (
                <span>+</span>
            )}
            {props.amount < 0 && (
                <span>-</span>
            )}
            <span className={classes.dollar}>
                $
            </span>
            {amount.map((value: string, index: number) => (
                <span
                    key={index}
                    className={(amount.length - index) % 3 === 0 || 0 === index ? classes.moneyMargin : classes.moneyNoMargin}
                >
                    {value}
                </span>
            ))}
        </p>
    )
}