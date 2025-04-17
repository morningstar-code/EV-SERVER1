import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import YachtEnvelope from './components/yacht-envelope';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onShow = (data: any) => {
        this.props.updateState({
            show: true,
            opened: false,
            gameFailed: false,
            ...data
        });
    }

    onHide = () => {
        this.props.updateState({
            show: false
        });
    }

    openEnvelope = async () => {

    }

    render() {
        return (
            <AppWrapper
                center={true}
                name="yacht-envelope"
                onShow={this.onShow}
                onEscape={this.onHide}
                onHide={this.onHide}
            >
                {this.props.show && (
                    <YachtEnvelope {...this.props} openEnvelope={this.openEnvelope} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);