import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "voice-url",
    initialState: {
        copied: false,
        url: 'invalid url',
    }
};

export default store;