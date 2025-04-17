import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "phone.apps.twatter",
    initialState: {
        list: [],
        shouldUpdate: 0,
        blockedUsers: [],
    }
};

export default store;