import { makeStyles } from '@mui/styles';
import { ResponsiveHeight } from 'utils/responsive';

export default makeStyles({
    actions: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingBottom: ResponsiveHeight(12)
    },
    buttonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    },
    entries: {
        overflow: 'auto',
        maxHeight: '90%'
    }
});