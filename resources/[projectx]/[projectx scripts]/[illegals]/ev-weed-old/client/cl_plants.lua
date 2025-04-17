MyStrains = {}

MaterialHashes = {
    [-461750719] = 1,
    [930824497] = 1,
    [581794674] = 2,
    [-2041329971] = 2,
    [-309121453] = 2,
    [-913351839] = 2,
    [-1885547121] = 2,
    [-1915425863] = 2,
    [-1833527165] = 2,
    [2128369009] = 2,
    [-124769592] = 2,
    [-840216541] = 2,
    [-2073312001] = 3,
    [627123000] = 3,
    [1333033863] = 4,
    [-1286696947] = 5,
    [-1942898710] = 5,
    [-1595148316] = 6,
    [435688960] = 7,
    [223086562] = 8,
    [1109728704] = 8
}

GrowthObjects = {
    --{hash = `bkr_prop_weed_01_small_01c`, zOffset = -0.5},
    --{hash = `bkr_prop_weed_01_small_01a`, zOffset = -0.5},
    {hash = `bkr_prop_weed_01_small_01b`, zOffset = -0.5},
    {hash = `bkr_prop_weed_med_01a`, zOffset = -3.0},
    {hash = `bkr_prop_weed_med_01b`, zOffset = -3.0},
    {hash = `bkr_prop_weed_lrg_01a`, zOffset = -3.0},
    {hash = `bkr_prop_weed_lrg_01b`, zOffset = -3.0},
    -- {hash = `prop_weed_02`, zOffset = 0.0},
    -- {hash = `prop_weed_01`, zOffset = 0.0},
}

TypeModifiers = {
    --npk = nitrogen, phosphorus and potassium content (nutrients)
    --each ground type affects quality
    --players can alter by adding water, fertilizer
    --planting on farmland has best quality but risky, easily spotted, etc.
    --water = starting water content
    {n = 0.6, p = 0.6, k = 0.6, water = 0.5}, --1, grass
    {n = 0.3, p = 0.3, k = 0.3, water = 0.4}, --2, normal ground
    {n = 0.6, p = 0.6, k = 0.6, water = 0.6}, --3, unk
    {n = 0.6, p = 0.6, k = 0.6, water = 0.5}, --4, grassy rocks
    {n = 0.6, p = 0.6, k = 0.6, water = 0.4}, --5, mountain grass
    {n = 0.3, p = 0.3, k = 0.3, water = 0.5}, --6, unk
    {n = 0.3, p = 0.3, k = 0.3, water = 0.5}, --7, unk
    {n = 0.9, p = 0.9, k = 0.9, water = 0.9}, --8, wet ground
    {n = 0.9, p = 0.9, k = 0.9, water = 0.5}, --9, farmland
}

local HarvestPercent = 100.0


AddEventHandler('ev-spawn:characterSpawned', function()
    local strains = RPC.execute('ev-weed:fetchPlayerStrains')
    setPlayerStrains(strains)
end)

Citizen.CreateThread(function()
    local strains = RPC.execute('ev-weed:fetchPlayerStrains')
    setPlayerStrains(strains)
end)

RegisterNetEvent('ev-weed:setPlayerStrains', function(pStrains)
    setPlayerStrains(pStrains)
end)

RegisterUICallback('ev-weed:getWeedStrains', function(data, cb)
    local strains = RPC.execute('ev-weed:fetchPlayerStrains')
    setPlayerStrains(strains)
    local strainData = {}
    for _,strain in ipairs(MyStrains) do
        strainData[#strainData+1] = {
            n = strain.n,
            p = strain.p,
            k = strain.k,
            name = strain.name,
            genName = getStrainName(strain),
            rep = strain.rep,
        }
    end
    cb({ data = { strains = strainData, threshholds = RepThreshholds }, meta = { ok = true, message = '' } })
end)

function setPlayerStrains(pStrains)
    MyStrains = {}
    for _, strain in ipairs(pStrains) do
        local npk = {}
        -- for str in string.gmatch(strain.strain, '([^-]+)') do
        --     npk[#npk + 1] = tonumber(str)
        -- end
        -- MyStrains[#MyStrains + 1] = { n = npk[1], p = npk[2], k = npk[3], rep = strain.rep, canName = strain.canName, name = strain.name }
        MyStrains[#MyStrains + 1] = { n = strain.strain.n, p = strain.strain.p, k = strain.strain.p, rep = strain.rep, canName = strain.canName, name = strain.name }
    end

    table.sort(MyStrains, function(a, b)
        return a['rep'] > b['rep']
    end)
end

AddEventHandler('ev-inventory:itemUsed', function(item, info)
    if item == 'femaleseed' then
        local lastMaterial
        local result = exports['ev-objects']:PlaceObject(GrowthObjects[1].hash, {
            collision = true,
            forceGroundSnap = true, 
            zOffset = GrowthObjects[1].zOffset,
            distance = 2.0,
        }, function(coords, material, entity)
        if MaterialHashes[material] and not exports["ev-build"]:getModule("func").isInBuilding() then
            lastMaterial = material
            return true
        end
            return false
        end)

        if not result[1] then
            return
        end
        TaskTurnPedToFaceCoord(PlayerPedId(), result[2].coords.x, result[2].coords.y, result[2].coords.z, 3000)
        TaskStartScenarioInPlace(PlayerPedId(), 'WORLD_HUMAN_GARDENER_PLANT', 0, false)
        local finished = exports['ev-taskbar']:taskBar(5000, 'Planting Seed', false, true, false, false, nil, 5.0,  PlayerPedId())
        ClearPedTasksImmediately(PlayerPedId())
        if finished == 100 and exports['ev-inventory']:hasEnoughOfItem('femaleseed', 1, false, true) then
        local typeMod = TypeModifiers[MaterialHashes[lastMaterial]]
        local _info = json.decode(info)
        if _info.strain then
            typeMod.n = _info.strain.n
            typeMod.p = _info.strain.p
            typeMod.k = _info.strain.k
        end
            RPC.execute('ev-weed:plantSeed', result[2].coords, result[2].rotation, typeMod)
        end
    end
end)

AddEventHandler('ev-weed:checkPlant', function(pContext, pEntity)
    local plant = exports['ev-objects']:GetObjectByEntity(pEntity)
    if not plant then
        return
    end
    showPlantMenu(plant)
end)

RegisterUICallback('ev-weed:addWater', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    playPourAnimation(PlayerPedId(), data.key.handle)
    local finished = exports['ev-taskbar']:taskBar(4000, 'Watering', false, true, false, false, nil, 5.0, PlayerPedId())
    ClearPedTasks(PlayerPedId())
    TriggerEvent('destroyProp')
    if finished == 100 then
        local items = exports['ev-inventory']:getItemsOfType('wateringcan', 1, 2)

        if #items < 1 then
            return
        end

        local returnData = RPC.execute('ev-weed:addWater', data.key.id)
        
        if not returnData then
            return
        end

        local plant = exports['ev-objects']:GetObject(data.key.id)
        showPlantMenu(plant)
        TriggerServerEvent('inventory:degItem', items[1].id, 1, 'wateringcan', data.character.id);
    end
end)

local RangeListener = {}

RegisterUICallback('ev-weed:setFertilizer', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local inputs
    if data.key.new then
        -- open the range-picker application from ev-ui
        Wait(1)
        exports['ev-ui']:openApplication('range-picker', { show = true, submitUrl = 'ev-ui:weed:submitStrainValues' })

        RangeListener.data = promise:new()

        local data = Citizen.Await(RangeListener.data)
        inputs = { n = data[1], p = data[2], k = data[3] }
    else
        inputs = { n = data.key.n, p = data.key.p, k = data.key.k }
    end

    playPourAnimation(PlayerPedId(), data.key.handle)
    local finished = exports['ev-taskbar']:taskBar(2000, 'Adding Fertilizer', false, true, false, false, nil, 5.0, PlayerPedId())
    ClearPedTasks(PlayerPedId())
    TriggerEvent('destroyProp')
    if finished == 100 then
        local returnData = RPC.execute('ev-weed:addFertilizer', data.key.plant.id, inputs, data.key.new)
        
        if not returnData then
            return
        end

        local plant = exports['ev-objects']:GetObject(data.key.plant.id)
        showPlantMenu(plant)
    end
end)

RegisterUICallback('ev-ui:weed:submitStrainValues', function(pData, cb)
    exports['ev-ui']:closeApplication('range-picker')
    RangeListener.data:resolve(pData.ranges)
    cb({ pData = {}, meta = { ok = true, message = '' } })
end)

RegisterUICallback('ev-weed:addMaleSeed', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TaskStartScenarioInPlace(PlayerPedId(), 'WORLD_HUMAN_GARDENER_PLANT', 0, true)
    local finished = exports['ev-taskbar']:taskBar(3000, 'Adding Male Seed', false, true, false, false, nil, 5.0, PlayerPedId())
    ClearPedTasks(PlayerPedId())

    if finished == 100 and exports['ev-inventory']:hasEnoughOfItem('maleseed', 1, false) then
        local returnData = RPC.execute('ev-weed:addMaleSeed', data.key.id)
        
        if not returnData then
            return
        end

        local plant = exports['ev-objects']:GetObject(data.key.id)
        showPlantMenu(plant)
    end
end)

RegisterUICallback('ev-weed:removePlant', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('animation:PlayAnimation', 'layspike')
    local finished = exports['ev-taskbar']:taskBar(3000, 'Removing', false, true, false, false, nil, 5.0, PlayerPedId())
    ClearPedTasks(PlayerPedId())
    if finished == 100 then
        RPC.execute('ev-weed:removePlant', data.key.id)
    end
end)

AddEventHandler('ev-weed:pickPlant', function(pContext, pEntity)
    local cid = exports["isPed"]:isPed("cid")
    local plant = exports['ev-objects']:GetObjectByEntity(pEntity)
    if not plant then
        return
    end

    local timeSinceHarvest = GetCloudTimeAsInt() - plant.metaData.lastHarvest
    if getPlantGrowthPercent(plant, GetCloudTimeAsInt()) < HarvestPercent or timeSinceHarvest <= (TimeBetweenHarvest * 60) then
        TriggerEvent('DoLongHudText', 'Not ready for harvesting', 2)
        return
    end

    local plyWeight = exports['ev-inventory']:getCurrentWeight()
    if plyWeight + 35.0 > 250.0 and plant.metaData.gender == 0 then
        TriggerEvent('DoLongHudText', 'You do not have enough room to hold the bud.', 2)
        return
    end

    TriggerEvent('animation:PlayAnimation', 'layspike')
    local finished = exports['ev-taskbar']:taskBar(10000, 'Harvesting', false, true, false, false, nil, 5.0, PlayerPedId())
    ClearPedTasks(PlayerPedId())
    if finished == 100 then
        RPC.execute('ev-weed:harvestPlant', plant.id)
        if plant.metaData.cid == cid then
            RPC.execute("ev:progression:character:illegalRep", 1.5, "weedPlanting")
        end
    end
end)

function getPlantById(pPlantId)
    return exports['ev-objects']:GetObject(pPlantId)
end

function playPourAnimation(pedId, entityId)
    loadAnimDict('weapon@w_sp_jerrycan')
    TaskTurnPedToFaceEntity(pedId, entityId, 0);
    Wait(100)
    TriggerEvent('attachItem', 'wateringcan2');
    TaskPlayAnim(pedId, 'weapon@w_sp_jerrycan', 'fire', 8.0, -8.0, -1, 49, 0, false, false, false);
    local attachedProp = exports['ev-propattach']:GetAttachedProp();

    if (attachedProp) then
        TriggerServerEvent('fx:waterPour', NetworkGetNetworkIdFromEntity(attachedProp));
    end
end

function showPlantMenu(pPlant)
    local growth = getPlantGrowthPercent(pPlant, GetCloudTimeAsInt())
    local water = pPlant.metaData.water
    local myjob = exports['isPed']:isPed('myjob')
    local context = {}

    context[#context + 1] = {
        title = 'Growth: %' .. string.format('%.2f', growth) ,
        description = 'Gender: ' .. (pPlant.metaData.gender == 1 and 'Male' or 'Female'),
        icon = 'cannabis',
    }

    -- Only allow adding water/fertilzier before harvest time
    local disableActions = growth >= HarvestPercent
    context[#context + 1] = {
        title = 'Add Water',
        description = 'Requires a Watering Can',
        icon = 'tint',
        key = pPlant,
        action = 'ev-weed:addWater',
        disabled = water >= 100.0 or not exports['ev-inventory']:hasEnoughOfItem('wateringcan', 1, false),
    }

    local fertChildren = {
        {
            title = 'Create New',
            key = { plant = pPlant, new = true },
            action = 'ev-weed:setFertilizer',
        },
    }

    local curName = 'Unknown'

    for _, strain in ipairs(MyStrains) do
        fertChildren[#fertChildren + 1] = {
            title = strain.name or getStrainName(strain),
            key = { plant = pPlant, n = strain.n, p = strain.p, k = strain.k },
            action = 'ev-weed:setFertilizer',
        }
        if (pPlant.metaData.n == strain.n and pPlant.metaData.p == strain.p and pPlant.metaData.k == strain.k) then
            curName = strain.name or getStrainName(strain)
        end
    end

    context[#context + 1] = {
        title = 'Add Fertilizer',
        description = curName,
        disabled = not exports['ev-inventory']:hasEnoughOfItem('fertilizer', 1, false) or disableActions,
        icon = 'seedling',
        children = fertChildren,
    }

    -- Only allow changing gender in the first 2~ stages
    if getStageFromPercent(growth) < 3 and pPlant.metaData.gender == 0 then
        context[#context + 1] = {
        title = 'Add Male Seed',
        description = 'Make the plant preggies',
        icon = 'mars',
        key = pPlant,
        action = 'ev-weed:addMaleSeed',
        disabled = not exports['ev-inventory']:hasEnoughOfItem('maleseed', 1, false),
        }
    end

    if growth >= 95 or myjob == 'police' or myjob == 'judge' then
        context[#context + 1] = {
        title = 'Destroy Plant',
        icon = 'times',
        key = pPlant,
        action = 'ev-weed:removePlant',
        }
    end

    exports['ev-ui']:showContextMenu(context);
end

RegisterCommand('strain', function(source, args, RawCommand)
    local strains = RPC.execute('ev-weed:fetchPlayerStrains')
    setPlayerStrains(strains)
end)