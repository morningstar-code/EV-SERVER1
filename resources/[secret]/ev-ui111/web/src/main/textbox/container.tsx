import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import Textbox from './components/textbox';
import { nuiAction } from 'lib/nui-comms';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onEvent = (data: any) => {
        if (data.show) {
            this.props.updateState(data);
        } else {
            this.props.updateState(store.initialState);
        }
    }

    onHide = () => {
        this.props.updateState(store.initialState);
    }

    submitValues = (values: any) => {
        nuiAction(this.props.callbackUrl, {
            values: values,
            inputKey: this.props.inputKey,
            hiddenItems: this.props.hiddenItems
        });
    }

    onShow = (data: any) => {
        this.props.updateState({
            show: true,
            ...data
        });
    }

    onEscapeData = () => {
        return {
            callbackUrl: this.props.callbackUrl,
            inputKey: this.props.inputKey
        }
    }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="textbox"
                onEscape={this.onHide}
                onEscapeData={this.onEscapeData}
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.props.show && (
                    <Textbox {...this.props} submitValues={this.submitValues} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);