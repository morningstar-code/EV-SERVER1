import { PhoneConfigObject } from "lib/config/phone/appConfig";
import { getCurrentLocation, isAtLocation, isConnectedToSpots } from "main/phone/actions";
import Container from "./container";
import events from "./events";

const config = (): PhoneConfigObject => {
    return {
        events: function (cb, data) {
            return events(cb, data);
        },
        icon: {
            background: '#7E57C2',
            color: 'white',
            name: 'user-secret'
        },
        label: 'Milk Road',
        name: 'heitems',
        position: 80,
        render: Container,
        hidden: () => {
            return (
                !isAtLocation([
                    'heist_wifi_spot_1',
                    'heist_wifi_spot_2',
                    'heist_wifi_spot_3',
                    'heist_wifi_spot_4',
                    'heist_wifi_spot_5',
                ]) || !isConnectedToSpots(getCurrentLocation(), [4, 5, 6, 7, 9])
            )
        },
    }
}

export default config;