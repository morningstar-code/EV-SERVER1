import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import { updateAbdulTaxiAppState } from "./actions";

const config = (): PhoneConfigObject => {
    return {
        init: () => {
            return updateAbdulTaxiAppState({
                business: 'abdultaxi'
            });
        },
        iconPng: "'https://gta-assets.subliminalrp.net/images/phone-icons/abdt.png'",
        label: "Abdul's Taxis",
        name: 'abdultaxi',
        position: 100,
        render: Container,
        hidden: () => false
    }
}

export default config;