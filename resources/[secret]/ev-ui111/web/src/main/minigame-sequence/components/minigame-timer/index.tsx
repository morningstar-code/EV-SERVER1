import { Typography } from '@mui/material';
import useStyles from '../minigame-sequence/index.styles';

export default (props: any) => {
    const classes = useStyles();

    const timeLeft = props.timeLeft;
    const calc = (timeLeft / 1000).toFixed(2);
    let time = timeLeft / 1000 < 10 ? `0${calc}` : calc;
    time = timeLeft <= 0 ? '00:00' : time;

    return (
        <div className={classes.timeContainer}>
            <Typography variant="body1" className={classes.time}>
                {time}
            </Typography>
        </div>
    )
}