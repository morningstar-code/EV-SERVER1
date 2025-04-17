import { makeStyles } from '@mui/styles';

export default makeStyles({
    towApp: {
        position: 'absolute',
        height: '80%',
        width: '85%',
        top: '10%',
        left: '9%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#3A3343',
        animation: 'ease-in fadeIn 250ms',
    },
    towContainer: {
        padding: '2rem',
        height: '100%',
        overflow: 'scroll'
    },
    towHeading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2 solid #6360FF'
    },
    towTabSection: {
        display: 'flex',
        width: '100%',
        border: 50,
        justifyContent: 'left'
    },
    towTabBtn: {
        color: '#fff !important',
        border: `1px solid #232426 !important`,
        position: 'relative',
        marginRight: `1rem !important`,
        padding: `10px 2.5rem !important`,
        borderRadius: `5px !important`,
        background: '#4C4258 !important',
        transition: 'ease-in 200ms !important',
        fontSize: `11px !important`,
        fontWeight: `500 !important`,
        boxShadow: `none !important`,
        '&:hover': {
            color: '#fff !important',
            cursor: 'pointer !important',
            boxShadow: 'none !important',
            backgroundColor: '#4C4258 !important'
        }
    },
    icon: {
        marginRight: '0.35rem'
    },
    towActiveBtn: {
        position: 'relative',
        marginRight: `1rem !important`,
        padding: `10px 2.5rem !important`,
        borderRadius: `5px !important`,
        transition: 'ease-in 200ms !important',
        fontSize: `11px !important`,
        fontWeight: `500 !important`,
        boxShadow: `none !important`,
        color: '#fff !important',
        cursor: 'pointer !important',
        backgroundColor: '#4C4258 !important',
        '&:hover': {
            color: '#fff !important',
            cursor: 'pointer !important',
            boxShadow: 'none !important',
            backgroundColor: '#4C4258 !important'
        }
    },
    towProgressionParent: {
        background: '#4C4258 !important',
        height: '5px !important',
        flex: 'auto !important',
        borderRadius: '5px !important',
        marginBottom: '1rem !important',
        marginTop: '1rem !important'
    },
    towProgression: {
        borderRadius: '5px !important',
        background: '#018cd7 !important'
    },
    progressSection: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        marginTop: '1rem'
    },
    levelText: {
        color: '#fff',
        fontSize: `12px !important`
    },
    towContent: {
        display: 'flex',
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigText: {
        color: '#4C4258 !important',
        fontSize: '2vh !important',
        fontWeight: 'bold !important'
    }
});