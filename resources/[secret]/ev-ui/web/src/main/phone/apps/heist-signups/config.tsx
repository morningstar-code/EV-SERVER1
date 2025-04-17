import { PhoneConfigObject } from "lib/config/phone/appConfig";
import { hasVpn } from "lib/character";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        icon: {
            background: 'gold',
            color: 'black',
            name: 'piggy-bank'
        },
        label: 'Bank Busters',
        name: 'heist-signups',
        position: 151,
        render: Container,
        hidden: () => false || !hasVpn(),
    }
}

export default config;