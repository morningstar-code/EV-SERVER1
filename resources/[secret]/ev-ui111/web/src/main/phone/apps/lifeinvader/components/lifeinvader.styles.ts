import { makeStyles } from '@mui/styles';

export default makeStyles({
    emailList: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'calc(100% - 8rem)',
        overflowY: 'auto',
        '& > div': { marginBottom: '0.7rem' }
    },
    adContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflowY: 'hidden'
    },
    adImage: {
        height: '3.75rem',
        marginBottom: '0.25rem',
        aspectRatio: '25/6',
        objectFit: 'contain'
    }
});