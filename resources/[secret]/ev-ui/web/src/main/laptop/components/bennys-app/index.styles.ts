import { makeStyles } from '@mui/styles';

export default makeStyles({
    bennysApp: {
        position: 'absolute',
        height: '80%',
        width: '85%',
        top: '10%',
        left: '9%',
        backgroundColor: '#101010',
        animation: 'ease-in fadeIn 250ms',
        overflow: 'hidden'
    },
    bennysAppContainer: {
        display: 'flex',
        padding: '2rem',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'relative',
        flexDirection: 'column'
    },
    bennysAppHeading: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '1.35rem',
        justifyContent: 'space-between',
        borderBottom: '2 solid #6360FF'
    },
    bennysAppTabSection: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    bennysTabBtn: {
        color: '#686868 !important',
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
            color: '#BAB9FF !important',
            cursor: 'pointer !important',
            backgroundColor: '#212121 !important'
        }
    },
    bennysCartQty: {
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
    bennysPartList: {
        display: 'grid',
        gap: '0.5rem',
        overflow: 'scroll',
        gridAutoRows: 'minmax(1fr, auto)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(170px, auto))'
    },
    bennysActiveBtn: {
        border: `none !important`,
        position: 'relative',
        marginRight: `1rem !important`,
        padding: `10px 15px !important`,
        borderRadius: `50px !important`,
        transition: 'ease-in 200ms !important',
        fontSize: `11px !important`,
        fontWeight: `500 !important`,
        boxShadow: `none !important`,
        color: '#BAB9FF !important',
        cursor: 'pointer !important',
        backgroundColor: '#212121 !important'
    },
    bennysAppSearch: {
        color: '#fff',
        border: 'none',
        borderRadius: 50,
        paddingLeft: '0.75rem',
        backgroundColor: '#212121'
    }
});