import DurationTimer from "components/duration-timer";
import { formatCurrency } from "lib/format";
import { nuiAction } from "lib/nui-comms";
import { DoPhoneNotification } from "main/phone/components/notifications/events";

let chargeIdx: any = 0;

function generateChargeId(...args: any) {
    const bool = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];

    bool && (chargeIdx += 1);

    return chargeIdx;
}

export default function events(cb) {
    cb('loan-offer', function (event) {
        const eventData = event?.data.data;
        const eventState = event?.state;

        DoPhoneNotification({
            apps: [],
            icon: {
                name: 'donate',
                color: 'white'
            },
            id: generateChargeId(true),
            onAccept: async () => {
                setTimeout(async () => {
                    const results = await nuiAction('ev-ui:loanAccept', {
                        ...eventData,
                        loanee: eventData.character,
                        character: eventState.character
                    });

                    DoPhoneNotification({
                        apps: [],
                        icon: {
                            name: 'donate',
                            color: 'white'
                        },
                        id: generateChargeId(),
                        state: eventState,
                        text: results.meta.ok ? 'Loan Received!' : results.meta.message,
                        title: `loan offer - ${Number(eventData.interest)}%`,
                        timeout: 2500
                    });
                });
            },
            onAcceptOptions: {
                onAccept: null,
                onReject: null,
                dismiss: false,
                blockDismissOnClick: true,
                id: generateChargeId(),
                text: 'Accepting...',
                timeout: -1,
            },
            onReject: () => { },
            state: eventState,
            timeout: 30000,
            title: `loan offer - ${Number(eventData.interest)}%`,
            text: <DurationTimer
                countdown={true}
                extra={`${formatCurrency(eventData.amount)} - ${eventData.business.name}`}
                startTime={30}
            />
        });
    });

    cb('charge-accept', function (event) {
        const eventData = event?.data.data;
        const eventState = event?.state;

        DoPhoneNotification({
            apps: [],
            icon: {
                name: 'donate',
                color: 'white'
            },
            id: generateChargeId(true),
            onAccept: async () => {
                setTimeout(async () => {
                    const results = await nuiAction('ev-ui:businessChargeAccept', {
                        ...eventData,
                        charger: eventData.character,
                        character: eventState.character
                    });

                    DoPhoneNotification({
                        apps: [],
                        icon: {
                            name: 'donate',
                            color: 'white'
                        },
                        id: generateChargeId(),
                        state: eventState,
                        text: results.meta.ok ? 'Charge Accepted!' : results.meta.message,
                        title: 'services charge',
                        timeout: 2500
                    });
                });
            },
            onAcceptOptions: {
                onAccept: null,
                onReject: null,
                dismiss: false,
                blockDismissOnClick: true,
                id: generateChargeId(),
                text: 'Accepting...',
                timeout: -1,
            },
            onReject: () => {
                setTimeout(() => {
                    nuiAction('ev-ui:businessChargeReject', {
                        ...eventData,
                        charger: eventData.character,
                        character: eventState.character
                    });
                });
            },
            state: eventState,
            timeout: 30000,
            title: 'services charge',
            text: <DurationTimer countdown={true} extra={`${formatCurrency(eventData.amount + eventData.tax)} incl tax - ${eventData.business.name}`} startTime={30} />
        });
    });
};