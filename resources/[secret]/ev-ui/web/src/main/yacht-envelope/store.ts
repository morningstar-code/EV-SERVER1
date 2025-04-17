import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "yacht-envelope",
    initialState: {
        clueIcon: '',
        icon: '',
        opened: false,
        gameFailed: false,
        show: false,
        textOnly: false,
        value: '32, 34, 22',
    }
};

export default store;