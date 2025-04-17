import { PhoneConfigObject } from "lib/config/phone/appConfig";
import { nuiAction } from "lib/nui-comms";
import { updatePhoneAppState } from "main/phone/actions";
import { devData } from "main/phone/dev-data";
import Container from "./container";
import events from "./events";
import store from "./store";

const config = (): PhoneConfigObject => {
    return {
        //forceOrientation: 'portrait',
        events: function (cb, data) {
            return events(cb);
        },
        iconPng: "'https://gta-assets.subliminalrp.net/images/phone-icons/employment.png'",
        init: async () => {
            const results = await nuiAction('ev-ui:getEmploymentInformation', {}, { returnData: devData.getEmploymentInformation() });
            updatePhoneAppState(store.key, {
                list: results.data
            });
        },
        label: 'Employment',
        name: 'employment',
        position: 65,
        render: Container,
    }
}

export default config;