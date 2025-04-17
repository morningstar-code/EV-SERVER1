import { makeStyles } from '@mui/styles';
import { ResponsiveHeight } from 'utils/responsive';

export default makeStyles({
    nameWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        flexDirection: 'row',
        marginBottom: ResponsiveHeight(8)
    }
});