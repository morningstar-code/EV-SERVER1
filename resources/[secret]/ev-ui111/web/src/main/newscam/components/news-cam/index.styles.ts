import { makeStyles } from '@mui/styles';

export default makeStyles({
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'all',
        position: 'relative'
    },
    bb: {
        height: '5vh',
        width: '100vw',
        backgroundColor: 'black'
    },
    bbMiddle: {
        flex: 1,
        backgroundColor: 'unset'
    },
    video: {
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '-3vh',
        margin: '0',
        objectFit: 'cover'
    },
    overlayText: {
        position: 'absolute',
        bottom: '7.5vw',
        left: '7.5vw',
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: '3em',
        textShadow: '2px 0 4px #575657',
        fontStyle: 'italic'
    }
});