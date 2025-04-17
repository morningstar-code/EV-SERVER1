import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "newscam",
    initialState: {
        show: false,
        recording: false,
        text: '',
    }
};

export default store;