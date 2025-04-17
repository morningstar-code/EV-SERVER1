import { makeStyles } from '@mui/styles';

export default makeStyles({
    auctionPopup: {
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
    title: {
        color: '#fff !important',
        fontSize: '1.55vh !important',
        fontWeight: 'normal !important'
    },
    input: {
        border: 'none !important',
        color: '#AAAAAA !important',
        paddingLeft: '10px !important',
        paddingTop: '7px !important',
        paddingBottom: '7px !important',
        backgroundColor: '#181820 !important',
        borderRadius: '2px !important',
        marginTop: '5px !important'
    },
    buttons: {
        marginTop: '15px',
        width: '100%'
    },
    loadingIcon: {
        marginTop: '0.5rem',
        animation: 'ease-in fadeIn 250ms'
    },
    label: {
        color: '#AAAAAA !important'
    },
    auctionInput: {
        marginTop: '1rem'
    }
});