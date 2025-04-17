import HomeScreen from "./container";
import { PhoneConfigObject } from "lib/config/phone/appConfig";
import events from "./events";
import { baseStyles } from "lib/styles";

const config = (): PhoneConfigObject => {
    return {
        background: 'rgba(0, 0, 0, 0)',
        events: function (cb, data) {
            return events(cb, data);
        },
        hidden: () => true,
        icon: { background: baseStyles.bgPrimary(), color: 'white', name: 'home' },
        label: '',
        name: 'home-screen',
        render: HomeScreen,
    }
}

export default config;