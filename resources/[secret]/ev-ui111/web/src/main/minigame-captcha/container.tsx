import React from "react";
import { compose } from "lib/redux";
import store from "./store";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";
import AppWrapper from "components/ui-app/ui-app";
import { mgCaptchaColorAnswers, mgCaptchaColors, mgCaptchaShapeAnswers, mgCaptchaShapes } from "./game";
import Wrapper from "./components/wrapper";
import Intro from "./components/intro";
import Game from "./components/game";

const { mapStateToProps, mapDispatchToProps } = compose(store);

interface State {
    answerCorrect: string;
    answerValue: string;
    colorRequired: string;
    answersRequired: number;
    gameDuration: number;
    gameFinishedEndpoint: string;
    gameLost: boolean;
    gameRoundsPlayed: number;
    gameRoundsTotal: number;
    gameWon: boolean;
    numberOfShapes: number;
    requiredAnswers: any;
    shapeRequired: string;
    shapeDefinitions: any;
    show: boolean;
    debugShowAnswer: boolean;
}

const minigameCaptchaDefaultState = {
    answerCorrect: '',
    answerValue: '',
    colorRequired: '',
    answersRequired: 2,
    gameDuration: 8000,
    gameFinishedEndpoint: 'ev-ui:minigameCaptchaFinished',
    gameLost: false,
    gameRoundsPlayed: 0,
    gameRoundsTotal: 2,
    gameWon: false,
    numberOfShapes: 4,
    requiredAnswers: [],
    shapeRequired: '',
    shapeDefinitions: [],
    show: false,
    debugShowAnswer: true
}

class Container extends React.Component<any, State> {
    endGameTimeout = void 0;
    gameStarted = false;
    listener = void 0;
    sound = void 0;
    soundTimeout = void 0;
    state = minigameCaptchaDefaultState;

    enterListener = (e: any) => {
        if (this.state.show && this.gameStarted && e.keyCode === 13) {
            this.endGame(
                this.state.answerValue.toLowerCase() ===
                this.state.answerCorrect.toLowerCase()
            )
        }
    }

    startGame = () => {
        const _0x6b1d2d = [];
        const _0x1c39e9 = [];

        for (let i = 1; i <= this.state.numberOfShapes; i++) {
            _0x6b1d2d.push(i);
            _0x1c39e9.push(i);
        }

        const _0xa2e86c = (pArr: any[]) => {
            return pArr[
                Math.floor(Math.random() * pArr.length)
            ]
        }

        const _0x3fc5e3 = [];

        for (; _0x1c39e9.length > 0; ) { //WHILE LOOP?
            for (
                var _0x7c43e4 = Math.floor(
                    Math.random() * _0x1c39e9.length
                ),
                _0xc8ebf4 = _0x1c39e9.splice(_0x7c43e4, 1).pop(),
                _0x5772af = Math.floor(Math.random() * _0x6b1d2d.length),
                _0x143d2d = _0x6b1d2d.splice(_0x5772af, 1).pop(),
                _0x37bcf7 = _0xa2e86c(mgCaptchaColors),
                _0x458673 = _0xa2e86c(mgCaptchaColors),
                _0x4a4279 = _0xa2e86c(mgCaptchaColors),
                _0x4bee90 = _0xa2e86c(mgCaptchaColors),
                _0x4c3270 = _0xa2e86c(mgCaptchaColors),
                _0x49bf0d = _0xa2e86c(mgCaptchaColors);
                _0x458673.name === _0x37bcf7.name;

            ) {
                _0x458673 = _0xa2e86c(mgCaptchaColors)
            }

            for (; _0x4a4279.name === _0x458673.name;) {
                _0x4a4279 = _0xa2e86c(mgCaptchaColors)
            }
            for (
                ;
                _0x4bee90.name === _0x458673.name ||
                _0x4bee90.name === _0x4a4279.name;

            ) {
                _0x4bee90 = _0xa2e86c(mgCaptchaColors)
            }
            for (; _0x49bf0d.name === _0x458673.name;) {
                _0x49bf0d = _0xa2e86c(mgCaptchaColors)
            }
            for (
                ;
                _0x4c3270.name === _0x458673.name ||
                _0x4c3270.name === _0x49bf0d.name;

            ) {
                _0x4c3270 = _0xa2e86c(mgCaptchaColors)
            }
            _0x3fc5e3.push({
                altId: _0x143d2d,
                backgroundColor: _0x37bcf7,
                id: _0xc8ebf4,
                innerShapeColor: _0x49bf0d,
                numberColor: _0x4c3270,
                shapeColor: _0x458673,
                textColorBgColor: _0x4a4279,
                textShapeBgColor: _0x4bee90,
                innerShape: _0xa2e86c(mgCaptchaShapes),
                shape: _0xa2e86c(mgCaptchaShapes),
                textShape: _0xa2e86c(mgCaptchaShapes),
                textColor: _0xa2e86c(mgCaptchaColors).name,
            })
        }

        for (
            var _0x294500 = _0xa2e86c(_0x3fc5e3),
            _0x52e41e = _0xa2e86c(_0x3fc5e3);
            _0x52e41e.id === _0x294500.id;

        ) {
            _0x52e41e = _0xa2e86c(_0x3fc5e3)
        }

        for (
            var _0x37d6a3 = ['color', 'shape'],
            _0x36d25c = this.state.answersRequired,
            _0x5ed71f = [],
            _0x139aec = [],
            _0x53a616 = 0;
            _0x53a616 < _0x36d25c;
            _0x53a616 += 1
        ) {
            var _0x5bc754 = _0xa2e86c(_0x37d6a3);
            const _0x25a653 = _0xa2e86c(
                'color' === _0x5bc754 ? mgCaptchaColorAnswers : mgCaptchaShapeAnswers
            )
            for (
                var _0x2146b8 = _0xa2e86c(_0x3fc5e3);
                -1 !== _0x139aec.indexOf(_0x2146b8.id);

            ) {
                _0x2146b8 = _0xa2e86c(_0x3fc5e3)
            }
            _0x139aec.push(_0x2146b8.id)
            _0x5ed71f.push({
                answer: _0x25a653.key(_0x2146b8),
                name: _0x25a653.name(_0x2146b8),
                i18n: _0x25a653.i18n,
            })
        }

        var _0x4d3fc1 = _0x5ed71f
        .map(function (_0x5ee4e7) {
            return _0x5ee4e7.answer
        })
        .join(' '),
        _0x52fcf3 = {
            answerCorrect: _0x4d3fc1,
            requiredAnswers: _0x5ed71f,
            shapeDefinitions: _0x3fc5e3,
        }

        this.gameStarted = true;
        this.setState(_0x52fcf3);

        this.endGameTimeout = setTimeout(() => {
            this.endGame(false);
        }, this.state.gameDuration + 500 + 5000);

        this.soundTimeout = setTimeout(() => {
            const sound = new Audio('/sounds/evolved.mp3');
            sound.autoplay = true;
            sound.controls = false;
            sound.volume = 0.5;
            sound.loop = true;
            sound.play();
            this.sound = sound;
        }, 5000);
    }

    endGame = (success: boolean) => {
        if (this.gameStarted) {
            this.gameStarted = false;

            clearTimeout(this.endGameTimeout);
            clearTimeout(this.soundTimeout);

            if (this.sound) {
                this.sound.pause();
                this.sound = null;
            }

            const gameRoundsPlayed = this.state.gameRoundsPlayed + 1;
            let gameWon = false;
            let gameLost = false;

            if (success) {
                if (gameRoundsPlayed === this.state.gameRoundsTotal) {
                    gameWon = true;
                }
            } else {
                gameLost = true;
            }

            if (gameWon || gameLost) {
                nuiAction(this.state.gameFinishedEndpoint, {
                    success: !gameLost
                });

                this.setState({
                    ...minigameCaptchaDefaultState,
                    gameLost: gameLost,
                    gameWon: gameWon,
                    show: true
                });
            } else {
                this.setState({
                    gameRoundsPlayed: gameRoundsPlayed,
                    answerValue: '',
                    shapeDefinitions: []
                });
            }
        }
    }

    onHide = () => {
        if (this.gameStarted) {
            this.gameStarted = false;

            nuiAction(this.state.gameFinishedEndpoint, {
                success: false
            });
        }

        this.setState(minigameCaptchaDefaultState);

        clearTimeout(this.endGameTimeout);
        clearTimeout(this.soundTimeout);

        if (this.sound) {
            this.sound.pause();
            this.sound = null;
        }
    }

    onShow = (data = {} as any) => {
        this.setState({
            ...data,
            show: true
        });
    }

    changeAnswerValue = (value: string) => {
        this.setState({
            answerValue: value
        });
    }

    componentDidMount() {
        window.addEventListener('keyup', this.enterListener);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.enterListener);
    }

    render() {
        return (
            <AppWrapper
                center
                name="minigame-captcha"
                onEscape={this.onHide}
                onShow={this.onShow}
            >
                {this.state.show && (
                    <Wrapper
                        {...this.state}
                        numberOfShapes={this.state.numberOfShapes}
                    >
                        {!this.gameStarted && (
                            <Intro
                                {...this.state}
                                startGame={this.startGame}
                            />
                        )}
                        {this.gameStarted && this.state.shapeDefinitions.length > 0 && (
                            <>
                                <Game
                                    {...this.state}
                                    changeAnswerValue={this.changeAnswerValue}
                                    shapes={this.state.shapeDefinitions}
                                />
                            </>
                        )}
                    </Wrapper>
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);