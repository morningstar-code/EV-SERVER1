import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "phone.apps.heist-signups",
    initialState: {
        gangs: [],
        heists: [],
        isManager: false,
        managing: false,
    }
};

export default store;