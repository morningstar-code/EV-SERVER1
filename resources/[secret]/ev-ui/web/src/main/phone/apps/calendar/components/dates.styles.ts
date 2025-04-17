import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';

export default makeStyles({
    container: {
        color: '#fff',
        '& .MuiPickersCalendarHeader-iconButton': {
            backgroundColor: 'transparent !important',
        },
        display: 'flex',
        justifyContent: 'center'
    },
    day: {
        width: 36,
        height: 36,
        fontSize: '!rem !important',
        margin: '0 2px',
        color: 'inherit'
    },
    nonCurrentMonthDay: {
        color: 'gray !important'
    },
    highlight: {
        background: baseStyles.bgSecondary(),
        color: 'white',
        borderRadius: '50%'
    },
    selectedDay: {
        color: `${baseStyles.blueText} !important`
    }
});