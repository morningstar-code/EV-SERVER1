import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "character",
    initialState: {
        id: null,
        first_name: null,
        last_name: null,
        job: null,
        number: null,
        bank_account_id: null,
        server_id: null
    }
};

export default store;