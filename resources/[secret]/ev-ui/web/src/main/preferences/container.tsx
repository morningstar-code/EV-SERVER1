import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import store from "./store";
import { compose, storeObj } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from 'lib/nui-comms';
import GeneralManager from 'components/general-manager';
import HudTab from './components/tabs/hud';
import PhoneTab from './components/tabs/phone';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any, { activeId: number, show: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            activeId: 0,
            show: false
        }
    }

    onEvent = (data: any, bool?: boolean) => {
        if (!bool) {
            return data.changeHud ? {} : this.props.updateState(data);
        }
    }

    onHide = () => {
        this.setState({ show: false });
    }

    onShow = () => {
        this.setState({ show: true });
    }

    saveSettings = () => {
        const preferences = storeObj.getState()[store.key];

        nuiAction('ev-ui:setKVPValue', {
            key: 'ev-preferences',
            value: preferences
        });

        nuiAction('ev-ui:hudSetPreferences', preferences);
    }

    saveRadioSettings = () => {
        const preferences = storeObj.getState()[store.key];

        nuiAction('ev-ui:setKVPValue', {
            key: 'ev-preferences',
            value: preferences
        });

        nuiAction('ev-ui:hudUpdateRadioSettings', {
            settings: {
                stereoAudio: preferences['radio.stereo.enabled'],
                localClickOn: preferences['radio.clicks.outgoing.enabled'],
                localClickOff: preferences['radio.clicks.outgoing.enabled'],
                remoteClickOn: preferences['radio.clicks.incoming.enabled'],
                remoteClickOff: preferences['radio.clicks.incoming.enabled'],
                clickVolume: preferences['radio.clicks.volume'],
                radioVolume: preferences['radio.volume'],
                phoneVolume: preferences['phone.volume'],
                radioBalance: preferences['radio.balance'],
                phoneBalance: preferences['phone.balance'],
                releaseDelay: 200
            }
        });
    }

    saveKeybindSettings = () => {
        const preferences = storeObj.getState()[store.key];

        nuiAction('ev-ui:setKVPValue', {
            key: 'ev-preferences',
            value: preferences
        });

        nuiAction('ev-ui:hudUpdateKeybindSettings', {
            controls: preferences.keybinds
        });
    }

    handleMount = async () => {
        const preferences = await nuiAction('ev-ui:getKVPValue', { key: 'ev-preferences' }, {
            returnData: {
                value: {}
            }
        });
        let data = preferences?.data?.value;

        if (!data || data && !data['hud.presetSelected']) {
            data = store.initialState;
        }

        this.props.updateState(data);

        nuiAction('ev-ui:hudSetPreferences', data);
    }

    async componentDidMount() {
        this.handleMount();
    }

    render() {
        return (
            <AppWrapper
                center
                name="preferences"
                onEscape={this.onHide}
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.state.show && (
                    <GeneralManager
                        activeItem={this.state.activeId}
                        items={[
                            {
                                id: 1,
                                label: 'HUD'
                            },
                            {
                                id: 2,
                                label: 'Phone'
                            }
                        ]}
                        onMenuItemClick={(item) => this.setState({ activeId: item.id })}
                    >
                        {this.state.activeId === -1 && (
                            <div></div>
                        )}
                        {this.state.activeId === 1 && (
                            <HudTab {...this.props} saveSettings={this.saveSettings} />
                        )}
                        {this.state.activeId === 2 && (
                            <PhoneTab {...this.props} saveSettings={this.saveSettings} />
                        )}
                    </GeneralManager>
                )}
            </AppWrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);