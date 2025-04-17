import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "ballot",
    initialState: {
        ballotSaved: false,
        idx: 0,
        loading: true,
        options: [],
        selectedMap: {},
    }
};

export default store;