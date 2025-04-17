import { makeStyles } from '@mui/styles';

export default makeStyles({
    staffPage: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: '"Crimson Pro", serif'
    },
    headerText: {
        color: '#fff !important',
        fontSize: '26px !important',
        fontWeight: '500 !important',
        marginTop: '2rem !important',
        fontFamily: '"Crimson Pro", serif !important',
        textShadow: '0px 0px 4px rgba(255, 255, 255, 0.87) !important'
    },
    subHeaderText: {
        fontSize: '1.8vh !important',
        fontWeight: '500 !important',
        color: '#8f8f8f !important',
        fontFamily: '"Crimson Pro", serif !important'
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    infoList: {
        width: '80%',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    button: {
        margin: '0.5rem 0 !important',
        background: '#0b604a !important',
        color: 'rgb(255 255 255) !important',
        '&:hover': {
            background: '#0b604a !important',
            color: 'rgb(255 255 255) !important'
        }
    },
    tableHeader: {
        background: '#0b604a',
        color: 'rgb(255 255 255)'
    }
});