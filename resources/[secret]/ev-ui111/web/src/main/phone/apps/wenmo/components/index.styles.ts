import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';

export default makeStyles({
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '4px',
        '& > .in': {
            color: `${baseStyles.colorCurrencyIn()} !important`
        },
        '& > .out': {
            color: `${baseStyles.colorCurrencyOut()} !important`
        }
    }
});