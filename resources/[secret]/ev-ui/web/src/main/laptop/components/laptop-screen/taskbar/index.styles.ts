import { makeStyles } from '@mui/styles';

export default makeStyles({
    taskbar: {
        zIndex: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 40,
        width: '100%',
        background: 'rgba(24, 24, 24, 0.6)',
        backdropFilter: 'blur(32px)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'row',
        paddingRight: '0.6rem'
    },
    smallIcon: {
        height: '100%',
        display: 'flex',
        paddingRight: 15,
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainIcons: {
        flex: 'auto',
        display: 'flex',
        height: '100%'
    },
    systemTime: {
        display: 'flex',
        fontSize: 11,
        flexBasis: 63,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        '& p': {
            textAlign: 'center',
            color: '#fff',
            fontSize: 11,
            margin: 0,
            padding: 0
        }
    },
    taskbarItem: {
        height: '100%',
        width: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#ffffff14'
        }
    },
    icon: {
        height: 24
    },
    open: {
        cursor: 'pointer',
        backgroundColor: '#ffffff14'
    },
    pixelIcon: {
        maxHeight: 20,
        maxWidth: 20
    },
    notficationIcon: {
        background: 'url(https://i.imgur.com/wADOR0k.png) no-repeat center / 16px, rgba(255, 255, 255, 0)',
        border: 'none',
        width: '100%',
        transition: 'background 0.1s',
        height: '100%'
    }
});