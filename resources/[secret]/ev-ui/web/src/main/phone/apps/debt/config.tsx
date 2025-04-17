import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        iconPng: "'https://i.ibb.co/cxvLcJF/debt.png'",
        label: 'Debt',
        name: 'debt',
        position: 35,
        render: Container,
        hidden: () => false,
    }
}

export default config;