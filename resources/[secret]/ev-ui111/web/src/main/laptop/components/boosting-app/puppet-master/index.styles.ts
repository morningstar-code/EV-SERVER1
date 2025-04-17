import { makeStyles } from '@mui/styles';

export default makeStyles({
    PuppetMasterPage: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    formSection: {
        marginTop: '1rem',
        marginBottom: '1rem',
        marginRight: '2rem'
    },
    row: {
        display: 'flex'
    },
    description: {
        color: 'rgb(167, 167, 167) !important'
    },
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
    }
});