import { storeObj } from 'lib/redux';
import store from './store';

export const updateAtmState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}

export const setSelectedAccount = (data: Account) => updateAtmState({ selectedAccount: data });
export const setAccounts = (data: Account[]) => updateAtmState({ accounts: data });
export const setTransactions = (data: Transaction[]) => updateAtmState({ transactions: data });
export const setTransactionsLoading = (data: boolean) => updateAtmState({ transactionsLoading: data });
export const setCash = (data: number) => updateAtmState({ cash: data });
export const setIsAtm = (data: boolean) => updateAtmState({ isAtm: data });
export const setInitialLoadComplete = (data: boolean) => updateAtmState({ initialLoadComplete: data });
export const setInitialWidthComplete = (data: boolean) => updateAtmState({ initialWidthComplete: data });
export const setModalAccount = (data: Account) => updateAtmState({ modalAccount: data });
export const setModalAction = (data: string) => updateAtmState({ modalAction: data });
export const setShowModalError = (data: string) => updateAtmState({ showModalError: data });
export const setShowTransactionsAccessWarning = (data: boolean) => updateAtmState({ showTransactionsAccessWarning: data });
export const setDefaultAccount = (data: Account) => updateAtmState({ defaultAccount: data });