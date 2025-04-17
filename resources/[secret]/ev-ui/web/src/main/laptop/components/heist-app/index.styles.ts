import { makeStyles } from '@mui/styles';

export default makeStyles({
    appContainer: {
        position: 'absolute',
        height: '80%',
        width: '85%',
        top: '10%',
        left: '9%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#232426',
        animation: 'ease-in fadeIn 250ms'
    },
    container: {
        padding: '2rem',
        height: '100%',
        overflow: 'scroll'
    },
    appHeading: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '1.35rem',
        justifyContent: 'space-between',
        borderBottom: '2 solid #6360FF'
    },
    gameContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        height: '100%',
        width: '100%',
        backgroundColor: '#232426'
    },
    appCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexGrow: 1
    },
    loading: {
        width: '80%',
        textAlign: 'center'
    }
});