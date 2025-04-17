import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "hasino-lower-pc",
    initialState: {
        show: false,
        a: 'A',
        b: 'B',
        c: 'C',
        prompts: [
            '(A - B x C) + 3 ^ 2',
            '(A + B + C) - 3',
            '(A + B x C) + 4 ^ 2',
            '(A + B + C) + 7 - 10',
        ],
    }
};

export default store;