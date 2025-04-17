import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        background: 'rgba(0, 0, 0, 0)',
        forceOrientation: 'landscape',
        hidden: () => true,
        icon: {
            background: '#009688',
            color: 'white',
            name: 'home',
        },
        label: '',
        name: 'browser',
        render: Container,
        position: 5000,
    }
}

export default config;