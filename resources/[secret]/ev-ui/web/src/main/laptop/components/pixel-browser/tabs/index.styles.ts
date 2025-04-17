import { makeStyles } from '@mui/styles';

export default makeStyles({
    tabBar: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    appControlCloseBtn: {
        border: 'none !important',
        minWidth: '17px !important',
        minHeight: '17px !important',
        marginRight: '1rem !important',
        borderRadius: '50px !important',
        backgroundColor: '#ef5757 !important',
        '&:hover': {
            cursor: 'pointer !important'
        }
    },
    tabs: {
        display: 'flex',
    },
    tabIcon: {
        height: 16,
        width: 16,
        marginRight: '0.5rem'
    },
    tabsLi: {
        height: 32,
        width: 150,
        display: 'flex',
        marginTop: 10,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        alignItems: 'center',
        paddingLeft: '1rem',
        paddingRight: '0.4rem',
        paddingTop: '0.2rem',
        justifyContent: 'space-between',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
        marginLeft: '0.5rem'
    },
    tabLiSmall: {
        width: '2.4rem'
    },
    active: {
        color: 'red',
        backgroundColor: '#fff !important'
    },
    tabImg: {
        height: 16,
        width: 16,
        marginRight: '0.5rem'
    },
    tabText: {
        display: 'block !important',
        width: '98% !important',
        whiteSpace: 'nowrap',
        overflow: 'hidden !important',
        fontSize: '12px !important',
        color: '#454749 !important'
    },
    'li.active span:after': {
        background: '-webkit-linear-gradient(left,  hsla(0,0%,93%,0) 0%,hsla(0,0%,93%,1) 77%,hsla(0,0%,93%,1) 100%)'
    },
    newTab: {
        color: '#454749',
        fontSize: 20,
        fontWeight: 'normal',
        float: 'left',
        alignItems: 'center',
        width: 26,
        height: 26,
        justifyContent: 'center',
        background: 'transparent',
        marginTop: '0.7rem',
        marginLeft: '0.25rem',
        '&:hover': {
            cursor: 'pointer',
            background: '#c8cace',
            borderRadius: '50%'
        },
        '&:active': {
            color: '#555',
            background: '#c8cace',
            borderRadius: '50%'
        }
    },
    closeBtn: {
        color: '#454749',
        fontWeight: 'normal',
        float: 'left',
        display: 'flex',
        alignItems: 'center',
        padding: '5px 7px',
        borderRadius: '50%',
        width: 13,
        height: 13,
        justifyContent: 'center',
        background: 'transparent',
        p: {
            padding: 0,
            margin: 0,
            fontSize: 16,
            transform: 'rotate(45deg)'
        },
        '&:hover': {
            color: '#454749',
            cursor: 'pointer',
            background: '#eaeaea'
        }
    }
});