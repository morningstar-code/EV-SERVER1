import { storeObj } from "lib/redux";
import store from "./store";

export const getContentBottomState = () => {
    return storeObj.getState()[store.key];
};

export const updatePhoneContentBottomState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}