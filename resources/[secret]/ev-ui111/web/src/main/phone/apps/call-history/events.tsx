import DurationTimer from "components/duration-timer";
import { getContactData } from "lib/character";
import { nuiAction } from "lib/nui-comms";
import { storeObj } from "lib/redux";
import { DoPhoneNotification } from "main/phone/components/notifications/events";
import { updatePhoneAppState, updatePhoneState } from "../../actions";
import store from "./store";

let currentCallMeta = {};
let currentCallId = 0;

const icon = {
    background: '#009688',
    color: 'white',
    name: 'phone'   
}

export const callStart = (data: any) => {
    const state = storeObj.getState();
    const number = data.number;

    if (isCallActive(state)) {
        return state;
    }

    setTimeout(() => {
        nuiAction('ev-ui:callStart', {
            character: state.character,
            number: number.toString()
        });
    }, 0);

    DoPhoneNotification({
        apps: [],
        icon: icon,
        id: generateCallId(true),
        onReject: () => phoneCallEnd(state),
        onRejectText: 'Hang Up',
        state: state,
        text: 'Connecting...',
        title: getContactData(number).name,
        timeout: -1
    });

    updatePhoneCall(state, true);
}

function phoneCallEnd(state: any, ...args: any) {
    const data = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];

    nuiAction('ev-ui:callEnd', {
        character: state.character,
        meta: currentCallMeta
    });

    updatePhoneCall(state, false); //data && updatePhoneCall
}

export const isCallActive = (state: any) => {
    return state.phone.callActive;
}

export function generateCallId(...args: any) {
    const bool = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];

    bool && (currentCallId += 1);

    return `CALLS_${currentCallId}`;
}

export function updatePhoneCall(state: any, callActive: boolean, ...args: any) {
    const callMeta = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    
    currentCallMeta = callMeta;

    updatePhoneState({
        ...state.phone,
        callActive: callActive,
        callMeta: callMeta
    });
}

export default function events(cb) {

    const callReceiving = (event) => {
        const eventData = event?.data;
        const eventState = event?.state;

        if (isCallActive(eventState)) {
            return eventState;
        } else {
            DoPhoneNotification({
                apps: [],
                icon: icon,
                id: generateCallId(true),
                onAccept: () => {
                    nuiAction('ev-ui:callAccept', {
                        character: eventState.character,
                        meta: currentCallMeta
                    });
                },
                onAcceptOptions: {
                    onAccept: null,
                    onReject: null,
                    dismiss: false,
                    blockDismissOnClick: true,
                    id: generateCallId(),
                    text: 'Connecting...',
                    timeout: -1
                },
                onAcceptText: 'Answer',
                onReject: () => phoneCallEnd(eventState),
                onRejectText: 'Hang Up',
                state: eventState,
                text: 'Incoming Call',
                title: getContactData(eventData.number).name,
                timeout: -1
            });

            updatePhoneCall(eventState, true, eventData);
        }
    }

    const callDialing = (event) => {
        const eventData = event?.data;
        const eventState = event?.state;

        DoPhoneNotification({
            apps: [],
            icon: icon,
            id: generateCallId(!isCallActive(eventState)),
            onReject: () => phoneCallEnd(eventState),
            onRejectText: 'Hang Up',
            state: eventState,
            text: 'Dialing...',
            title: getContactData(eventData.number).name,
            timeout: -1
        });

        updatePhoneCall(eventState, true, eventData);
    }

    const callInProgress = (event) => {
        const eventData = event?.data;
        const eventState = event?.state;

        DoPhoneNotification({
            apps: [],
            icon: icon,
            id: generateCallId(),
            onReject: () => phoneCallEnd(eventState, false),
            onRejectOptions: {
                onReject: null,
                dismiss: false,
                blockDismissOnClick: true,
                id: generateCallId(),
                text: 'Disconnecting...',
                timeout: -1
            },
            onRejectText: 'Hang Up',
            state: eventState,
            text: <DurationTimer />,
            title: getContactData(eventData.number).name,
            timeout: -1
        });

        updatePhoneCall(eventState, true, eventData);
    }

    const callInactive = (event) => {
        const eventData = event?.data;
        const eventState = event?.state;

        DoPhoneNotification({
            apps: [],
            icon: icon,
            id: generateCallId(),
            state: eventState,
            text: `Disconnected! ${eventData.message || ''}`,
            title: getContactData(eventData.number).name,
            timeout: 3000
        });

        updatePhoneCall(eventState, false);
    }

    const addCallLog = (direction: string) => {
        return function (event) {
            const eventData = event?.data;
            const eventState = event?.state;

            const callLog = {
                number: eventData.number,
                direction: direction,
                timestamp: Math.round(Date.now() / 1000)
            }

            const callLogs = eventState[store.key].list;

            updatePhoneAppState(store.key, {
                list: [
                    ...callLogs,
                    callLog
                ]
            });
        }
    }

    cb('call-receiving', callReceiving);
    cb('call-dialing', callDialing);
    cb('call-in-progress', callInProgress);
    cb('call-inactive', callInactive);
    cb('call-receiving', addCallLog('in'))
    cb('call-dialing', addCallLog('out'))
};