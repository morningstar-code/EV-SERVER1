import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "hasino-lower-login",
    initialState: {
        show: false,
        attempts: 0,
        timeRemaining: 0,
        secondsRemaining: 0,
        timer: 0,
        hint: 'Dean Watson',
        response: '',
    }
};

export default store;