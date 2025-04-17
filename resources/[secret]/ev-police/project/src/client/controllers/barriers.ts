import { Events, Interface, Streaming } from "@cpx/client";

type AvailabeBarriers = {
    [key: string]: {
        model: string;
        freeze: boolean;
        blockNav: boolean;
        description: string;
    };
};

const activeBarriers = new Map();

const availableBarriers = {
    normal: {
        model: 'prop_barrier_work05',
        freeze: true,
        blockNav: false,
        description: 'Normal Police Barrier'
    },
    cone: {
        model: 'prop_mp_cone_01',
        freeze: false,
        blockNav: false,
        description: 'Traffic Cone'
    },
    normal2: {
        model: 'prop_barrier_work05_cone',
        freeze: true,
        blockNav: false,
        description: 'Police Barrier w/ cones'
    },
    concrete: {
        model: 'prop_barier_conc_05c',
        freeze: true,
        blockNav: true,
        description: 'Red Concrete Barrier'
    },
    concrete2: {
        model: 'prop_barier_conc_05b',
        freeze: true,
        blockNav: true,
        description: 'Large Red Concrete Barrier'
    },
    water: {
        model: 'prop_barrier_wat_03a',
        freeze: false,
        blockNav: false,
        description: 'Traffic Channelizer Drum'
    },
    barrierlights: {
        model: 'np_barrier_lights',
        freeze: true,
        blockNav: true,
        description: 'Blue Concrete Barrier (WITH LIGHTS)'
    },
    barriernolights: {
        model: 'np_barrier_nolights',
        freeze: true,
        blockNav: true,
        description: 'Blue Concrete Barrier (NO LIGHTS)'
    }
} as AvailabeBarriers;

export const InitBarriers = (): void => {
    global.exports['ev-interact'].AddPeekEntryByModel(Object.keys(availableBarriers).map(barrier => GetHashKey(availableBarriers[barrier].model)), [{
        event: 'ev-police:client:pickupBarrier',
        id: 'barriers_pickup',
        icon: 'trash-alt',
        label: 'Remove Barrier',
        parameters: {},
    }], {
        distance: { radius: 3 },
        isEnabled: (pEntity: number, pContext: PeekContext) => {
            var _0x54a307;
            var _0x20ac3f;
            var _0x44724a;
            return ((_0x44724a = (_0x20ac3f = (_0x54a307 = pContext.meta) === null || _0x54a307 === void 0 ? void 0 : _0x54a307.data) === null || _0x20ac3f === void 0 ? void 0 : _0x20ac3f.metadata) === null || _0x44724a === void 0 ? void 0 : _0x44724a.type) === 'police-barrier';
        }
    });
};

on("ev-police:client:pickupBarrier", (pArgs: any, pEntity: number, pContext: PeekContext) => {
    console.log(`ev-police:client:pickupBarrier | Meta: ${pContext?.meta}`);
    const data = pContext.meta?.data;
    const metadata = data?.metadata;
    const type = metadata?.type === 'police-barrier';

    if (!type || !pContext.meta?.id) return;

    const placedAt = metadata?.placedAt;
    return pickupBarrier(pContext.meta.id, placedAt);
});

onNet('ev-police:client:placeBarrier', (p1: any) => {
    placeBarrier(p1);
});

on('ev-objects:objectCreated', (pObject: DatagridObject<unknown>, pHandle: number) => {
    if (
        pObject?.data?.metadata?.type === 'police-barrier' &&
        Object.values(availableBarriers).find(barrier => barrier.blockNav && GetHashKey(barrier.model) === pObject.data.model)
    ) {
        if (activeBarriers.size >= 32) return;

        const dimensions = GetModelDimensions(pObject.data.model);

        const maximum = dimensions[1][0] - dimensions[0][0];
        const minimum = dimensions[1][1] - dimensions[0][1];

        SetEntityLodDist(pHandle, 420);

        const object = AddNavmeshBlockingObject(pObject.x, pObject.y, pObject.z - 2, maximum + 1, minimum + 1, 10, pObject.data.rotation.z, false, 1);

        activeBarriers.set(pObject.id, object);
    }
});

on('ev-objects:objectDeleting', (pObject: DatagridObject<unknown>) => {
    if (activeBarriers.has(pObject.id)) {
        RemoveNavmeshBlockingObject(activeBarriers.get(pObject.id));
        activeBarriers.delete(pObject.id);
    }
});

on('onResourceStop', (resource: string) => {
    if (resource === GetCurrentResourceName()) {
        for (let i = 0; i < 2048; i++) {
            if (DoesNavmeshBlockingObjectExist(i)) {
                RemoveNavmeshBlockingObject(i);
            }
        }
    }
});

const placeBarrier = async (p1: any) => {
    const myjob = global.exports.isPed.isPed('myjob');
    if (myjob !== 'police') return emit('DoLongHudText', 'You must be a police officer to do this.', 2);

    if (IsPedInAnyVehicle(PlayerPedId(), false)) {
        return;
    }

    const menuData = [{ title: 'Select Barrier' }] as any[];

    Object.keys(availableBarriers).forEach(availableBarrier => {
        const barrier = availableBarriers[availableBarrier];

        menuData.push({
            title: barrier.description,
            description: availableBarrier,
            action: 'ev-police:ui:placeBarrier',
            key: availableBarrier
        });
    });

    global.exports['ev-ui'].showContextMenu(menuData);
};

RegisterUICallback('ev-police:ui:placeBarrier', async (data: { key?: string }, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: 'done' } });

    const barrier = (data?.key?.toLowerCase() ?? 'none');

    if (!availableBarriers[barrier]) {
        return emit('DoLongHudText', 'Invalid barrier type (Types: ' + Object.keys(availableBarriers).join(', ') + ')', 2);
    }

    const object = await global.exports['ev-objects'].PlaceAndSaveObject(GetHashKey(availableBarriers[barrier].model), {
        type: 'police-barrier',
        placedAt: Date.now(),
        freeze: availableBarriers[barrier].freeze
    }, { groundSnap: true, distance: 2 });

    if (!object) return emit('DoLongHudText', 'Invalid placement!', 2);

    await Streaming.loadAnim('anim@narcotics@trash');

    TaskPlayAnim(PlayerPedId(), 'anim@narcotics@trash', 'drop_front', 0.9, -8, 1700, 49, 3, false, false, false);

    const finished = await Interface.taskBar(1800, 'Placing Roadblock', false);

    if (finished !== 100) {
        global.exports['ev-objects'].DeleteObject(object);
        emit('DoLongHudText', 'Canceled placing barrier!', 2);
    } else {
        Events.emitNet('ev-police:server:placedBarrier', object, Date.now());
        emit('DoLongHudText', 'Traffic Blocked in facing direction.', 1);
    }

    ClearPedSecondaryTask(PlayerPedId());
});

const pickupBarrier = async (pId: string, pPlacedAt: number) => {
    const myjob = global.exports.isPed.isPed('myjob');
    if (myjob !== 'police') return emit('DoLongHudText', 'You must be a police officer to do this.', 2);

    const animName = 'drop_front';
    const animDict = 'anim@narcotics@trash';

    await Streaming.loadAnim(animDict);

    TaskPlayAnim(PlayerPedId(), animDict, animName, 0.9, -8, 1700, 49, 1, false, false, false);

    const finished = await Interface.taskBar(1800, 'Picking up barrier', false);

    ClearPedSecondaryTask(PlayerPedId());

    if (finished !== 100) return;

    global.exports['ev-objects'].DeleteObject(pId);

    Events.emitNet('ev-police:server:pickedUpBarrier', pId, pPlacedAt, Date.now());
};