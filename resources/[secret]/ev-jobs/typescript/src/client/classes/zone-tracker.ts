import EventEmitter from "events";
import { Vector } from "@shared/classes/vector";

export class ZoneTracker extends EventEmitter {
    origin: Vector;
    target: Vector3 | number;
    checks: Map<string, { wanted: number, notified: boolean }>;
    current: number | string;
    active: boolean;
    tickId: number;

    constructor(origin: Vector, target: Vector3 | number) {
        super();
        this.origin = origin;
        this.target = target;
        this.checks = new Map();
        this.current = 0;
        this.active = false;
        this.tickId = 0;
    }
    
    addCheck(name: string, distance: number) {
        const check = { wanted: distance, notified: false };
        this.checks.set(name, check);
    }

    removeCheck(name: string) {
        this.checks.delete(name);
    }

    inDistance(check: string | { wanted: number }) {
        const distance = typeof check === "string" ? this.checks.get(check) : check;
        if (distance && typeof this.current === "number") {
            return this.current <= distance.wanted;
        }
    }

    async enable(interval = 0) {
        if (this.active) return;

        this.active = true;
        this.tickId = setTick(async () => {
            //this.current = typeof this.target === "string" ? GetNameOfZone(this.origin.x, this.origin.y, this.origin.z) : this.origin.getDistance(this.target);
            this.current = typeof this.target === "string" ? GetLabelText(GetNameOfZone(this.origin.x, this.origin.y, this.origin.z)) : this.origin.getDistance(this.target as Vector3);

            this.checks.forEach((check, name) => {
                const inRange = typeof check.wanted === "number" ? this.inDistance(check) : this.current === this.target;

                if (inRange && !check.notified) {
                    check.notified = true;
                    this.emit(name, true, this.current);
                } else if (!inRange && check.notified) {
                    check.notified = false;
                    this.emit(name, false, this.current);
                }
            });

            await Wait(interval);
        });
    }

    disable() {
        if (!this.active) return;

        this.active = false;
        clearTick(this.tickId);
    }
}