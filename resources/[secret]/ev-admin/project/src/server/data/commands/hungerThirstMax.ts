import { RankValue } from "../../../shared/classes/enums";

interface HungerThirstMaxArgs {
    Job: string;
    Rank: string;
    Target: Target;
}

export const hungerThirstMax: CommandData = {
    name: 'hungerThirstMax',
    value: RankValue.junior,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: HungerThirstMaxArgs) {
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;

        emitNet("ev-admin:maxstats", target.source);
        emitNet("ev-hospital:client:RemoveBleed", target.source); 
        emitNet("ev-hospital:client:ResetLimbs", target.source);

        return ' -' + target.name + '-';
    },
    log: 'Max Statted',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Hunger / Thirst Max',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot'],
                }
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};