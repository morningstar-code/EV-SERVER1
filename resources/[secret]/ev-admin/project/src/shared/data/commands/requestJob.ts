import { RankValue } from "../../../shared/classes/enums";

interface RequestJobArgs {
    Job: string;
    Target: Target
}

export const requestJob: CommandData = {
    name: 'requestJob',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: RequestJobArgs) {
        const target: any = pArgs?.Target !== undefined ? pArgs?.Target : pUser;
        if (!target) return 'Failed to request job. Target does not exist.';
        if (!pArgs.Job) return 'Failed to request job. No job specified.';

        console.log(`[Jobs] ${pUser.name} requested job ${pArgs.Job} for ${target.name}`);

        switch (pArgs.Job) {
            case 'police':
                emitNet("ev-duty:AttemptDuty", "police");
                break;
            case 'sheriff':
                emitNet("ev-duty:AttemptDuty", "sheriff");
                break;
            case 'state':
                emitNet("ev-duty:AttemptDuty", "state");
                break;
            case 'doc':
                emitNet("ev-duty:AttemptDuty", "doc");
                break;
            case 'dispatcher':
                emitNet("ev-duty:AttemptDuty", "dispatcher");
                break;
            case 'ems':
                emitNet("ev-duty:AttemptDutyEMS");
                break;
            case 'judge':
                emitNet("ev-duty:attempt_duty:judge");
                break;
            case 'lawyer':
                emitNet("ev-duty:attempt_duty:public_defender");
                break;
            default:
                emitNet("jobssystem:jobs", pArgs.Job);
                break;
        }

        return '' + pArgs.Job + ')';
    },
    log: 'Requested Job (',
    target: false,
    canTargetAbove: false,
    isClientCommand: true,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Request Job',
                cat: 'Player',
                child: {
                    inputs: ['TargetNot', 'Job'],
                },
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};