import { makeStyles } from '@mui/styles';
import { ResponsiveHeight } from 'utils/responsive';

export default makeStyles({
    wrapper: {},
    icon: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: ResponsiveHeight(32)
    },
    addButton: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ResponsiveHeight(16),
        marginBottom: ResponsiveHeight(16)
    }
});