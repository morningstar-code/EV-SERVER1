import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        forceOrientation: 'portrait',
        events: () => { },
        iconPng: "'https://royalrp.org/images/phone-icons/betting.png'",
        label: 'Diamond Sports Book',
        name: 'sports-book',
        position: 150,
        render: Container,
    }
}

export default config;