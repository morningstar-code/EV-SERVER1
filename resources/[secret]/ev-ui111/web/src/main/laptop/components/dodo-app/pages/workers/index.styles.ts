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
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchInput: {
        border: 'none',
        background: 'white',
        borderRadius: 5,
        boxShadow: 'rgb(36 49 77 / 6%) 0px 4px 9px 3px',
        padding: '0.8rem 0.5rem',
        marginRight: '1rem'
    },
    workerName: {
        display: 'flex !important',
        color: '#24314d !important',
        fontWeight: '500 !important',
        fontSize: '1.7vh !important',
        alignItems: 'center'
    },
    workersList: {
        paddingBottom: '4rem'
    },
    worker: {
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
        marginLeft: '0.5rem !important',
        backgroundColor: '#24314d !important',
        '&:hover': {
            backgroundColor: '#24314d !important'
        }
    },
    modal: {
        background: 'red',
        borderRaduis: 3,
        backgroundColor: '#fff',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    desc: {
        color: '#24314d !important',
        fontSize: '1.8vh !important'
    },
    companyCut: {
        color: '#24314d !important',
        fontSize: '1.5vh !important'
    },
    buttons: {
        display: 'flex',
        alignItems: 'center'
    },
    inputSection: {
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        flex: 'auto',
        border: 'none',
        background: '#24314d',
        borderRadius: '3px',
        boxShadow: 'rgb(36 49 77 / 6%) 0px 4px 9px 3px',
        padding: '0.5rem 0.5rem',
        color: '#fff',
        width: 100,
        marginLeft: 5
    }
});