import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        iconPng: "'https://gta-assets.subliminalrp.net/images/phone-icons/wenmo.png'",
        label: 'Wenmo',
        name: 'wenmo',
        position: 40,
        render: Container,
        hidden: () => false,
    }
}

export default config;