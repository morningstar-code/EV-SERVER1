import { makeStyles } from '@mui/styles';

export default makeStyles({
    logo: {
        width: '55%'
    },
    icon: {
        marginRight: 10,
        fontSize: '1.2rem!important'
    },
    sidebar: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: 'minmax(10px, 10vw)',
        backgroundColor: '#24314d'
    },
    menu: {
        color: '#fff',
        width: '85%',
        marginTop: '1rem',
        height: '80%'
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        padding: '0.70rem 0.5rem',
        marginBottom: '0.5rem',
        cursor: 'pointer',
        '&:hover': {
            background: '#1e283c'
        }
    },
    menuItemActive: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        padding: '0.70rem 0.5rem',
        background: '#1e283c',
        marginBottom: '0.5rem',
        cursor: 'pointer'
    },
    menuText: {
        fontSize: '0.90rem !important'
    },
    signInBtn: {
        display: 'flex !important',
        alignItems: 'center !important',
        borderRadius: '5px !important',
        justifyContent: 'center !important',
        padding: '0.70rem 0.5rem !important',
        background: '#1e283c !important',
        marginBottom: '0.5rem !important',
        width: '85% !important',
        cursor: 'pointer !important'
    }
});