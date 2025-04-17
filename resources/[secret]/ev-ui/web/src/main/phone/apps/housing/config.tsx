import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        forceOrientation: 'portrait',
        events: () => { },
        iconPng: "'https://royalrp.org/images/phone-icons/houses.png'",
        label: 'Housing',
        name: 'housing',
        position: 50,
        render: Container,
    }
}

export default config;