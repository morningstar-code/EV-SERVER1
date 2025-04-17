import { DoPhoneNotification } from "../../components/notifications/events";
import { updatePhoneState } from "main/phone/actions";
import DurationTimer from "components/duration-timer";
import { nuiAction } from "lib/nui-comms";
import { baseStyles } from "lib/styles";

let confirmationIdx: any = 0;

function generateConfirmationId(...args: any) {
    const bool = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];

    bool && (confirmationIdx += 1);

    return confirmationIdx;
}

export default function events(cb, data) {
    const config = data.config;

    cb('notification', function (event) {
        const eventData = event?.data;
        const eventState = event?.state;
        const targetApp = event?.data?.target_app;

        const app = config.find(c => c?.name === targetApp);

        if (!app) {
            return eventState;
        }

        const show = !!eventData.show_even_if_app_active;

        const appCopy = { ...app };

        if (!appCopy.icon) {
            appCopy.icon = {
                background: baseStyles.bgPrimary(),
                color: 'white',
                name: 'home'
            }
        }

        DoPhoneNotification({
            apps: [show ? '' : targetApp],
            appName: targetApp,
            icon: targetApp === 'jobs' ? {
                background: '#90CAF9',
                color: 'white',
                name: 'people-carry'
            } : appCopy.icon, //TODO; PNG support
            state: eventState,
            title: eventData.title,
            text: eventData.body
        });
    });

    cb('phone-state-update', function (event) {
        const eventData = event?.data;

        updatePhoneState({
            ...eventData
        });
    });

    cb('generic-confirmation', function (event) {
        const eventData = event?.data;
        const eventState = event?.state;

        DoPhoneNotification({
            apps: [],
            appName: eventData.appName,
            icon: eventData.icon,
            id: generateConfirmationId(true),
            onAccept: async () => {
                const onAccept = eventData.onAccept;

                if (onAccept?.targetEvent) {
                    const results = await nuiAction(onAccept.targetEvent, {
                        action: 'accept',
                        _data: eventData['_data']
                    });

                    if (onAccept?.hasResponse) {
                        if (results.data.text && results.data.title) {
                            setTimeout(() => {
                                DoPhoneNotification({
                                    apps: [],
                                    appName: eventData.appName,
                                    icon: eventData.icon,
                                    id: generateConfirmationId(),
                                    state: eventState,
                                    title: results.data.title,
                                    text: results.data.text,
                                    timeout: 2500
                                });
                            });
                        }
                    }
                }
            },
            onAcceptOptions: eventData.onAccept.hasResponse ? {
                onAccept: null,
                onReject: null,
                blockDismissOnClick: true,
                id: generateConfirmationId(),
                text: eventData.waitingText,
                timeout: -1
            } : null,
            onReject: () => {
                const onAccept = eventData.onAccept;

                if (onAccept?.targetEvent) {
                    nuiAction(onAccept.targetEvent, {
                        action: 'reject',
                        _data: eventData['_data']
                    });
                }
            },
            state: eventState,
            timeout: 30000,
            title: eventData.title,
            text: (
                <DurationTimer
                    countdown={true}
                    extra={eventData.text}
                    startTime={30}
                />
            )
        });

        return eventState;
    });
};