import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "interactions",
    initialState: {
        message: '',
        show: false,
        type: 'info',
    }
};

export default store;