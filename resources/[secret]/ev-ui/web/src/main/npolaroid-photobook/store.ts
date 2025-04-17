import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "npolaroid-photobook",
    initialState: {
        showPhotoBook: false,
        devMode: false,
        photoBook: {
            photos: {}
        },
    }
};

export default store;