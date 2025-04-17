import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';

export default makeStyles({
    container: {
        pointerEvents: 'all',
        color: 'white',
        transition: 'all 800ms ease',
        backgroundColor: baseStyles.bgPrimary(),
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '1280px',
        maxHeight: '80vh',
        position: 'relative',
        textAlign: 'center',
        padding: 16,
        '& p, h6': {
            marginTop: 8,
            marginBottom: 8
        }
    }
});