import React from 'react';
import { storeObj } from 'lib/redux';
import { updatePhoneState } from '../../actions';
import Notification from './notification';
import './notifications.scss';

const updateNotifications = (apps: string[], appName: string) => {
    const appsWithNotifications = storeObj.getState().phone.appsWithNotifications;
    const activeApp = storeObj.getState().phone.activeApp;

    apps.includes(activeApp) || apps.forEach((app) => {
        return appsWithNotifications.push(app);
    });

    appName && appName !== activeApp && appsWithNotifications.push(appName);

    const filteredNotifications = appsWithNotifications.filter(function (p1, p2, p3) {
        return p3.indexOf(p1) === p2;
    });

    updatePhoneState({
        appsWithNotifications: filteredNotifications
    });

    updatePhoneState({
        hasNotification: true
    });
}

const removeHasNotifications = () => {
    updatePhoneState({
        hasNotification: false
    });
}

class Notifications extends React.Component<{}, { notifications: any }> {
    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        }

        this._process = this._process.bind(this);
    }

    incomingNotification = (data: any) => {
        const detail = data.detail;

        this.setState({
            notifications: {
                ...this.state.notifications,
                [detail.id]: detail
            }
        });

        detail.timeout > 0 && setTimeout(() => {
            this._process(detail.id);
        }, detail.timeout);

        setTimeout(() => {
            updateNotifications(detail.apps, detail.appName);
        }, 0);
    }

    process(id: string, isConfirm = null, confirmOptions = null) {
        isConfirm && isConfirm();

        if (confirmOptions) {
            if (!confirmOptions.dismiss) {
                this.setState({
                    notifications: {
                        ...this.state.notifications,
                        [id]: {
                            ...this.state.notifications[id],
                            ...confirmOptions
                        }
                    }
                });

                confirmOptions.timeout > 0 && setTimeout(() => {
                    this.process(id);
                }, confirmOptions.timeout);
            }
        } else if (!confirmOptions && !confirmOptions?.dismiss) {
            const notifications = this.state.notifications;
            notifications[id] && delete notifications[id];

            if (Object.keys(notifications).length === 0) {
                removeHasNotifications();
            }

            this.setState({ notifications: notifications });
        }
    }

    _process(id: any) {
        const arg1 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        const arg2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;

        arg1 && arg1();
        
        if (arg2 && !arg2.dismiss) {
            this.setState(function (state) {

                const notifications = state.notifications;

                notifications[id] && (notifications[id] = {
                    ...notifications[id],
                    ...arg2
                });

                return {
                    notifications: notifications
                };
            });

            if (arg2.timeout > 0) {
                setTimeout(() => {
                    this._process(id);
                }, arg2.timeout);
            }

        }
        
        (arg2 && !arg2.dismiss) || this.setState(function (state) {
            const notifications = state.notifications;
            notifications[id] && delete notifications[id];

            if (Object.keys(notifications).length === 0) {
                removeHasNotifications();
            };

            return {
                notifications: notifications
            };
        });
    }

    componentDidMount() {
        window.addEventListener(
            'notification-listener',
            this.incomingNotification
        );

        // setTimeout(() => {
        //     window.dispatchEvent(
        //         new CustomEvent('notification-listener', {
        //             detail: {
        //                 apps: [],
        //                 appName: "call-history",
        //                 id: Math.random(),
        //                 onAccept: null,
        //                 onAcceptOptions: null,
        //                 onAcceptText: 'Answer',
        //                 onReject: null,
        //                 onRejectText: 'Hang Up',
        //                 icon: {
        //                     background: 'lightgreen',
        //                     color: '#fff',
        //                     name: 'phone-alt'
        //                 },
        //                 title: "Joe Mama",
        //                 text: "Incoming Call",
        //                 timeout: 5000,
        //             }
        //         })
        //     );
        // }, 2500);
        
        // setTimeout(() => {
        //     window.dispatchEvent(
        //         new CustomEvent('notification-listener', {
        //             detail: {
        //                 apps: [],
        //                 appName: "call-history",
        //                 id: Math.random(),
        //                 onAccept: () => {},
        //                 onAcceptOptions: {
        //                     onAccept: null,
        //                     onReject: null,
        //                     dismiss: false,
        //                     blockDismissOnClick: true,
        //                     id: Math.random(),
        //                     text: 'Connecting...',
        //                     timeout: 5000,
        //                 },
        //                 onAcceptText: 'Answer',
        //                 onReject: () => {},
        //                 onRejectText: 'Hang Up',
        //                 icon: {
        //                     background: 'lightgreen',
        //                     color: '#fff',
        //                     name: 'phone-alt'
        //                 },
        //                 title: "Joe Mama",
        //                 text: "Incoming Call",
        //                 timeout: -1,
        //             }
        //         })
        //     );
        // }, 2500);
    }

    componentWillUnmount() {
        window.removeEventListener(
            'notification-listener',
            this.incomingNotification
        );
    }

    render() {
        const notificationsKeys = Object.keys(this.state.notifications);
        const notifications = this.state.notifications;
        const isMounted = notificationsKeys.length > 0 ? 'mounted' : 'not-mounted';

        return (
            <div className={`top-notifications-wrapper top-notifications-wrapper-${isMounted}`} style={{ maxHeight: 12 + 68 * notificationsKeys.length }}>
                {notifications.length === 0 && (
                    <></>
                    //<div className="notification-container"></div>
                )}
                {notificationsKeys && notificationsKeys.map((key) => (
                    <Notification
                        key={key}
                        notification={notifications[key]}
                        process={this._process}
                    />
                ))}
            </div>
        );
    }
}

export default Notifications;