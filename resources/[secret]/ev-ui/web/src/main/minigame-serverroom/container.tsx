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
    failureTimeout = void 0;

    onShow = (data: any = {}) => {
        this.props.updateState({
            show: true,
            ...data
        });

        clearTimeout(this.introTimeout);
        clearTimeout(this.failureTimeout);

        this.introTimeout = setTimeout(() => {
            this.props.updateState({ introComplete: true });
        }, data.introTimeout || 5000);

        this.failureTimeout = setTimeout(() => {
            this.clickSquare(0);
        }, (data.failureTimeout || 20000) + (data.introTimeout || 5000));
    }

    onHide = () => {
        clearTimeout(this.introTimeout);
        clearTimeout(this.failureTimeout);

        this.props.updateState({
            ...store.initialState
        });
    }

    clickSquare = (squareId: number) => {
        if (this.props.clickTarget !== squareId) {
            clearTimeout(this.failureTimeout);
            this.props.updateState({
                gameFinished: true,
                gameWon: false
            });

            return;
        }

        const clickTarget = squareId + 1;

        if (clickTarget > this.props.squares) {
            clearTimeout(this.failureTimeout);
            this.props.updateState({
                gameFinished: true,
                gameWon: true
            });

            nuiAction(this.props.gameFinishedEndpoint, {
                success: true
            });

            return;
        }

        this.props.updateState({ clickTarget: clickTarget });
    }

    render() {
        return (
            <AppWrapper
                center
                store={store}
                name="minigame-serverroom"
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.props.show && (
                    <Game {...this.props} clickSquare={this.clickSquare} />
                )}
            </AppWrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);