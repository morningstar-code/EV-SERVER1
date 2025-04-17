import { storeObj } from 'lib/redux';
import store from './store';

const updateDispatchState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}

const getDispatchState = () => {
    return storeObj.getState()[store.key];
}

const getDispatchStateKey = (key: string) => {
    return storeObj.getState()[store.key][key];
}

export {
    updateDispatchState,
    getDispatchState,
    getDispatchStateKey
}