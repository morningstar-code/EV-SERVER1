import { EventEmitter } from 'events';

export class Queue extends EventEmitter {
    public queue: {
        task: Function;
        resolve: Function;
        reject: Function;
    }[];
    public busy: boolean;

    constructor() {
        super(...arguments);
        this.queue = [];
        this.busy = false;
    }

    runNext() {
        if (!this.busy && this.queue.length > 0) {
            const queue = this.queue.shift();
            if (!queue) {
                return;
            }

            const { task, resolve, reject } = queue;

            this.busy = true;

            task().then(resolve).catch(reject).then(() => {
                this.busy = false;
                this.queue.length === 0 ? this.emit('finished') : this.runNext();
            });
        }
    }

    addTask(task: Function) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.runNext();
        });
    }
}