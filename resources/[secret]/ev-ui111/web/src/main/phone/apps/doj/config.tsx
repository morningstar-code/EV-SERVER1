import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        icon: {
            background: '#4154B6',
            color: '#E0DA14',
            name: 'gavel'
        },
        label: 'Department of Justice',
        name: 'doj',
        position: 250,
        render: Container,
        hidden: () => false,
    }
}

export default config;