import { makeStyles } from '@mui/styles';

export default makeStyles({
    container: {
        position: 'absolute',
        height: '80%',
        width: '85%',
        top: '10%',
        left: '9%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fafafd',
        overflow: 'hidden'
    },
    wrapper: {
        height: 'calc(100% - 2rem)',
        display: 'grid',
        gridGap: '10px',
        gridTemplateAreas: '"nav content"',
        gridTemplateColumns: '200px 1fr 1px'
    }
});