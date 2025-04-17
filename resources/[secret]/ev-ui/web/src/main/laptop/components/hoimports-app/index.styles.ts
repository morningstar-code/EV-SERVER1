import { makeStyles } from '@mui/styles';

export default makeStyles({
    hoimportsApp: {
        position: 'absolute',
        width: '70%',
        top: '10%',
        left: '15%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#202735',
        animation: 'ease-in fadeIn 250ms',
        height: '65vh',
    },
    hoimportsContainer: {
        padding: '2rem',
        height: '100%',
        overflow: 'scroll'
    },
    hoimportsHeading: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '1.35rem',
        justifyContent: 'space-between',
        borderBottom: '2 solid #6360FF'
    },
    hoimportsTabSection: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    },
    hoimportsTabBtn: {
        color: '#ababab !important',
        border: `none !important`,
        position: 'relative',
        marginRight: `1rem !important`,
        padding: `10px 15px !important`,
        borderRadius: `50px !important`,
        background: 'transparent !important',
        transition: 'ease-in 200ms !important',
        fontSize: `11px !important`,
        fontWeight: `500 !important`,
        boxShadow: `none !important`,
        '&:hover': {
            color: '#fff !important',
            cursor: 'pointer !important',
            backgroundColor: 'transparent !important'
        }
    },
    hoimportsCartQty: {
        top: -12,
        right: -10,
        color: '#fff',
        fontSize: 12,
        minWidth: 25,
        minHeight: 25,
        padding: '3px 10px',
        position: 'absolute',
        fontWeight: 'normal',
        borderRadius: 50,
        background: '#6360FF',
        animation: 'ease-in fadeIn 250ms'
    },
    icon: {
        marginRight: '0.35rem'
    },
    hoimportsActiveBtn: {
        border: `none !important`,
        position: 'relative',
        marginRight: `1rem !important`,
        padding: `10px 15px !important`,
        borderRadius: `50px !important`,
        transition: 'ease-in 200ms !important',
        fontSize: `11px !important`,
        fontWeight: `500 !important`,
        boxShadow: `none !important`,
        color: '#fff !important',
        cursor: 'pointer !important',
        backgroundColor: 'transparent !important',
        '&:hover': {
            color: '#fff !important',
            cursor: 'pointer !important',
            boxShadow: 'none !important',
            backgroundColor: 'transparent !important'
        }
    }
});