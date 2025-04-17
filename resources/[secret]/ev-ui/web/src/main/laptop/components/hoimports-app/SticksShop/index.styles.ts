import { makeStyles } from '@mui/styles';

export default makeStyles({
    stickShopContainer: {
        flexGrow: 4,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    shopItem: {
        padding: 15,
        width: 170,
        display: 'flex',
        borderRadius: 5,
        margin: '0.5rem',
        position: 'relative',
        alignItems: 'center',
        background: '#31394D',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    thumbnail: {
        maxHeight: 85
    },
    itemText: {
        fontSize: '13px !important',
        textAlign: 'center'
    },
    cartBtn: {
        color: '#fff !important',
        fontSize: '10px !important',
        width: '100% !important',
        marginTop: '1rem !important',
        backgroundColor: '#3787FF !important'
    },
    removeBtn: {
        color: '#fff !important',
        fontSize: '10px !important',
        width: '100% !important',
        marginTop: '1rem !important',
        backgroundColor: '#ad3b3b !important'
    },
    checkoutBtn: {
        color: '#fff !important',
        fontSize: '10px !important',
        fontWeight: '500 !important',
        backgroundColor: '#3787FF !important'
    },
    hoimportCartQty: {
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
        background: '#3787ff',
        zIndex: 10,
        animation: 'ease-in fadeIn 250ms'
    }
});