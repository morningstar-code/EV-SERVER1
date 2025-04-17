import { storeObj } from 'lib/redux';
import store from './store';

export const updateGolfState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}

export const setShowPowerBar = (data: boolean) => updateGolfState({ showPowerBar: data });
export const setPowerBarProgress = (data: number) => updateGolfState({ powerBarProgress: data });