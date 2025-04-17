import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "minigame-sequence",
    initialState: {
        show: false,
        tempShow: false,
        upsideDown: false,
        shiftInterval: 2000,
        timeToComplete: 60000,
        withDebug: true,
        type: 'letters',
        gameCompletedEvent: 'ev-ui:minigame-sequence-completed',
        parameters: {},
    }
};

export default store;