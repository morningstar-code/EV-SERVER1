import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh'
    },
    container: {
        backgroundColor: baseStyles.bgPrimary(),
        pointerEvents: 'all',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '30vh',
        padding: ResponsiveWidth(32)
    },
    sliders: {
        flex: 1
    },
    button: {
        marginTop: ResponsiveWidth(32)
    }
});