import { storeObj } from 'lib/redux';
import store from './store';

export const updateLscState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}

export const setShowCard = (data: boolean) => updateLscState({ showCard: data });