import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "minigame-ddr",
    initialState: {
        gameFinished: false,
        gameFinishedEndpoint: 'ev-ui:ddrMinigameResult',
        gameTimeoutDuration: 30000,
        gameWon: false,
        introShown: false,
        show: false,
        columns: 4,
        failureCount: 3,
        letters: ['w', 'a', 's', 'd', 'g', 'i', 'j', 'k', 'l'],
        timeBetweenLetters: 500,
        timeToTravel: 1500,
    },
};

export default store;