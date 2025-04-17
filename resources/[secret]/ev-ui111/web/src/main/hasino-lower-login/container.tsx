import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import HasinoLowerLogin from './components/hasino-lower-login';
import { nuiAction } from 'lib/nui-comms';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onShow = (eventData?: any) => {
        const data = eventData ?? { timeRemaining: 0 };

        this.props.updateState({
            show: true,
            response: '',
            ...data
        });

        data.timeRemaining > 0 && this.startTimer(data.timeRemaining / 1000);
    }

    onHide = () => {
        this.props.updateState({ show: false });

        this.props.timer && clearInterval(this.props.timer);
    }

    startTimer = (timeRemaining: number) => {
        this.props.updateState({ secondsRemaining: timeRemaining });

        const interval = setInterval(this.countdown, 1000);

        this.props.updateState({ timer: interval });
    }

    componentWillUnmount() {
        clearInterval(this.props.timer);
    }

    countdown = () => {
        let secondsRemaining = this.props.secondsRemaining;
        let seconds = Math.floor(secondsRemaining % 60).toString();
        let minutes = Math.round((secondsRemaining - Number(seconds)) / 60).toString();

        minutes = Number(minutes) < 10 ? '0' + minutes : minutes;
        seconds = Number(seconds) < 10 ? '0' + seconds : seconds;

        const secRemaining = --secondsRemaining;

        this.props.updateState({
            timerText: `${minutes}:${seconds}`,
            secondsRemaining: secRemaining
        });

        if (secRemaining <= 0) {
            clearInterval(this.props.timer);
            this.onHide();
        }
    }

    submitPassword = async (password: string) => {
        const results = await nuiAction('ev-hasino:attemptLowerLogin', {
            password: password
        }, { returnData: { data: 'Incorrect Password' } });

        if (results.data.attempts === 4) {
            this.startTimer(results.data.timeRemaining / 1000);
        }

        clearTimeout(this.props.responseTimeout);

        const success = results.data.text === 'Vault Access Granted';

        let responseTimeout: any = null;

        success ? setTimeout(this.onHide, 4000) : responseTimeout = setTimeout(() => {
            this.props.updateState({ response: '' });
        }, 4000);

        this.props.updateState({
            response: results.data.text,
            timeRemaining: results.data.timeRemaining,
            attempts: results.data.attempts,
            success: success,
            responseTimeout: responseTimeout !== null ? responseTimeout : -1
        });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                name="hasino-lower-login"
                onShow={this.onShow}
                onEscape={this.onHide}
            >
                {this.props.show && (
                    <HasinoLowerLogin {...this.props} onHide={this.onHide} submitPassword={this.submitPassword} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);