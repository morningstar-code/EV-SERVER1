import { GetRandom } from "@shared/utils/tools";
import { AnimationTask } from "client/classes/animationTask";
import { GetClosestBone, GetDistBetweenCoords } from "client/utils/vectors";

export const animationSettings = new Map<string, any>();

export async function InitAnimationList(): Promise<void> {
    ItemAnimationList.forEach((element) => {
        SetAnimationSettings(element.name, element.animation);
    })
}

export const ItemAnimationList = [
    {
        name: "vehicle:cosmetic",
        animation: {
            type: "skill",
            text: "Installing part to Vehicle...",
            duration: GetSkillGapDuration(6, [0x2710, 0xfa0, 0x2710, 0xfa0, 0x2710, 0xfa0], 8, 15),
            dictionary: "WORLD_HUMAN_WELDING",
            animation: "",
            data: { distance: 2.5 }
        }
    },
    {
        name: "vehicle:performance",
        animation: {
            type: "skill",
            text: "Installing part to Vehicle...",
            duration: GetSkillGapDuration(6, [0x2710, 0xfa0, 0x2710, 0xfa0, 0x2710, 0xfa0], 8, 15),
            dictionary: "WORLD_HUMAN_WELDING",
            animation: "fixing_a_player",
            data: { distance: 3.5 }
        }
    },
    {
        name: "vehicle:respray",
        animation: {
            type: "skill",
            text: "Spraying Vehicle...",
            duration: GetSkillGapDuration(6, [0x2710, 0xfa0, 0x2710, 0xfa0, 0x2710, 0xfa0], 8, 15),
            dictionary: "anim@amb@business@weed@weed_inspecting_lo_med_hi@",
            animation: "weed_spraybottle_crouch_spraying_01_inspector",
            flag: 49,
            data: { distance: 3.5 }
        }
    }
];

export function GetAnimationSettings(pName: string) {
    return animationSettings.get(pName);
}

export function SetAnimationSettings(pName: string, pAnim: any) {
    animationSettings.set(pName, pAnim);
}

export function HasAnimationSettings(pName: string) {
    return animationSettings.has(pName);
}

export function GetSkillGapDuration(amount: any, skillGaps: any, min: any, max: any) {
    const _0x53a995: any = [];
    for (let i = 0; i < amount; i += 1) {
        const difficulty = typeof skillGaps === "number" ? skillGaps / amount : skillGaps[i];
        const _0x5d834e = {
            get 'gap'() {
                return GetRandom(min, max);
            }
        } as any;
        _0x5d834e.difficulty = difficulty;
        _0x53a995.push(_0x5d834e);
    }
    return _0x53a995;
}

export async function PlayAnimation(pPed: any, pEntity: any, pAnimation: any) {
    const settings = typeof pAnimation === "string" ? GetAnimationSettings(pAnimation) : pAnimation;
    if (!settings) return;
    const animation = new AnimationTask(PlayerPedId(), settings.type, settings.text, settings.duration, settings.dictionary, settings.animation, settings.flag);
    let callback = settings.callback;
    if (!callback && settings.data) {
        const data = settings.data;
        callback = (self: any, target: any) => {
            let dist;
            if (data.bones) {
                const closestBone = GetClosestBone(target, data.bones);
                dist = closestBone[2];
            } else dist = GetDistBetweenCoords(GetEntityCoords(PlayerPedId(), false), GetEntityCoords(target, false));
            if (dist && dist > data.distance) {
                self.abort();
            }
        };
    }
    return await animation.start((self: any) => {
        if (!callback) return;
        const interval = setInterval(() => {
            if (!self.active) {
                clearInterval(interval);
                self.abort();
            }
            callback(self, pEntity);
        }, 1000);
    });
}