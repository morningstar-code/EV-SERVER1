import React, { FunctionComponent, isValidElement } from "react";
import { Tooltip, Typography } from "@mui/material";

interface NotificationProps {
    notification: any;
    process: any;
}

const Notification: FunctionComponent<NotificationProps> = (props) => {
    const notification = props.notification;
    const process = props.process;
    const [className, setClassName] = React.useState('notification-container');

    React.useEffect(() => {
        let timeout = null;
        if (notification.timeout > 0) {
            timeout = setTimeout(() => {
                setClassName('notification-container notification-container-fade-out');
            }, notification.timeout - 500);
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [notification.timeout]);

    const iconStyle = {
        backgroundColor: notification.icon.background,
        color: notification.icon.color
    }

    var isConfirm;
    var confirmOptions;

    var handleClick = function (...args: any) {
        isConfirm = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        confirmOptions = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;

        return function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (isConfirm || (!notification.onAccept && !notification.onReject)) {
                if (!notification.blockDismissOnClick || confirmOptions) {
                    if (confirmOptions && confirmOptions.timeout > 0) {
                        setTimeout(() => {
                            setClassName(
                                'notification-container notification-container-fade-out'
                            )
                        }, confirmOptions.timeout - 500);
                    }
                    process(notification.id, isConfirm, confirmOptions || { timeout: 500 });
                }
            }
        }
    }

    return (
        <div onClick={handleClick()} className={className}>
            <div className="app-bar">
                <div className="icon" style={iconStyle}>
                    <i className={`${Array.isArray(notification.icon.name) ? notification.icon.name[0] : 'fas'} fa-${Array.isArray(notification.icon.name) ? notification.icon.name[1] : notification.icon.name} fa-fw fa-sm`}></i>
                </div>
                <div className="name">
                    <Typography variant="body2" style={{ color: '#fff' }}>{notification.title}</Typography>
                </div>
                <Typography variant="body2" style={{ color: '#fff' }}>just now</Typography>
            </div>
            <div className="content">
                <div className="text">
                    {isValidElement(notification.text) ? notification.text : (
                        <Typography variant="body1" style={{ color: '#fff' }}>{notification.text}</Typography>
                    )}
                </div>
                <div className="actions">
                    {notification.onReject && (
                        <Tooltip title={notification.onRejectText} sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div className="action action-reject" onClick={() => handleClick(notification.onReject, notification.onRejectOptions)}>
                                <i className="fas fa-times-circle fa-fw fa-w-16"></i>
                            </div>
                        </Tooltip>
                    )}
                    {notification.onAccept && (
                        <Tooltip title={notification.onAcceptText} sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div className="action action-accept" onClick={() => handleClick(notification.onAccept, notification.onAcceptOptions)}>
                                <i className="fas fa-check-circle fa-fw fa-w-16"></i>
                            </div>
                        </Tooltip>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Notification;