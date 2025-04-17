import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "system",
    initialState: {
        account: {
            id: 0,
            twitterEnabled: true
        },
        imagesEnabled: true
    }
};

export default store;