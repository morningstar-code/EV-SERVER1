import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "phone.apps.details",
    initialState: {
        bank: 0,
        cash: 0,
        jobs: {
            primary: 'Unemployed',
            secondary: 'None',
        },
        licenses: []
    }
};

export default store;