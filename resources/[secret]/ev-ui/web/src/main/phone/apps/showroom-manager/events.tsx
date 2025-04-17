import DurationTimer from "components/duration-timer";
import { formatCurrency } from "lib/format";
import { updatePhoneAppState } from "main/phone/actions";
import { DoPhoneNotification } from "main/phone/components/notifications/events";
import store from "./store";
import { nuiAction } from "lib/nui-comms";

let showroomIdx: any = 0;

function generateShowroomId(...args: any) {
    const bool = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];

    bool && (showroomIdx += 1);

    return showroomIdx;
}

export default function events(cb) {
    cb('vehicle-purchase', (eventData) => {
        const data = eventData.data;
        const state = eventData.state;

        DoPhoneNotification({
            apps: [],
            icon: {
                name: 'car',
                color: 'white',
            },
            id: generateShowroomId(true),
            onAccept: async () => {
                const results = await nuiAction(`${data._data.nuiCallback ? data._data.nuiCallback : 'ev-ui:showroomPurchaseCurrentVehicle'}`, {
                    price: Number(data.price),
                    tax: data.tax,
                    character: state.character,
                    _data: data._data
                });

                DoPhoneNotification({
                    apps: [],
                    icon: {
                        name: 'car',
                        color: 'white',
                    },
                    id: generateShowroomId(),
                    state: state,
                    text: results.meta.ok ? `Vehicle ${data._data.title === 'Sell' ? 'Sold' : 'Purchased'}!` : results.meta.message,
                    title: `${data._data.title === 'Sell' ? 'Sell' : 'Purchase'} vehicle`,
                    timeout: 2500
                });
            },
            onAcceptOptions: {
                onAccept: null,
                onReject: null,
                dismiss: false,
                blockDismissOnClick: true,
                id: generateShowroomId(),
                text: `${data._data.title === 'Sell' ? 'Selling' : 'Purchasing'}...`,
                timeout: -1
            },
            onReject: () => { },
            state: state,
            timeout: 30000,
            title: `${data._data.title === 'Sell' ? 'Sell' : 'Purchase'} vehicle`,
            text: <DurationTimer
                countdown={true}
                extra={`${formatCurrency(Number(data.price) + Number(data.tax))} incl. tax`}
                startTime={30}
            />
        });

        return updatePhoneAppState(store.key, {
            ...state,
        });
    });
}