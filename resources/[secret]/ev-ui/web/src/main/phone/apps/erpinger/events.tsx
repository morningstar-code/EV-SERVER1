import DurationTimer from "components/duration-timer";
import { nuiAction } from "lib/nui-comms";
import { DoPhoneNotification } from "main/phone/components/notifications/events";

const icon = {
    background: '#FF8A65',
    color: 'white',
    name: 'map-pin'
}

export default function events(cb) {
    cb('ping-receive', function (event) {
        const eventData = event?.data;
        const eventState = event?.state;

        DoPhoneNotification({
            apps: [],
            appName: 'erpinger',
            icon: icon,
            onAccept: () => {
                nuiAction('ev-ui:pingAccept', {
                    character: eventState.character
                });
            },
            onAcceptOptions: {
                onAccept: null,
                onReject: null,
                dismiss: false,
                text: 'Your GPS was updated!',
                timeout: 2000
            },
            onReject: () => {
                nuiAction('ev-ui:pingReject', {
                    character: eventState.character
                });
            },
            state: eventState,
            text: <DurationTimer countdown={true} startTime={30} />,
            title: eventData.name,
            timeout: 30000
        });
    });
};