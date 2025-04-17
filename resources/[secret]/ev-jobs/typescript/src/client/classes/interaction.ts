import { DisplayTextOnWorldCoord } from "client/utils/tools";
import { Vectors } from "./vectors";

interface InteractionData {
    type: string;
    mode: string;
    text: string;
    offsets: Vector3;
}

export class Interaction {
    type: string;
    mode: string;
    text: string;
    offsets: Vector3;
    vectors: Vectors;
    active: boolean;
    tickId: number;

    constructor(pData: InteractionData, pVectors: Vectors) {
        this.type = pData.type;
        this.mode = pData.mode;
        this.text = pData.text;
        this.offsets = pData.offsets || { x: 0, y: 0, z: 0 };
        this.vectors = pVectors;
        this.active = false;
        this.tickId = 0;
    }

    enable() {
        if (this.active) return;
        this.active = true;
        if (this.type === "floating") {
            this.tickId = setTick(() => {
                DisplayTextOnWorldCoord(this.vectors, this.text, this.offsets);
            });
        } else {
            SendUIMessage({
                app: "interactions",
                source: "ev-nui",
                data: {
                    message: this.text,
                    show: true,
                    type: this.mode
                }
            });
        }
    }
    
    disable() {
        if (!this.active) return;
        this.active = false;
        if (this.type === "floating") {
            clearTick(this.tickId);
        } else {
            SendUIMessage({
                app: "interactions",
                source: "ev-nui",
                data: {
                    show: false
                }
            });
        }
    }
}