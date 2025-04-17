import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "taskbar",
    initialState: {
        display: false,
        duration: 1000,
        taskID: 'taskid-1',
        label: 'Loading...',
    }
};

export default store;