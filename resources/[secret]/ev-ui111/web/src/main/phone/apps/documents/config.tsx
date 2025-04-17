import { PhoneConfigObject } from "lib/config/phone/appConfig";
import { nuiAction } from "lib/nui-comms";
import Container from "./container";
import { devData } from "main/phone/dev-data";
import { updatePhoneAppState } from "main/phone/actions";
import store from "./store";
import events from "./events";

const config = (): PhoneConfigObject => {
    return {
        events: function (cb) {
            return events(cb);
        },
        iconPng: "'https://gta-assets.subliminalrp.net/images/phone-icons/documents.png'",
        init: async () => {
            const results = await nuiAction('ev-ui:getDocumentTypes', {}, { returnData: devData.getDocumentTypes() });

            updatePhoneAppState(store.key, {
                documentTypes: results.data
            });
        },
        label: 'Documents',
        name: 'documents',
        position: 45,
        render: Container,
        hidden: () => false,
    }
}

export default config;