import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import { nuiAction } from 'lib/nui-comms';
import CaseOpening from './components/case-opening';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    state = {
        show: false,
        active: false,
        images: [],
        correctImageIndex: 0,
        finishUrl: null
    }

    onEvent = (data: any) => {
        this.props.updateState(data);
    }

    onShow = (data: any) => {
        this.setState({
            finishUrl: data.finishUrl ?? 'ev-ui:caseOpeningFinished',
            images: data.images,
            correctImageIndex: data.correctImageIndex,
            show: true,
            active: true
        });
    }

    onHide = () => {
        this.state.active || this.setState({
            show: false
        });
    }

    openingFinished = () => {
        this.setState({
            active: false
        });

        nuiAction(this.state.finishUrl ?? 'ev-ui:caseOpeningFinished');
    }

    render() {
        return (
            <AppWrapper
                name="case-opening"
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
                onEscape={this.onHide}
            >
                {this.state.show && (
                    <CaseOpening {...this.props} {...this.state} openingFinished={this.openingFinished} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);