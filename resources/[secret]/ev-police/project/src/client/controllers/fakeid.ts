import { Events, Interface, Procedures, Zones } from "@cpx/client";

Events.on('ev-police:cid:viewLogs', () => {
    viewLogs();
});

Events.on('ev-police:cid:createFakeId', () => {
    createFakeId();
});

export const InitFakeId = async (): Promise<void> => {
    Zones.addBoxTarget('1', 'pd_create_id', { x: 484.225, y: -994.029, z: 30.667 }, 1, 1, {
        minZ: 29,
        maxZ: 31.45
    });

    Interface.addPeekEntryByTarget('pd_create_id', [{
        CPXEvent: 'ev-police:cid:createFakeId',
        id: 'pd_create_id_main',
        icon: 'book',
        label: 'Create new ID card'
    }, {
        NPXEvent: 'ev-police:cid:viewLogs',
        id: 'pd_create_id_logs',
        icon: 'list',
        label: 'View logs'
    }], {
        distance: { radius: 2 },
        job: ['police']
    });
};

const viewLogs = async () => {
    const creationLogs = await Procedures.execute<{ character_name: string, character_id: number, timestamp: string }[]>('ev-police:cid:getCreationLogs', 'fakeid');

    const menuData = [];

    menuData.push({
        title: 'Creation History',
        icon: 'info-circle',
        action: '',
        key: {}
    });

    for (const creationLog of creationLogs) {
        menuData.push({
            description: 'Created Fake ID',
            title: `${creationLog.character_name} (${creationLog.character_id}) at ${creationLog.timestamp} `,
        });
    }

    global.exports['ev-ui'].showContextMenu(menuData);
};

const createFakeId = async () => {
    const prompt = await global.exports['ev-ui'].OpenInputMenu([{
        name: 'first',
        label: 'Firstname',
        icon: 'user'
    }, {
        name: 'last',
        label: 'Lastname',
        icon: 'user'
    }, {
        name: 'sex',
        label: 'Sex',
        icon: 'genderless'
    }, {
        name: 'dob',
        label: 'Date of Birth (YYYY-MM-DD)',
        icon: 'calendar-day'
    }], (values: any) => {
        if (!values.first) {
            TriggerEvent('DoLongHudText', 'Please provide a firstname', 2);
            return false;
        }

        if (!values.last) {
            TriggerEvent('DoLongHudText', 'Please provide a lastname', 2);
            return false;
        }

        if (!values.sex) {
            TriggerEvent('DoLongHudText', 'Please provide a sex', 2);
            return false;
        }

        if (!values.dob) {
            TriggerEvent('DoLongHudText', 'Please provide a date of birth', 2);
            return false;
        }

        return true;
    });

    emit('player:receiveItem', 'idcard', 1, false, {}, JSON.stringify({
        fake: 1,
        Identifier: Math.floor(Math.random() * 1000) + 1000,
        Name: prompt.first,
        Surname: prompt.last,
        Sex: prompt.sex,
        DOB: prompt.dob,
        Expiry: new Date().getFullYear(),
        _hideKeys: ['fake']
    }));

    await Procedures.execute('ev-police:cid:addLog', 'fakeid', 'created');
};