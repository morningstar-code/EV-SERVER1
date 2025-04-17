import { makeStyles } from '@mui/styles';

export default makeStyles({
    bennysPartItem: {
        display: 'flex',
        marginRight: '1rem',
        marginBottom: '1rem',
        width: 170,
        position: 'relative',
        padding: '1rem 2rem',
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#212121'
    },
    lowStock: {
        color: '#f55252 !important'
    },
    medStock: {
        color: '#f5ca52 !important'
    },
    highStock: {
        color: '#a7f552 !important'
    },
    bennysTextTitle: {
        margin: '0px !important',
        padding: '0px !important',
        color: '#fff !important',
        fontSize: '12px !important',
        marginTop: '10px !important',
        textAlign: 'center'
    },
    bennysPartInfo: {
        color: '#fff',
        marginTop: 5,
        textAlign: 'center'
    },
    bennysPartInfoText: {
        margin: '5px 0px !important',
        fontSize: '13px !important',
        fontWeight: 'normal !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important'
    },
    bennysAddItemBtn: {
        border: 'none !important',
        color: '#fff !important',
        marginTop: '9px !important',
        fontSize: '9px !important',
        padding: '9px 20px !important',
        borderRadius: '50px !important',
        transition: 'ease-in 200ms !important',
        backgroundColor: '#6360FF !important'
    },
    bennysCartQty: {
        top: 8,
        right: 8,
        color: '#fff',
        fontSize: 12,
        minWidth: 25,
        minHeight: 25,
        padding: '6px 10px',
        position: 'absolute',
        fontWeight: 'normal',
        borderRadius: 50,
        background: '#6360FF',
        zIndex: 10,
        animation: 'ease-in fadeIn 250ms'
    }
});