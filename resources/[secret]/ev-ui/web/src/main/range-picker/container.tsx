import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import RangePicker from './components/range-picker';
import { nuiAction } from 'lib/nui-comms';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onEvent = (data: any) => {
        this.props.updateState(data);
    }

    onShow = (data?: any) => {
        this.props.updateState({
            submitUrl: data.submitUrl ?? 'ev-ui:submitRangeValues',
            show: true,
            sliders: data.sliders ?? 3
        });
    }

    onHide = () => {
        this.props.updateState({ show: false });
    }

    submitValues = (values: any) => {
        nuiAction(this.props.submitUrl ?? 'ev-ui:submitRangeValues', {
            ranges: values
        });
    }

    render() {
        return (
            <AppWrapper
                name="range-picker"
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
                onEscape={this.onHide}
            >
                {this.props.show && (
                    <RangePicker {...this.props} submitValues={this.submitValues} />  
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);