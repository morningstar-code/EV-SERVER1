import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        forceOrientation: 'portrait',
        icon: {
            background: '#171717',
            color: 'white',
            name: 'calendar-alt'
        },
        label: 'Calendar',
        name: 'calendar',
        position: 66,
        render: Container,
        hidden: () => false
    }
}

export default config;