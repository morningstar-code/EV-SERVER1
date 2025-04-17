import { storeObj } from 'lib/redux';
import store from './store';

const updateBurnerState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}

const updateBurnerAppState = (storeKey, data: any) => {
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

const openBurnerModal = (content: any) => {
    updateBurnerAppState('burner.modal', {
        show: true,
        content: content,
        loading: false,
        error: null,
        closeOnErrorOkay: false
    });
}

function closeBurnerModal(...args: any) {
    var slowHide = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
    updateBurnerAppState('burner.modal', {
        show: false,
        slowHide: slowHide,
        content: '',
        loading: false
    });
}

const setBurnerModalLoading = (loading?: boolean) => {
    updateBurnerAppState('burner.modal', {
        loading: !storeObj.getState()['burner.modal'].loading,
        show: true
    });
}

const setBurnerModalError = (error: string, closeOnErrorOkay?: boolean) => {
    updateBurnerAppState('burner.modal', {
        error: error,
        closeOnErrorOkay: closeOnErrorOkay ? closeOnErrorOkay : false
    });
}

const connectToWifi = (location: any) => {
    const wifiConnected = storeObj.getState().burner.wifiConnected.filter(wifi => wifi.id !== location.id).map(wifi => {
        return {
            ...wifi,
            active: false
        }
    });

    wifiConnected.push({
        ...location,
        active: true
    });

    updateBurnerState({
        wifiConnected: wifiConnected
    });
}

const getCurrentLocation = () => {
    return storeObj.getState().game.location;
}

const isAtLocation = (locations) => {
    return locations.indexOf(getCurrentLocation()) !== -1;
}

const isConnectedToSpots = (location, wanted) => {
    const connected = storeObj.getState().burner.wifiConnected.find(wifi => wifi.location === location && wifi.active);
    return connected && wanted.includes(connected.id);
}

const openConfirmModal = (onConfirm, confirmText?: any) => {
    updateBurnerAppState('burner.modal', {
        show: true,
        isConfirm: true,
        onConfirm: onConfirm,
        confirmText: confirmText ? confirmText : 'Are you sure?'
    });
}

const closeConfirmModal = () => {
    updateBurnerAppState('burner.modal', {
        show: false,
        isConfirm: false,
        onConfirm: null,
        confirmText: ''
    });
}

export {
    updateBurnerState,
    updateBurnerAppState,
    openBurnerModal,
    closeBurnerModal,
    setBurnerModalLoading,
    setBurnerModalError,
    connectToWifi,
    getCurrentLocation,
    isAtLocation,
    isConnectedToSpots,
    openConfirmModal,
    closeConfirmModal
}