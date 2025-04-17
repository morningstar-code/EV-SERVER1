import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "npolaroid-photo",
    initialState: {
        showPhoto: false,
        devMode: false,
        photo: {},
    }
};

export default store;