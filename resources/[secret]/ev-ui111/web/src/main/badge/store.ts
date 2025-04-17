import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "badge",
    initialState: {
        name: '',
        badge: '',
        department: '',
        rank: '',
        mount: false
    }
};

export default store;