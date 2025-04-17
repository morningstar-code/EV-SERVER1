import { PhoneConfigObject } from "lib/config/phone/appConfig";
import { getCurrentLocation, isAtLocation, isConnectedToSpots } from "main/phone/actions";
import Container from "./container";
import events from "./events";

const config = (): PhoneConfigObject => {
    return {
        events: function (cb, data) {
            return events(cb);
        },
        icon: {
            background: '#FF9900',
            color: 'white',
            name: 'shopping-basket'
        },
        label: 'Amezing',
        name: 'genericShop',
        position: 82,
        render: Container,
        hidden: () => !isAtLocation(['imports_shop_wifi']) || !isConnectedToSpots(getCurrentLocation(), [4, 5, 6]) ,
    }
}

export default config;