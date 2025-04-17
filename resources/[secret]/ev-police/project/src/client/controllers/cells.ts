export const maxHungerAndThirst = () => {
    const myjob = global.exports.isPed.isPed('myjob');
    if (myjob === 'police') return;
    emit('setToMaxHungerThrist');
};

export const InitCells = (): void => {
    global.exports['ev-polyzone'].AddBoxZone('police_cell', { x: 366.71, y: -1607.55, z: 30.05 }, 5.8, 7.2, {
        heading: 319,
        minZ: 28.85,
        maxZ: 31.85,
        data: { id: 'davis_cell_1' }
    });

    global.exports['ev-polyzone'].AddBoxZone('police_cell', { x: 376.99, y: -1597.04, z: 25.45 }, 4.4, 8, {
        heading: 320,
        minZ: 24.45,
        maxZ: 27.05,
        data: { id: 'davis_cell_2' }
    });

    global.exports['ev-polyzone'].AddBoxZone('police_cell', { x: 482.63, y: -1013.97, z: 26.28 }, 3.4, 11.8, {
        heading: 0,
        minZ: 25.08,
        maxZ: 27.88,
        data: { id: 'mrpd_cell_1' }
    });

    global.exports['ev-polyzone'].AddBoxZone('police_cell', { x: 485.49, y: -1005.96, z: 26.27 }, 3.4, 5.8, {
        heading: 0,
        minZ: 25.27,
        maxZ: 28.27,
        data: { id: 'mrpd_cell_2' }
    });

    global.exports['ev-polyzone'].AddBoxZone('police_cell', { x: -1089.55, y: -839.64, z: 13.52 }, 10.6, 4.4, {
        heading: 308,
        minZ: 12.32,
        maxZ: 15.12,
        data: { id: 'vspd_cell_1' }
    });

    global.exports['ev-polyzone'].AddBoxZone('police_cell', { x: 1807.82, y: 3677.06, z: 34.18 }, 3.4, 9, {
        heading: 300,
        minZ: 32.58,
        maxZ: 36.58,
        data: { id: 'sandy_cell_1' }
    });

    global.exports['ev-polyzone'].AddBoxZone('police_cell', { x: -443.47, y: 6017.53, z: 27.57 }, 2.6, 8.4, {
        heading: 314,
        minZ: 26.37,
        maxZ: 28.97,
        data: { id: 'paleto_cell_1' }
    });

    global.exports['ev-polyzone'].AddBoxZone('police_cell', { x: -447.94, y: 6012.9, z: 27.58 }, 8.2, 2.6, {
        heading: 44,
        minZ: 26.38,
        maxZ: 28.98,
        data: { id: 'paleto_cell_2' }
    });

    global.exports['ev-polyzone'].AddBoxZone('police_cell', { x: -517.03, y: -204.84, z: 34.25 }, 4.4, 7.6, {
        heading: 299,
        minZ: 33.05,
        maxZ: 35.85,
        data: { id: 'courthouse_cell_1' }
    });

    global.exports['ev-polyzone'].AddBoxZone('police_cell', { x: 380.21, y: 795.09, z: 187.46 }, 3.2, 6, {
        heading: 359,
        minZ: 186.06,
        maxZ: 188.86,
        data: { id: 'parkrangers_cell_1' }
    });

    global.exports['ev-polyzone'].AddBoxZone('police_cell', { x: 831.48, y: -1298.79, z: 28.24 }, 7.8, 5.4, {
        heading: 0,
        minZ: 26.44,
        maxZ: 30.44,
        data: { id: 'lamesa_pd_1' }
    });
}