import { makeStyles } from '@mui/styles';

export default makeStyles({
    container: {
        height: '100%',
        width: '100%',
        background: '#2f323a'
    },
    bozoWebServicesContainer: {
        padding: '2rem',
        display: 'grid',
        gap: '0.5rem',
        overflow: 'scroll',
        gridAutoRows: 'minmax(1fr, auto)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, auto))',
        gridTemplateRows: 'repeat(auto-fill, minmax(300px, auto))'
    }
});