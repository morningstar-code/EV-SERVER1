import { storeObj } from "lib/redux";
import { updatePhoneAppState } from "main/phone/actions";
import { DoPhoneNotification } from "main/phone/components/notifications/events";
import { getPreference } from "main/preferences/actions";
import { twats } from "./config";
import store from "./store";

const icon = {
    background: '#00B0FF',
    color: 'white',
    name: ['fab', 'twitter']
}

export default function events(cb) {
    cb('twatter-receive', function (event) {
        const eventData = event?.data;
        const eventState = event?.state;

        //TODO: Filter blocked users

        if (eventData.hasPhone && getPreference('phone.notifications.twatter') && eventData.character.id !== eventState.character.id) {
            DoPhoneNotification({
                apps: ['twatter'],
                icon: icon,
                state: eventState,
                title: `${eventData.character.first_name}_${eventData.character.last_name}`,
                text: eventData.text
            });
        }

        //update
        (function (arr: any) {
            arr.unshift({
                ...eventData,
                //timestamp: new Date().toISOString()
            });
        })(twats);

        updatePhoneAppState(store.key, {
            shouldUpdate: storeObj.getState()[store.key].shouldUpdate + 1,
            list: [],
            hasBlue: storeObj.getState()[store.key].hasBlue,
            blockedUsers: storeObj.getState()[store.key].blockedUsers
        });
    });
};