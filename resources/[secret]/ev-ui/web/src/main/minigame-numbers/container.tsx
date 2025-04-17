import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import MinigameNumbers from './components/minigame-numbers';
import { nuiAction } from 'lib/nui-comms';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    introTimeout = void 0;
    passwordTimeout = void 0;
    timeout = void 0;

    onShow = (data = {} as any) => {
        this.props.updateState({
            show: true,
            ...data
        });

        const password = [];

        for (let i = 0; i < (data.numberOfDigits || this.props.numberOfDigits); i += 1) {
            const digit = Math.floor(Math.random() * 10 + 0);
            
            password.push(digit);
        }

        const requiredPassword = password.join('');

        this.props.updateState({ requiredPassword: requiredPassword });

        this.introTimeout = setTimeout(() => {
            this.props.updateState({ introShown: true });
        }, 2000);

        this.passwordTimeout = setTimeout(() => {
            this.props.updateState({ passwordShown: true });
        }, 6000);

        this.timeout = setTimeout(() => {
            this.props.updateState({ gameFinished: true, gameWon: false });
        }, data.gameTimeoutDuration || store.initialState.gameTimeoutDuration);
    }

    onHide = () => {
        clearTimeout(this.introTimeout);
        clearTimeout(this.passwordTimeout);
        clearTimeout(this.timeout);

        this.props.updateState(store.initialState);
    }

    submitPassword = (password: string) => {
        clearTimeout(this.introTimeout);
        clearTimeout(this.passwordTimeout);
        clearTimeout(this.timeout);

        const success = password === this.props.requiredPassword;

        this.props.updateState({ gameFinished: true, gameWon: success });

        nuiAction(this.props.gameFinishedEndpoint, {
            success: success
        });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="minigame-numbers"
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.props.show && (
                    <MinigameNumbers {...this.props} {...this.state} submitPassword={this.submitPassword} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);