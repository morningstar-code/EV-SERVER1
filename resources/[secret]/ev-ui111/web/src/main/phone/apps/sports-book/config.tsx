import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        forceOrientation: 'portrait',
        icon: {
            background: '#000',
            color: 'white',
            name: 'gem'
        },
        label: 'Diamond Sports Book',
        name: 'sports-book',
        position: 150,
        render: Container,
        hidden: () => false,
    }
}

export default config;