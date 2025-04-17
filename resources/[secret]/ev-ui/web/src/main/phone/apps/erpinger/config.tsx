import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import events from "./events";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        events: function (cb, data) {
            return events(cb);
        },
        iconPng: "'https://i.ibb.co/QmtRdJ5/erpinger.png'",
        label: 'Ping!',
        name: 'erpinger',
        position: 10,
        render: Container,
    }
}

export default config;