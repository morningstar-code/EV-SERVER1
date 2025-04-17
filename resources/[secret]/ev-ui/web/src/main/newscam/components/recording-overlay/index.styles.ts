import { makeStyles } from '@mui/styles';

export default makeStyles({
    '@global': {
        '@keyframes blink': {
            '50%': {
                opacity: '0'
            }
        }
    },
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'none'
    },
    recordingOverlay: {
        height: '5vh',
        width: '5vh',
        borderRadius: '5vh',
        top: '10vh',
        right: '10vh',
        zIndex: '10',
        position: 'absolute',
        backgroundColor: 'red',
        animation: 'blink',
        animationDuration: '5s',
        animationIterationCount: 'infinite'
    }
});