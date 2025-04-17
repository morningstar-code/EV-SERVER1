import { updatePhoneState } from "main/phone/actions";
import { DoPhoneNotification } from "../../components/notifications/events";
import { getDocumentContent } from "./actions";
import DurationTimer from "components/duration-timer";

let documentsIdx: any = 0;

function generateDocumentId(...args: any) {
    const bool = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];

    bool && (documentsIdx += 1);

    return documentsIdx;
}

export default function events(cb) {
    cb('note-qr-code', function (event) {
        const data = event?.data;
        const state = event?.state;

        setTimeout(() => {
            return getDocumentContent(data, true);
        }, 1000);

        updatePhoneState({
            activeApp: 'documents',
            status: 'show'
        });
    });
    cb('view-document', function (event) {
        const data = event?.data;
        const state = event?.state;

        DoPhoneNotification({
            apps: [],
            icon: {
                name: 'folder',
                color: 'white'
            },
            id: generateDocumentId(true),
            onAccept: () => {
                setTimeout(() => {
                    return getDocumentContent(data, true);
                }, 32);
                updatePhoneState({
                    activeApp: 'documents',
                    status: 'show'
                });
            },
            onAcceptOptions: {
                onAccept: null,
                onReject: null,
                dismiss: false,
                blockDismissOnClick: true,
                id: generateDocumentId(),
                text: 'Viewing...',
                timeout: 2500,
            },
            onReject: () => {},
            state: state,
            timeout: 30000,
            title: 'view document',
            text: <DurationTimer
                countdown={true}
                extra='a document is being shared with you'
                startTime={30}
            />,
        });
    });
};