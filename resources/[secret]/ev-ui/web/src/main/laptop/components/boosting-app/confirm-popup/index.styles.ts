import { makeStyles } from '@mui/styles';

export default makeStyles({
    confirmPopup: {
        top: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        zIndex: 2,
        padding: 15,
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'absolute',
        borderRadius: 2,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#21212B',
        animation: 'ease-in fadeIn 250ms',
        boxShadow: '#0000004f 0 4px 6px 3px'
    },
    text: {
        padding: '0px !important',
        margin: '0px !important',
        fontSize: '2vh !important',
        color: '#fff !important',
        fontWeight: 'normal !important',
        textAlign: 'center'	
    },
    buttons: {
        marginTop: '15px',
        width: '100%'
    },
    loadingIcon: {
        marginTop: '0.5rem',
        animation: 'ease-in fadeIn 250ms'
    }
});