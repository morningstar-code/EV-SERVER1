import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import events from "./events";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        iconPng: "'https://gta-assets.subliminalrp.net/images/phone-icons/email.png'",
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