import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';

export default makeStyles({
    wrapper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        width: '100%',
        padding: '16px',
        backgroundColor: '#861657',
        backgroundImage: 'linear-gradient(326deg, #861657 0%, #ffa69e 74%)',
        fontSize: '1.5rem',
        color: 'white',
        textAlign: 'center',
        textShadow: '1px 1px 1px #000',
        fontFamily: 'helvetica'
    },
    buttons: {
        maxWidth: '280px',
        padding: '16px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        flex: 1
    },
    send: {
        cursor: 'pointer !important',
        padding: '8px 16px !important',
        color: 'white !important',
        width: '100% !important',
        display: 'flex !important',
        textTransform: 'uppercase',
        borderRadius: '4px !important',
        marginBottom: '16px !important',
        alignItems: 'center !important',
        backgroundColor: `${baseStyles.bgSecondary()} !important`,
        '& h6': {
            width: '100% !important',
            textAlign: 'center',
        }
    },
    input: {
        maxWidth: '280px !important',
        padding: '16px 64px !important'
    }
});