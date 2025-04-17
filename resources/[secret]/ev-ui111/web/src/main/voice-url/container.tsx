import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import { nuiAction } from 'lib/nui-comms';
import VoiceUrl from './components/voice-url';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onEvent = (data: any) => {
        this.props.updateState(data);
    }

    copy = () => {
        nuiAction(this.props.url);
        this.props.updateState({ copied: true });
    }

    render() {
        return (
            <AppWrapper
                name="voice-url"
                onEvent={this.onEvent}
            >
                {this.props.show && (
                    <VoiceUrl {...this.props} copy={this.copy} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);