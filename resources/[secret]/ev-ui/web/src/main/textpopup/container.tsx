import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import Textpopup from './components/textpopup';

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

    copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.innerHTML = this.props.text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        el.remove();
    }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="textpopup"
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
                onEscape={this.onHide}
            >
                {this.props.show && (
                    <Textpopup text={this.props.text} copyToClipboard={this.copyToClipboard} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);