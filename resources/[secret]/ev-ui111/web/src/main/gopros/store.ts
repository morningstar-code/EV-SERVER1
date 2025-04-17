import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "gopros",
    initialState: {
        dashcams: [],
        selectedType: '',
        show: false,
        switchingViews: false,
    }
};

export default store;