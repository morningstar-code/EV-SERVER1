import { Vector } from "@shared/classes/vector";
import { BaseActivity } from "./base-activity";

interface VectorsData {
    vectors: Vector;
}

interface VectorsSettings {
    heading: number;
    vectors: Vector;
}

export class Vectors extends BaseActivity<VectorsData, VectorsSettings> {
    constructor(_data: { id: string, type: string, data: VectorsData, settings: VectorsSettings }) {
        super(_data.id, _data.type);
        this.data = _data.data;
        this.settings = _data.settings;
    }

    get vectors() {
        if (this?.data?.vectors) {
            return this.data.vectors;
        } else {
            const r = Vector.fromObject(this.settings.vectors);
            return r;
        }
    }

    get heading() {
        return this.settings.heading;
    }

    get x() {
        return this.vectors.x;
    }

    get y() {
        return this.vectors.y;
    }

    get z() {
        return this.vectors.z;
    }
}