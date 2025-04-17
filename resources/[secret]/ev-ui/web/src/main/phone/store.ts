import { StoreObject } from "lib/redux";
import { isDevel } from "lib/env";

export const appName = "phone";

const DEFAULT_PHONE_STATUS = isDevel() ? 'hide' : 'hide';

const store: StoreObject = {
    key: appName,
    initialState: {
        activeApp: 'home-screen',
        appsWithNotifications: [],
        callActive: false,
        callMeta: {},
        devOverride: isDevel(),
        initialized: false,
        hasPhone: true,
        hasNotification: false,
        hasEmergencyJob: false,
        hasVpn: true,
        hasUsbFleeca: false,
        hasUsbPaleto: false,
        hasUsbUpper: false,
        hasUsbLower: false,
        hasUsbRacing: false,
        //racingAlias: 'Cool',
        hasUsbPDRacing: false,
        orientation: 'portrait',
        orientationForced: true,
        status: DEFAULT_PHONE_STATUS,
        style: {},
        wifiConnected: [],
    }
};

export default store;