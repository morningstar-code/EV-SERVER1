import { makeStyles } from '@mui/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 100,
        userSelect: 'none',
        minHeight: 24,
        height: ResponsiveHeight(24),
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    notchSpacer: {
        flex: 1
    },
    leftRight: {
        minHeight: 24,
        height: ResponsiveHeight(24),
        minWidth: 74,
        color: 'white',
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center'
    },
    left: {
        paddingRight: ResponsiveWidth(4)
    },
    right: {
        justifyContent: 'flex-end',
        '& i': {
            marginLeft: ResponsiveWidth(4),
            stroke: 'black',
            strokeWidth: 6
        }
    },
    text: {
        fontSize: '0.75rem !important',
        lineHeight: '0px !important',
        textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F !important'
    },
    serverId: {
        flex: 1,
        marginLeft: ResponsiveWidth(8)
    }
});