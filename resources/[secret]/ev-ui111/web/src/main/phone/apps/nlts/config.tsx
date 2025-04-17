import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import { updateNltsAppState } from "./actions";

const config = (): PhoneConfigObject => {
    return {
        forceOrientation: 'portrait',
        init: () => {
            return updateNltsAppState({
                business: 'nordic_luxury_transport_service'
            });
        },
        events: () => { },
        iconPng: "'https://dvexdev.github.io/DveX.Images/logo.png'",
        label: "NLTS's Vehicles",
        name: 'nlts',
        position: 100,
        render: Container,
        hidden: () => false,
    }
}

export default config;