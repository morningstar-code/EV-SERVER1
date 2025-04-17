import { getCharacter } from "lib/character";
import { nuiAction } from "lib/nui-comms"
import { storeObj } from "lib/redux";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import store from "./store";

export const getLifeInvaderAppState = () => {
    return storeObj.getState()[store.key];
}

export const updatLifeInvaderAppState = (data: any) => {
    console.log('updating lifeinvader app state', data);
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
};

export const getContacts = async () => {
    const results = await nuiAction<ReturnData<LifeInvaderContact[]>>('ev-ui:li:getContacts', { id: getCharacter().id }, {
        returnData: [
            {
                name: 'Test',
                email: 'test@test.com',
            },
            {
                name: 'Batman',
                email: 'bat@man.com',
            },
        ]
    });

    return results.data;
}

export const getEmailContent = async (email: LifeInvaderEmail) => {
    setPhoneModalLoading();

    const results = await nuiAction<ReturnData<{ body: string }>>('ev-ui:li:getEmailContent', { email: email }, { returnData: { body: 'hello world' } });

    if (results.meta.ok) {
        closePhoneModal(false);
        return results?.data?.body;
    }

    setPhoneModalError(results.meta.message, true);
}