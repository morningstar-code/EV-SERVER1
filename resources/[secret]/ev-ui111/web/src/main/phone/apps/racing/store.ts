import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "phone.apps.racing",
    initialState: {
        active: [],
        completed: [],
        creatingRace: false,
        maps: [],
        pending: [],
        currentConversation: null,
        conversations: {},
        isNightTime: false,
        tournaments: [],
    }
};

export default store;