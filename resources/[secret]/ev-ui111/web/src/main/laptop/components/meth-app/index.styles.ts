import { makeStyles } from '@mui/styles';

export default makeStyles({
    methApp: {
        position: 'absolute',
        height: '70%',
        width: '70%',
        top: '10%',
        left: '15%',
        backgroundColor: '#13131A',
        animation: 'ease-in fadeIn 250ms'
    },
    container: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90%',
        overflow: 'scroll',
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
        width: '4.5vw !important',
        borderRadius: `5px !important`,
        backgroundColor: `transparent !important`,
        marginRight: `1rem !important`,
        fontSize: `10px !important`,
        fontWeight: `500 !important`,
        boxShadow: `none !important`,
        '&:hover': {
            color: '#34AC88 !important',
            backgroundColor: '#1C1C24 !important'
        }
    },
    active: {
        color: '#34AC88 !important',
        backgroundColor: '#1C1C24 !important'
    },
    '@keyframes fadeIn': {
        from: {
            opacity: 0,
            transform: 'scale(0)',
        },
        to: {
            opacity: 1,
            transform: 'scale(1)'
        }
    },
    methProgressionParent: {
        background: '#1C1C24 !important',
        height: '5px !important',
        flex: 'auto !important',
        marginLeft: '1rem !important',
        marginRight: '1rem !important'
    },
    methProgression: function (data: { progress: number }) {
        return {
            background: '#34AC88 !important'
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
    levelHidden: {
        color: 'transparent !important',
        userSelect: 'none',
        textShadow: '0 0 10px white !important'
    }
});