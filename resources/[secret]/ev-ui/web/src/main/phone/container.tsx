import React from "react";
import Phone from ".";
import AppWrapper from "components/ui-app/ui-app";
import { GetPhoneAppConfig, InitEvents } from "lib/config/phone/appConfig";
import { compose, storeObj } from "lib/redux";
import { closePhoneModal } from "./actions";
import store from "./store";
import { isDevel } from "lib/env";
import { connect } from "react-redux";
import "./phone.scss";
import { isEnvBrowser } from "utils/misc";
import { DoPhoneNotification } from "./components/notifications/events";

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            ...state,
            bottomBar: state["phone.bottom-bar"]
        }
    },
    mapDispatchToProps: {
        registerStates: (state: any, extra = {} as any) => {
            return {
                ...state,
                ...extra,
                initialized: true
            }
        }
    }
});

const phoneAppEvents = InitEvents();

class Container extends React.Component<any> {
    config = GetPhoneAppConfig();
    hideTimeout = void 0;

    state = {
        show: true
    }

    displayStatus = (status: string, data = {} as any) => {
        this.props.updateState({
            status: status,
            activeApp: 'home-screen',
            hasEmergencyJob: !!data?.hasEmergencyJob,
            hasVpn: !!data?.has_vpn,
            hasUsbFleeca: !!data?.has_usb_fleeca,
            hasUsbPaleto: !!data?.has_usb_paleto,
            hasUsbUpper: !!data?.has_usb_upper,
            hasUsbLower: !!data?.has_usb_lower,
            hasUsbRacing: !!data?.has_usb_racing,
            hasUsbPDRacing: !!data?.has_usb_pd_racing,
            racingAlias: data?.racing_alias ?? '',
            hasUsbRacingCreate: !!data?.has_usb_racing_create,
            identifiers: data?.identifiers ?? [],
            orientation: 'portrait',
            orientationForced: false
        });

        if (status === 'hide') {
            this.hideTimeout = setTimeout(() => {
                this.props.updateState({
                    activeApp: 'home-screen',
                    hasVpn: !!data?.has_vpn
                });
                closePhoneModal(false);
            }, 800);
        } else {
            closePhoneModal(false);
            clearTimeout(this.hideTimeout);
        }
    }

    _init = async (data = {} as any) => {
        const inited = [];

        for (let i = 0; i < this.config.length; i++) {
            const app = this.config[i];

            if (app.init) {
                inited.push(app.init());
            }
        }

        //TODO;

        this.props.updateState({ //this.props.registerStates
            ...data,
            activeApp: this.props.devOverride ? this.props.activeApp : 'home-screen',
            initialized: true
        });
    }

    onShow = (data = {} as any) => {
        this.displayStatus('show', data);
        this._init();
    }

    onHide = () => {
        this.displayStatus('hide');
    }

    onError = () => {
        this._init({ show: false });
    }

    onEvent = (data: any) => {
        const action = data.action;

        if (phoneAppEvents[action] && phoneAppEvents[action].length !== 0) {
            const events = phoneAppEvents[action];

            events.forEach((event: any) => {
                return (function (callback: ({ data, state }) => void) {
                    const state = storeObj.getState();

                    callback({
                        data: data,
                        state: state
                    });
                })(event);
            });
        }
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.character.id && this.props.character.id !== prevProps.character.id) {
            this._init();
        }
        //this.props.character.id && this.props.character.id !== prevProps.character.id && this._init();
    }

    render() {
        return this.props.initialized && this.props.character.id ? (
            <AppWrapper
            center={isDevel()}
            name="phone"
            onError={this.onHide}
            onEscape={this.onHide}
            onHide={this.onHide}
            onShow={this.onShow}
            onEvent={this.onEvent}
            store={store}
            closeOnError={true}
        >
            <Phone {...this.props} config={this.config} />
        </AppWrapper>
        ) : null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);