import { makeStyles } from '@mui/styles';

export default makeStyles({
    systemNotification: {
        zIndex: 10,
        display: 'flex',
        padding: '15px 10px',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: '0.5rem',
        animation: 'ease-in bounceIn 500ms',
        background: 'rgba(24, 24, 24, 0.6)',
        backdropFilter: 'blur(32px)'
    },
    systemNotificationInfo: {
        marginLeft: '0.5rem'
    },
    systemNotificationTitle: {
        margin: '0px !important',
        padding: '0px !important',
        color: '#fff !important',
        fontSize: '15px !important',
        fontWeight: 'normal !important'
    },
    systemNotificationDesc: {
        color: '#777777 !important',
        fontSize: '15px !important',
        marginTop: '0.25rem !important'
    },
    thumbnail: {
        marginRight: '0.5rem',
        height: '40px'
    },
    '@keyframes bounceIn': {
        '0%': {
            opacity: 0,
            transform: 'scale(.3)',
        },
        '50%': {
            opacity: 1,
            transform: 'scale(1.05)',
        },
        '70%': { transform: 'scale(.9)' },
        '100%': { transform: 'scale(1)' }
    }
});