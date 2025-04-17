import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "minigame-untangle",
    initialState: {
        gameFinished: false,
        gameFinishedEndpoint: 'ev-ui:untangleMinigameResult',
        gameTimeoutDuration: 20000,
        gameWon: false,
        introShown: false,
        show: false,
        numPoints: 6,
    }
};

export default store;