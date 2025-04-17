import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import Card from './components/card';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onShow = (data: any) => {
        this.props.updateState({
            showCard: true,
            cardNumber: data.cardNumber ?? void 0,
            inviteCode: data.inviteCode ?? void 0
        });
    }

    onHide = () => {
        this.props.updateState({
            showCard: false
        });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                name="halloween"
                onError={this.onHide}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.props.showCard && (
                    <Card cardNumber={this.props.cardNumber} inviteCode={this.props.inviteCode} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);