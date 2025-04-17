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
            backgroundColor: '#1A237E',
            borderRight: '5px solid #187fe7',
            padding: ResponsiveWidth(8),
            marginBottom: ResponsiveHeight(8),
            opacity: props.opaque ? 0.35 : 1,
            '&:hover': {
                opacity: 1
            },
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
    }
});