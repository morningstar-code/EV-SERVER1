import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "contextmenu",
    initialState: {
        active: false,
        showButton: false,
        menus: [],
        oldMenus: [],
        position: "right"
    }
};

export default store;