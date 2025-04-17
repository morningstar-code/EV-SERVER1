import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        forceOrientation: 'portrait',
        events: () => { },
        iconPng: "'https://i.ibb.co/B6y2TkN/calculator.png'",
        label: 'Calculator',
        name: 'calculator',
        position: 151,
        render: Container,
    }
}

export default config;