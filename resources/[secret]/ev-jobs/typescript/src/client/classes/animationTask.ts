import { Delay } from "@shared/utils/tools";
import { LoadAnimDict, TaskBar, TaskBarSkill } from "client/utils/tools";

export class AnimationTask {
    ped: number;
    type: string;
    flag: number;
    text: string;
    active: boolean;
    duration: { difficulty: number, gap: number }[] | number;
    dictionary: string;
    animation: string;
    tickId: number;
    task: Promise<number | boolean> | "";
    constructor(pPed: number, pType: string, pText: string, pDuration: { difficulty: number, gap: number }[] | number, pDictionary: string, pAnimation: string, pFlag = 1) {
        this.ped = pPed;
        this.type = pType;
        this.flag = pFlag;
        this.text = pText;
        this.active = false;
        this.duration = pDuration;
        this.dictionary = pDictionary;
        this.animation = pAnimation;
        this.tickId = 0;
        this.task = "";
    }

    start(cb?: Function) {
        if (this.active) return;
        this.active = true;

        cb && cb();

        this.tickId = setTick(async () => {
            if (this.animation && !IsEntityPlayingAnim(this.ped, this.dictionary, this.animation, 3)) {
                LoadAnimDict(this.dictionary); //LoadAnimDictTimeout?
                TaskPlayAnim(this.ped, this.dictionary, this.animation, -8, -8, -1, this.flag, 0, false, false, false);
            } else {
                if (!this.animation && !IsPedUsingScenario(this.ped, this.dictionary)) {
                    TaskStartScenarioInPlace(this.ped, this.dictionary, 0, true);
                }
            }
            await Delay(100);
        });

        this.task = "";
        if (this.type === "skill" && this.duration instanceof Array) {
            this.task = new Promise(async (resolve) => {
                const duration = this.duration as { difficulty: number, gap: number }[];

                for (const key of duration) {
                    const finished = await TaskBarSkill(key.difficulty, key.gap);
                    if (finished !== 100) return resolve(0);
                }

                resolve(100);
            });
        } else if (this.type === "normal" && typeof this.duration === "number") {
            this.task = TaskBar(this.duration, this.text);
        }

        if (this.task instanceof Promise) {
            this.task.then(() => {
                this.stop();
            })
        }

        return this.task;
    }

    stop() {
        if (!this.active) return;
        this.active = false;
        clearTick(this.tickId);

        if (!this.animation && IsPedUsingScenario(this.ped, this.dictionary)) {
            ClearPedTasks(this.ped);
            ClearPedTasksImmediately(this.ped);
        } else {
            StopAnimTask(this.ped, this.dictionary, this.animation, 3);
        }
    }

    abort() {
        if (!this.active) return;
        global.exports["ev-taskbar"].taskCancel();
        this.stop();
    }
}