import { makeStyles } from '@mui/styles';

export default makeStyles({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        maxHeight: '100vh',
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        minWidth: '100vw',
        margin: '0 !important',
        padding: '0 !important',
        border: '0 !important',
        outline: '0 !important',
        overflow: 'hidden !important',
        pointerEvents: 'none'
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});