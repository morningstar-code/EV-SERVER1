import React from 'react';
import { compose } from 'lib/redux';
import store from './store';
import { connect } from 'react-redux';
import AppWrapper from 'components/ui-app/ui-app';
import { nuiAction } from 'lib/nui-comms';
import Poker from './components/poker';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    state = {
        loading: false,
        returnMessage: '',
    }

    onEvent = (data: any) => {
        this.props.updateState(data);
    }

    doAction = async (action: string, amount?: number) => {
        this.setState({
            loading: true,
            returnMessage: ''
        });

        const results = await nuiAction('ev-ui:casinoPokerAction', {
            action: action,
            amount: amount
        });

        this.setState({
            loading: false,
            returnMessage: results.data.message && results.data.message !== true ? results.data.message : 'fin'
        });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="poker"
                onEvent={this.onEvent}
            >
                {this.props.show && (
                    <Poker {...this.props} {...this.state} doAction={this.doAction} />
                )}
            </AppWrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);