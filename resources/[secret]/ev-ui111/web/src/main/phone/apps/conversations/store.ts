import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "phone.apps.conversations",
    initialState: {
        activeConversation: -1,
        conversations: {},
        loaded: [],
        notifications: [],
        order: [],
        page: 0,
    }
};

export default store;