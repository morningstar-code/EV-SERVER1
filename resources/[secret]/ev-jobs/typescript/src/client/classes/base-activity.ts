import EventEmitter from "events";

export class BaseActivity<TData, TSettings> extends EventEmitter {
    id: string;
    type: string;
    data: any = {} as unknown as TData;
    settings: any = {} as unknown as TSettings;

    constructor(id: string, type: string) {
        super();
        this.id = id;
        this.type = type;
    }

    updateData(pType: string, pValue: string | number) {
        this.data[pType] = pValue;
        this.emit("update", "data", pType, pValue);
    }
    
    updateSettings(pType: string, pValue: string | number) {
        this.settings[pType] = pValue;
        this.emit("update", "settings", pType, pValue);
    }
}