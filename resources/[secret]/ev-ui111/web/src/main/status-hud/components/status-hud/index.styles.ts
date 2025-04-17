import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight } from 'utils/responsive';

export default makeStyles({
    container: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
    },
    statusBox: {
        backgroundColor: baseStyles.bgPrimary(),
        paddingTop: ResponsiveHeight(8),
        paddingBottom: ResponsiveHeight(8),
        paddingLeft: ResponsiveHeight(32),
        paddingRight: ResponsiveHeight(32),
        border: '1px solid black'
    },
    textContainer: {
        marginBottom: ResponsiveHeight(4)
    },
    textContainerCenter: {
        textAlign: 'center'
    }
});