import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import { getCurrentLocation, isAtLocation, isConnectedToSpots, isEmployed } from "main/phone/actions";
import { shops } from "main/showroom/shops.config";
import events from "./events";

const config = (): PhoneConfigObject => {
    return {
        init: () => {
            //console.log('isAtLocation', isAtLocation(['pdm', 'tuner', 'fastlane']));
            //console.log('isEmployed', isEmployed(getCurrentLocation()));
            //console.log('isConnectedToSpots', isConnectedToSpots(getCurrentLocation(), [1, 2, 3]));
            //console.log('shop', shops[getCurrentLocation()]);
        },
        forceOrientation: 'portrait',
        events: function (cb, data) {
            return events(cb);
        },
        hidden: () => (!isAtLocation(['pdm', 'tuner', 'fastlane']) || !isEmployed(getCurrentLocation()) || !isConnectedToSpots(getCurrentLocation(), [1, 2, 3])),
        icon: {
            background: () => shops[getCurrentLocation()] ? shops[getCurrentLocation()].primary : '#E91E63',
            color: 'white',
            name: 'car'
        },
        label: () => shops[getCurrentLocation()] ? shops[getCurrentLocation()].name : '',
        name: 'showroom-manager',
        render: Container,
    }
}

export default config;