import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';

export default makeStyles({
    cashWrapper: {
        width: '100vw',
        textAlign: 'right',
        marginTop: '200px',
        fontFamily: 'pricedown',
        fontSize: '2.25em',
        padding: '16px',
        color: 'white',
        textShadow: '2px 2px black'
    },
    money: {
        '& span': {
            marginLeft: 8
        }
    },
    moneyMargin: {
        marginLeft: 8
    },
    moneyNoMargin: {
        marginLeft: '0 !important'
    },
    dollar: function (props: any) {
        return {
            color: props.amount < 0 ? baseStyles.cashRed : baseStyles.cashGreen
        }
    }
});