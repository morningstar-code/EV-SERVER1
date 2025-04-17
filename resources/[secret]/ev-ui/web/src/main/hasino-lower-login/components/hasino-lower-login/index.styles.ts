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
    textWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: ResponsiveHeight(16)
    },
    textWrapperBottom: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: ResponsiveHeight(8)
    },
    hint: {
        color: baseStyles.textColorGrey()
    }
});