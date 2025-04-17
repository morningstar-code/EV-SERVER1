import { createStore } from "redux";
import { getStoreObject } from "./store";

let storeObj = null;
const storeInitialState = {};
const storeResetState = {};
const storeKeys = [];

function actions(state = storeInitialState, action) {
    switch (action.type) {
        case 'ev-ui-action':
            return {
                ...state,
                [action.store]: {
                    ...state[action.store],
                    [action.key]: action.data,
                },
            };
        case 'ev-ui-debug-log':
            return {
                ...state,
                [action.store]: {
                    ...state[action.store],
                    [action.key]: {
                        ...state[action.store][action.key],
                        log: [
                            ...state[action.store][action.key].log,
                            action.data,
                        ],
                    },
                },
            };
        case 'ev-ui-state-reset':
            return {
                ...state,
                [action.store]: action.data,
            };
        case 'ev-ui-raw-action':
            return {
                ...state,
                ...action.data
            };
        default:
            return state
    }
}

const InitStores = (): any => {
    const storeObject = getStoreObject();
    const stores = Object.keys(storeObject);

    stores.forEach((store) => {
        const data: StoreObject = storeObject[store].default;

        if (storeKeys.includes(data.key)) {
            throw new Error(`duplicate store key found: ${data.key}`);
        }

        storeKeys.push(data.key);

        storeInitialState[data.key] = data.initialState;
        storeResetState[data.key] = data.initialState;

        if (data.auxiliaryInitialState) {
            Object.assign(storeInitialState, data.auxiliaryInitialState);
        }
    });

    storeObj = createStore(actions);

    return storeInitialState;
}

function compose(store: { key: string, initialState: any }, data?: any) {
    const extraStateToProps = data?.mapStateToProps !== undefined ? data?.mapStateToProps : function (state) { return {} };
    const mapStateToProps = (state: any) => {
        return {
            character: state.character,
            ...state[store.key],
            ...extraStateToProps(state)
        }
    }

    const updateState = (data: any) => {
        Object.keys(data).forEach((key) => {
            storeObj.dispatch({
                type: 'ev-ui-action',
                store: store.key,
                key: key,
                data: data[key]
            });
        });
    }

    const resetState = () => {
        storeObj.dispatch({
            type: 'ev-ui-state-reset',
            store: store.key,
            data: store.initialState
        });
    }

    const extraDispatchToProps = data?.mapDispatchToProps || {};
    const mapDispatchToProps = (dispatch: any) => {
        return {
            updateState: (data: any) => updateState(data),
            resetState: () => resetState(),
            ...extraDispatchToProps
        }
    }

    return {
        mapStateToProps,
        mapDispatchToProps
    }
}

function StoreObject(): any {
    return storeObj;
}

interface StoreObject {
    key: string;
    initialState: any;
    auxiliaryInitialState?: any;
}

function RestartInterface() {
    storeKeys.forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-state-reset',
            store: key,
            data: storeInitialState[key]
        });
    });
}

export {
    InitStores,
    StoreObject,
    storeObj,
    compose,
    RestartInterface
};