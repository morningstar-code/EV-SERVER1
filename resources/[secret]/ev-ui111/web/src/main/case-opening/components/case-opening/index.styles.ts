import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        pointerEvents: 'all',
        height: ResponsiveWidth(350),
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '50%',
        overflow: 'hidden',
        margin: ResponsiveWidth(64),
        paddingTop: ResponsiveWidth(32),
        paddingBottom: ResponsiveWidth(32),
        backgroundColor: baseStyles.bgPrimary(),
        borderRadius: ResponsiveWidth(10)
    },
    middleLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        margin: '0 auto',
        width: ResponsiveWidth(3),
        height: ResponsiveHeight(220),
        backgroundColor: baseStyles.colorYellow()
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '200px',
        width: '200px'
    },
    imageHolder: {
        margin: '8px',
        width: '200px',
        height: '200px',
        borderRadius: ResponsiveWidth(10)
    }
});