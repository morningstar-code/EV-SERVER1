import { makeStyles } from '@mui/styles';

export default makeStyles({
    wrapper: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
    },
    page: {
        height: '100%',
        width: '100%',
        transition: 'all 400ms ease',
        position: 'absolute',
        top: 0,
        left: 0,
        willChange: 'left'
    },
    hide: {
        visibility: 'hidden',
        pointerEvents: 'none'
    },
    hideLeft: {
        left: '-100%'
    },
    hideRight: {
        left: '100%'
    }
});