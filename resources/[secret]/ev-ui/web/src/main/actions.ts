import { storeObj } from 'lib/redux';

const updateState = (data: any) => {
    storeObj.dispatch({
        type: 'ev-ui-raw-action',
        data: data
    });
}

export {
    updateState
}