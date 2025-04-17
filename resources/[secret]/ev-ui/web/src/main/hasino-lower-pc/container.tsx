import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import HasinoLowerPc from './components/hasino-lower-pc';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
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
                name="hasino-lower-pc"
                onShow={this.onShow}
                onEscape={this.onHide}
            >
                {this.props.show && (
                    <HasinoLowerPc {...this.props} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);