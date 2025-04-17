import React from 'react';
import { compose } from 'lib/redux';
import store from './store';
import { connect } from 'react-redux';
import AppWrapper from 'components/ui-app/ui-app';
import { nuiAction } from 'lib/nui-comms';
import { MazeGame } from './classes/maze-game';
import { GetRandom } from 'utils/misc';
import Game from './components/game';

const { mapStateToProps, mapDispatchToProps } = compose(store);

const _0x2fabbf = (p1, p2, p3) => {
    return (
        p1 > 0 &&
        p1 < p3 - 1 &&
        p2 > 0 &&
        p2 < p3 - 1
    )
}

const absoluteCalc = (p1, p2, p3) => {
    return p1.x === p2.x
        ? Math.abs(p1.y - p2.y) === p3
        : p1.y === p2.y &&
        Math.abs(p1.x - p2.x) === p3
}

class Container extends React.Component<any> {
    introTimeout = void 0;
    timeout = void 0;
    hideTimeout = void 0;
    hideTimeoutFinished = false;

    onShow = (data: any = {}) => {
        this.hideTimeoutFinished = false;
        const squares = [];
        this.props.updateState({ squares: squares });

        this.introTimeout = setTimeout(() => {
            this.props.updateState({ introShown: true });

            this.hideTimeout = setTimeout(() => {
                const newSquares = this.props.squares.map((square: any) => {
                    square.showNumber = false;
                    return square;
                });
                this.props.updateState({ squares: newSquares });
                clearTimeout(this.hideTimeout);
                this.hideTimeoutFinished = true;
            }, data.numberHideDuration || store.initialState.numberHideDuration);

            this.timeout = setTimeout(() => {
                if (!this.props.gameFinished) {
                    this.props.updateState({ gameFinished: true, gameWon: false });
                    nuiAction(this.props.gameFinishedEndpoint, {
                        success: false,
                        parameters: this.props.parameters
                    });
                }

                clearTimeout(this.timeout);
            }, data.gameTimeoutDuration || store.initialState.gameTimeoutDuration);

            clearTimeout(this.introTimeout);
        }, 4000);

        this.props.updateState({
            ...data,
            show: true
        });

        let gridSize = data.gridSize || store.initialState.gridSize;
        const _0x1c7e44 = Math.round((gridSize + 1) / 2);
        gridSize = 2 * _0x1c7e44 - 1;

        const mazeGame = new MazeGame(_0x1c7e44, _0x1c7e44);
        const maze = mazeGame.maze;
        const solution = mazeGame.getSolution();
        const _0x2c9f37 = Math.min(_0x1c7e44, 9);

        const mappedSolution = solution.map((s: any, index: number) => {
            let _0x4e93ed = -1;
            let _0x56c123 = 0;

            for (
                let i = index;
                i < solution.length;
                i++
            ) {
                if (solution[i][0] !== s[0]) {
                    if (solution[i][1] !== s[1]) {
                        break
                    }
                    _0x56c123++
                    0 !== index && delete solution[i - 1]
                } else {
                    _0x4e93ed++
                    0 !== index && delete solution[i - 1]
                }
            }

            if (index === 0) {
                _0x4e93ed = GetRandom(1, _0x4e93ed - 1);
                _0x56c123 = GetRandom(1, _0x56c123 - 1);

                for (let p = 0; p < Math.max(_0x56c123, _0x4e93ed); p++) {
                    delete solution[p];
                }
            }

            return {
                x: s[0],
                y: s[1],
                gap: Math.max(_0x56c123, _0x4e93ed)
            }
        });

        const gap = mappedSolution.find((s: any) => s && s.x === 1 && s.y === 1).gap;

        const copiedMaze = [...maze];

        for (let i = 0; i < copiedMaze.length; i++) {
            const row = copiedMaze[i];

            const clickFunc = (size: number) => {
                const x = maze.indexOf(row);
                const y = size;

                if (x === 0 || x === maze.length - 1 || y === 0 || y === row.length - 1) {
                    return 'continue'
                }

                let _0x2c9f37Copy = _0x2c9f37;

                for (let p = 0; p < 3; p++) {
                    const calc = gridSize - 2 * p;

                    if (_0x2fabbf(x - p, y - p, calc)) {
                        _0x2c9f37Copy -= 1;
                        _0x2c9f37Copy = Math.min(_0x2c9f37Copy, calc - 2);
                    }
                }

                const squareLength = squares.length;

                const blink = data?.withDebug ? mappedSolution.find((s: any) => {
                    return s && s.x === x && s.y === y;
                }) : squareLength === gap || squareLength === gridSize * gap;

                const mapSolution = mappedSolution.find((s: any) => {
                    return s && s.x === x && s.y === y;
                });

                let randomNum = GetRandom(Math.random() > 0.33 ? 1 : 2, _0x2c9f37Copy);

                if (x === gridSize - 1 || y === gridSize - 1) {
                    (function (p1, p2) {
                        return Math.abs(p1 - (gridSize - 1)) + Math.abs(p2 - (gridSize - 1));
                    })(x, y) === randomNum && Math.random() > 0.15 && (randomNum > _0x2c9f37Copy - 1 ? randomNum-- : randomNum++)
                }

                randomNum === Math.floor(gridSize / 2) - 1 && Math.random() > 0.75 && randomNum++;

                let number = mapSolution?.gap ?? randomNum;

                if (mapSolution?.gap === 0 && squareLength !== gridSize * gridSize - 1) {
                    number = 1;
                }

                squares.push({
                    id: squareLength,
                    x: x,
                    y: y,
                    blink: !!blink,
                    isClicked: false,
                    showNumber: true,
                    number: number
                });
            }

            for (let j = 0; j < row.length; j++) {
                clickFunc(j);
            }
        }

        this.props.updateState({ squares: squares });
    }

    onHide = () => {
        clearTimeout(this.introTimeout);
        clearTimeout(this.timeout);

        this.props.updateState({
            ...store.initialState
        });
    }

    clickSquare = (squareId: number) => {
        if (squareId !== 0) {
            let square = this.props.squares[squareId];

            if (this.props.clicksTotal !== 0 || square.number !== 0) {
                let clicksTotal = this.props.clicksTotal + 1;
                let clicksFailed = this.props.clicksFailed;
                let prevSquare = this.props.prevSquare;

                if (clicksTotal === 1) {
                    if (!square.blink) {
                        return;
                    }

                    square.isClicked = true;

                    const squaresCopy = [...this.props.squares];

                    squaresCopy.forEach((s: any) => {
                        s.showNumber = false;
                        s.blink = false;
                    });

                    this.props.updateState({ squares: squaresCopy });
                } else {
                    if (prevSquare) {
                        const calc = absoluteCalc(square, prevSquare, prevSquare.number);

                        if (calc) {
                            if (square.number === 0) {
                                clearTimeout(this.introTimeout);
                                clearTimeout(this.timeout);

                                this.props.updateState({
                                    clicksTotal: clicksTotal,
                                    gameFinished: true,
                                    gameWon: true
                                });

                                nuiAction(this.props.gameFinishedEndpoint, {
                                    success: true,
                                    parameters: this.props.parameters
                                });
                            }

                            square.failedClick = false;
                            square.isClicked = true;
                        } else {
                            square.failedClick = true;

                            if (++clicksFailed > this.props.failedClicksAllowed) {
                                this.props.updateState({ gameFinished: true, gameWon: false });
                                nuiAction(this.props.gameFinishedEndpoint, {
                                    success: false,
                                    parameters: this.props.parameters
                                });
                            }

                            square = prevSquare;
                        }
                    }
                }

                this.props.updateState({
                    squares: [...this.props.squares],
                    clicksTotal: clicksTotal,
                    clicksFailed: clicksFailed,
                    prevSquare: square
                });
            }
        }
    }

    render() {
        return (
            <AppWrapper
                center
                store={store}
                name="minigame-maze"
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.props.show && (
                    <Game {...this.props} {...this.state} clickSquare={this.clickSquare} />
                )}
            </AppWrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);