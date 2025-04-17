//Classes
import { TaskRunner } from "client/classes/task-runner";

import { mapReferences } from "client/utils/map-references";
import { destination } from "./destination";

export function loadCargo(pActivityId: number, pTaskData: any): TaskRunner {
    const taskRunner = new TaskRunner();
    const mappedReferences = mapReferences(pTaskData);

    mappedReferences.forEach((reference: any) => {
        const destinationTaskRunner = destination(pActivityId, reference);
        destinationTaskRunner.on("taskEvent", (pType: string, ...pArgs: any) => {
            if (pType === "objectiveCompleted") {
                const [p1, p2] = pArgs;
                if (p2) {
                    taskRunner.emit("taskEvent", "requestObjective", "waiting", null, p2);
                }
            }
        });
    });

    return taskRunner;
}