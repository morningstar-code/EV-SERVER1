import { getContactData } from "lib/character";
import { storeObj } from "lib/redux";
import { DoPhoneNotification } from "main/phone/components/notifications/events";
import { updatePhoneAppState } from "../../actions";
import { updateNotifsAndConvo } from "./actions";
import store from "./store";

export default function events(cb) {
    cb('sms-receive', function (event) {
        const eventData = event?.data;
        const eventState = event?.state;

        const formatted = updateNotifsAndConvo({
            activeConversation: eventState[store.key].activeConversation,
            conversations: eventState[store.key].conversations,
            direction: 'in',
            message: eventData.message,
            notifications: eventState[store.key].notifications,
            number: eventData.number,
            order: eventState[store.key].order
        });

        const conversations = formatted.conversations;
        const notifications = formatted.notifications;
        const order = formatted.order;

        if (storeObj.getState().preferences['phone.notifications.sms']) {
            const contactData = getContactData(eventData.number, eventState);
            const hasName = contactData.hasName;
            const name = contactData.name;

            DoPhoneNotification({
                apps: ['conversations', 'messages'],
                icon: {
                    background: '#8BC34A',
                    color: 'white',
                    name: 'comment'
                },
                state: eventState,
                title: name,
                text: hasName ? eventData.message : 'Text Message'
            });
        }

        updatePhoneAppState(store.key, {
            conversations: conversations,
            notifications: notifications,
            order: order
        })
    });
};