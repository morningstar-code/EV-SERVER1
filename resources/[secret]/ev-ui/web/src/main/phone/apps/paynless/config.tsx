import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        icon: {
            background: '#16c49e',
            color: 'white',
            name: 'archive'
        },
        label: 'PayNLess',
        name: 'paynless',
        position: 350,
        render: Container,
        hidden: () => false,
    }
}

export default config;