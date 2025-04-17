import { BaseActivity } from "./base-activity";

interface ObjectiveData {
    status: string;
    damage: number;
}

interface ObjectiveSettings {
    requirement: string;
    reference: string;
}

export class Objective extends BaseActivity<ObjectiveData, ObjectiveSettings> {
    constructor(_data: { id: string, type: string, data: ObjectiveData, settings: ObjectiveSettings }) {
        super(_data.id, _data.type);
        this.data = _data.data;
        this.settings = _data.settings;
    }

    get status() {
        return this?.data?.status;
    }

    get damage() {
        return this?.data?.damage;
    }

    get requirement() {
        return this?.settings?.requirement;
    }

    get reference() {
        return this?.settings?.reference;
    }
}