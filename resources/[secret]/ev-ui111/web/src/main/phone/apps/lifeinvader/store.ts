import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "phone.apps.lifeinvader",
    initialState: {
        page: 'home',
        emails: [],
        list: [],
        adUrl: null,
        category: { id: 'inbox' },
        categories: [
            {
                id: 'inbox',
                name: 'Inbox',
            },
            {
                id: 'sent',
                name: 'Sent',
            },
            {
                id: 'draft',
                name: 'Drafts',
            },
            {
                id: 'trash',
                name: 'Trash',
            },
        ],
        email: { id: -1 },
    }
};

export default store;