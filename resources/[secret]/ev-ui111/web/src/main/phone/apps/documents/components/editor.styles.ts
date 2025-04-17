import { makeStyles } from '@mui/styles';
import { ResponsiveHeight } from 'utils/responsive';

export default makeStyles({
    markdownWrapper: {
        height: `calc(100% - ${ResponsiveHeight(72)})`,
        flex: 1,
        '> textarea': {
            height: '100%',
            borderBottom: 0
        },
        '& > div, > div div': {
            minHeight: '100%',
            height: '100%',
            maxHeight: '100%',
            overflowY: 'scroll',
            background: 'transparent'
        }
    }
});