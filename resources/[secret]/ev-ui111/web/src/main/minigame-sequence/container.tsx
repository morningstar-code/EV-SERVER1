import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import MinigameSequence from './components/minigame-sequence';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onShow = (data = {} as any) => {
        this.props.updateState({
            show: true,
            tempShow: data.tempShow ?? this.props.tempShow,
            upsideDown: data.upsideDown ?? this.props.upsideDown,
            shiftInterval: data.shiftInterval ?? this.props.shiftInterval,
            timeToComplete: data.timeToComplete ?? this.props.timeToComplete,
            gameCompletedEvent: data.gameCompletedEvent ?? this.props.gameCompletedEvent,
            type: data.type ?? this.props.type,
            parameters: data.parameters ?? this.props.parameters
        });
    }

    onHide = () => { }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="minigame-sequence"
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.props.show && (
                    <MinigameSequence {...this.props} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);