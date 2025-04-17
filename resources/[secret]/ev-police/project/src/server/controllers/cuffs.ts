import { Base } from "@cpx/server";

type RecentCuffs = {
    [key: number]: RecentCuff[];
}

export const recentCuffs: RecentCuffs = {};

export const cuffsGranted = async (pSource: number, pTargetServerId: number, pIsSoftCuff: boolean) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    if (!recentCuffs[pTargetServerId]) recentCuffs[pTargetServerId] = [];

    recentCuffs[pTargetServerId].push({
        cuffer: { fullName: `${user.character.first_name} ${user.character.last_name}` },
        action: "cuff",
        timestamp: Date.now()
    })

    emitNet("ev-police:cuffs:playCuffingAnimation", pSource, pTargetServerId);

    pIsSoftCuff ? emitNet("ev-police:cuffs:softCuffs", pTargetServerId) : emitNet("ev-police:cuffs:cuffed", pTargetServerId);
};

export const cuffsUncuff = async (pSource: number, pTargetServerId: number) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    if (!recentCuffs[pTargetServerId]) recentCuffs[pTargetServerId] = [];

    recentCuffs[pTargetServerId].push({
        cuffer: { fullName: `${user.character.first_name} ${user.character.last_name}` },
        action: "uncuff",
        timestamp: Date.now()
    });

    emitNet("ev-police:cuffs:reset", pTargetServerId);
}