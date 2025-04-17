import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "memorygame",
    initialState: {
        clicksTotal: 0,
        clicksFailed: 0,
        coloredSquares: 16,
        gameFinished: false,
        gameFinishedEndpoint: 'ev-ui:heistsThermiteMinigameResult',
        gameTimeoutDuration: 20000,
        gameWon: false,
        failedClicksAllowed: 2,
        introShown: false,
        show: false,
        gridSize: 6,
        parameters: {},
        squareIds: [],
        randomIds: [],
    }
};

export default store;