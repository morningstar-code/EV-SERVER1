import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import Book from './components/book';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onEvent = (data: any) => {
        this.props.updateState(data);
    }

    onShow = (data: any) => {
        this.props.updateState({
            show: true,
            ...data
        });
    }

    onHide = () => {
        this.props.updateState({
            show: false
        });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="book"
                onError={this.onHide}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
                onEvent={this.onEvent}
                zIndex={101}
            >
                {this.props.show && (
                    <Book {...this.props} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);