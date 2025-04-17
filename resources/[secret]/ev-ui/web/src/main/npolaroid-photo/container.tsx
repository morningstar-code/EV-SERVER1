import AppWrapper from "components/ui-app/ui-app";
import { compose } from "lib/redux";
import React, { useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux"
import { updatePhotoState } from "./actions";
import Photo from "./components/photo";
import store from "./store";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    displayTimeout = void 0;

    onShow = (data: any) => {
        if (this.displayTimeout) {
            clearTimeout(this.displayTimeout);
            this.displayTimeout = void 0;
        }

        this.displayTimeout = setTimeout(() => {
            this.props.updateState({ showPhoto: false });
        }, 5000);

        this.props.updateState({
            showPhoto: true,
            photo: data
        });
    }

    onHide = () => {
        this.props.updateState({
            showPhoto: false,
            photo: {}
        })
    }

    render() {
        return (
            <AppWrapper
                center={true}
                name="npolaroid-photo"
                onError={this.onHide}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
                zIndex={1000}
            >
                <div style={{ paddingLeft: '2rem', width: '100%' }}>
                    {this.props.showPhoto && (
                        <Photo
                            uuid={this.props.photo.uuid}
                            data={{
                                ...this.props.photo,
                                options: {}
                            }}
                        />
                    )}
                </div>
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);