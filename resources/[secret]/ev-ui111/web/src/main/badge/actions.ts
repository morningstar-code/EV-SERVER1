import { storeObj } from 'lib/redux';
import store from './store';

const updateBadgeState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}

export const setName = (data: string) => updateBadgeState({ name: data });
export const setBadge = (data: string) => updateBadgeState({ badge: data });
export const setDepartment = (data: string) => updateBadgeState({ department: data });
export const setRank = (data: string) => updateBadgeState({ rank: data });
export const setMount = (data: boolean) => updateBadgeState({ mount: data });

export {
    updateBadgeState
}