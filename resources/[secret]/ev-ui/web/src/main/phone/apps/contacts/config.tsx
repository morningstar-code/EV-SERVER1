import Container from "./container";
import { PhoneConfigObject } from "lib/config/phone/appConfig";
import { updatePhoneAppState } from "../../actions";
import store from "./store";
import { devData } from "../../dev-data";
import { nuiAction } from "lib/nui-comms";
import { getCharacter } from "lib/character";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        iconPng: "'https://i.ibb.co/ZcqSnZY/contacts.png'",
        init: async () => {
            const results = await nuiAction('ev-ui:getContacts', {
                id: getCharacter().id
            }, { returnData: devData.getContacts() });

            if (results.meta.ok) {
                updatePhoneAppState(store.key, {
                    list: results.data
                });
            }
        },
        label: 'Contacts',
        name: 'contacts',
        position: 2,
        render: Container,
    }
}

export default config;