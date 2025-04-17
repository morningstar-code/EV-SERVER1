import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        minWidth: ResponsiveWidth(256),
        maxWidth: ResponsiveWidth(720),
        padding: ResponsiveWidth(16),
        backgroundColor: baseStyles.bgPrimary(),
        pointerEvents: 'all'
    },
    inputs: {
        minWidth: ResponsiveWidth(256),
        maxWidth: ResponsiveWidth(720),
        display: 'block',
        overflow: 'auto',
        backgroundColor: baseStyles.bgPrimary()
    },
    text: {
        color: baseStyles.textColor(),
        fontFamily: 'Arial, Helvetica, sans-serif',
        marginBottom: 16
    },
    button: {
        padding: ResponsiveWidth(16),
        paddingTop: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});