import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import ShowImage from './components/show-image';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    displayTimeout: any = 0;

    onShow = (data: any) => {
        const url = data.url;

        if (this.displayTimeout) {
            clearTimeout(this.displayTimeout);
            this.displayTimeout = void 0;
        }

        this.displayTimeout = setTimeout(() => {
            this.props.updateState({
                showImage: false
            });
        }, 5000);

        this.props.updateState({
            showImage: true,
            url: url
        });
    }

    onHide = () => {
        this.props.updateState({
            showImage: false,
            url: ''
        });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                name="show-image"
                onError={this.onHide}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                <ShowImage {...this.props} />
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);