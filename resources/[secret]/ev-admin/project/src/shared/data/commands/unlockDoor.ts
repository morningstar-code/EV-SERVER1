import { RankValue } from "../../classes/enums";

interface UnlockDoorArgs {
    Entity: number;
}

export const unlockDoor: CommandData = {
    name: 'unlockDoor',
    value: RankValue.special,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: UnlockDoorArgs) {
        const doorId = global.exports['ev-doors'].GetTargetDoorId(pArgs.Entity);
        if (!doorId) return 'Failed to lock door. Door does not exist.';
        emitNet('ev-doors:change-lock-state', doorId, false);
        return 'Unlocked door ' + doorId;
    },
    log: '',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Unlock Door',
            child: null,
            action: '',
            entityType: 3,
            lockedDoor: true,
        },
    },
};