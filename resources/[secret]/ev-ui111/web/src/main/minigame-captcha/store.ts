import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "minigame-captcha",
    initialState: {
        answerCorrect: '',
        answerValue: '',
        colorRequired: '',
        answersRequired: 2,
        debugShowAnswer: false,
        gameDuration: 12000,
        gameFinishedEndpoint: 'ev-ui:minigameCaptchaFinished',
        gameLost: false,
        gameRoundsPlayed: 0,
        gameRoundsTotal: 4,
        gameWon: false,
        numberOfAnswers: 4,
        numberOfShapes: 12,
        requiredAnswers: [],
        shapeRequired: '',
        shapeDefinitions: [],
        show: false,
        showIds: [],
    }
};

export default store;