import React, { FunctionComponent } from 'react';
import useStyles from './index.styles';
import { updateLaptopState } from '../../../actions';
import { Transition } from 'react-transition-group';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import store from '../../../store';

interface NotificationProps {
    info: SystemNotification;
}

const Notification: FunctionComponent<NotificationProps> = (props) => {
    const classes = useStyles();
    const [show, setShow] = React.useState(false);

    const defaultStyle = {
        transition: '250ms ease-in-out',
        transform: 'translateX(100%)'
    }

    const transitionStyles = {
        entering: { transform: 'translateX(0)' },
        entered: { transform: 'translateX(0)' },
        exiting: { transform: 'translateX(100%)' },
        exited: { transform: 'translateX(100%)' }
    }

    React.useEffect(() => {
        const sound = new Audio('https://freesound.org/data/previews/434/434379_6965625-lq.mp3');
        sound.volume = 0.35;
        sound.play();
        setShow(true);
    }, []);

    return (
        <Transition in={show} timeout={250}>
            {(state) => (
                <div className={classes.systemNotification} style={{ ...defaultStyle, ...transitionStyles[state] }}>
                    <img className={classes.thumbnail} src={props.info.icon} alt="notif-thumbnail" />
                    <div>
                        <Typography variant="h1" className={classes.systemNotificationTitle}>{props.info.title}</Typography>
                        <Typography variant="body1" className={classes.systemNotificationDesc}>{props.info.message}</Typography>
                    </div>
                </div>
            )}
        </Transition>
    );
}

export default Notification;