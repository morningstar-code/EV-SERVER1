import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        events: () => { },
        iconPng: "'https://i.ibb.co/bz7WDGk/yellow-pages.png'",
        label: 'Yellow Pages',
        name: 'yellow-pages',
        position: 20,
        render: Container,
    }
}

export default config;