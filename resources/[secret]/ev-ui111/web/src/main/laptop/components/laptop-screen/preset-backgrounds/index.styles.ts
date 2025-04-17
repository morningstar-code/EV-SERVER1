import { makeStyles } from '@mui/styles';

export default makeStyles({
    headerTitle: {
        fontSize: '20px !important',
        textAlign: 'center',
        height: '20px !important'
    },
    presetBackgrounds: {
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '1rem',
        zIndex: 10,
        width: '50%',
        height: '85%',
        padding: 20,
        borderRadius: 10,
        position: 'absolute',
        background: 'rgba(24, 24, 24, 0.6)',
        backdropFilter: 'blur(32px)',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    presetBackground: {
        width: '100%',
        height: '100%',
        border: '2px solid #00fabb80',
        borderRadius: 5,
        transition: 'ease-in 150ms',
        '&:hover': {
            transform: 'scale(1.075)'
        }
    },
    list: {
        overflow: 'scroll !important',
        height: '100% !important',
        paddingTop: '1rem !important'
    }
});