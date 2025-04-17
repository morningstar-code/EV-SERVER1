import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "cash",
    initialState: {
        amountAdjustment: null,
        bankAmount: null,
        bankName: null,
        cash: null,
        duration: 5,
    }
};

export default store;