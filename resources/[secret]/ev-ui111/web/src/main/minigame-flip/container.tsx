import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import store from "./store";
import { nuiAction } from "lib/nui-comms";
import Flip from "./components/flip";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    introTimeout = void 0;
    timeout = void 0;

    onShow = (data = {} as any) => {
        clearTimeout(this.introTimeout);
        clearTimeout(this.timeout);

        this.props.updateState({
            ...store.initialState
        });

        this.props.updateState({
            ...data,
            show: true
        });

        this.introTimeout = setTimeout(() => {
            this.props.updateState({ introShown: true });

            this.timeout = setTimeout(() => {
                if (!this.props.gameFinished) {
                    // this.props.updateState({
                    //     gameFinished: true,
                    //     gameWon: false
                    // });
                    // nuiAction(this.props.gameFinishedEndpoint, {
                    //     success: false,
                    //     parameters: this.props.parameters
                    // });
                }
            }, data?.gameTimeoutDuration || store.initialState.gameTimeoutDuration);
        }, 4000);
    }


    onHide = () => {
        clearTimeout(this.introTimeout);
        clearTimeout(this.timeout);

        this.props.updateState({
            ...store.initialState
        });
    }

    gameCallback = (result: boolean) => {
        clearTimeout(this.timeout);

        this.props.updateState({
            gameFinished: true,
            gameWon: result
        });

        nuiAction(this.props.gameFinishedEndpoint, {
            success: result,
            parameters: this.props.parameters
        });
    }

    render() {
        return (
            <AppWrapper
                center
                store={store}
                name="minigame-flip"
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.props.show && (
                    <Flip {...this.props} gameCallback={this.gameCallback} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);