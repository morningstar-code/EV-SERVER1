import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "show-image",
    initialState: {
        showImage: false,
        url: '',
    }
};

export default store;