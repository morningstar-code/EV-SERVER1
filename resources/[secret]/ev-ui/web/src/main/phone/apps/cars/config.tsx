import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        forceOrientation: 'portrait',
        iconPng: "'https://i.ibb.co/JjfbsG9/vehicles.png'",
        label: 'Vehicles',
        name: 'cars',
        position: 30,
        render: Container,
    }
}

export default config;