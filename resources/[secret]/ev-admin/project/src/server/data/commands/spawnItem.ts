import { RankValue } from "../../../shared/classes/enums";

interface SpawnItemArgs {
    Target: {
        source: number;
        steamid: string;
        name: string;
        queueType: string;
    } | '';
    Item: string;
    Amount: number | string;
}

export const spawnItem: CommandData = {
    name: 'spawnItem',
    value: RankValue.admin,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: SpawnItemArgs) {
        if (pArgs.Amount === undefined || pArgs.Amount === "") pArgs.Amount = 1;

        if (typeof pArgs.Amount === 'string') {
            pArgs.Amount = parseInt(pArgs.Amount);
        }

        if (isNaN(pArgs.Amount)) {
            return 'Invalid amount';
        }

        if (pArgs.Amount < 1) {
            return 'Amount must be greater than 0';
        }

        if (pArgs.Item === undefined || pArgs.Item === "") {
            return 'Invalid item';
        }

        let target = null;
        if (pArgs?.Target !== "" && pArgs?.Target !== undefined) {
            target = pArgs.Target.source;
        } else {
            target = pUser.source;
        }

        emitNet('player:receiveItem', target, pArgs.Item, pArgs.Amount);

        return '' + pArgs.Item + ')';
    },
    log: 'Spawned item (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Spawn Item',
                cat: 'Utility',
                child: {
                    inputs: ['TargetNot', 'Item', 'Amount'],
                },
            },
            options: { bindKey: null },
        },
    },
    blockClientLog: true,
};