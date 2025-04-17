import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import StatusHud from './components/status-hud';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onEvent = (data: any) => {
        this.props.updateState(data);
    }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="status-hud"
                onEvent={this.onEvent}
            >
                {this.props.show && (
                    <StatusHud {...this.props} />  
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);