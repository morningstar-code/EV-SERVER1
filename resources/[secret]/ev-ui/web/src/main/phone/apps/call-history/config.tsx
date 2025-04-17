import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import events from "./events";

const config = (): PhoneConfigObject => {
    return {
        iconPng: "'https://i.ibb.co/FBXM9hM/calls.png'",
        label: 'Calls',
        name: 'call-history',
        position: 3,
        render: Container,
        events: function (cb, data) {
            return events(cb);
        },
    }
}

export default config;