import { PhoneConfigObject } from "lib/config/phone/appConfig";
import { updatePhoneAppState } from "../../actions";
import { devData } from "../../dev-data";
import Container from "./container";
import store from "./store";

const config = (): PhoneConfigObject => {
    return {
        events: () => { },
        init: () => {
            updatePhoneAppState(
                store.key,
                {
                    licenses: devData.getDetails().licenses
                });
        },
        iconPng: "'https://i.ibb.co/HzJm9wn/details.png'",
        label: 'Details',
        position: 1,
        name: 'details',
        render: Container,
        hidden: () => false,
    }
}

export default config;