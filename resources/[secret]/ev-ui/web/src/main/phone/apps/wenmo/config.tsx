import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        iconPng: "'https://i.ibb.co/pLgNYzX/wenmo.png'",
        label: 'Wenmo',
        name: 'wenmo',
        position: 40,
        render: Container,
        hidden: () => false,
    }
}

export default config;