import { makeStyles } from '@mui/styles';

export default makeStyles({
    bennysCart: {
        display: 'flex',
        marginTop: '1rem'
    },
    bennysCartList: {
        flex: 'auto',
        display: 'flex',
        overflow: 'scroll',
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 558px)'
    },
    bennysCartItem: {
        width: '100%',
        display: 'flex',
        padding: '7px 20px',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: '0.75rem',
        background: '#212121',
        justifyContent: 'space-between'
    },
    bennysPartInfo: {
        display: 'flex',
        alignItems: 'center'
    },
    bennysPartThumbnail: {
        height: 50,
        marginRight: '0.5rem'
    },
    bennysPartTitle: {
        margin: '0px !important',
        padding: '0px !important',
        fontSize: '15px !important',
        color: '#8d8d8d',
        fontWeight: 'normal !important'
    },
    bennysRemoveBtn: {
        border: 'none !important',
        color: '#fff !important',
        fontSize: '10px !important',
        borderRadius: '50px !important',
        padding: '7px 14px !important',
        background: '#f55252 !important',
        transition: 'ease-in 100ms !important',
        '&:hover': {
            transform: 'scale(1.03) !important'
        }
    },
    bennysCheckoutPanel: {
        display: 'flex',
        color: '#fff',
        flexBasis: '20%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    bennysCheckoutBtn: {
        color: '#fff !important',
        fontSize: '13px !important',
        border: 'none !important',
        borderRadius: '50px !important',
        marginTop: '1rem !important',
        padding: '7px 14px !important',
        background: 'green',
        transition: 'ease-in 100ms !important',
        '&:hover': {
            transform: 'scale(1.03) !important'
        }
    }
});