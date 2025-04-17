import React, { FunctionComponent } from 'react';
import { Transition } from 'react-transition-group';
import { updateLaptopState } from '../../../actions';
import { Typography } from '@mui/material';
import useStyles from './index.styles';
import SystemNotification from '../../system-notification';

interface NotificationPanelProps {
    show: boolean;
    notifications: SystemNotification[];
}

const NotificationPanel: FunctionComponent<NotificationPanelProps> = (props) => {
    const classes = useStyles();
    const show = props.show;
    const notifications = props.notifications;
    const ref = React.useRef(null);

    const defaultStyle = {
        transition: '500ms ease-in-out',
        transform: 'translateX(1000%)'
    }

    type TransitionStyles = {
        [key: string]: { transform: string };
    }

    const transitionStyles = {
        entering: { transform: 'translateX(0)' },
        entered: { transform: 'translateX(0)' },
        exiting: { transform: 'translateX(150%)' },
        exited: { transform: 'translateX(150%)' }
    } as TransitionStyles;

    React.useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                updateLaptopState({ showNotificationPanel: false });
            }
        })
    }, []);

    return (
        <Transition in={show} timeout={500}>
            {(state) => (
                <div className={classes.notificationPanel} style={{ ...defaultStyle, ...transitionStyles[state] }} ref={ref}>
                    <Typography variant="h1" className={classes.headerTitle} style={{ color: '#fff' }}>Notifications</Typography>
                    <div className={classes.notificationsList}>
                        {notifications && notifications.map((notification: SystemNotification, index: number) => (
                            <SystemNotification
                                key={index}
                                notification={notification}
                                show={show}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Transition>
    );
}

export default NotificationPanel;