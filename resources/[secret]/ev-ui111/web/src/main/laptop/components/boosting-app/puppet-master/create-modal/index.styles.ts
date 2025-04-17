import { makeStyles } from '@mui/styles';

export default makeStyles({
    btn: {
        marginTop: '0.5rem !important',
        padding: '10px 15px !important',
        color: '#9CFFFF !important',
        fontSize: '12px !important',
        backgroundColor: '#282D37 !important',
        '&:hover': {
            color: '#fff !important',
            backgroundColor: '#282D37 !important'
        }
    },
    row: {
        width: '100%',
        display: 'flex'
    },
    formSection: {
        width: '100%',
        marginTop: '1rem',
        marginBottom: '1rem',
        //marginRight: '2rem'
    }
});