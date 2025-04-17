import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "range-picker",
    initialState: {
        show: false,
        submitUrl: 'ev-ui:submitRangeValues',
        sliders: 3,
    }
};

export default store;