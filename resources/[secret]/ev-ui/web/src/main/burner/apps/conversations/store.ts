import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "burner.apps.conversations",
    initialState: {
        activeConversation: -1,
        conversations: {},
        loaded: [],
        notifications: [],
        order: []
    }
};

export default store;