import { PhoneConfigObject } from "lib/config/phone/appConfig";
import { updatePhoneAppState } from "main/phone/actions";
import Container from "./container";
import store from "./store";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        iconPng: "'https://i.ibb.co/GWzhQjz/lsbn.png'",
        init: async () => {
            const articleTypes = [
                {
                    id: 1,
                    name: 'Published'
                },
                {
                    id: 2,
                    name: 'Drafts'
                }
            ];

            updatePhoneAppState(store.key, {
                business: 'lsbn',
                articleTypes: articleTypes,
                selectedArticleType: articleTypes[0]
            });
        },
        label: 'LSBN',
        name: 'news',
        position: 75,
        render: Container,
    }
}

export default config;