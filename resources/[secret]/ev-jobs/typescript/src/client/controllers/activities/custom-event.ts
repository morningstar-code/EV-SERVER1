//Classes
import { TaskRunner } from "client/classes/task-runner";

import { ActivityData } from ".";

export function customEvent(pActivityId: number, pTaskData: any): TaskRunner { //pTaskData is probs not named this, but something else (that comes from server-side)
    const taskRunner = new TaskRunner();
    const activityData = ActivityData.get(pActivityId);
    if (!activityData) return taskRunner;
    const { settings: settings } = pTaskData;

    const objectives: any[] = [];
    const references: any[] = [];

    if (pTaskData.objectives) {
        pTaskData.objectives.forEach((objective: any) => {
            objectives.push(activityData.objectives.get(objective));
        });
    }

    settings.event.params && settings.event.params.forEach((param: any) => {
        references.push(activityData.references.get(param));
    });

    taskRunner.on("taskCompleted", () => {
        emit(`${pTaskData.settings.event.name}:completed`);
    });

    emit(pTaskData.settings.event.name, pActivityId, pTaskData.name, references, objectives, (type: string, ...args: any) => {
        switch (type) {
            case "getObjectiveData":
                const [objective] = args;
                return activityData.objectives.get(objective);
            case "getReferenceData":
                const [reference] = args;
                return activityData.references.get(reference);
            default:
                taskRunner.emit("taskEvent", type, ...args);
        }
    });

    return taskRunner;
}