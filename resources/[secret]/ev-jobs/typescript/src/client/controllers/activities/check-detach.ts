//Classes
import { TaskRunner } from "client/classes/task-runner";

import { ActivityData } from ".";
import { Delay } from "@shared/utils/tools";

export function checkDetach(pActivityId: number, pTaskData: any): TaskRunner {
    const taskRunner = new TaskRunner();
    const activityData = ActivityData.get(pActivityId);
    if (!activityData) return taskRunner;
    const { settings: settings, objectives: objectives } = pTaskData;

    taskRunner.addThread(async () => {
        for (const objective of activityData.objectives.values()) {
            if (objective.status === "waiting" && objectives.some((obj: any) => objective.id === obj)) {
                const attachment = settings.attach.attachments.find((attachment: any) => attachment.id === objective.id);
                if (attachment) {
                    const reference = activityData.references.get(attachment.reference);
                    const target = activityData.references.get(attachment.target);
                    if (reference && target) { //When calling .handle it calls the get method in Entity class
                        if (!IsEntityAttachedToEntity(reference.handle, target.handle)) {
                            taskRunner.emit("taskEvent", "objectiveCompleted", objective.id);
                        } //Ref handle being towtruck and target handle being the vehicle being towed
                    }
                }
            }
        }
        await Delay(1000);
    });

    return taskRunner;
}