import { makeStyles } from '@mui/styles';

export default makeStyles({
    confirmPopup: {
        top: '40%',
        left: 0,
        right: 0,
        margin: 'auto',
        width: '300px',
        padding: '15px',
        display: 'flex',
        position: 'absolute',
        borderRadius: 2,
        alignItems: 'left',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#E7E9EB',
        animation: 'ease-in fadeIn 250ms',
        boxShadow: '#0000004f 0 4px 6px 3px'
    },
    text: {
        padding: '0px !important',
        margin: '0px !important',
        fontSize: '20px !important',
        color: '#3E3E3E !important',
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
        flex: '1 !important',
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
    blue: {
        backgroundColor: '#3278FF !important'
    },
    green: {
        backgroundColor: '#2e9e0a !important'
    },
    disabled: {
        background: '#757575 !important'
    },
    loadingIcon: {
        marginTop: '0.5rem',
        animation: 'ease-in fadeIn 250ms'
    }
});