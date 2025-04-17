import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "minigame-maze",
    initialState: {
        clicksTotal: 0,
        clicksFailed: 0,
        gameFinished: false,
        gameFinishedEndpoint: 'ev-ui:mazeMinigameResult',
        gameTimeoutDuration: 100000000,
        numberHideDuration: 100000000,
        gameWon: false,
        failedClicksAllowed: 2,
        useChessPieces: false,
        introShown: false,
        show: false,
        gridSize: 6,
        maxJumpSize: 4,
        prevSquare: null,
        parameters: {},
        squares: [],
    }
};

export default store;