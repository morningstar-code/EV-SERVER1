import React from 'react';
import { compose } from 'lib/redux';
import store from './store';
import { connect } from 'react-redux';
import AppWrapper from 'components/ui-app/ui-app';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onEvent = (data: any) => {
        if (data) {
            if (data.vehicle && data.vehicle === -1) {
                this.props.updateState({
                    vehicle: null
                });
            }

            this.props.updateState(data);
        }
    }

    disableDebugEvent = (data: any) => {
        return !!data.time
    }

    render() {
        return (
            <AppWrapper
                store={store}
                name="game"
                onEvent={this.onEvent}
                disableDebugEvent={this.disableDebugEvent}
            >

            </AppWrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);