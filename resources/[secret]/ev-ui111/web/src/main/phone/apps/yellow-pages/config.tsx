import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        events: () => { },
        iconPng: "'https://gta-assets.subliminalrp.net/images/phone-icons/yellow-pages.png'",
        label: 'Yellow Pages',
        name: 'yellow-pages',
        position: 20,
        render: Container,
    }
}

export default config;