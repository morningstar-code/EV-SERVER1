import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import { getCharacter } from "lib/character";
import { nuiAction } from "lib/nui-comms";
import { updatePhoneAppState } from "main/phone/actions";
import { devData } from "main/phone/dev-data";
import { sortConversations } from "./actions";
import events from "./events";
import store from "./store";

const config = (): PhoneConfigObject => {
    return {
        iconPng: "'https://gta-assets.subliminalrp.net/images/phone-icons/conversations.png'",
        init: async () => {
            //Also is this init func supposed to run every time u open phone... INVESTIGATE NP-UI
            const character = getCharacter();
            const results = await nuiAction('ev-ui:getConversations', {}, { returnData: devData.getConversations() });
            
            const sortedConversations: any = sortConversations(character.number, results.data);
            
            updatePhoneAppState(store.key, {
                activeConversation: -1,
                conversations: sortedConversations.conversations,
                loaded: [],
                notifications: [],
                order: sortedConversations.order,
                page: 0 //Maybe comment this out, so the page doesnt get reset everytime they close phone.....
            })
        },
        label: 'Messages',
        name: 'conversations',
        position: 4,
        render: Container,
        events: function (cb, data) {
            return events(cb);
        },
    }
}

export default config;