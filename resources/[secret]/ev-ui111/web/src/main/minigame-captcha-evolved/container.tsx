import React from 'react';
import { compose } from 'lib/redux';
import store from './store';
import { connect } from 'react-redux';
import AppWrapper from 'components/ui-app/ui-app';
import { nuiAction } from 'lib/nui-comms';
import { mgEvolvedColorAnswers, mgEvolvedColors, mgEvolvedDefaultState, mgEvolvedShapes, mgEvolvedTextShapeAnswers } from './game';
import Wrapper from './components/wrapper';
import Intro from './components/intro';
import Game from './components/game';

const { mapStateToProps, mapDispatchToProps } = compose(store);

interface State {
    answerCorrect: string;
    answerValue: string;
    colorRequired: string;
    answersRequired: number;
    debugShowAnswer: boolean;
    gameDuration: number;
    gameFinishedEndpoint: string;
    gameLost: boolean;
    gameRoundsPlayed: number;
    gameRoundsTotal: number;
    gameWon: boolean;
    numberOfAnswers: number;
    numberOfShapes: number;
    requiredAnswers: any;
    shapeRequired: string;
    shapeDefinitions: any;
    show: boolean;
    showIds: any;
}

class Container extends React.Component<any, State> {
    endGameTimeout = void 0;
    gameStarted = false;
    listener = void 0;
    sound = void 0;
    soundTimeout = void 0;

    state = mgEvolvedDefaultState;

    enterListener = (e: any) => {
        if (this.state.show && this.gameStarted && e.keyCode === 13) {
            this.endGame(
                this.state.answerValue.toLowerCase() === this.state.answerCorrect.toLowerCase()
            )
        }
    }

    startGame = () => {
        const _0x1cf40b = [];
        const _0x1f2832 = [];

        for (let i = 1; i <= this.state.numberOfShapes; i++) {
            _0x1cf40b.push(i);
            _0x1f2832.push(i);
        }

        let _0x4fc3df = [];

        for (; _0x4fc3df.length < this.state.numberOfAnswers;) {
            const idx = Math.floor(Math.random() * (this.state.numberOfShapes - 1 + 1) + 1);
            if (!_0x4fc3df.includes(idx)) {
                _0x4fc3df.push(idx);
            }
        }

        const getRandom = (arr: any) => {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        const _0x2f1ff8 = [];
        let _0x567032 = [];

        for (; _0x1f2832.length > 0;) {
            //WHAT THE FUCK GOES HERE
            for (
                var _0x3c26ac = Math.floor(
                    Math.random() * _0x1f2832.length
                ),
                _0xa92711 = _0x1f2832.splice(_0x3c26ac, 1).pop(),
                _0x45dbb5 = Math.floor(Math.random() * _0x1cf40b.length),
                _0x5bf425 = _0x1cf40b.splice(_0x45dbb5, 1).pop(),
                _0x354e5d = getRandom(mgEvolvedColors),
                _0x581aab = getRandom(mgEvolvedColors),
                _0x35d533 = getRandom(mgEvolvedColors),
                _0xe85f42 = getRandom(mgEvolvedColors),
                _0x71bdbf = getRandom(mgEvolvedColors),
                _0x17097e = getRandom(mgEvolvedColors);
                _0x581aab.name === _0x354e5d.name;
            ) {
                _0x581aab = getRandom(mgEvolvedColors);
            }

            for (; _0x35d533.name === _0x581aab.name;) {
                _0x35d533 = getRandom(mgEvolvedColors)
            }

            for (
                ;
                _0xe85f42.name === _0x581aab.name ||
                _0xe85f42.name === _0x35d533.name;
            ) {
                _0xe85f42 = getRandom(mgEvolvedColors)
            }

            for (; _0x17097e.name === _0x581aab.name;) {
                _0x17097e = getRandom(mgEvolvedColors)
            }

            for (
                ;
                _0x71bdbf.name === _0x581aab.name ||
                _0x71bdbf.name === _0x17097e.name;

            ) {
                _0x71bdbf = getRandom(mgEvolvedColors)
            }

            const _0x3dfebc = {
                altId: _0x5bf425,
                backgroundColor: _0x354e5d,
                id: _0xa92711,
                innerShapeColor: _0x17097e,
                numberColor: _0x71bdbf,
                shapeColor: _0x581aab,
                textColorBgColor: _0x35d533,
                textShapeBgColor: _0xe85f42,
                innerShape: getRandom(mgEvolvedShapes),
                shape: getRandom(mgEvolvedShapes),
                textShape: getRandom(mgEvolvedShapes),
                textColor: getRandom(mgEvolvedColors).name,
            }
            _0x2f1ff8.push(_0x3dfebc)
            _0x4fc3df.includes(_0xa92711) && _0x567032.push(_0x3dfebc);
        }

        for (
            var _0x22749b = ['color', 'shape'],
            _0x15f930 = this.state.answersRequired,
            _0x1691fa = [],
            _0xc128aa = [],
            _0x32a03f = 0;
            _0x32a03f < _0x15f930;
            _0x32a03f += 1
        ) {
            const _0x2fd2fb = getRandom(_0x22749b);
            const _0x4e35f4 = getRandom(
                'color' === _0x2fd2fb ? mgEvolvedColorAnswers : mgEvolvedTextShapeAnswers
            )
            for (
                var _0x198d52 = getRandom(_0x567032);
                -1 !== _0xc128aa.indexOf(_0x198d52.id);

            ) {
                _0x198d52 = getRandom(_0x567032)
            }
            _0xc128aa.push(_0x198d52.id)
            _0x1691fa.push({
                answer: _0x4e35f4.key(_0x198d52),
                name: _0x4e35f4.name(_0x198d52),
                i18n: _0x4e35f4.i18n,
            })
        }

        const _0x268bec = _0x1691fa
            .map(function (_0x58052b) {
                return _0x58052b.answer;
            })
            .join(' ');

        const _0x15e153 = {
            answerCorrect: _0x268bec,
            requiredAnswers: _0x1691fa,
            shapeDefinitions: _0x2f1ff8,
            showIds: _0x4fc3df,
        }

        this.gameStarted = true
        this.setState(_0x15e153)

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
                } else {
                    gameLost = true;
                }
            }

            if (gameWon || gameLost) {
                nuiAction(this.state.gameFinishedEndpoint, {
                    success: !gameLost
                });

                this.setState({
                    ...mgEvolvedDefaultState,
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

        this.setState(mgEvolvedDefaultState);

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
                name="minigame-captcha-evolved"
                onEscape={this.onHide}
                onShow={this.onShow}
            >
                {this.state.show && (
                    <Wrapper {...this.state} numberOfShapes={this.state.numberOfShapes}>
                        {!this.gameStarted && (
                            <Intro {...this.state} startGame={this.startGame} />
                        )}
                        {this.gameStarted && this.state.shapeDefinitions.length > 0 && (
                            <Game {...this.state} changeAnswerValue={this.changeAnswerValue} shapes={this.state.shapeDefinitions} />
                        )}
                    </Wrapper>
                )}
            </AppWrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);