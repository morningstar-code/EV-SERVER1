import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "main",
    initialState: {
        active: {
            app: '',
            data: null,
            show: false
        },
        failed: false,
        initComplete: false,
        loaded: false,
        renderReady: false,
        theme: 'dark',
    }
};

export default store;