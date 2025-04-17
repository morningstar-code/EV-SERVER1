import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "book",
    initialState: {
        show: false,
        width: 800,
        height: 800,
        pages: [],
    }
};

export default store;