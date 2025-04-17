import { getPreference } from "main/preferences/actions";
import { updatePhoneAppState } from "../../actions";
import { DoPhoneNotification } from "../../components/notifications/events";
import store from "./store";

export default function events(cb) {
    cb('email-receive', (event: any) => {
        const eventData = event?.data;
        const eventState = event?.state;

        getPreference("phone.notifications.email") && DoPhoneNotification({
            apps: ['emails', 'email'],
            icon: {
                background: '#26C6DA',
                color: 'white',
                name: 'envelope-open'
            },
            state: eventState,
            title: 'email',
            text: eventData.body
        });

        const emails = eventState[store.key].list;

        const newEventData = {
            ...eventData,
            timestamp: Date.now(),
        }

        const list = [
            ...emails,
            newEventData
        ];

        const sortedList = list.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });

        updatePhoneAppState(store.key, {
            list: sortedList
        });
    });
};