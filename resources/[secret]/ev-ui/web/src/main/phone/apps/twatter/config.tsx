import { PhoneConfigObject } from "lib/config/phone/appConfig";
import { nuiAction } from "lib/nui-comms";
import { updatePhoneAppState } from "../../actions";
import { devData } from "../../dev-data";
import Container from "./container";
import events from "./events";
import store from "./store";

export let twats = [];

export const getTwats = () => {
    return twats;
}

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        events: function (cb, data) {
            return events(cb);
        },
        iconPng: "'https://i.ibb.co/89Fr2wT/twatter.png'",
        init: async () => {
            const twatResults = await nuiAction<ReturnData<any>>('ev-ui:getTwats', {}, { returnData: devData.getTwats() });
            const twatterBlueResults = await nuiAction<ReturnData>('ev-ui:getTwatterBlue', {}, { returnData: false });
            const twatterBlockedUsersResults = await nuiAction<ReturnData>('ev-ui:getBlockedTwatterUsers', {}, { returnData: [] });

            if (twatResults.meta.ok) {
                const twatters = twatResults.data.sort((a: any, b: any) => {
                    return a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0;
                });

                twats = twatters;

                const blockedUsers = [];

                Object.keys(twatterBlockedUsersResults.data).forEach((key) => {
                    blockedUsers.push({
                        id: parseInt(key),
                        name: twatterBlockedUsersResults.data[key].name
                    });
                });

                updatePhoneAppState(store.key, {
                    list: [],
                    shouldUpdate: Math.round(100 * Math.random()),
                    hasBlue: twatterBlueResults.data ?? false,
                    blockedUsers: blockedUsers ?? []
                });
            }
        },
        label: 'Twatter',
        name: 'twatter',
        position: 25,
        render: Container,
    }
}

export default config;