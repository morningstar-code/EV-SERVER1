import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "minigame-numbers",
    initialState: {
        gameFinishedEndpoint: 'ev-ui:heistsMinigameNumbersEndpoint',
        gameTimeoutDuration: 12000,
        gameFinished: false,
        gameWon: false,
        introShown: false,
        passwordShown: false,
        numberOfDigits: 12,
        requiredPassword: '',
        show: false,
    }
};

export default store;