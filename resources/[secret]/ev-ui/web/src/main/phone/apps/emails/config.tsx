import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import events from "./events";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        iconPng: "'https://i.ibb.co/ky9qJSb/email.png'",
        label: 'Emails',
        name: 'emails',
        position: 15,
        render: Container,
        events: function (cb, data) {
            return events(cb);
        },
    }
}

export default config;