import { makeStyles } from '@mui/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    searchContainer: {
        width: '100%',
        display: 'flex',
        marginBottom: '1rem'
    },
    backButton: {
        display: 'flex',
        width: ResponsiveWidth(40),
        alignItems: 'center'
    }
});