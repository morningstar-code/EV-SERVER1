import { storeObj } from 'lib/redux';
import store from './store';

const updateCharacterState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}

export {
    updateCharacterState
}