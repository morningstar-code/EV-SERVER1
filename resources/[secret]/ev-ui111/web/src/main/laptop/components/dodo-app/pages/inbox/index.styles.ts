import { makeStyles } from '@mui/styles';

export default makeStyles({
    content: {
        paddingTop: 10,
        overflow: 'scroll',
        paddingLeft: '1rem',
        paddingRight: '1rem'
    },
    title: {
        color: '#24314d !important',
        fontWeigth: '500 !important',
        fontSize: '2.5vh !important'
    },
    inboxName: {
        display: 'flex !important',
        color: '#24314d !important',
        fontWeight: '500 !important',
        fontSize: '1.8vh !important',
        alignItems: 'center'
    },
    inbox: {
        display: 'flex',
        padding: '0.75rem',
        borderRadius: 4,
        flexDirection: 'row',
        marginTop: '0.5rem',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderBottom: '3px solid #67b581',
        boxShadow: 'rgb(36 49 77 / 6%) 0px 4px 9px 3px'
    },
    btn: {
        color: '#fff !important',
        backgroundColor: '#24314d !important',
        '&:hover': {
            backgroundColor: '#24314d !important'
        }
    },
    btnDisabled: {
        color: '#fff !important',
        backgroundColor: '#696c70 !important',
        '&:hover': {
            backgroundColor: '#696c70 !important'
        }
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    noJobs: {
        fontSize: '3vh !important',
        textAlign: 'center',
        marginTop: '20vh !important',
        color: '#c5c5c5 !important'
    }
});