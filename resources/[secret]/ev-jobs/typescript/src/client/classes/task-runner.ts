import EventEmitter from "events";

export class TaskRunner extends EventEmitter {
    active: boolean;
    threads: (number | (() => Promise<void> | void))[] | number[];
    handlers: any[];

    constructor() {
        super();
        this.active = true;
        this.threads = [];
        this.handlers = [];
    }

    addThread(thread: () => Promise<void> | void) {
        this.threads.push(typeof thread !== "number" ? setTick(thread) : thread);
    }

    addHandler(handler: any) {
        this.handlers.push(handler);
    }

    stop() {
        this.active = false;
        this.threads.forEach(thread => clearTick(thread as number));
        this.handlers.forEach(handler => handler.disable());
        this.release();
    }

    release() {
        this.removeAllListeners("taskEvent");
    }
}