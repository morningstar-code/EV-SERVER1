import { makeStyles } from '@mui/styles';

export default makeStyles({
    herbsApp: {
        position: 'absolute',
        height: '80%',
        width: '85%',
        top: '10%',
        left: '9%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#232426',
        animation: 'ease-in fadeIn 250ms',
    },
    herbsContainer: {
        padding: '2rem',
        height: '100%',
        overflow: 'scroll'
    },
    herbsHeading: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '1.35rem',
        justifyContent: 'space-between',
        borderBottom: '2 solid #6360FF'
    },
    herbsTabSection: {
        width: '100%',
        border: 50,
        display: 'flex',
        justifyContent: 'left',
        paddingBottom: '1.5rem',
        borderBottom: '3px solid #515151'
    },
    herbsTabBtn: {
        color: '#fff !important',
        position: 'relative',
        marginRight: `1rem !important`,
        padding: `10px 2.5rem !important`,
        borderRadius: `5px !important`,
        background: '#303030 !important',
        transition: 'ease-in 200ms !important',
        fontSize: `11px !important`,
        fontWeight: `500 !important`,
        boxShadow: `none !important`,
        border: `1px solid #232426 !important`,
        '&:hover': {
            color: '#fff !important',
            cursor: 'pointer !important',
            boxShadow: 'none !important',
            backgroundColor: '#303030 !important'
        }
    },
    icon: {
        marginRight: '0.35rem'
    },
    herbsActiveBtn: {
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
        backgroundColor: '#303030 !important',
        '&:hover': {
            color: '#fff !important',
            cursor: 'pointer !important',
            boxShadow: 'none !important',
            backgroundColor: '#303030 !important'
        }
    },
    herbStrainsList: {
        display: 'grid',
        gap: '0.5rem',
        overflow: 'scroll',
        grudAutoRows: '1fr',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, auto))'
    }
});