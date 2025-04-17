import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "case-opening",
    initialState: {
        submitUrl: 'ev-ui:caseOpeningFinished',
        images: [],
        correctImageIndex: 0,
    }
};

export default store;