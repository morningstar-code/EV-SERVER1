import { Base } from "@cpx/server";

const logs = new Map<string, { character_name: string, character_id: number, timestamp: string }[]>();

export const getCreationLogs = async (pSource: number, pType: string) => {
    if (!logs.has(pType)) {
        logs.set(pType, []);
    }

    return logs.get(pType);
};

export const addLog = async (pSource: number, pType: string, pAction: string) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    if (!logs.has(pType)) {
        logs.set(pType, []);
    }

    const log = logs.get(pType);
    if (!log) return;

    const date = new Date();
    const fullDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    log.push({
        character_name: `${user.character.first_name} ${user.character.last_name}`,
        character_id: user.character.id,
        timestamp: fullDate
    });

    logs.set(pType, log);
};