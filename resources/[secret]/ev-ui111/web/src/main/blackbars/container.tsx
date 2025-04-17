import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            preferences: state.preferences
        }
    }
});

class Container extends React.Component<any> {
    render() {
        return (
            <AppWrapper
                name="blackbars"
                zIndex={1000000}
            >
                {this.props.preferences['hud.blackbars.enabled'] && (
                    <div style={{
                        display: 'flex',
                        width: '100vw',
                        height: '100vh',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        flexDirection: 'column'
                    }}>
                        <div style={{ backgroundColor: 'black', height: `${Math.min(25, Number(this.props.preferences['hud.blackbars.size']))}vh`, width: '100vw' }}></div>
                        <div style={{ flex: 1, width: '100vw', height: '100%' }}></div>
                        <div style={{ backgroundColor: 'black', height: `${Math.min(25, Number(this.props.preferences['hud.blackbars.size']))}vh`, width: '100vw' }}></div>
                    </div>
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);