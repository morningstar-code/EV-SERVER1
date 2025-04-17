import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import Interactions from './components/interactions';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onEvent = (data: any) => {
        this.props.updateState({
            message: data.message || this.props.message,
            opts: data.opts || {},
            show: data.show,
            type: data.type || 'info'
        });
    }

    render() {
        return (
            <AppWrapper
                name="interactions"
                onEvent={this.onEvent}
                zIndex={0}
            >
                <Interactions {...this.props} />
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);