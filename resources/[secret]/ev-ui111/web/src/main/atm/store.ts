import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "atm",
    initialState: {
        accounts: [],
        cash: 0,
        defaultAccount: null,
        initialLoadComplete: false,
        initialWidthComplete: false,
        isAtm: false,
        modalAccount: null,
        modalAction: null,
        selectedAccount: null,
        showModalError: false,
        showTransactionsAccessWarning: false,
        transactions: [],
        transactionsLoading: false
    }
};

export default store;