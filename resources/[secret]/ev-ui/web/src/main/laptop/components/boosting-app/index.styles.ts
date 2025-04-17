import { makeStyles } from '@mui/styles';

export default makeStyles({
    boostingApp: {
        position: 'absolute',
        height: '80%',
        width: '85%',
        top: '10%',
        left: '9%',
        backgroundColor: '#181820',
        animation: 'ease-in fadeIn 250ms'
    },
    contractList: {
        display: 'flex',
        overflowY: 'scroll',
        marginTop: '1rem',
        flex: 'auto',
        flexDirection: 'column'
    },
    container: {
        padding: '3%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90%',
        overflowY: 'scroll',
        position: 'relative'
    },
    tabsSection: {
        display: 'flex',
        paddingBottom: '1rem',
        justifyContent: 'space-between'
    },
    tabsBtns: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    tabBtn: {
        color: '#fff !important',
        border: `none !important`,
        padding: `10px 15px !important`,
        borderRadius: `3px !important`,
        backgroundColor: `#181820 !important`,
        marginRight: `1rem !important`,
        fontSize: `1.2vh !important`,
        fontWeight: `normal !important`,
        boxShadow: `none !important`,
        textTransform: 'none',
        '&:hover': {
            color: '#fff !important',
            backgroundColor: '#21212B !important',
        }
    },
    active: {
        color: '#fff !important',
        textTransform: 'none',
        backgroundColor: '#21212B !important'
    },
    queueBtn: {
        border: `none !important`,
        width: `100% !important`,
        height: `37px !important`,
        padding: '10px 15px !important',
        borderRadius: `3px !important`,
        color: '#fff !important',
        cursor: 'pointer',
        backgroundColor: '#21212B !important',
        fontSize: `10px !important`,
        fontWeight: `500 !important`,
        boxShadow: `none !important`,
        '&:hover': {
            color: '#fff !important',
            backgroundColor: '#21212B !important',
        }
    },
    '@keyframes fadeIn': {
        from: {
            opacity: 0,
            transform: 'scale(0)',
        },
        to: {
            opacity: 1,
            transform: 'scale(1)',
        }
    },
    empty: {
        fontSize: `14px !important`,
        color: `#a7a7a7 !important`,
        textAlign: 'center'
    },
    boostingProgressionParent: {
        background: '#21212B !important',
        height: '5px !important',
        flex: 'auto !important',
        borderRadius: '5px !important',
        marginLeft: '1rem !important',
        marginRight: '1rem !important',
    },
    boostingProgression: function (data: { progress: number }) {
        return {
            borderRadius: '5px !important',
            background: `linear-gradient(90deg, #FF487C ${data.progress - 100}%, #00F8B9 100%) !important`,
        }
    },
    progressSection: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    levelText: {
        color: '#fff',
        fontSize: `12px !important`
    },
    previousContract: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '0.5rem'
    },
    pendingContracts: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 220px))',
        gap: '1.25rem',
        gridAutoRows: 'minmax(100px, auto)'
    },
});