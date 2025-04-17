import { RankValue } from "../../classes/enums";
import { Procedures } from "@cpx/client";
import { Delay } from "../../utils/tools";

interface DeleteEntityArgs {
    Entity: number;
}

export const deleteEntity: CommandData = {
    name: 'deleteEntity',
    value: RankValue.admin,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: DeleteEntityArgs) {
        global.exports['ev-sync'].SyncedExecution('DeleteEntity', +pArgs.Entity);
        const object = global.exports['ev-objects'].GetObjectByEntity(+pArgs.Entity);
        if (object != null) {
            await RPC.execute('ev-objects:DeleteObject', object.id); //Procedures
        } else {
            await Delay(250);
            if (DoesEntityExist(+pArgs.Entity)) {
                global.exports['ev-sync'].SyncedExecution('SetEntityCoords', +pArgs.Entity, 0, 0, 0);
            }
            emit('ev:admin:updateUI');
        }
        return '[' + pArgs.Entity + ']';
    },
    log: 'Deleted Entity ',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        selection: {
            title: 'Delete Entity',
            child: null,
            action: '',
            entityType: -1,
        },
        adminMenu: {
            command: {
                title: 'Delete Entity',
                cat: 'Player',
                child: {
                    inputs: ['Entity'],
                },
            },
            options: { bindKey: null },
        },
    },
};