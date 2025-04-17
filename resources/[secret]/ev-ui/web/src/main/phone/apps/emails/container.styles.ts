import { makeStyles } from '@mui/styles';
import { ResponsiveHeight } from '../../../../utils/responsive';

export default makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        '& > div': {
            margin: `${ResponsiveHeight(4)} 0`
        }
    }
});