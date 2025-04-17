import { getContactData } from "lib/character";
import { DoPhoneNotification } from "main/phone/components/notifications/events";

const icon = {
    background: '#e53935',
    color: 'white',
    name: 'wallet'
}

export default function events(cb) {
    cb('crypto-receive', function (event) {
        const eventData = event?.data;
        const eventState = event?.state;

        DoPhoneNotification({
            apps: ['crypto'],
            appName: 'crypto',
            icon: icon,
            state: eventState,
            title: getContactData(eventData.number).name,
            text: eventData.message
        });
    });
};