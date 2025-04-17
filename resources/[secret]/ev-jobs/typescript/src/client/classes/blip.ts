//Classes
import { Vectors } from "client/classes/vectors";
import { Entity } from "client/classes/entity";

import { GetNetworkedCoords } from "client/lib/infinity";
import { Delay } from "@shared/utils/tools";

interface BlipData {
    sprite: number;
    color: number;
    route: boolean;
    short: boolean;
    scale: number;
    text: string;
    type: string;
}

export class Blip {
    sprite: number;
    color: number;
    route: boolean;
    short: boolean;
    scale: number;
    text: string;
    type: string;
    vectors: Vectors = undefined as any;
    entity: Entity = undefined as any;
    handle: number;
    active: boolean;
    tickId: number;
    mode: string;

    constructor(pData: BlipData, pOther: Vectors | Entity) {
        this.sprite = pData.sprite;
        this.color = pData.color;
        this.route = pData.route;
        this.short = pData.short;
        this.scale = pData.scale;
        this.text = pData.text;
        this.type = pData.type;
        if (this.type === "vectors" && pOther instanceof Vectors) {
            this.vectors = pOther;
        } else if (this.type === "entity" && pOther instanceof Entity) {
            this.entity = pOther;
        }
        this.handle = 0;
        this.active = false;
        this.tickId = 0;
        this.mode = "";
    }
    enable() {
        if (this.active) return;
        this.active = true;
        this.type === "vectors" ? this.handle = AddBlipForCoord(this.vectors['x'], this.vectors['y'], this.vectors['z']) : this.tracking();
        this.setSettings();
    }
    setSettings() {
        if (this.sprite) {
            SetBlipSprite(this.handle, this.sprite);
        }
        this.color && SetBlipColour(this.handle, this.color);
        this.route && SetBlipRoute(this.handle, true);
        this.short && SetBlipAsShortRange(this.handle, true);
        this.scale && SetBlipScale(this.handle, this.scale);
        if (this.text) {
            BeginTextCommandSetBlipName("STRING");
            AddTextComponentString(this.text);
            EndTextCommandSetBlipName(this.handle);
        }
    }
    disable() {
        if (!this.active) return;
        this.active = false;
        clearTick(this.tickId);
        RemoveBlip(this.handle);
    }
    tracking() {
        if (this.tickId) return;
        this.tickId = setTick(async () => {
            let delay = 250;
            if (!this.entity.exist) {
                const coords = await GetNetworkedCoords(this.entity.type, this.entity.netId);
                if (this.mode === "coords") {
                    SetBlipCoords(this.handle, coords[0], coords[1], coords[2]);
                    delay = 1500;
                } else {
                    RemoveBlip(this.handle);
                    this.handle = AddBlipForCoord(coords[0], coords[1], coords[2]);
                    this.mode = "coords";
                    this.setSettings();
                }
            } else if (this.mode !== "entity") {
                RemoveBlip(this.handle);
                this.handle = AddBlipForEntity(this.entity.handle);
                this.mode = "entity";
                this.setSettings();
            }
            await Delay(delay);
        });
    }
}