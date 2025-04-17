import { compose } from 'lib/redux';
import React from 'react';
import { connect } from 'react-redux';
import Modal from './components/modal';
import store from './store';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    componentDidUpdate(prevProps: Readonly<any>) {
        if (!prevProps.slowHide && this.props.slowHide) {
            setTimeout(() => {
                this.props.updateState({
                    show: false,
                    slowHide: false
                });
            }, 1500);
        }
    }

    render() {
        return (
            <>
                {this.props.show || this.props.slowHide ? (
                    <Modal {...this.props} />
                ) : null}
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);