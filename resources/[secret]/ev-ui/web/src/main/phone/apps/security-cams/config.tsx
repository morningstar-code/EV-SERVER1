import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        events: () => { },
        iconPng: "'https://royalrp.org/images/phone-icons/camera.png'",
        label: 'Cameras',
        name: 'security-cams',
        position: 250,
        render: Container,
    }
}

export default config;