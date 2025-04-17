import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import events, { icon } from "./events";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        events: function (cb, data) {
            return events(cb);
        },
        iconPng: "'https://gta-assets.subliminalrp.net/images/phone-icons/jobs.png'",
        label: 'Job Center',
        name: 'jobs',
        position: 60,
        render: Container,
        iconNotification: icon
    }
}

export default config;