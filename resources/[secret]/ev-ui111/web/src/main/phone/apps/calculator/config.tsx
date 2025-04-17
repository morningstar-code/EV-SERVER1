import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        forceOrientation: 'portrait',
        events: () => { },
        iconPng: "'https://gta-assets.subliminalrp.net/images/phone-icons/calculator.png'",
        label: 'Calculator',
        name: 'calculator',
        position: 151,
        render: Container,
    }
}

export default config;