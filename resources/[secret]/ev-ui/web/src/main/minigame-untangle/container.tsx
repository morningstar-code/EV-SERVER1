import React from 'react';
import { compose } from 'lib/redux';
import store from './store';
import { connect } from 'react-redux';
import AppWrapper from 'components/ui-app/ui-app';
import { nuiAction } from 'lib/nui-comms';
import MinigameUntangle from './components/minigame-untangle';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    introTimeout = void 0;
    timeout = void 0;

    onShow = (data: any = {}) => {
        this.props.updateState({
            show: true,
            ...data
        });

        clearTimeout(this.introTimeout);
        clearTimeout(this.timeout);

        this.props.updateState({
            show: true,
            ...data
        });

        this.introTimeout = setTimeout(() => {
            this.props.updateState({ introShown: true });

            this.timeout = setTimeout(() => {
                if (!this.props.gameFinished) {
                    this.props.updateState({
                        gameFinished: true,
                        gameWon: false
                    });

                    nuiAction(this.props.gameFinishedEndpoint, {
                        success: false,
                        parameters: this.props.parameters
                    });
                }
            }, data.gameTimeoutDuration || store.initialState.gameTimeoutDuration);
        }, 4000);;
    }

    onHide = () => {
        clearTimeout(this.introTimeout);
        clearTimeout(this.timeout);

        this.props.updateState({
            ...store.initialState
        });
    }

    gameCallback = (result: boolean) => {
        if (result) {
            clearTimeout(this.timeout);
            this.props.updateState({
                gameFinished: true,
                gameWon: true
            });

            nuiAction(this.props.gameFinishedEndpoint, {
                success: true,
                parameters: this.props.parameters
            });
        }
    }

    render() {
        return (
            <AppWrapper
                center
                store={store}
                name="minigame-untangle"
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.props.show && (
                    <MinigameUntangle {...this.props} gameCallback={this.gameCallback} />
                )}
            </AppWrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);