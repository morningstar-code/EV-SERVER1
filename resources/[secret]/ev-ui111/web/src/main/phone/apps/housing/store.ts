import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "phone.apps.housing",
    initialState: {
        apartments: [],
        apartmentTypes: [],
        currentApartment: null,
        editMode: false,
        availableEditOptions: {},
        properties: [],
    }
};

export default store;