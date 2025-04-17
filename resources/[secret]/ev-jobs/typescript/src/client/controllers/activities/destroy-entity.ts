//Classes
import { TaskRunner } from "client/classes/task-runner";

import { ActivityData } from ".";
import { Delay } from "@shared/utils/tools";

export function destroyEntity(pActivityId: number, pTaskData: any): TaskRunner {
    const taskRunner = new TaskRunner();
    const activityData = ActivityData.get(pActivityId);
    if (!activityData) return taskRunner;
    const { settings: settings, objectives: objectives } = pTaskData;

    const objective = activityData.objectives.get(objectives.pop());
    const target = activityData.references.get(settings.destroy.target);

    taskRunner.addThread(async () => {
        const isDriveable = IsVehicleDriveable(target.handle, false);
        if (!isDriveable) {
            taskRunner.emit("taskEvent", "objectiveCompleted", objective.id);
        }
        await Delay(1000);
    });

    return taskRunner;
}