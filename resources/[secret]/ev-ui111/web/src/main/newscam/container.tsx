import React from 'react';
import { compose } from 'lib/redux';
import store from './store';
import { connect } from 'react-redux';
import AppWrapper from 'components/ui-app/ui-app';
import RecordingOverlay from './components/recording-overlay';
import NewsCam from './components/news-cam';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onEvent = (data: any) => {
        this.props.updateState(data);
    }

    onShow = (data = {} as any) => {
        this.props.updateState({
            show: true,
            ...data
        });
    }

    onHide = () => {
        this.props.updateState({ show: false });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="newscam"
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.props.show && (
                    <NewsCam overlayText={this.props.text} />
                )}
                {this.props.recording && (
                    <RecordingOverlay />
                )}
            </AppWrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);