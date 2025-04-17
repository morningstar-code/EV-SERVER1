import { makeStyles } from '@mui/styles';

export default makeStyles({
    screen: {
        width: '85%',
        height: '85%',
        zIndex: 10,
        overflow: 'hidden',
        borderRadius: 5,
        position: 'relative',
        border: 'rgba(24, 24, 24, 0.6) 5px solid',
        animation: 'ease-in fadeIn 250ms',
        backdropFilter: 'blur(32px)'
    },
    computerScreen: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    desktop: {
        flex: 'auto',
        padding: 10,
        display: 'flex'
    },
    desktopIconBox: {
        maxWidth: 100,
        height: 75,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        border: '1px solid transparent',
        padding: 10,
        textAlign: 'center'
    },
    icon: {
        height: 50
    },
    iconTitle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'normal'
    },
    notificationsList: {
        position: 'absolute',
        right: 3,
        width: '25%',
        height: '100%',
        top: 0,
        display: 'flex',
        paddingBottom: '3.5rem',
        flexDirection: 'column-reverse'
    },
    '&:hover': {
        cursor: 'pointer',
        border: '1px rgba(255, 255, 255, 0.466) solid',
        backgroundColor: 'rgba(131, 210, 255, 0.068)'
    },
    '@keyframes fadeIn': {
        from: {
            opacity: 0,
            transform: 'scale(0)'
        },
        to: {
            opacity: 1,
            transform: 'scale(1)'
        }
    }
});