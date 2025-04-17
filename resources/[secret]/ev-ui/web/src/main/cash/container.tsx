import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import Cash from './components/cash';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    timeout = void 0;

    onEvent = (data: any) => {
        clearTimeout(this.timeout);
        const initialState = { ...store.initialState };

        ['amountAdjustment', 'bankAmount', 'bankName', 'cash'].forEach((key) => {
            initialState[key] = typeof data[key] === 'undefined' ? null : data[key];
        });

        typeof data.duration === 'number' && (initialState.duration = data.duration);

        this.props.updateState(initialState);

        this.timeout = setTimeout(() => {
            this.props.updateState(store.initialState);
        }, 1000 * initialState.duration);
    }

    render() {
        return (
            <AppWrapper
                name="cash"
                onEvent={this.onEvent}
            >
                <Cash {...this.props} />
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);