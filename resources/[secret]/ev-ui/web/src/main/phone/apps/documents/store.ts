import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "phone.apps.documents",
    initialState: {
        document: {
            id: -1,
            content: '',
            title: ''
        },
        documentTypes: [],
        fromShare: false,
        list: [],
        page: 'home',
        notesTypeId: -1,
        selectedDocumentType: {},
        signatures: [],
        signaturesToRender: [],
        unlocked: false,
    }
};

export default store;