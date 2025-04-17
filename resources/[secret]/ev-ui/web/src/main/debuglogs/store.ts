import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "debuglogs",
    initialState: {
        debugLog: {
            enabled: true,
            log: []
        }
    }
};

export default store;