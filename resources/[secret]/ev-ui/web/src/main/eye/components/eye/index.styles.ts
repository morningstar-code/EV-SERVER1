import { makeStyles } from '@mui/styles';
import { ResponsiveHeight, ResponsiveWidth } from '../../../../utils/responsive';

export default makeStyles({
    container: {
        position: 'relative',
        whiteSpace: 'nowrap'
    },
    options: {
        position: 'absolute',
        top: '0.5vw',
        left: '5vh',
        //paddingTop: ResponsiveHeight(0),
        pointerEvents: 'all',
        userSelect: 'none'
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
        '& h6': {
            fontFamily: 'Arial, Helvetica, sans-serif !important',
            letterSpacing: `${ResponsiveWidth(0.7)} !important`,
            fontWeight: '600 !important',
            textDecoration: 'none !important',
            fontStyle: 'normal !important',
            fontVariant: 'small-caps !important',
            textTransform: 'none !important',
            width: '100% !important',
            textShadow: '-1px 1px 0 #3f3f3f, 1px 1px 0 #3f3f3f, 1px -1px 0 #3f3f3f, -1px -1px 0 #3f3f3f',
            '&:hover': {
                color: '#87aad8 !important' 
            }
        }
    },
    optionIcon: {
        marginRight: ResponsiveWidth(4),
        filter: 'drop-shadow(2px 2px 2px black)',
        color:'#87aad8 !important'
    }
});