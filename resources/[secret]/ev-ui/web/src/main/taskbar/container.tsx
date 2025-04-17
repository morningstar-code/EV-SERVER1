import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import Taskbar from './components/taskbar';

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            preferences: state.preferences
        }
    }
});

class Container extends React.Component<any> {
    timeout = void 0;
    
    onEvent = (data: any) => {
        this.props.updateState(data);

        if (data.display === true) {
            this.timeout = setTimeout(() => {
                this.props.updateState(store.initialState);
            }, data.duration - 32);
        } else {
            clearTimeout(this.timeout);
            this.props.updateState(store.initialState);
        }
    }

    render() {
        return (
            <AppWrapper
                store={store}
                name="taskbar"
                onEvent={this.onEvent}
            >
                {this.props.display && (
                    <Taskbar {...this.props} />  
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);