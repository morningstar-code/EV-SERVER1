import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "halloween",
    initialState: {
        showCard: false,
        cardNumber: '123456',
        inviteCode: '',
    }
};

export default store;