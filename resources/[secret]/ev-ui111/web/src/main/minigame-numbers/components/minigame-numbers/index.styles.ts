import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';

export default makeStyles({
    container: {
        height: '20vh',
        width: '50vh',
        position: 'relative',
        pointerEvents: 'all',
        backgroundColor: baseStyles.bgPrimary()
    },
    introBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    }
});