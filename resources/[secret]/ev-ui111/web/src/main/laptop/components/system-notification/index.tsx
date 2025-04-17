import React, { FunctionComponent } from 'react';
import useStyles from '../laptop-screen/notification-panel/index.styles';
import { updateLaptopState } from '../../actions';
import { Transition } from 'react-transition-group';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import store from '../../store';

interface SystemNotificationProps {
    show: boolean;
    notification: SystemNotification;
    index: number;
}

const SystemNotification: FunctionComponent<SystemNotificationProps> = (props) => {
    const laptopState = useSelector((state: any) => state[store.key]);
    const classes = useStyles();
    const show = props.show;
    const notification = props.notification;
    const index = props.index;

    const defaultStyle = {
        transition: `${300 + 50 * index}ms ease-in-out`,
        transform: 'translateX(100%)'
    }

    const transitionStyles = {
        entering: { transform: 'translateX(0)' },
        entered: { transform: 'translateX(0)' },
        exiting: { transform: 'translateX(100%)' },
        exited: { transform: 'translateX(100%)' }
    }

    const handleClick = (createdAt: number) => {
        const notifications = laptopState.systemNotifications.filter(n => n.createdAt !== createdAt);
        updateLaptopState({ systemNotifications: notifications });
    }

    return (
        <Transition in={show} timeout={300 + 50 * index}>
            {(state) => (
                <div className={classes.notification} style={{ ...defaultStyle, ...transitionStyles[state] }}>
                    <img className={classes.thumbnail} src={notification.icon} alt="thumbnail" />
                    <div>
                        <i className={`fas fa-times fa-fw fa-1x ${classes.exitIcon}`} onClick={() => handleClick(notification.createdAt)}></i>
                        <Typography variant="h1" className={classes.title}>{notification.title}</Typography>
                        <Typography variant="body1" className={classes.desc}>{notification.message}</Typography>
                    </div>
                </div>
            )}
        </Transition>
    );
}

export default SystemNotification;