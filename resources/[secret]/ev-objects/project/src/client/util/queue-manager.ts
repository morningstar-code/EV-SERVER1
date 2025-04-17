import { EventEmitter } from 'events';
import { Queue } from './queue';

export class QueueManager extends EventEmitter {
    public queues: Map<string | Buffer | undefined, Queue>;

    constructor() {
        super(...arguments);
        this.queues = new Map<string, Queue>();
    }

    add(id: string | Buffer | undefined, task: any) {
        if (!this.queues.has(id)) {
            const queue = new Queue();
            this.queues.set(id, queue);
            queue.on('finished', () => {
                this.queues.delete(id);
                if (!this.hasPending()) {
                    this.emit('empty');
                }
            });
        }
        
        return this?.queues?.get(id ?? '')?.addTask(task);
    }

    hasPending() {
        return this.queues.size > 0;
    }
}