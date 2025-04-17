import { StoreObject } from "lib/redux";
import { devData } from "main/phone/dev-data";

const store: StoreObject = {
    key: "phone.apps.jobs",
    initialState: {
        activity: "none", //temp solution (null)
        job: "none", //temp solution (null)
        group: "none", //temp solution (null)
        groups: [], //devData.getJobCenterGroups()
        jobs: [],
        requestId: 0
    }
};

export default store;