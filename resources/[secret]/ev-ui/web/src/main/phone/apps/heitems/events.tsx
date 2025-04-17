import { DoPhoneNotification } from "../../components/notifications/events";

let heistsIdx: any = 0;

function generateHeistId(...args: any) {
    const bool = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];

    bool && (heistsIdx += 1);

    return `HEISTS_${heistsIdx}`;
}

export default function events(cb, data) {
    const config = data.config;

    cb('bobcat-truck-claim', function (event) {
        const eventData = event?.data;
        const eventState = event?.state;
        const targetApp = event?.data?.target_app;

        DoPhoneNotification({
            apps: [],
            icon: {
                background: '#7E57C2',
                color: 'white',
                name: 'user-secret'
            },
            id: generateHeistId(true),
            onAccept: () => {
                console.log("Accept security truck!");
            },
            onAcceptOptions: {
                onAccept: null,
                onReject: null,
                dismiss: false,
                blockDismissOnClick: true,
                id: generateHeistId(),
                text: 'Accepted! Please wait.',
                timeout: 2500,
            },
            onAcceptText: 'Accept',
            onReject: () => {
                console.log("Reject security truck!");
            },
            onRejectText: 'Reject',
            state: eventState,
            text: 'Accept Security Truck access codes',
            title: '#ST-1001',
            timeout: 30000
        });

        return eventState;
    });
};