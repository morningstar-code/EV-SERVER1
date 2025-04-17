//Classes
import { TaskRunner } from "client/classes/task-runner";

import { ActivityData } from ".";
import { Delay } from "@shared/utils/tools";

export function checkAttach(pActivityId: number, pTaskData: any): TaskRunner {
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
                    if (reference && target) {
                        const entity = GetEntityAttachedTo(reference.handle);
                        if (DoesEntityExist(entity) && entity === target.handle) {
                            taskRunner.emit("taskEvent", "objectiveCompleted", objective.id);
                            SetEntityAsMissionEntity(entity, true, true);
                        }
                    }
                }
            }
        }
        await Delay(1000);
    });

    return taskRunner;
}