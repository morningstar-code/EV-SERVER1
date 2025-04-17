import { BaseActivity } from "./base-activity";
import { GetEntityFromNetId } from "@shared/utils/tools";

interface EntityData {
    handle: number;
    netId: number;
}

interface EntitySettings {
    reference: string;
}

export class Entity extends BaseActivity<EntityData, EntitySettings> {
    constructor(pData: { id: string, type: string, data: EntityData, settings: EntitySettings }) {
        super(pData.id, pData.type);
        this.data = pData.data;
        this.settings = pData.settings;
    }
    
    get handle() {
        return DoesEntityExist(this.data.handle) ? this.data.handle : this.data.handle = GetEntityFromNetId(this.type, this.netId);
    }

    get netId() {
        return this.data.netId;
    }

    get exist() {
        return DoesEntityExist(this.handle);
    }
}