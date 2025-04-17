import { BurnerConfigObject } from "lib/config/burner/appConfig";
import Container from "./container";
import { nuiAction } from "lib/nui-comms";
import { updateBurnerAppState } from "main/burner/actions";
import { devData } from "main/phone/dev-data";
import { sortConversations } from "./actions";
import { storeObj } from "lib/redux";
import store from "./store";

const config = (): BurnerConfigObject => {
    return {
        icon: {
            background: '#8BC34A',
            color: 'white',
            name: 'comment'
        },
        init: async () => {
            const source_number = storeObj.getState().burner.source_number;
            const results = await nuiAction('ev-ui:getConversations', {}, { returnData: devData.getConversations() });
        
            const sortedConversations: any = sortConversations(source_number, results.data);

            updateBurnerAppState(store.key, {
                activeConversation: -1,
                conversations: sortedConversations.conversations,
                loaded: [],
                notifications: [],
                order: sortedConversations.order,
            })
        },
        label: 'Messages',
        name: 'conversations',
        position: 4,
        render: Container,
        events: () => { },
    }
}

export default config;