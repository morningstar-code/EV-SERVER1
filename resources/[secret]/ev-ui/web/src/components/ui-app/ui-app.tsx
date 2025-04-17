import React from "react";
import { handleEventDebugLog } from "lib/nui-comms";
import { nuiAction } from "lib/nui-comms";
import App from "./app";
import { storeObj } from "lib/redux";
import { updateSnackbarState } from "main/snackbar/actions";

interface AppWrapperProps {
    name: string;
    center?: boolean;
    store?: any;
    disableDebugEvent?: Function;
    onShow?: any;
    onHide?: any;
    onEscape?: any;
    onClose?: any;
    onEvent?: any;
    onError?: any;
    onEscapeData?: Function;
    closeOnError?: boolean;
    zIndex?: number;
    style?: any;
}

const nuiLog = [];

class AppWrapper extends React.Component<AppWrapperProps, { error: boolean, hasError: boolean }> {
    timeout: any = 0;
    hasFocus = false;
    _timer = Date.now() / 1000;
    escapes = [];
    events = {};
    mounted = false;
    source: 'ev-nui'; //=

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            hasError: false
        }
    }

    _onEscape = () => {
        if (typeof this.props.onEscape === 'function') {
            this.props.onEscape();
        }
        this.unfocus();
    }

    _onEvent = (eventData: any) => {
        let onEventData = eventData.data.data || {};

        //console.log('ui-app _onEvent onEventData', onEventData);

        if (typeof this.props.disableDebugEvent === 'function') {
            this.props.disableDebugEvent(onEventData);
        } else {
            handleEventDebugLog(eventData.data);
        }
        if (
            !eventData.data.show || typeof this.props.onShow !== 'function') {
            if (eventData.data.show !== false || typeof this.props.onHide !== 'function') {
                if (typeof this.props.onEvent === 'function') {
                    eventData.data._withFocus ? (this.hasFocus = true)
                        : this.hasFocus && eventData.data._withFocus === false &&
                        (this.hasFocus = false);

                    this.props.onEvent(
                        onEventData,
                        !!eventData.data.show
                    );
                }
                return;
            }

            if (typeof this.props.onEvent === 'function') {
                eventData.data._withFocus ? (this.hasFocus = true)
                    : this.hasFocus && eventData.data._withFocus === false &&
                    (this.hasFocus = false);

                this.props.onEvent(
                    onEventData,
                    !!eventData.data.show
                );
            }

            this.props.onHide(onEventData);

            return;
        }

        if (typeof this.props.onEvent === 'function') {
            eventData.data._withFocus ? (this.hasFocus = true)
                : this.hasFocus && eventData.data._withFocus === false &&
                (this.hasFocus = false);

            this.props.onEvent(
                onEventData,
                !!eventData.data.show
            );
        }

        this.hasFocus = true;
        this.props.onShow(onEventData);

        return;
    }

    unfocus = () => {
        if (this.hasFocus) {
            this.hasFocus = false;
            let escapeData = {};

            if (typeof this.props.onEscapeData === 'function') {
                escapeData = this.props.onEscapeData();
            }

            nuiAction('ev-ui:applicationClosed', {
                name: this.props.name,
                fromEscape: true,
                ...escapeData
            });
        }
    }

    _onEscapeWrapper = (e: any) => {
        if (e.key === 'Escape') {
            this.escapes.forEach((fn) => {
                fn();
            });
        }
    }

    _onEventWrapper = (eventData: any) => {
        if (
            eventData &&
            eventData.data &&
            eventData.data.source === "ev-nui"
        ) {
            if (eventData.data.app === 'phone') {
                //console.log('ui-app _onEventWrapper eventData', eventData);
            }

            if (eventData.data.app !== '_fsts') {
                if (this.events[eventData.data.app]) {
                    for (
                        nuiLog.unshift(JSON.stringify(eventData.data));
                        nuiLog.length > 10;
                    ) {
                        nuiLog.pop();
                    }
                    this.events[eventData.data.app](eventData);
                    return;
                }
                return;
            }
            this._timer = Date.now() / 1000;
            return;
        }
        return;
    }

    componentDidMount() {
        if (!this.props.name) {
            throw new Error('ui app name required');
        }

        if (!this.mounted) this.mounted = true;

        //allow null values in event listeners
        window.addEventListener(
            'message',
            this._onEventWrapper
        )

        window.addEventListener(
            'keyup',
            this._onEscapeWrapper
        )

        this.events[this.props.name] = this._onEvent;
        this.escapes.push(this._onEscape);

        this.props.onClose && this.props.onClose(this.unfocus);
    }

    componentWillUnmount() {
        if (this.mounted) this.mounted = false;

        window.removeEventListener(
            'message',
            this._onEventWrapper
        )

        window.removeEventListener(
            'keyup',
            this._onEscapeWrapper
        )
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (!this.timeout) {
            if (this.props.store) {
                storeObj.dispatch({
                    type: 'ev-ui-state-reset',
                    store: this.props.store?.key,
                    data: this.props.store?.initialState
                });
            }

            updateSnackbarState({
                message: `Error occurred in app: ${this.props.name} - restarting...`,
                open: true,
                timeout: 5000,
                type: 'error'
            });

            this.props.closeOnError && nuiAction('ev-ui:closeApp')
            this.unfocus();

            this.timeout = setTimeout(() => {
                this.timeout = 0;
                this.setState({ error: null, hasError: false });
                clearTimeout(this.timeout);
            }, 5000);

            console.log('---- EV UI ERROR -----');
            console.log('error in app', this.props.name);
            console.log(error.message);
            console.log(errorInfo.componentStack);
            console.log('---- ----- ----- -----');

            if (typeof this.props.onError === 'function') {
                this.props.onError(error, errorInfo);
            }

            this.props.closeOnError && nuiAction('ev-ui:closeApp')
            this.unfocus();
        }
    }

    render() {
        return (
            this.state.hasError ? null :
                <App
                    hasFocus={this.hasFocus}
                    {...this.props}
                />
        );
    }

    static getDerivedStateFromError(error: any) {
        return {
            error: error,
            hasError: true
        }
    }
}

export default AppWrapper;