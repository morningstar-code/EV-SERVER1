import { makeStyles } from '@mui/styles';

export default makeStyles({
    modalWrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(252, 252, 252, 0.3)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: '#30475e',
        border: '1px solid #1e3a56',
        borderRadius: '4px',
        width: '600px',
        minHeight: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    modalInner: {
        width: '300px',
        margin: '16px 0',
        textAlign: 'center'
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '16px 0',
        width: '300px'
    },
    input: {
        '& input[type=number]': {
            '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        }
    }
});