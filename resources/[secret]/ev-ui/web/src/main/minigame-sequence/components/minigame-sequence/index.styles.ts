import { makeStyles } from '@mui/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    minigameSequenceGame: {
        minWidth: ResponsiveWidth(500),
        display: 'flex',
        padding: '2rem',
        alignItems: 'center',
        pointerEvents: 'all',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#222831',
        textTransform: 'uppercase',
    },
    header: {
        color: '#fff',
        textAlign: 'center',
        padding: 5
    },
    ipContainer: {
        color: 'red',
        textAlign: 'center'
    },
    timeContainer: {
        display: 'flex',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    time: {
        color: 'green !important'
    },
    numberMatrix: {
        display: 'grid',
        maxWidth: 600,
        gridTemplateColumns: 'auto auto auto auto auto auto auto auto auto auto',
        gridGap: 10,
        marginTop: '1rem'
    },
    numColor: {
        color: '#fff !important',
        fontSize: '1.5rem !important',
        textAlign: 'center'
    },
    upsideDownText: {
        transform: 'scale(1, -1) !important'
    },
    red: {
        color: 'red !important'
    },
    blue: {
        color: 'blue !important'
    }
});