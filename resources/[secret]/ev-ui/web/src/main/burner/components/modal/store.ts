import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "burner.modal",
    initialState: {
        closeOnErrorOkay: false,
        confirmText: '',
        content: '',
        error: null,
        hideOnOkay: true,
        isConfirm: false,
        loading: false,
        onConfirm: () => { },
        show: false,
        slowHide: false,
    }
};

export default store;