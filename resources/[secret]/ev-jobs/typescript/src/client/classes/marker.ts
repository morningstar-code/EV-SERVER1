import { DrawMarkerOnOffset } from "client/utils/tools";
import { Vectors } from "./vectors";

interface MarkerData {
    sprite: number;
    scale: number;
    color: number;
    offsets: Vector3;
}

export class Marker {
    sprite: number;
    scale: number;
    color: number;
    offsets: Vector3;
    vectors: Vectors;
    active: boolean;
    tickId: number;

    constructor(markerData: MarkerData, markerVectors: Vectors) {
        this.sprite = markerData.sprite;
        this.scale = markerData.scale;
        this.color = markerData.color;
        this.offsets = markerData.offsets;
        this.vectors = markerVectors;
        this.active = false;
        this.tickId = 0;
    }

    enable() {
        if (this.active) return;
        this.active = true;
        this.tickId = setTick(() => {
            DrawMarkerOnOffset(this.vectors, this.sprite, this.scale, this.offsets, this.color);
        });
    }
    
    disable() {
        if (!this.active) return;
        this.active = false;
        clearTick(this.tickId);
    }
}