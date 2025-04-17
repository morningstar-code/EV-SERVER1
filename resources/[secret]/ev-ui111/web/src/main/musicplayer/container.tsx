import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import MusicPlayer from "./components/music-player";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    scWidget = void 0;

    onEvent = (data: any) => {
        this.props.updateState(data);
    }

    onShow = (data = {} as any) => {
        this.props.updateState({
            show: true,
            ...data
        });
    }

    onHide = () => {
        this.props.updateState({ show: false });
    }

    iframeLoaded = () => {
        this.scWidget = (window as any).SC.Widget('soundcloud-musicplayer');
        this.scWidget.bind('ready', () => {
            this.scWidget.setVolume(this.props.volume);
            if (this.props.timeOffset) {
                this.scWidget.getDuration((duration: number) => {
                    this.props.timeOffset >= duration ? this.scWidget.pause() : this.scWidget.seekTo(this.props.timeOffset);
                });
            }
            this.scWidget.play();
        });
        this.scWidget.bind('finish', () => {
            this.scWidget.play();
        });
    }

    changeVolume = (volume: number) => {
        this.scWidget.setVolume(volume);
        this.props.updateState({ volume: volume });
    }

    minimize = () => {
        this.props.updateState({ minimized: !this.props.minimized });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="musicplayer"
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.props.show && (
                    <MusicPlayer
                        {...this.props}
                        {...this.state}
                        closeWindow={this.onHide}
                        changeVolume={this.changeVolume}
                        iframeLoaded={this.iframeLoaded}
                        minimize={this.minimize}
                    />
                )}
            </AppWrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);