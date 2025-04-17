import { Events, Procedures } from "@cpx/client";

export const InitSuspensions = (): void => {
    global.exports['ev-polytarget'].AddBoxZone('pd_suspensions_pc', { x: 453.21, y: -986.86, z: 30.69 }, 1.6, 2.2, {
        minZ: 30.49,
        maxZ: 31.09,
        heading: 0,
        data: { id: 'pd_suspensions_pc' }
    });

    global.exports['ev-interact'].AddPeekEntryByPolyTarget('pd_suspensions_pc', [{
        CPXEvent: 'ev-police:viewSuspensions',
        id: 'view_suspensions',
        icon: 'book',
        label: 'View Suspensions',
        parameters: {}
    }], {
        distance: { radius: 3.5 },
        isEnabled: () => true
    });
};

const getMinutesRemaining = (currentTime: number) => {
    const currentTimestamp = Date.now() / 1000;
    const timeRemaining = currentTime - currentTimestamp;
    if (timeRemaining <= 0) return 'Suspension completed';
    const minutesRemaining = Math.floor(timeRemaining / 60);
    return minutesRemaining + ' Minute' + (minutesRemaining > 1 ? 's' : '');
};

Events.onNet('ev-police:viewSuspensions', async () => {
    const myjob = global.exports.isPed.isPed('myjob');

    if (myjob !== 'police') return emit('DoLongHudText', 'Unauthorized.', 2);

    const currentSuspensions = await Procedures.execute<{ first_name: string, last_name: string, suspension_end: number, suspended_by: string }[]>('ev-police:getCurrentSuspensions');

    const mappedMenuData = currentSuspensions.map(currentSuspension => {
        return {
            icon: 'user',
            title: `${currentSuspension.first_name} ${currentSuspension.last_name}`,
            description: `Remaining: ${getMinutesRemaining(currentSuspension.suspension_end)} | Suspended By: ${currentSuspension.suspended_by}`,
        };
    }) as any[];

    if (mappedMenuData.length <= 0) {
        mappedMenuData.push({
            icon: 'frown-open',
            title: 'No active suspensions',
            description: '',
            action: '',
            key: {}
        });
    }

    mappedMenuData.unshift({
        icon: 'user',
        title: 'Current Suspensions',
        description: '',
        action: '',
        key: {}
    });

    global.exports['ev-ui'].showContextMenu(mappedMenuData);
});