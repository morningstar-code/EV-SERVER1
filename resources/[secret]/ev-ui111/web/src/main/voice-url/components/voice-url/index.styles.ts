import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';

export default makeStyles({
    wrapper: function (props: any) {
        return {
            backgroundColor: baseStyles.bgPrimary(),
            padding: 32,
            display: 'inline-block',
            pointerEvents: 'all',
            opacity: props.copied ? 0 : 1,
            transition: 'opacity 5s ease',
            '&:hover': {
                opacity: 1,
                transition: 'opacity 0s ease',
            }
        }
    }
});