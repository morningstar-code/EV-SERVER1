import { makeStyles } from '@mui/styles';

export default makeStyles({
    notificationPanel: {
        right: 0,
        zIndex: 10,
        width: '25%',
        height: '85%',
        padding: 20,
        position: 'absolute',
        borderRadius: 10,
        margin: '1rem',
        background: 'rgba(24, 24, 24, 0.6)',
        backdropFilter: 'blur(32px)'
    },
    notificationsList: {
        overflow: 'scroll',
        maxHeigt: '90%'
    },
    notification: {
        display: 'flex',
        padding: 10,
        borderRadius: 5,
        position: 'relative',
        alignItems: 'center',
        marginBottom: '0.5rem',
        background: 'rgba(24, 24, 24, 2%)',
        backdropFilter: 'blur(32px)'
    },
    thumbnail: {
        marginRight: '0.5rem',
        height: 40
    },
    title: {
        fontSize: '13px !important',
        color: '#fff !important',
    },
    desc: {
        color: '#797979 !important',
        fontSize: '14px !important'
    },
    headerTitle: {
        fontSize: '20px !important',
        textAlign: 'center',
        marginBottom: '1rem !important'
    },
    exitIcon: {
        right: 5,
        top: 5,
        color: '#fff',
        position: 'absolute'
    }
});