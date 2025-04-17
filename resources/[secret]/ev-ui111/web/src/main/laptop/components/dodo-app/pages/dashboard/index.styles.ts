import { makeStyles } from '@mui/styles';

export default makeStyles({
    content: {
        paddingTop: 10,
        overflow: 'scroll'
    },
    title: {
        color: '#24314d !important',
        fontWeigth: '500 !important',
        fontSize: '2.5vh !important'
    },
    header: {
        paddingLeft: '1rem',
        paddingRight: '1rem'
    },
    stats: {
        gap: '1.25rem',
        display: 'grid',
        marginTop: '1rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        gridAutoRows: 'minmax(100px, auto)',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 220px))'
    },
    stat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 4,
        borderBottom: '3px solid #ffa624',
        boxShadow: 'rgb(36 49 77 / 6%) 0px 4px 9px 3px'
    },
    statValue: {
        color: '#6a6a6a !important',
        fontSize: '1.2rem !important',
        fontWeight: '400 !important'
    },
    statTitle: {
        color: '#424242 !important',
        fontSize: '0.95rem !important',
        fontWeight: '500 !important',
        marginTop: '0.45rem !important'
    },
    jobs: {
        marginTop: '1rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        overflow: 'scroll'
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
        color: '#5a5a5a !important',
        fontWeight: '400 !important',
        fontSize: '1.5vh !important'
    }
});