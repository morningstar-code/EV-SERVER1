import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        minWidth: ResponsiveWidth(256),
        maxWidth: ResponsiveWidth(720),
        padding: ResponsiveWidth(32),
        backgroundColor: baseStyles.bgPrimary(),
        pointerEvents: 'all'
    },
    clueIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: ResponsiveHeight(32)
    },
    openButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
    }
});