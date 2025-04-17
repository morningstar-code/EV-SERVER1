import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "tcg-card",
    initialState: {
        flipped: true,
        print: {},
        printSet: {},
        rarity: 'common',
        holo: 'none',
    }
};

export default store;