import { Typography } from '@mui/material';
import React from 'react';

class ValueUpdater extends React.Component<any> {
    interval = void 0;

    state = {
        speed: 0
    }

    _onEvent = (eventData: any) => {
        if (
            eventData &&
            eventData.data &&
            eventData.data.source === 'ev-nui' &&
            eventData.data.app === 'hud.compass'
        ) {
            const speed = eventData.data.data[this.props.stateKey];
            speed !== this.state.speed && this.setState({ speed: speed });
        }
    }

    componentDidMount() {
        window.addEventListener('message', this._onEvent);

        this.interval = setInterval(() => {
            this.props.update(this.state.speed);
        }, 500);
    }

    componentWillUnmount() {
        window.removeEventListener('message', this._onEvent);
        clearInterval(this.interval);
    }

    render() {
        return (
            <Typography variant="body2" style={{ color: 'white' }}>
                {this.state.speed}
            </Typography>
        )
    }
}

export default ValueUpdater;