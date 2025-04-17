import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "minigame-flip",
    initialState: {
        gameFinished: false,
        gameFinishedEndpoint: 'ev-ui:flipMinigameResult',
        gameTimeoutDuration: 20000,
        gameWon: false,
        introShown: false,
        show: false,
        gridSize: 3,
    },
};

export default store;