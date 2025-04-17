import { nuiAction } from "lib/nui-comms";
import { storeObj } from "lib/redux";
import { devData } from "main/phone/dev-data";
import store from "./store";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";

export const getDocumentState = () => {
    return storeObj.getState()[store.key];
}

export const updateDocumentAppState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
};

export async function updateDocumentsPage(paramTypeId?: any, bool?: any) {
    const documentsState = storeObj.getState()['phone.apps.documents'];
    const typeId = paramTypeId === -1 ? documentsState.documentTypes.find(type => type.name === 'Notes').id : documentsState.notesTypeId;
    const validTypeId = paramTypeId !== -1 ? paramTypeId : typeId;
    const documentType = documentsState.documentTypes.find(type => type.id === validTypeId);

    updateDocumentAppState({
        notesTypeId: typeId,
        selectedDocumentType: documentType
    });

    // if ([1, 2, 4].includes(validTypeId)) {
    //     //int api
    //     const results = await nuiAction('ev-ui:getDocuments', { type_id: validTypeId }, { returnData: devData.getDocuments(validTypeId) });

    //     if (bool && !documentsState.fromShare) {
    //         updateDocumentAppState({
    //             fromShare: false,
    //             list: results.data,
    //             page: 'home'
    //         });
    //     }
    // } else {
    //     //ext api
    // }

    const results = await nuiAction('ev-ui:getDocuments', { type_id: validTypeId }, { returnData: devData.getDocuments(validTypeId) });

    //console.log("getDocuments: ", results.data);

    if (bool && !documentsState.fromShare) {
        //console.log("bool and not from share");
        updateDocumentAppState({
            fromShare: false,
            list: results.data,
            page: 'home'
        });
    }
}

export async function saveDocument() {
    const state = getDocumentState();
    setPhoneModalLoading();

    const isCreate = state?.document?.id === -1;
    const action = `ev-ui:${isCreate ? 'create' : 'edit'}Document`;
    const results = await nuiAction(action, { type_id: state?.selectedDocumentType?.id, document: state?.document });

    if (results.meta.ok) {
        isCreate ? updateDocumentsPage(state?.selectedDocumentType?.id, isCreate) : editDocument(false);
        closePhoneModal();
        return;
    }

    setPhoneModalError(results.meta.message, true);
}

export async function getDocumentContent(document: any, fromShare = false) {
    setPhoneModalLoading();
    const results = await nuiAction('ev-ui:getDocumentContent', { document: document }, { returnData: devData.getDocumentContent() });
    if (results.meta.ok) {
        //console.log("getDocumentContent: ", results.data);
        editDocument(false);
        const state = {
            fromShare: fromShare,
            document: results.data,
            unlocked: results?.data?.unlocked ?? false,
            page: 'editing',
        };
        if (fromShare) {
            const selectedDocumentType = getDocumentState()?.documentTypes.find(type => type.id === document.type_id) || getDocumentState()?.documentTypes[0];
            state['selectedDocumentType'] = selectedDocumentType;
        }
        updateDocumentAppState(state);
        closePhoneModal(false);
        return;
    }
    setPhoneModalError(results.meta.message, true);
}

export async function editDocument(... args: any) {
    const state = getDocumentState();

    const isUnlocked = !(args.length > 0 && void 0 !== args[0]) || args[0];

    if (isUnlocked || state.unlocked) {
        isUnlocked && setPhoneModalLoading();
        const document = state.document;
        const results = await nuiAction('ev-ui:startEditDocument', { document: document, unlock: isUnlocked }, { returnData: document });
        if (results.meta.ok) {
            updateDocumentAppState({ unlocked: isUnlocked });
            closePhoneModal(false);
            return;
        }
        return setPhoneModalError('Document is being edited by someone else', true);
    }

    return;
}