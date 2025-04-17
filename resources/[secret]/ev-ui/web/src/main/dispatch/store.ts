import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "dispatch",
    initialState: {
        activeCalls: [],
        callIds: [],
        calls: [],
        inactiveCalls: [],
        initialLoadComplete: false,
        pings: [],
        units: [],
        playerUnit: null,
    }
};

export default store;