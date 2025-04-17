import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "textbox",
    initialState: {
        callbackUrl: '',
        inputKey: null,
        title: '',
        items: [],
        hiddenItems: [],
        show: false,
    }
};

export default store;