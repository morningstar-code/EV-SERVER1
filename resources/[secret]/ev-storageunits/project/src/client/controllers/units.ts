import { UnitsConfig } from "@shared/config";
import { Delay } from "@shared/utils/tools";

export const InitUnits = async (): Promise<void> => {
    const units = [...UnitsConfig.units];
    const casinoHotelConfig: CasinoHotelConfig[] = global.exports["ev-business"].getCasinoHotelConfig();

    for (let i = 0; i < casinoHotelConfig.length; i++) {
        const casinoHotelUnit = casinoHotelConfig[i];

        const storageUnitSizes = {
            small: 600,
            medium: 900,
            large: 1200
        };

        const unitSize = storageUnitSizes[casinoHotelUnit.size];

        units.push({
            id: `cas_${i + 1}`,
            size: unitSize,
            business: "casino_hotel",
            polyZone: {
                coords: {
                    x: casinoHotelUnit.coords.x,
                    y: casinoHotelUnit.coords.y,
                    z: casinoHotelUnit.coords.z
                },
                length: 2,
                width: 2,
                heading: 330,
                minZ: 19.8,
                maxZ: 22
            }
        });
    }

    let unitId = 0;
    for (const unit of units) {
        unitId++;

        global.exports["ev-polytarget"].AddBoxZone("secure_storage_unit", unit.polyZone.coords, unit.polyZone.length, unit.polyZone.width, {
            minZ: unit.polyZone.minZ,
            maxZ: unit.polyZone.maxZ,
            heading: unit.polyZone.heading,
            data: {
                id: unit.id,
                business: unit.business,
                size: unit.size,
                unitId: unitId
            }
        });
    }

    global.exports["ev-interact"].AddPeekEntryByPolyTarget("secure_storage_unit", [{
        id: "storageunits_open",
        event: "ev-storageunits:client:viewUnit",
        label: "View Storage Unit",
        icon: "warehouse",
        parameters: {},
    }], {
        distance: { radius: 3.5 },
        isEnabled: () => true
    });
};

on("ev-storageunits:client:viewUnit", async (p1: any, pEntity: number, pContext: PeekContext) => {
    const unitData: Unit = pContext.zones["secure_storage_unit"];

    const menuData: ContextMenu<UnitKey>[] = [{
        title: "Open Storage Container",
        description: `Storage Unit #${unitData.unitId} (capacity: ${unitData.size})`,
        icon: "boxes",
        action: "ev-storageunits:client:showAccessCodeField",
        key: { id: unitData.id, size: unitData.size, business: unitData.business }
    }];

    const hasPerms = await global.exports["ev-business"].HasPermission(unitData.business, "craft_access");

    console.log("hasPerms", hasPerms);

    if (hasPerms) { //TODO: Let the owner change the access code (master cid)
        menuData.push({
            title: "Change Password",
            description: "Change this storages container access code.",
            icon: "key",
            action: "ev-storageunits:client:showUpdateAccessCodeField",
            key: { id: unitData.id, business: unitData.business, size: unitData.size }
        })
    }

    global.exports["ev-ui"].showContextMenu(menuData);
});

RegisterUICallback("ev-storageunits:client:showAccessCodeField", async (data: any, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });

    console.log("ev-storageunits:client:showAccessCodeField", data);

    global.exports["ev-ui"].openApplication("textbox", {
        callbackUrl: "ev-storageunits:client:enteredPassword",
        inputKey: { id: data?.key?.id, size: data?.key?.size, business: data?.key?.business },
        items: [{
            label: "Password",
            name: "password",
            _type: "password",
            icon: "user-lock"
        }],
        show: true
    });

    await Delay(250);

    global.exports["ev-ui"].SetUIFocus(true, true);
});

RegisterUICallback("ev-storageunits:client:enteredPassword", async (data: CallbackData, cb: Function) => {
    const password = data?.values?.password;
    const unitId = data?.inputKey?.id;
    const size = data?.inputKey?.size;
    const business = data?.inputKey?.business;

    if (isNaN(password)) {
        emit("DoLongHudText", "Password must be a number.", 2);
        global.exports["ev-ui"].closeApplication("textbox");
        cb({ data: {}, meta: { ok: true, message: "" } });
        return;
    }

    console.log("ev-storageunits:client:enteredPassword", data);

    const [success, message] = await RPC.execute<[boolean, string]>("ev-storageunits:server:hasAccess", unitId, business, password);
    if (!success) {
        emit("DoLongHudText", message, 2);
        global.exports["ev-ui"].closeApplication("textbox");
        cb({ data: {}, meta: { ok: true, message: "" } });
        return;
    }

    emit("server-inventory-open", '1', business + '-' + unitId + '-' + size); //TODO: Add PayNLess server inventory

    global.exports["ev-ui"].closeApplication("textbox");

    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-storageunits:client:showUpdateAccessCodeField", async (data: any, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });

    console.log("ev-storageunits:client:showUpdateAccessCodeField", data);

    global.exports["ev-ui"].openApplication("textbox", {
        callbackUrl: "ev-storageunits:client:updatePassword",
        inputKey: { id: data?.key?.id },
        items: [
            { label: "Password", name: "password", _type: "password", icon: "user-lock" }
        ],
        show: true
    });

    await Delay(250);

    global.exports["ev-ui"].SetUIFocus(true, true);
});

RegisterUICallback("ev-storageunits:client:updatePassword", async (data: CallbackData, cb: Function) => {
    console.log("ev-storageunits:client:updatePassword", data);
    const password = data?.values?.password;
    const unitId = data?.inputKey?.id;

    if (isNaN(password)) {
        emit("DoLongHudText", "Password must be a number.", 2);
        global.exports["ev-ui"].closeApplication("textbox");
        cb({ data: {}, meta: { ok: true, message: "" } });
        return;
    }

    const [success, message] = await RPC.execute<[boolean, string]>("ev-storageunits:server:updatePassword", unitId, password);

    if (!success) return emit("DoLongHudText", message, 2);

    emit("DoLongHudText", `Password successfully updated for ${unitId}`, 1);

    global.exports["ev-ui"].closeApplication("textbox");

    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-storageunits:client:getAccessLogs", async (data: any, cb: Function) => {
    const logs = await RPC.execute("ev-storageunits:server:getAccessLogs", data?.key?.cid);

    cb({ data: logs, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-storageunits:client:getUnits", async (data: any, cb: Function) => {
    //TODO: Get paynless & casino units, and then grab the tenants from the database
    //And then add the tenant data to the correct unit (for loop)
    const unitsWithTenants = await RPC.execute<SQLUnit[]>("ev-storageunits:server:getUnitsWithTenants");
    const allUnits = [...UnitsConfig.units];

    const units = [] as SQLUnit[];
    for (const unit of allUnits) {
        const unitWithTenant = unitsWithTenants.find(u => u.unit_id === unit.id);
        if (unitWithTenant) {
            units.push({
                id: unit.id,
                password: unitWithTenant.password,
                business_id: unit.business,
                business_name: unitWithTenant.name,
                location: unit.polyZone.coords,
                due_date: Number(unitWithTenant.due_date),
                due_amount: unitWithTenant.due_amount,
                has_paid: unitWithTenant.has_paid,
                tenant_cid: unitWithTenant.cid,
                size: unit.size,
                phone_number: unitWithTenant.phone_number
            });
        } else {
            units.push({
                id: unit.id,
                password: null,
                business_id: unit.business,
                business_name: null,
                location: unit.polyZone.coords,
                due_date: null,
                due_amount: null,
                has_paid: null,
                tenant_cid: null,
                size: unit.size,
                phone_number: null
            });
        }
    }

    console.log("ev-storageunits:client:getUnits", units);

    cb({ data: units, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-storageunits:client:addTenant", async (data: any, cb: Function) => {
    const unitId = data.unitId;
    const stateId = data.stateId;

    const unit = UnitsConfig.units.find(u => u.id === unitId);
    if (!unit) return cb({ data: {}, meta: { ok: false, message: "Unit not found" } });

    const [success, message] = await RPC.execute<[boolean, string]>("ev-storageunits:server:addTenant", unit, stateId);
    if (!success) return cb({ data: {}, meta: { ok: false, message: message } });

    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-storageunits:client:removeTenant", async (data: any, cb: Function) => {
    const unitId = data.unitId;

    const [success, message] = await RPC.execute<[boolean, string]>("ev-storageunits:server:removeTenant", unitId);
    if (!success) return cb({ data: {}, meta: { ok: false, message: message } });

    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-storageunits:client:changePassword", async (data: any, cb: Function) => {
    const unitId = data.unitId;
    const password = data.password;

    const [success, message] = await RPC.execute<[boolean, string]>("ev-storageunits:server:changePassword", unitId, password);
    if (!success) return cb({ data: {}, meta: { ok: false, message: message } });

    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-storageunits:client:makePayment", async (data: any, cb: Function) => {
    const unitId = data.unitId;

    const [success, message] = await RPC.execute<[boolean, string]>("ev-storageunits:server:makePayment", unitId);
    if (!success) return cb({ data: {}, meta: { ok: false, message: message } });

    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-storageunits:client:setGps", async (data: any, cb: Function) => {
    SetNewWaypoint(data.location.x, data.location.y);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterCommand("dometeor", () => {
    console.log("dometeor");
    const coords = [1341.1995, -899.2664, 92.432357]
    emit("ev-metaldetecting:runMeteor", coords);
}, false);

onNet("ev-metaldetecting:runMeteor", async (pCoords: number[]) => {
    console.log("ev-metaldetecting:runMeteor", pCoords);
    const pBoulder = GetHashKey("prop_test_boulder_03");
    RequestModel(pBoulder);
    while (!HasModelLoaded(pBoulder)) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    RequestNamedPtfxAsset("core");
    while (!HasNamedPtfxAssetLoaded("core")) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    UseParticleFxAssetNextCall("core");
    SetPtfxAssetNextCall("core");
    const obj = CreateObject(pBoulder, pCoords[0], pCoords[1], 2000, false, true, false);
    const fx = StartParticleFxLoopedOnEntity("fire_petroltank_heli", obj, 0, 0, 0, 0, 0, 10 + Math.random() * 20, 35, false, false, false);
    ActivatePhysics(obj);
    SetObjectPhysicsParams(obj, 2, -0.1, 0, 0, 0, 0, 0, 0, -1, -1, -1);
    SetEntityLodDist(obj, 3000);
    const [, groundZ] = GetGroundZFor_3dCoord(pCoords[0], pCoords[1], 2000, false);
    let coords: any | null = [null, null, null];
    let pTick = setTick(async () => {
        const objCoords = GetEntityCoords(obj, true);
        const [x, y, z] = objCoords;
        DrawLightWithRange(x, y, z, 255, 255, 255, 5000, 30);
        const pCheck = coords[0] !== null && x !== coords[0] || coords[1] !== null && y !== coords[1];
        const pCheck1 = coords[2] === null || z !== coords[2];
        coords = [x, y, z];
        if (z < groundZ + 3 || pCheck || !pCheck1) {
            StopParticleFxLooped(fx, false);
            DeleteObject(obj);
            clearTick(pTick);
            RequestNamedPtfxAsset("core");
            while (!HasNamedPtfxAssetLoaded("core")) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
            UseParticleFxAssetNextCall("core");
            SetPtfxAssetNextCall("core");
            AddExplosion(pCoords[0], pCoords[1], groundZ, 18, 1, true, false, 1);
            StartParticleFxNonLoopedAtCoord("exp_grd_train", pCoords[0], pCoords[1], groundZ + 70, 0, 0, 0, 60, false, false, false);
            UseParticleFxAssetNextCall("core");
            SetPtfxAssetNextCall("core");
            StartParticleFxNonLoopedAtCoord("exp_grd_plane_sp", pCoords[0], pCoords[1], groundZ + 30, 0, 0, 0, 20, false, false, false);
            const playerPed = PlayerPedId();
            const playerCoords = GetEntityCoords(playerPed, true);
            const distance = Math.sqrt((playerCoords[0] - x) ** 2 + (playerCoords[1] - y) ** 2);
            setTimeout(() => {
                AddExplosion(playerCoords[0], playerCoords[1], playerCoords[2] + 70, 18, 0, true, true, 1);
                const isInFlyingVeh = IsPedInFlyingVehicle(playerPed);
                if (distance < 300 || isInFlyingVeh && distance < 500) {
                    (distance < 200 || isInFlyingVeh) && ClearPedTasksImmediately(playerPed);
                    const calcedCoords = [(playerCoords[0] - pCoords[0]) / distance, (playerCoords[1] - pCoords[1]) / distance];
                    const calc = (1 - distance / (isInFlyingVeh ? 500 : 300)) * 7000;
                    SetPedToRagdoll(playerPed, 3000, 1000, 0, false, false, false);
                    ApplyForceToEntity(playerPed, 0, calcedCoords[0] * calc, calcedCoords[1] * calc, calc * 0.35, 0, 0, 0, 0, false, true, true, false, true);
                    if (isInFlyingVeh) {
                        const vehicle = GetVehiclePedIsIn(playerPed, false);
                        const entityOwner = NetworkGetEntityOwner(vehicle);
                        if (entityOwner === PlayerId()) {
                            ApplyForceToEntity(playerPed, 0, calcedCoords[0] * calc, calcedCoords[1] * calc, calc * 0.4, 0, 0, 0, 0, false, true, true, false, true);
                        }
                    }
                }
            }, distance * 0.4);
            DrawLightWithRange(playerCoords[0], playerCoords[1], playerCoords[2] + 20, 20, 20, 20, 1000, 0.8);
            await new Promise(resolve => setTimeout(resolve, 0));
            DrawLightWithRange(playerCoords[0], playerCoords[1], playerCoords[2] + 20, 50, 50, 50, 1000, 0.8);
            await new Promise(resolve => setTimeout(resolve, 0));
            DrawLightWithRange(playerCoords[0], playerCoords[1], playerCoords[2] + 20, 50, 50, 50, 1000, 0.8);
            await new Promise(resolve => setTimeout(resolve, 0));
            DrawLightWithRange(playerCoords[0], playerCoords[1], playerCoords[2] + 20, 20, 20, 20, 1000, 0.8);
        }
    });
});