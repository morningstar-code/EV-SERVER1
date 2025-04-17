import { makeStyles } from '@mui/styles';

export default makeStyles({
    confirmPopup: {
        left: 0,
        right: 0,
        margin: 'auto',
        width: '23vw',
        padding: '15px',
        display: 'flex',
        position: 'absolute',
        borderRadius: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', //left
        backgroundColor: '#1C1C24',
        animation: 'ease-in fadeIn 250ms',
        boxShadow: '#0000004f 0px 0px 6px 3px'
    },
    text: {
        padding: '0px !important',
        margin: '0px !important',
        fontSize: '2vh !important',
        color: '#fff !important',
        fontWeight: '500 !important',
        textAlign: 'center'
    },
    buttons: {
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    btn: {
        border: 'none !important',
        color: '#fff !important',
        padding: '7px 12px !important',
        fontSize: '12px !important',
        borderRadius: '5px !important',
        flex: 1,
        '&:first-child': {
            marginRight: '0.5rem !important'
        },
        '&:hover': {
            cursor: 'pointer !important'
        }
    },
    red: {
        backgroundColor: '#FF3E32 !important'
    },
    green: {
        backgroundColor: '#34AC88 !important'
    },
    loadingIcon: {
        marginTop: '0.5rem',
        animation: 'ease-in fadeIn 250ms'
    }
});