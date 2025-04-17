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
    tracking: {
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
    noInfo: {
        fontSize: '3vh !important',
        textAlign: 'center',
        marginTop: '20vh !important',
        color: '#c5c5c5 !important'
    },
    jobItem: {
        display: 'flex',
        padding: '0.75rem',
        borderRadius: 4,
        marginTop: '0.5rem',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderBottom: '3px solid #67b581',
        boxShadow: 'rgb(36 49 77 / 6%) 0px 4px 9px 3px'
    },
    jobHeader: {
        display: 'flex',
        alignItems: 'center'
    },
    jobTitle: {
        color: '#24314d !important',
        fontWeight: '500 !important',
        fontSize: '1.1rem !important',
        marginLeft: '1rem !important'
    },
    jobLogo: {
        width: '3vh',
        height: '3vh',
        display: 'flex',
        color: '#24314d',
        fontSize: '1.2vh',
        borderRadius: '50%',
        alignItems: 'center',
        background: '#d8f2fb',
        justifyContent: 'center'
    },
    desc: {
        marginTop: '0.5rem'
    },
    descText: {
        color: '#5a5a5a !important',
        fontWeight: '400 !important',
        fontSize: '1.5vh !important'
    },
    searchBtn: {
        color: '#fff !important',
        padding: '0.5rem 1.1rem !important',
        backgroundColor: '#24314d !important',
        '&:hover': {
            backgroundColor: '#24314d !important'
        }
    },
    input: {
        flex: 'auto',
        border: 'none',
        background: 'white',
        borderRadius: '3px',
        boxShadow: 'rgb(36 49 77 / 6%) 0px 4px 9px 3px',
        padding: '0.8rem 0.5rem',
        marginRight: '1rem'
    },
    searchBar: {
        display: 'flex',
        marginTop: '1rem',
        alignItems: 'center'
    },
    loadingSection: {
        width: '100%',
        display: 'flex',
        marginTop: '1rem',
        alignItems: 'center',
        justifyContent: 'center'
    }
});