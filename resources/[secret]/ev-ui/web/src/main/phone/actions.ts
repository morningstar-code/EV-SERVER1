import { storeObj } from 'lib/redux';
import store from './store';

const updatePhoneState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}

const updatePhoneAppState = (storeKey, data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: storeKey,
            key: key,
            data: data[key],
        });
    });

    return storeObj.getState()[storeKey];
}

const openPhoneModal = (content: any) => {
    updatePhoneAppState('phone.modal', {
        show: true,
        content: content,
        loading: false,
        isConfirm: false, //idk
        onConfirm: null, //idk
        confirmText: '', //idk
        error: null,
        closeOnErrorOkay: false
    });
}

function closePhoneModal(...args: any) {
    var slowHide = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
    updatePhoneAppState('phone.modal', {
        show: false,
        slowHide: slowHide,
        isConfirm: false,
        onConfirm: null,
        confirmText: '',
        content: '',
        loading: false,
    });
}

const setPhoneModalLoading = (loading?: boolean) => {
    updatePhoneAppState('phone.modal', {
        loading: !storeObj.getState()['phone.modal'].loading,
        show: true,
        error: null,
        closeOnErrorOkay: false
    });
}

const setPhoneModalError = (error: string, closeOnErrorOkay?: boolean) => {
    updatePhoneAppState('phone.modal', {
        error: error,
        closeOnErrorOkay: closeOnErrorOkay ? closeOnErrorOkay : false
    });
}

const connectToWifi = (location: any) => {
    const wifiConnected = storeObj.getState().phone.wifiConnected.filter(wifi => wifi.id !== location.id).map(wifi => {
        return {
            ...wifi,
            active: false
        }
    });

    wifiConnected.push({
        ...location,
        active: true
    });

    updatePhoneState({
        wifiConnected: wifiConnected
    });
}

const getCurrentLocation = () => {
    const location = storeObj.getState().game.location;
    return location;
}

const isAtLocation = (locations) => {
    return locations.indexOf(getCurrentLocation()) !== -1;
}

const isConnectedToSpots = (location, wanted) => {
    const connected = storeObj.getState().phone.wifiConnected.find(wifi => wifi.location === location && wifi.active);
    return connected && wanted.includes(connected.id);
}

const isEmployed = (business: string) => {
    const employment = storeObj.getState()['phone.apps.employment'].list;

    if (employment) {
        return employment.findIndex(emp => emp.code === business) !== -1;
    }

    return false;
}

const openConfirmModal = (onConfirm, confirmText?: any) => {
    updatePhoneAppState('phone.modal', {
        show: true,
        isConfirm: true,
        onConfirm: onConfirm,
        confirmText: confirmText ? confirmText : 'Are you sure?'
    });
}

function closeConfirmModal(...args: any) {
    var slowHide = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
    updatePhoneAppState('phone.modal', {
        show: false,
        slowHide: slowHide,
        isConfirm: false,
        onConfirm: null,
        confirmText: '',
        loading: false
    });
}

export {
    updatePhoneState,
    updatePhoneAppState,
    openPhoneModal,
    closePhoneModal,
    setPhoneModalLoading,
    setPhoneModalError,
    connectToWifi,
    getCurrentLocation,
    isAtLocation,
    isConnectedToSpots,
    isEmployed,
    openConfirmModal,
    closeConfirmModal
}