import React from 'react';
import store from './store';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import { nuiAction } from 'lib/nui-comms';
import AppWrapper from 'components/ui-app/ui-app';
import CinemaControl from './components/cinema-control';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onEvent = (data: any) => {
        this.props.updateState(data);
    }

    changeVolume = (volume: number) => {
        this.props.updateState({ volume: volume });
        nuiAction('ev-cinema:changeVolume', { volume: volume });
    }

    play = () => {
        this.props.updateState({ paused: false });
        nuiAction('ev-cinema:play');
    }

    pause = () => {
        this.props.updateState({ paused: true });
        nuiAction('ev-cinema:pause');
    }

    next = () => {
        nuiAction('ev-cinema:next');
    }

    advance = (seconds: number) => {
        nuiAction('ev-cinema:advance', { seconds: seconds });
    }

    seek = () => {
        nuiAction('ev-cinema:seek');
    }

    add = () => {
        nuiAction('ev-cinema:add');
    }

    map = () => {
        nuiAction('ev-cinema:map');
    }

    viewPlaylist = async () => {
        if (!this.props.showPlaylist) {
            const results = await nuiAction('ev-cinema:viewPlaylist', {});

            return this.props.updateState({
                playlist: results.data?.playlist ?? [],
                currentVideo: results.data?.currentVideo,
                showPlaylist: true
            });
        }

        return this.props.updateState({ showPlaylist: false, playlist: null });
    }

    playVideo = (video: any) => {
        nuiAction('ev-cinema:playVideo', { video: video });
    }

    removeVideo = (video: any) => {
        nuiAction('ev-cinema:removeVideo', { video: video });
    }

    camera = () => {
        nuiAction('ev-cinema:camera');
    }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="cinema-control"
                onEvent={this.onEvent}
            >
                {this.props.show && (
                    <CinemaControl
                        {...this.props}
                        {...this.state}
                        changeVolume={this.changeVolume}
                        play={this.play}
                        pause={this.pause}
                        next={this.next}
                        advance={this.advance}
                        seek={this.seek}
                        add={this.add}
                        viewPlaylist={this.viewPlaylist}
                        playVideo={this.playVideo}
                        removeVideo={this.removeVideo}
                        camera={this.camera}
                        map={this.map}
                    />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);