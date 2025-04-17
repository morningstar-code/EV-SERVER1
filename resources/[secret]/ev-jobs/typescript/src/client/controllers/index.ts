import EventEmitter from "events";
import { InitConfig } from "@shared/config";
import { InitEvents } from "./events";
import { InitItems } from "./items";
import { InitZones } from "./zones";
import { InitNPCs } from "./npcs";
import { InitActivities } from "./activities";
import { InitJobs } from "./jobs";
import { InitJobListener } from "./job-listener";
import { InitGeoFence } from "./geo-fence";

export class KeyListener extends EventEmitter {
    public keys: Set<string>;
    public contexts: Map<string, any>;
    public thread: any;

    constructor() {
        super();
        this.keys = new Set();
        this.contexts = new Map();
    }

    refresh() {
        this.keys.forEach(key => {
            for (const [k, v] of this.contexts) {
                if (v.has(key)) return;
            }
            this.keys.delete(key);
        });
        if (this.thread && this.keys.size === 0) this.stop();
    }

    hasKey(key: string, value: any) {
        return this.contexts.get(key)?.has(value) ?? false;
    }

    addKey(key: string, value: any) {
        if (!this.contexts.has(key)) this.contexts.set(key, new Set());
        this.keys.add(value);
        this.contexts.get(key).add(value);
        if (!this.thread) this.start();
    }

    removeKey(key: string, value: any) {
        if (!this.contexts.has(key)) this.contexts.set(key, new Set());
        const context = this.contexts.get(key);
        if (!context.has(value)) return;
        context.delete(value);
        this.refresh();
    }

    start() {
        if (this.thread) return;
        this.thread = setTick(() => {
            if (this.keys.size === 0) {
                return this.stop();
            }
            this.keys.forEach((key: any) => {
                if (IsControlJustReleased(0, key)) {
                    this.emit("IsControlJustReleased", key);
                }
            });
        });
    }

    stop() {
        if (!this.thread) return;
        const thread = this.thread;
        this.thread = null;
        clearTick(thread);
        this.removeAllListeners();
    }
}

export const Listener = new KeyListener();

export const Init = async (): Promise<void> => {
    await InitConfig();
    await InitEvents();
    await InitItems();
    await InitZones();
    await InitNPCs();
    await InitActivities();
    await InitJobs();
    await InitJobListener();
    await InitGeoFence();
}