import React, { FunctionComponent } from 'react';
import { Typography } from '@mui/material';
import moment from 'moment';

interface DurationTimerProps {
    countdown?: boolean;
    extra?: any;
    startTime?: number;
    withHour?: boolean;
}

const DurationTimer: FunctionComponent<DurationTimerProps> = (props) => {
    const [time, setTime] = React.useState(props.startTime || 0);
    const [countdown, setCountdown] = React.useState(props.countdown || false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(props.countdown ? time - 1 : time + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown, time]);

    return (
        <Typography variant="body2" style={{ color: '#fff' }}>
            {moment.utc(1000 * time).format(`${props.withHour ? 'HH:' : ''}mm:ss`)}
            {props.extra ? ` - ${props.extra}` : null}
        </Typography>
    )
}

export default DurationTimer;