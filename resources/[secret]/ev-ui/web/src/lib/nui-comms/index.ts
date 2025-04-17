import { isEnvBrowser } from "../../utils/misc";
import { storeObj } from "../redux";

const nuiLog = [];

const nuiAction = async <T = any>(callback: string, data?: any, returnData?: any): Promise<T> => {
    const character = storeObj.getState().character;

    if (isEnvBrowser()) {
        const returnedData = {
            data: returnData?.returnData ?? {},
            meta: {
                ok: true,
                message: 'Success'
            }
        }

        handleActionDebugLog(callback, {
            character: character || {},
            data: data || {}
        }, returnData ? returnedData : null);

        for (
            nuiLog.unshift(
                JSON.stringify({
                    action: callback,
                    body: Object.assign(data || {}, { character: character || {}}),
                    result: {}
                })
            );
            nuiLog.length > 10;
        ) {
            nuiLog.pop();
        }

        return <any>returnedData;
    }

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(Object.assign(data || {}, { character: character || {} }))
    }
    
    const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : 'nui-frame-app';

    let respFormatted = null;

    const resp = await fetch(`https://${resourceName}/${callback}`, options).then((resp) => resp.json()).catch((err) => {
        console.log(`[NUI COMMS] Error fetching data... setting mock data | Action: ${callback} | Error: ${err}`);
        
        const returnedData = {
            data: returnData?.returnData ?? {},
            meta: {
                ok: true,
                message: 'Success'
            }
        }

        respFormatted = returnedData;
    });

    if (resp) {
        respFormatted = resp;
    }

    for (
        nuiLog.unshift(
            JSON.stringify({
                action: callback,
                body: Object.assign(data, { character: character || {}}),
                result: respFormatted
            })
        );
        nuiLog.length > 10;
    ) {
        nuiLog.pop();
    }

    return respFormatted;
}

const getNuiLog = () => {
    return nuiLog.map((log) => {
        return JSON.stringify(log, null, 4);
    }).join('\n');
}

const handleEventDebugLog = (data: any) => {
    const log = {
        action: `${data.app}`,
        arrow: false,
        data: Object.assign({}, data),
        options: {},
        result: '',
        type: 'Event',
    }

    storeObj.dispatch({
        type: 'ev-ui-debug-log',
        store: 'debuglogs',
        key: 'debugLog',
        data: log,
    });
}

const handleActionDebugLog = (action: string, data: any, result?: any) => {
    const log = {
        action: action,
        arrow: false,
        data: Object.assign({}, data),
        options: {},
        result: result ? result : '',
        type: 'Action',
    }

    storeObj.dispatch({
        type: 'ev-ui-debug-log',
        store: 'debuglogs',
        key: 'debugLog',
        data: log,
    });
}

export {
    nuiAction,
    getNuiLog,
    handleEventDebugLog,
    handleActionDebugLog
}