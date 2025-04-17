import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';

class Container extends React.Component<any> {
    availableSounds = {};
    soundCache = {};
    listener = void 0;

    onEvent = (data: any) => {
        const action = data.action;
        const id = data.id;
        const name = data.name;

        switch (action) {
            case 'play': {
                if (this.soundCache[id]) {
                    this.soundCache[id].pause();
                    delete this.soundCache[id];
                }

                const audio = new Audio(this.availableSounds[name]);
                audio.autoplay = true;
                audio.controls = false;
                audio.volume = data.volume;
                audio.loop = data.loop;
                audio.play();

                this.soundCache[id] = audio;
            }
                break;
            case 'stop': {
                if (this.soundCache[id]) {
                    this.soundCache[id].pause();
                    delete this.soundCache[id];
                }
            }
                break;
            case 'volume': {
                this.soundCache[id].volume = data.volume;
            }
        }
    }

    render() {
        return (
            <AppWrapper
                name="sounds"
                onEvent={this.onEvent}
            />
        )
    }
}

export default Container;