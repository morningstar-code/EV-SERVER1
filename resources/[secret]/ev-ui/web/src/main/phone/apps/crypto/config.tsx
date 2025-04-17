import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import events from "./events";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        events: function (cb, data) {
            return events(cb);
        },
        iconPng: "'https://royalrp.org/images/phone-icons/stocks.png'",
        init: () => { },
        label: 'Crypto',
        name: 'crypto',
        position: 55,
        render: Container,
    }
}

export default config;