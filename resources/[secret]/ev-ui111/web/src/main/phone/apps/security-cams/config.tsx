import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        icon: {
            background: '#16B0DE',
            color: 'white',
            name: 'camera'
        },
        label: 'Cameras',
        name: 'security-cams',
        position: 250,
        render: Container,
        hidden: () => false,
    }
}

export default config;