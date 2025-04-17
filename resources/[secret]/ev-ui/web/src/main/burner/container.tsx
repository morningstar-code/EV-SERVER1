import React from 'react';
import { compose, storeObj } from 'lib/redux';
import store from './store';
import { GetBurnerAppConfig, InitEvents } from 'lib/config/burner/appConfig';
import { connect } from 'react-redux';
import { closeBurnerModal } from './actions';
import AppWrapper from 'components/ui-app/ui-app';
import { isDevel } from 'lib/env';
import Burner from '.';

const { mapStateToProps, mapDispatchToProps } = compose(store, {
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

const burnerAppEvents = InitEvents();

class Container extends React.Component<any> {
    config = GetBurnerAppConfig();
    hideTimeout = void 0;

    state = {
        show: true
    }

    displayStatus = (status: string, data = {} as any) => {
        this.props.updateState({
            status: status,
            isOwner: !!data?.isOwner,
            activeApp: 'home-screen',
            hasVpn: !!data?.has_vpn,
            orientation: 'portrait',
            orientationForced: false
        });

        if (status === 'hide') {
            this.hideTimeout = setTimeout(() => {
                this.props.updateState({
                    activeApp: 'home-screen',
                    hasVpn: !!data?.has_vpn
                });
                closeBurnerModal(false);
            }, 800);
        } else {
            closeBurnerModal(false);
            clearTimeout(this.hideTimeout);
        }
    }

    _init = async (data = {} as any) => {
        const inited = [];
        let idx = 0;

        if (!(idx < this.config.length)) {
            const results = await Promise.all(inited);
            const cfgObject = {};

            results.forEach((c: any) => {
                cfgObject[c.key] = c.data;
            });

            this.props.registerStates({
                ...cfgObject,
                ...data,
                activeApp: this.props.devOverride ? this.props.activeApp : 'home-screen'
            });
        }

        const cfg = this.config[idx].init;
        
        if (cfg) {
            inited.push(cfg);
        }

        idx++;
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

        if (burnerAppEvents[action] && burnerAppEvents[action].length !== 0) {
            const events = burnerAppEvents[action];

            events.forEach((event: any) => {
                return (function (callback: any) {
                    const state = storeObj.getState();

                    callback({
                        data: data,
                        state: state
                    })
                })(event);
            });
        }
    }

    render() {
        return (
            <AppWrapper
                closeOnError={true}
                store={store}
                center={isDevel()}
                name="burner"
                onError={this.onError}
                onEscape={this.onHide}
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                <Burner {...this.props} config={this.config} />
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);