import { makeStyles } from '@mui/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'all'
    },
    bb: {
        height: '10vh',
        width: '100vw',
        backgroundColor: 'black'
    },
    bbMiddle: function (props: any) {
        return {
            flex: 1,
            backgroundColor: props.switchingViews ? 'black' : 'unset'
        }
    },
    camChooserContent: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: ResponsiveWidth(8)
    },
    camChooserTitle: {
        fontFamily: 'Arial, Helvetica, sans-serif !important',
        letterSpacing: `${ResponsiveWidth(0.7)} !important`,
        fontWeight: '600 !important',
        textDecoration: 'none !important',
        fontStyle: 'normal !important',
        fontVariant: 'small-caps !important',
        textTransform: 'none',
        textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
        width: 'auto !important'
    },
    camSelector: {
        width: '15vw',
        marginLeft: 100
    }
});