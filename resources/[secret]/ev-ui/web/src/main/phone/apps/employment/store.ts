import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "phone.apps.employment",
    initialState: {
        activeBusiness: -1,
        employees: [],
        list: [],
        loans: [],
        selectedLoanType: 1,
        loadedLoans: 100,
        search: null,
        loanConfig: {},
        page: 0,
        roles: [],
        showLoading: false,
        showingLogs: false,
    }
};

export default store;