import React from 'react';
import { compose } from 'lib/redux';
import store from './store';
import { connect } from 'react-redux';
import AppWrapper from 'components/ui-app/ui-app';
import Game from './components/game';
import { nuiAction } from 'lib/nui-comms';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    introTimeout = void 0;
    timeout = void 0;

    onShow = (data: any = {}) => {
        const squareIds = [];
        const randomIds = [];
        const gridSize = data.gridSize || store.initialState.gridSize;
        const coloredSquares = data.coloredSquares || store.initialState.coloredSquares;

        this.props.updateState({
            ...store.initialState,
            ...data,
            show: true
        });

        for (let i = 0; i < gridSize * gridSize; i++) {
            randomIds.push(i);
        }

        for (; squareIds.length < coloredSquares;) {
            const randomIndex = Math.floor(Math.random() * randomIds.length);
            squareIds.includes(randomIndex) || squareIds.push(randomIndex);
        }

        this.props.updateState({
            squareIds: squareIds,
            randomIds: randomIds
        });

        this.introTimeout = setTimeout(() => {
            this.props.updateState({ introShown: true });
        }, 4000);

        this.timeout = setTimeout(() => {
            this.props.updateState({
                gameFinished: true,
                gameWon: false
            });
        }, (data.gameTimeoutDuration || store.initialState.gameTimeoutDuration) + 4000);
    }

    onHide = () => {
        clearTimeout(this.introTimeout);
        clearTimeout(this.timeout);

        this.props.updateState({
            ...store.initialState
        });
    }

    clickSquare = (squareId: number) => {
        const clicksFailed = this.props.clicksFailed + (squareId ? 0 : 1);
        const clicksTotal = this.props.clicksTotal + 1;
        const gameWon = clicksTotal - clicksFailed === this.props.coloredSquares;

        if (clicksFailed > this.props.failedClicksAllowed || gameWon) {
            clearTimeout(this.introTimeout);
            clearTimeout(this.timeout);

            this.props.updateState({
                clicksFailed: clicksFailed,
                clicksTotal: clicksTotal,
                gameFinished: true,
                gameWon: gameWon
            });

            nuiAction(this.props.gameFinishedEndpoint, {
                success: gameWon,
                parameters: this.props.parameters
            });
        } else {
            this.props.updateState({
                clicksFailed: clicksFailed,
                clicksTotal: clicksTotal
            });
        }
    }

    render() {
        return (
            <AppWrapper
                center
                store={store}
                name="memorygame"
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