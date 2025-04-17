import { storeObj } from "lib/redux";

export const DoPhoneNotification = (notification: any) => {
    // if (notification?.apps.includes(storeObj.getState().phone.activeApp)) {
    //     return;
    // }

    setTimeout(() => {
        if (storeObj.getState().phone.hasPhone) {
            window.dispatchEvent(
                new CustomEvent('notification-listener', {
                    detail: {
                        appName: notification.appName ? notification.appName : '',
                        id: Math.random(),
                        onAccept: null,
                        onAcceptOptions: null,
                        onAcceptText: 'Accept',
                        onReject: null,
                        onRejectOptions: null,
                        onRejectText: 'Dismiss',
                        timeout: 5000,
                        ...notification
                    }
                })
            );
        }
    }, 32);
}