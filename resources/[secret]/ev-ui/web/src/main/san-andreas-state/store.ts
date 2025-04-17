import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "san-andreas-state",
    initialState: {
        accounts: [],
        accountCharacters: [],
        accountCharactersFor: 0,
        accountsSearch: {},
        accountTypes: [],
        activeBallots: [],
        businesses: [],
        businessTypes: [],
        characters: [],
        characterLicenses: [],
        characterLicensesFor: 0,
        expiredBallots: [],
        farmersItems: [],
        licenses: [],
        loans: [],
        permissions: [],
        access: [],
        taxes: []
    }
};

export default store;