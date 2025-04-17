import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        icon: {
            background: '#43A047',
            color: 'white',
            name: 'house-user'
        },
        label: 'Housing',
        name: 'housing',
        position: 50,
        render: Container,
    }
}

export default config;