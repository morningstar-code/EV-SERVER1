import { nuiAction } from "lib/nui-comms";
import { DoPhoneNotification } from "main/phone/components/notifications/events";
import store from "./store";
import { getPreference } from "main/preferences/actions";
import { updatePhoneAppState, updatePhoneState } from "main/phone/actions";

export default function events(cb) {
    cb('racing-update', (eventData) => {
        const data = eventData.data;
        const state = eventData.state;

        if (data.maps) {
            data.maps = Object.values(data.maps).sort((a: RaceTrack, b: RaceTrack) => {
                return a.name.localeCompare(b.name);
            });
        }

        if (data.pending) {
            data.pending = Object.values(data.pending).sort((a: Race, b: Race) => {
                return a.createdAt === b.createdAt
                    ? 0
                    : b.createdAt - a.createdAt;
            });
        }

        if (data.active) {
            data.active = Object.values(data.active).sort((a: Race, b: Race) => {
                return a.createdAt === b.createdAt
                    ? 0
                    : b.createdAt - a.createdAt;
            });
        }

        if (data.completed) {
            data.completed = Object.values(data.completed).map((race: Race) => {
                return {
                    ...race,
                    name: race.track
                }
            });

            data.completed.sort((a: RaceCompleted, b: RaceCompleted) => {
                return a.timestamp === b.timestamp
                    ? 0
                    : b.timestamp - a.timestamp;
            });
        }

        return updatePhoneAppState(store.key, {
            ...data
        });
    });

    cb('racing-update-phone-state', (eventData) => {
        const data = eventData.data;
        const state = eventData.state;

        return updatePhoneState({
            ...data
        });
    });

    cb('racing-alias-set', (eventData) => {
        const data = eventData.data;
        const state = eventData.state;

        DoPhoneNotification({
            apps: [],
            appName: 'racing',
            icon: {
                background: '#009688',
                color: 'white',
                name: 'flag-checkered'
            },
            id: 'racing-alias-set',
            state: state,
            text: data.text,
            title: data.title,
            timeout: -1
        });
    });

    cb('racing-new-event', (eventData) => {
        const data = eventData.data;
        const state = eventData.state;

        return state.phone.hasPhone && state.phone.hasPhone && getPreference('phone.notifications.race')
            ? DoPhoneNotification({
                apps: [],
                appName: 'racing',
                icon: {
                    background: '#009688',
                    color: 'white',
                    name: 'flag-checkered'
                },
                id: 'racing-new-event',
                state: state,
                text: data.text,
                title: data.title,
                timeout: 20000
            })
            : state;
    });

    cb('racing-new-message', (eventData) => {
        const data = eventData.data;
        const state = eventData.state;

        state.phone.hasPhone && state.phone.hasUsbRacing && !state.phone.hasUsbPDRacing && state.character.id !== data.message.sender.id && DoPhoneNotification({
            apps: [],
            appName: 'racing',
            icon: {
                background: '#009688',
                color: 'white',
                name: 'flag-checkered'
            },
            id: 'racing-new-message',
            state: state,
            text: data.message.message,
            title: `From: ${data.message.sender.name}`,
            timeout: data.timeout
        });

        const conversations = state[store.key].conversations;

        if (conversations[data.eventId]) {
            conversations[data.eventId].messages.push(data.message);
        }

        return updatePhoneAppState(store.key, {
            conversations: {
                ...conversations
            }
        });
    });

    cb('racing-night-time', (eventData) => {
        const data = eventData.data;
        const state = eventData.state;

        return updatePhoneAppState(store.key, {
            isNightTime: data.isNightTime
        });
    });
}