import { Base } from "@cpx/server";

export const getPlayerIdByCharacterId = (pCharacterId: number): number => {
    for (const player of getPlayers()) {
        const user: User = Base.getModule<PlayerModule>("Player").GetUser(Number(player));
        if (!user) continue;
        const characterId = user.character.id;
        if (characterId == pCharacterId) {
            return Number(player);
        }
    }

    return -1;
}

export const getPlayerCharacterIdByPlayerId = (pPlayerId: number): number => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pPlayerId);
    if (!user) return -1;
    return user.character.id;
}