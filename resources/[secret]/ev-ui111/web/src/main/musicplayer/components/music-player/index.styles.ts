import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight } from 'utils/responsive';

export default makeStyles({
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        position: 'relative'
    },
    musicPlayer: {
        height: ResponsiveHeight(128),
        width: '25vw',
        position: 'relative',
        pointerEvents: 'all'
    },
    controlsBlocker1: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '25%'
    },
    controlsBlocker2: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '45%',
        width: '65%'
    },
    musicControls: (props: any) => {
        return {
            pointerEvents: 'all',
            position: 'absolute',
            right: 0,
            top: props.minimized ? 0 : ResponsiveHeight(116),
            width: props.minimized ? 'unset' : '25vw',
            height: 'auto',
            backgroundColor: baseStyles.bgPrimary(),
            padding: 8,
            display: 'flex',
            flexDirection: 'row'
        }
    },
    volume: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    closeButton: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});