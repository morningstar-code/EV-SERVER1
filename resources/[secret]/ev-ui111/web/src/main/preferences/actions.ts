import { storeObj } from 'lib/redux';
import store from './store';

const updatePreferencesState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}

const getPreference = (key: string) => {
    return storeObj.getState().preferences[key];
}

export {
    updatePreferencesState,
    getPreference
}