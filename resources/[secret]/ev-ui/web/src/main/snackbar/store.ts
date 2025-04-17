import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "snackbar",
    initialState: {
        open: false,
        type: "success",
        message: "",
        timeout: 5000
    }
};

export default store;