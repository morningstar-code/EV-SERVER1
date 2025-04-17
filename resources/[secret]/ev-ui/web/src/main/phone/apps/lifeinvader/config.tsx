import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import { getCharacter } from "lib/character";
import { updatePhoneAppState } from "main/phone/actions";
import store from "./store";
import { getContacts } from "./actions";

const config = (): PhoneConfigObject => {
    return {
        hidden: () => !getCharacter().email,
        init: async () => {
            const results = await getContacts();

            updatePhoneAppState(store.key, {
                list: results
            });
        },
        iconPng: "'https://i.imgur.com/lO4dZCv.png'",
        label: 'LifeInvader Mail',
        name: 'lifeinvader',
        position: 400,
        render: Container,
    }
}

export default config;