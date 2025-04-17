import { StoreObject } from "lib/redux";
import { isDevel } from "lib/env";

export const appName = "burner";

const DEFAULT_BURNER_STATUS = isDevel() ? 'hide' : 'hide';

const store: StoreObject = {
    key: appName,
    initialState: {
        activeApp: 'home-screen',
        appsWithNotifications: [],
        callActive: false,
        callMeta: {},
        devOverride: isDevel(),
        initialized: false,
        hasNotification: false,
        hasVpn: false,
        orientation: 'portrait',
        orientationForced: false,
        source_number: '',
        status: DEFAULT_BURNER_STATUS,
        style: {},
        wifiConnected: [],
    }
};

export default store;