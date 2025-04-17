import { nuiAction } from 'lib/nui-comms';
import { storeObj } from 'lib/redux';
import { isEnvBrowser } from 'utils/misc';
import AddPersonModal from './components/modals/add-person-modal';
import ConfirmModal from './components/modals/confirm-modal';
import store from './store';

let mdtOfficers = [];

export const getMdtState = () => {
    return storeObj.getState()[store.key];
}

export const setMdtOfficers = (officers: any) => {
    return (mdtOfficers = officers);
}

export const getMdtOfficers = () => {
    return mdtOfficers;
}

export const updateMdtState = (data: any, storeKey = 'mdt') => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: storeKey,
            key: key,
            data: data[key],
        });
    });
}

export const updateMdtStore = (data: any, storeKey = 'mdt') => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: storeKey,
            key: key,
            data: data[key],
        });
    });
}

export const mdtAction = async (action: string, data = {}, returnData = {}, useNewApi = false): Promise<any> => {
    return new Promise(async (resolve) => {
        const results = await nuiAction('ev-ui:mdtAction', {
            action: action,
            data: data
        }, { returnData: returnData });

        if (!results.meta.ok) {
            console.log(`[MDT] Action: ${action} failed, falling back to dummy data.`);
            resolve({ data: returnData });
        }

        resolve(results);
    });
}

export function showMdtLoadingModal(loading = false, ...args: any) {
    const state = getMdtState();
    const arg2 =
        arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : {};
    const arg3 =
        !(arguments.length > 2 && void 0 !== arguments[2]) ||
        arguments[2];
    const arg4 =
        arguments.length > 3 && void 0 !== arguments[3]
            ? arguments[3]
            : 'mdt';

    const modal = !(!loading && arg3) && (state.modal || function () { });
    const modalStyle = !loading && arg3 ? {} : state.modalStyle || {};

    updateMdtState({
        ...arg2,
        modal: modal,
        modalLoading: loading,
        modalStyle: modalStyle,
        ...arg4
    });
}

export const openMdtConfirmModal = (data = {}, storeKey = 'mdt') => {
    updateMdtState({
        modal: (state: any) => {
            return (
                <ConfirmModal {...state} {...data} />
            )
        }
    }, storeKey);
}

export function hasMdtPermission(permission: string, ...args: any) {
    if (isEnvBrowser()) {
        return true;
    }

    const permissionId = args.length > 0 && void 0 !== args[0] ? args[0] : null;
    const state = getMdtState();

    if (state.permissions && state.permissions.steam) { //This is usually admin who has steam like this, structure can either be { steam: "" } or { steam_id: "" } or both?
        return true;
    }

    if (!state.myProfile || !state.myProfile.character_id) { //If char is not police, no permissions
        return false;
    }

    try {
        if (storeObj.getState().game.skipMdwProfileCheck) { //If config is set to skip profile check, return true
            return true;
        }
    } catch (error) { }

    if (!permissionId) {
        const hasPermission = state.myProfile.permissions.find((p: any) => {
            return JSON.parse(p).name === permission;
        });

        return !!hasPermission;
    }

    const hasPermission = state.myProfile.permissions.find((p: any) => {
        return JSON.parse(p).name === permission && Number(JSON.parse(p).id) === permissionId; //Multiple permissions with same name, but different id?
    });

    return !!hasPermission;
}

export const updateEvidence = async (type: string, key: string, value: string) => {
    const state = getMdtState();

    const data = {
        ...state[`evidence${type}`]
    };

    data[key] = value;

    updateMdtState({
        [`evidence${type}`]: data
    });
}

export const createTag = async () => {
    showMdtLoadingModal(true);
    const state = getMdtState();
    await mdtAction('editTag', state.tagCreate);
    const results = await mdtAction('getTags', {});
    showMdtLoadingModal(false, {
        tags: results.data
    }, false);
}

export const createCert = async () => {
    showMdtLoadingModal(true);
    const state = getMdtState();
    await mdtAction('editCert', state.certCreate);
    const results = await mdtAction('getCerts', {});
    showMdtLoadingModal(false, {
        certs: results.data
    }, false);
}

export const addEvidenceToResource = async (type: string, resourceType: string, resourceId: string, resourceGet: any, resourceKey: any, resourceStore: any) => {
    showMdtLoadingModal(true);
    const state = getMdtState();

    await mdtAction('addEvidenceToResource', {
        type: resourceType,
        create: type === 'create',
        evidence: {
            ...state.evidenceCreate,
            cid: state?.evidenceCreate?.cid?.length > 0 ? parseInt(state?.evidenceCreate?.cid) : null
        },
        identifier: state.evidenceAdd.identifier,
        source_id: resourceId
    });

    const results = await mdtAction(resourceGet, { id: resourceId });

    showMdtLoadingModal(false);

    updateMdtState({
        [resourceKey]: results.data
    }, resourceStore);
}

export const addResourceLink = async (data: any, resourceGet: any, resourceKey: any, resourceStore: any) => {
    showMdtLoadingModal(true);

    await mdtAction('addResourceLink', data);

    const results = await mdtAction(resourceGet, { id: data.resource_id }); //Gets for example: incident (and resource is incident id for example: 1)

    showMdtLoadingModal(false, {}, false);

    updateMdtState({
        [resourceKey]: results.data //resourceKey is for example: incident
    }, resourceStore);

    return results;
}

export const removeResourceLink = async (resourceLinkId: string, parentId: number, resourceGet: any, resourceKey: any, resourceStore: any, sourceType = null) => {
    showMdtLoadingModal(true);

    await mdtAction('removeResourceLink', {
        resource_link_id: resourceLinkId, //Generated on server-side when adding a link
        source_type: sourceType
    });

    const results = await mdtAction(resourceGet, { id: parentId });

    showMdtLoadingModal(false);

    updateMdtState({
        [resourceKey]: results.data
    }, resourceStore);

    return results;
}

export const deleteResourceItem = async (table: string, id: number, idField = null) => {
    showMdtLoadingModal(true);
    await mdtAction('deleteResourceItem', {
        id: id,
        idField: idField,
        table: table
    });
    showMdtLoadingModal(false);
}

export const openAddPersonsModal = (data = {}) => {
    updateMdtState({
        modal: (state: any) => {
            return (
                <AddPersonModal
                    {...state} {...data}
                />
            )
        },
        modalStyle: { width: '40%' }
    });
}