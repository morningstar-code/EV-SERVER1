import { storeObj } from "lib/redux";
import store from "./store";
import { nuiAction } from "lib/nui-comms";
import { getCharacter } from "lib/character";

export const getNltsAppState = () => {
    return storeObj.getState()[store.key];
};

export const updateNltsAppState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
};

export const getDrivers = async () => {
    const results = await nuiAction<ReturnData>("ev-ui:nlts:getDrivers", {}, { returnData: [
        {
            cid: 1,
            name: 'Nikez',
            phoneNumber: '123456789',
            status: 'Available'
        },
        {
            cid: 2,
            name: 'Cool',
            phoneNumber: '9999999999',
            status: 'Busy'
        }
    ] });
    updateNltsAppState({ drivers: results.data });
}

export const signOnDuty = async () => {
    if (!getNltsAppState().isEmployee) return;

    const results = await nuiAction<ReturnData>('ev-ui:nlts:signOnDuty', {}, { returnData: [] });

    updateNltsAppState({
        drivers: results.data
    });
}

export const signOffDuty = async () => {
    if (!getNltsAppState().isEmployee) return;

    const results = await nuiAction('ev-ui:nlts:signOffDuty', {}, { returnData: [] });

    updateNltsAppState({
        drivers: results.data
    });
}

export const callDriver = (phoneNumber: string, status: string) => {
    if (status === 'Busy') return;

    nuiAction<ReturnData>('ev-ui:nlts:callDriver', {
        character: { charId: getCharacter().id },
        driver: { number: phoneNumber }
    });
}

export const updateStatus = async (status: string) => {
    if (!getNltsAppState().isEmployee) return;

    const results = await nuiAction<ReturnData>('ev-ui:nlts:updateStatus', {
        status: status
    }, { returnData: [] });

    updateNltsAppState({
        drivers: results.data
    });
}