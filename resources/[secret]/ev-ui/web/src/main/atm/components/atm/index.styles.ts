import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';

export default makeStyles({
    container: {
        pointerEvents: 'all',
        color: 'white',
        transition: 'all 800ms ease',
        backgroundColor: baseStyles.bgPrimary(),
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        width: '75vw',
        maxHeight: '80vh',
        position: 'relative',
        "& .Mui-focused, .MuiFormControlLabel-root, .MuiInput-underline:after, .MuiInputAdornment-root": {
            color: 'rgba(255, 255, 255, 0.7) !important',
            borderColor: 'rgba(255, 255, 255, 0.7) !important',
        }
    }
});