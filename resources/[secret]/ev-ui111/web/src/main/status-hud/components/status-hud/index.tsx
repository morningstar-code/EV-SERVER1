import { Typography } from '@mui/material';
import DurationTimer from 'components/duration-timer';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.statusBox}>
                <div className={classes.textContainer}>
                    <Typography variant="h6" style={{ color: 'white' }}>
                        {props.title}
                    </Typography>
                </div>
                {props.values && props.values.map((value: any, index: number) => {
                    return typeof value !== 'string' ? value.type === 'countdown' ? (
                        <div key={index} className={`${classes.textContainer} ${value.center ? classes.textContainerCenter : ''}`}>
                            <DurationTimer countdown={true} startTime={value.seconds} />
                        </div>
                    ) : (
                        <div key={index} className={`${classes.textContainer} ${value.center ? classes.textContainerCenter : ''}`}>
                            <Typography variant="body1" style={value.center ? { color: 'white', textAlign: 'center', width: '100%' } : { color: 'white' }}>
                                {value.text}
                            </Typography>
                        </div>
                    ) : (
                        <div key={index} className={classes.textContainer}>
                            <Typography variant="body1" style={{ color: 'white' }}>
                                {value}
                            </Typography>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}