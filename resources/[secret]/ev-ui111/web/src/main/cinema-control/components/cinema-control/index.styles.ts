import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    container: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'all'
    },
    innerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    statusBox: {
        backgroundColor: baseStyles.bgPrimary(),
        paddingTop: ResponsiveHeight(8),
        paddingBottom: ResponsiveHeight(8),
        paddingLeft: ResponsiveHeight(32),
        paddingRight: ResponsiveHeight(32),
        border: '1px solid black',
        width: ResponsiveWidth(480)
    },
    textContainer: {
        marginBottom: ResponsiveHeight(4)
    },
    textContainerCenter: {
        textAlign: 'center'
    },
    fullWidth: {
        width: '100%'
    },
    iconColor: {},
    icon: {}
});