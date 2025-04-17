import { storeObj } from "lib/redux";
import store from "./store";
import { nuiAction } from "lib/nui-comms";
import { getCharacter } from "lib/character";

export const getAbdulTaxiAppState = () => {
    return storeObj.getState()[store.key];
};

export const updateAbdulTaxiAppState = (data: any) => {
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
    const results = await nuiAction<ReturnData>("ev-ui:abdultaxi:getDrivers", {}, { returnData: [
        {
            name: 'Abdul',
            phoneNumber: '123456789',
            status: 'Available'
        },
        {
            name: 'Cool',
            phoneNumber: '9999999999',
            status: 'Busy'
        }
    ] });
    
    updateAbdulTaxiAppState({ drivers: results.data });
}

export const signOnDuty = async () => {
    if (!getAbdulTaxiAppState().isEmployee) return;

    const results = await nuiAction<ReturnData>('ev-ui:abdultaxi:signOnDuty', {}, { returnData: [] });

    updateAbdulTaxiAppState({
        drivers: results.data
    });
}

export const signOffDuty = async () => {
    if (!getAbdulTaxiAppState().isEmployee) return;

    const results = await nuiAction('ev-ui:abdultaxi:signOffDuty', {}, { returnData: [] });

    updateAbdulTaxiAppState({
        drivers: results.data
    });
}

export const callDriver = (phoneNumber: string, status: string) => {
    if (status === 'Busy') return;

    nuiAction<ReturnData>('ev-ui:abdultaxi:callDriver', {
        character: { charId: getCharacter().id },
        driver: { number: phoneNumber }
    });
}

export const updateStatus = async (status: string) => {
    if (!getAbdulTaxiAppState().isEmployee) return;

    const results = await nuiAction<ReturnData>('ev-ui:abdultaxi:updateStatus', {
        status: status
    }, { returnData: [] });

    updateAbdulTaxiAppState({
        drivers: results.data
    });
}