import { BurnerConfigObject } from "lib/config/burner/appConfig";
import Container from "./container";
import events from "./events";

const config = (): BurnerConfigObject => {
    return {
        icon: {
            background: '#009688',
            color: 'white',
            name: 'phone'
        },
        label: 'Calls',
        name: 'call-history',
        position: 3,
        render: Container,
        events: function (cb) {
            return events(cb);
        },
    }
}

export default config;