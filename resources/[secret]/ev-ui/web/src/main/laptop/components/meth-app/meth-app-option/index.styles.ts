import { makeStyles } from '@mui/styles';

export default makeStyles({
    contract: {
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        borderRadius: 3,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#1C1C24'
    },
    btn: {
        border: 'none !important',
        color: '#fff !important',
        marginRight: '1rem !important',
        padding: '7px 12px !important',
        fontSize: '10px !important',
        borderRadius: '5px !important',
        backgroundColor: '#34AC88 !important',
        '&:hover': {
            cursor: 'pointer !important'
        }
    },
    option: {
        width: '100%',
        padding: 10,
        border: 'none',
        color: '#ccd6e8',
        marginTop: '0.5rem',
        borderRadius: 10,
        backgroundColor: '#1c2028',
        transition: 'ease-in 100ms',
        '&:hover': {
            color: '#fff',
            transform: 'translateY(-2px)'
        }
    },
    info: {
        display: 'flex',
        flexDirection: 'column'
    },
    text: {
        color: '#fff !important',
        margin: '0px !important',
        padding: '0px !important',
        fontSize: '1.5vh !important',
        fontWeight: 'bold !important',
        display: 'flex !important',
        marginBottom: '0.25rem !important'
    },
    textValue: {
        color: '#fff !important',
        fontWeight: 'normal !important',
        marginLeft: '0.25rem !important',
        fontSize: '1.5vh !important'
    },
    buttons: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    '.svg-inline--fa.fa-fw': { width: '0.35em !important' }
});