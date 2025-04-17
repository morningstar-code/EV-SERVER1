import React from 'react';
import { compose } from 'lib/redux';
import store from './store';
import { connect } from 'react-redux';
import AppWrapper from 'components/ui-app/ui-app';
import { nuiAction } from 'lib/nui-comms';
import { Tooltip, Typography } from '@mui/material';
import "./radio.scss";

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            preferences: state.preferences,
            radioChannel: state.game.radioChannel
        }
    }
});

class Container extends React.Component<any> {
    closeApp = null;

    state = {
        bottom: -1000,
        data: {},
        powered: 'off',
        value: this.props.radioChannel
    }

    onEvent = (data: any, extra?: any) => {
        //console.log("[RADIO] onEvent", data, extra);
        if (!extra) {
            //console.log("No extra, update states");
            this.props.updateState({ powered: data?.state });
            this.setState({
                powered: data?.state,
                value: data?.value
            });
        }
    }

    onShow = (data: any) => {
        //console.log("[RADIO] onShow", data);
        //console.log("[RADIO] state", this.state);

        this.setState({
            data: data,
            bottom: -4
        });
    }

    onHide = () => {
        if (this.state.bottom > -100) {
            if (isNaN(+this.state.value) || +this.props.radioChannel === +this.state.value) {
                this.setRadioChannel(this.state.value);
                this.setState({  bottom: -1000 });
            }
        }
    }
    
    changeValue = (e: any) => {
        const value = e.target.value;
        const valueNumber = Number(value);

        isNaN(valueNumber) || valueNumber < 0 || valueNumber >= 1000 || value.length > 5 || this.setState({ value: value });
    }

    keyUpHandler = (e: any) => {
        if (e.key === 'Enter' && this.state.value) {
            this.setRadioChannel(this.state.value);
        }
    }

    setRadioChannel = async (value: number) => {
        const results = await nuiAction('ev-ui:setRadioChannel', {
            channel: Number(value)
        }, { returnData: true });

        if (results?.data) {
            this.setState({
                bottom: -1000
            });
            this.closeApp();
            nuiAction('ev-ui:closeApp');
        }

        return this.setState({
            value: this.props.radioChannel
        });
    }

    toggleRadioState = () => {
        nuiAction(`ev-ui:toggleRadio${this.state.powered === 'off' ? 'On' : 'Off'}`);
    }

    radioVolumeDown = () => {
        nuiAction('ev-ui:radioVolumeDown');
    }

    radioVolumeUp = () => {
        nuiAction('ev-ui:radioVolumeUp');
    }

    onClose = (data: any) => {
        this.closeApp = data;
    }

    render() {
        return (
            <AppWrapper
                name="radio"
                onClose={this.onClose}
                onEscape={this.onHide}
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                <div className="radio-container">
                    <div className="radio-image-container" style={{ bottom: this.state.bottom }}>
                        <img
                            src="https://gta-assets.subliminalrp.net/images/radio.png"
                            alt="radio"
                        />
                        <div className="text-wrapper">
                            <div className="text-input-wrapper">
                                <input
                                    onChange={this.state.powered === 'off' ? () => { } : this.changeValue}
                                    onKeyUp={this.state.powered === 'off' ? () => { } : this.keyUpHandler}
                                    placeholder="100.0+"
                                    value={this.state.powered === 'off' ? 'Off' : this.state.value}
                                />
                            </div>
                        </div>
                        <Tooltip title={`Switch ${this.state.powered === 'off' ? 'On' : 'Off'}`} placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div className="on-off-wrapper" onClick={this.toggleRadioState} />
                        </Tooltip>
                        <Tooltip title="Volume Up" placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div className="vol-up-wrapper" onClick={this.radioVolumeUp} />
                        </Tooltip>
                        <Tooltip title="Volume Down" placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div className="vol-down-wrapper" onClick={this.radioVolumeDown} />
                        </Tooltip>
                        <div className="radio-tag">
                            <Typography variant="body2" style={{ color: 'white' }}>
                                EV Radio
                            </Typography>
                        </div>
                        <div className="other-tag" />
                    </div>
                </div>
            </AppWrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);