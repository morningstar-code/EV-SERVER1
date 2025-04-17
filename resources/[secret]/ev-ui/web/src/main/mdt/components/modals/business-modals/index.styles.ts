import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';

export default makeStyles({
    bankAccessWrapper: {
        display: 'flex',
        padding: '1rem',
        alignItems: 'center',
        justifyContent: 'center'
    },
    changeOwnerWrapper: {
        display: 'flex',
        padding: '1rem',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    createBusinessWrapper: {
        display: 'flex',
        padding: '1rem',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    inputField: {
        marginBottom: '0.5rem',
        width: '100%'
    },
    errorText: {
        color: baseStyles.redText,
        marginTop: '1rem'
    }
});