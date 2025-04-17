import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "status-hud",
    initialState: {
        show: false,
        title: '',
        values: [],
    }
};

export default store;