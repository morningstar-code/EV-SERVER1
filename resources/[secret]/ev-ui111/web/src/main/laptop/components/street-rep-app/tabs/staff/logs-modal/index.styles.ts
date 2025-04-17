import { makeStyles } from '@mui/styles';

export default makeStyles({
    orangeButton: {
        color: '#fff !important',
        width: '100%',
        marginTop: '1rem !important',
        marginBottom: '0.5rem !important',
        backgroundColor: '#0b604a !important',
        '&:hover': {
            backgroundColor: '#0b604a !important'
        }
    },
    headerText: {
        fontSize: '20px !important',
        fontWeight: '500 !important',
        textAlign: 'center',
        marginBottom: '1rem !important',
        fontFamily: '"Crimson Pro", serif !important',
        textShadow: '0px 0px 4px rgba(255, 255, 255, 0.87)'
    },
    modalContent: {
        background: '#0C0D11 !important'
    },
    noLogs: {
        marginTop: '1rem !important',
        fontSize: '1.8vh !important',
        fontWeight: '500 !important',
        color: '#8f8f8f !important',
        fontFamily: '"Crimson Pro", serif !important',
        textAlign: 'center'
    }
});