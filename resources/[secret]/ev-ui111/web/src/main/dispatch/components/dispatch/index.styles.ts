import { makeStyles } from '@mui/styles';
import { ResponsiveHeight, ResponsiveWidth } from '../../../../utils/responsive';

export default makeStyles({
    wrapper: function (props: any) {
        return {
            pointerEvents: props?.show ? 'all' : 'none',
            visibility: props?.show ? 'visible' : 'hidden',
            display: 'flex',
            width: '100vw',
            height: '100vh',
            padding: ResponsiveWidth(16)
        }
    },
    mapContainer: {
        width: '50%',
        height: '100%'
    },
    callsContainer: {
        width: '50%',
        height: '100%',
        display: 'flex'
    },
    pingsLeos: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column'
    },
    calls: {
        flex: 1,
        width: '100%',
        height: '100%',
        margin: `0 ${ResponsiveWidth(16)}`
    },
    pings: {
        flex: 1,
        width: '100%',
        height: '70%'
    },
    leos: {
        width: '100%',
        height: '30%',
        borderTop: '2px solid #187fe7'
    },
    mapWrapper: {
        width: '100%',
        height: '100%'
    },
    leosWrapper: {
        backgroundColor: '#222831',
        height: '100%',
        padding: ResponsiveWidth(8),
        display: 'flex',
        overflow: 'hidden',
        overflowY: 'scroll'
    },
    leosPolice: {
        width: '60%',
        paddingRight: ResponsiveWidth(8),
        marginRight: ResponsiveWidth(8)
    },
    unit: {
        display: 'flex',
        backgroundColor: '#30475e',
        padding: ResponsiveWidth(4),
        width: 'auto',
        marginBottom: ResponsiveHeight(4)
    },
    unitIcon: {
        padding: ResponsiveWidth(8),
        paddingTop: 0,
        paddingBottom: 0,
        display: 'flex',
        alignItems: 'center',
        color: 'white'
    },
    chipHolder: {
        margin: ResponsiveHeight(4)
    }
});