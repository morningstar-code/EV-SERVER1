import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "minigame-serverroom",
    initialState: {
        clickTarget: 1,
        gameFinishedEndpoint: 'ev-ui:minigame:movingNumbers',
        gameStage: 1,
        introComplete: false,
        introTimeout: 2500,
        gameFinished: false,
        gameWon: false,
        intervalMin: 1000,
        intervalMax: 4500,
        numberTimeout: 3000,
        show: false,
        squares: 8,
    }
};

export default store;