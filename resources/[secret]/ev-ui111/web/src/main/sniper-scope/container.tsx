import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import SniperScope from './components/sniper-scope';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    state = {
        show: false
    }

    onEvent = (data: any) => {
        this.setState({ show: data.show });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                closeOnError={true}
                store={store}
                name="sniper-scope"
                onEvent={this.onEvent}
                >
                    <SniperScope show={this.state.show} />
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);