import { makeStyles } from '@mui/styles';
import { ResponsiveHeight, ResponsiveWidth } from '../../../../../../utils/responsive';

export default makeStyles({
    pingsWrapper: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        overflowY: 'scroll'
    },
    ping: function (props: any) {
        return {
            backgroundColor: props?.priority !== 3 ? '#003464d2' : '#841515c2',
            borderRight: props?.priority !== 3 ? '5px solid #187fe7' : '5px solid #b81207',
            padding: ResponsiveWidth(8),
            marginBottom: ResponsiveHeight(8),
            color: 'white',
            '& p': {
                fontSize: ResponsiveWidth(14),
                fontFamily: 'Arial, Helvetica, sans-serif !important',
                letterSpacing: `${ResponsiveWidth(0.7)} !important`,
                fontWeight: '600 !important',
                textDecoration: 'none !important',
                fontStyle: 'normal !important',
                fontVariant: 'small-caps !important',
                textTransform: 'none !important',
                width: '100% !important',
                textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F'
            },
            '& svg': { marginRight: ResponsiveWidth(8) }
        }
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    chips: {
        display: 'flex',
        flex: 1
    },
    marker: {
        display: 'flex',
        justifyContent: 'flex-end',
        '& svg': { margin: 0 }
    },
    info: {
        display: 'flex',
        alignItems: 'center'
    },
    notificationsWrapper: {
        position: 'absolute',
        right: 0,
        pointerEvents: 'none',
        top: ResponsiveHeight(32),
        width: '25vw',
        padding: ResponsiveWidth(16)
    }
});