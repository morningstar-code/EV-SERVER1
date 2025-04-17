import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import Bugs from './components/bugs';
import { nuiAction } from 'lib/nui-comms';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    state = {
        show: false
    }

    onShow = () => {
        this.setState({ show: true });
    }

    onHide = () => {
        this.setState({ show: false });
    }

    submitBug = async (pScuffOptions: { type: string, title: string, description: string, urls: string }) => {
        await nuiAction('ev-ui:bugAction', pScuffOptions);
        setTimeout(() => {
            nuiAction('ev-ui:closeApp');
            this.setState({ show: false });
        }, 4000);
    }

    render() {
        return (
            <AppWrapper
                center={true}
                closeOnError={true}
                store={store}
                name="bugs"
                onError={this.onHide}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.state.show && (
                    <Bugs submitBug={this.submitBug} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);