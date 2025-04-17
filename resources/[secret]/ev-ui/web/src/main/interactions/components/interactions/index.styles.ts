import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        paddingLeft: '16px'
    },
    alert: {
        display: 'inline-block'
    },
    textClass: {
        fontFamily: 'Arial, Helvetica, sans-serif !important',
        letterSpacing: `${ResponsiveWidth(0.7)} !important`,
        fontWeight: '600 !important',
        textDecoration: 'none !important',
        fontStyle: 'normal !important',
        fontVariant: 'small-caps !important',
        textTransform: 'none',
        width: '100% !important'
    },
    textClassB: {
        fontFamily: 'Arial, Helvetica, sans-serif !important',
        letterSpacing: `${ResponsiveWidth(0.7)} !important`,
        fontWeight: '600 !important',
        textDecoration: 'none !important',
        fontStyle: 'normal !important',
        fontVariant: 'small-caps !important',
        textTransform: 'none',
        width: '100% !important',
        textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F'
    }
});