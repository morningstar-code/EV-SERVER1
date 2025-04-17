//Tasks
import { customEvent } from "./custom-event";
import { getVehicle } from "./get-vehicle";
import { destination } from "./destination";
import { checkAttach } from "./check-attach";
import { checkDetach } from "./check-detach";
import { loadCargo } from "./load-cargo";
import { spawnEntity } from "./spawn-entity";
import { despawnEntity } from "./despawn-entity";
import { destroyEntity } from "./destroy-entity";

//Classes
import { BaseActivity } from "client/classes/base-activity";
import { Entity } from "client/classes/entity";
import { Vectors } from "client/classes/vectors";
import { Objective } from "client/classes/objective";
import { TaskRunner } from "client/classes/task-runner";

export const ActivityData = new Map<number, { references: any, objectives: any }>();
export const TaskRunners = new Map<string, TaskRunner>();

export function InitActivities(): void { }

function GetTaskRunner(pActivityId: number, pTaskData: any) {
    let result;

    switch (pTaskData.type) {
        case "customEvent": //This always gets called first
            result = customEvent(pActivityId, pTaskData);
            break;
        case "getVehicle":
            result = getVehicle(pActivityId, pTaskData);
            break;
        case "destination": //Called second for sanitation/store etc.
            result = destination(pActivityId, pTaskData);
            break;
        case "checkAttach":
            result = checkAttach(pActivityId, pTaskData);
            break;
        case "checkDetach":
            result = checkDetach(pActivityId, pTaskData);
            break;
        case "loadCargo":
            result = loadCargo(pActivityId, pTaskData);
            break;
        case "spawnEntity":
            result = spawnEntity(pActivityId, pTaskData);
            break;
        case "despawnEntity":
            result = despawnEntity(pActivityId, pTaskData);
            break;
        case "destroyEntity":
            result = destroyEntity(pActivityId, pTaskData);
            break;
    }

    return result as any;
}

onNet("ev:jobs:setActivityData", (pActivityId: number, pData: { references: any[], objectives: any }) => { //This sets all the references and objectives for the activity
    const references = new Map();
    const objectives = new Map();

    pData.references.forEach((reference: any) => {
        let result;
        switch (reference.value.type) { //Can be entity | vectors | zone
            case "entity":
                result = new Entity(reference.value);
                break;
            case "vectors":
                result = new Vectors(reference.value);
                break;
            default:
                result = reference.value;
        }
        references.set(reference.key, result);
    });

    pData.objectives.forEach((objective: any) => {
        objectives.set(objective.key, new Objective(objective.value));
    });

    if (!ActivityData.has(pActivityId)) {
        ActivityData.set(pActivityId, {
            references: references,
            objectives: objectives
        });
    }
});

onNet("ev:jobs:updateData", (pActivityId: number, pReferenceId: string, pType: any, pValue: any) => {
    const activityData = ActivityData.get(pActivityId);
    if (activityData) {
        const reference = activityData.references.get(pReferenceId);
        if (reference === undefined) return;
        if (reference instanceof BaseActivity) {
            reference.updateData(pType, pValue);
        } else {
            const copied = reference;
            copied.data[pType] = pValue;
        }
    }
});

onNet("ev:jobs:updateObjectiveData", (pActivityId: number, pObjectiveId: string, pType: any, pValue: any) => { //pObjectiveId might be pTaskCode
    const activityData = ActivityData.get(pActivityId);
    if (activityData) {
        const objective = activityData.objectives.get(pObjectiveId);
        if (objective === undefined) return;
        if (objective instanceof BaseActivity) {
            objective.updateData(pType, pValue);
        } else {
            const copied = objective;
            copied.data[pType] = pValue;
        }
    }
});

onNet("ev:jobs:updateObjectiveSettings", (pActivityId: number, pObjectiveId: string, pType: any, pValue: any) => { //pObjectiveId might be pTaskCode
    const activityData = ActivityData.get(pActivityId);
    if (activityData) {
        const objective = activityData.objectives.get(pObjectiveId);
        if (objective === undefined) return;
        if (objective instanceof BaseActivity) {
            objective.updateSettings(pType, pValue);
        } else {
            const copied = objective;
            copied.settings[pType] = pValue;
        }
    }
});

onNet("ev:jobs:updateSettings", (pActivityId: number, pReferenceId: string, pType: any, pValue: any) => {
    const activityData = ActivityData.get(pActivityId);
    if (activityData && activityData) {
        const reference = activityData.references.get(pReferenceId);
        if (reference === undefined) return;
        if (reference instanceof BaseActivity) {
            reference.updateSettings(pType, pValue);
        } else {
            const copied = reference;
            copied.settings[pType] = pValue;
        }
    }
});

onNet("ev:jobs:startTask", (pActivityId: number, pTaskCode: string, pTaskData: any) => { //This only starts 1 task of the activity
    const activityData = ActivityData.get(pActivityId);
    if (activityData) {
        const taskRunner = GetTaskRunner(pActivityId, pTaskData);
        TaskRunners.set(pTaskCode, taskRunner);
        taskRunner.on("taskEvent", async (type: string, ...args: any) => {
            switch (type) {
                case "objectiveCompleted": {
                    const [pObjectiveId] = args;
                    emitNet("ev:jobs:objectiveCompleted", pActivityId, pTaskCode, pObjectiveId);
                    break;
                }
                case "updateObjectiveData": {
                    const [pCurrentObjectiveName, pType, pValue] = args;
                    emitNet("ev:jobs:updateObjectiveData", pActivityId, pTaskCode, pCurrentObjectiveName, pType, pValue);
                    break;
                }
                case "requestObjective": {
                    const [pStatus, p2, p3] = args;
                    const objective = await RPC.execute("ev:jobs:getObjective", pTaskCode, pStatus, p2, p3);
                    taskRunner.emit("selectedObjective", objective);
                    break;
                }
                case "updateData": {
                    const [pReferenceId, pType, pValue] = args;
                    emitNet("ev:jobs:updateData", pActivityId, pReferenceId, pType, pValue);
                    break;
                }
            }
        });
    }
});

onNet("ev:jobs:updateTask", (pStatus: string, pTaskCode: string, ...pArgs: any) => {
    const taskRunner = TaskRunners.get(pTaskCode);
    if (taskRunner) switch (pStatus) {
        case "taskCompleted": {
            taskRunner.emit("taskCompleted");
            taskRunner.stop();
            TaskRunners.delete(pTaskCode);
            break;
        }
    }
});

onNet("ev:jobs:abortActivity", (pActivityId: number, pTaskCode: string) => {
    const taskRunner = TaskRunners.get(pTaskCode);
    if (taskRunner) {
        taskRunner.emit("taskCompleted");
        taskRunner.stop();
        TaskRunners.delete(pTaskCode);
        if (ActivityData.has(pActivityId)) ActivityData.delete(pActivityId);
    }
});

onNet("ev:jobs:activityCompleted", (pActivityId: number) => {
    TaskRunners && TaskRunners.forEach((taskRunner) => {
        taskRunner.stop();
    });
    TaskRunners.clear();
    if (ActivityData.has(pActivityId)) ActivityData.delete(pActivityId);
});

export function GetWaitingObjective(activityObjectives: any, taskDataObjectives: any) {
    for (const objective of activityObjectives.values()) {
        const somed = taskDataObjectives.some((obj: any) => {
            return objective.id === obj;
        });
        if (objective?.status && objective?.status === "waiting" && somed) {
            return objective;
        }
    }
}