local weedPlants = {}

GrowthObjects = {
    --{hash = `bkr_prop_weed_01_small_01c`, zOffset = -0.5},
    --{hash = `bkr_prop_weed_01_small_01a`, zOffset = -0.5},
    {hash = 'bkr_prop_weed_01_small_01b', zOffset = -0.5},
    {hash = 'bkr_prop_weed_med_01a', zOffset = -3.0},
    {hash = 'bkr_prop_weed_med_01b', zOffset = -3.0},
    {hash = 'bkr_prop_weed_lrg_01a', zOffset = -3.0},
    {hash = 'bkr_prop_weed_lrg_01b', zOffset = -3.0},
    -- {hash = `prop_weed_02`, zOffset = 0.0},
    -- {hash = `prop_weed_01`, zOffset = 0.0},
},

RPC.register("ev-weed:fetchPlayerStrains", function(src)
    if not src or src == nil then return false end
    
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local strain = getPlayerStrains(src, cid)
    
    if not strain or strain == nil then return {} end

    return strain
end)

RPC.register("ev-weed:plantSeed", function(src, pCoords, pRotation, pStrain)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    local pGender = 0
    local pTimestamp = os.time()
    local metaData = {
        createdAt = pTimestamp,
        gender = pGender,
        n = pStrain.n,
        k = pStrain.k,
        p = pStrain.p,
        water = pStrain.water,
        lastHarvest = 0,
        isWeed = true,
        cid = cid
    }

    TriggerClientEvent('inventory:removeItem', src, 'femaleseed', 1)
    TriggerEvent("ev-objects:prepareObject", GrowthObjects[1].hash, pCoords.x, pCoords.y, pCoords.z, pRotation, metaData)  
    Citizen.Wait(500)
    getNewPlant()
end)

RPC.register("ev-weed:addWater", function(src, pPlantId)
    local plant = weedPlants[pPlantId]
    if plant == nil then
        return false
    end

    local strain = plant.metaData.water
    strain = strain + PlantConfig.WaterAdd

    if tonumber(strain) >= 100.0 then
        strain = 100.0
    elseif tonumber(strain) <= 0.0 then
        strain = 0.0
    end

    plant.metaData.water = strain

    local affectedRows = MySQL.update.await([[
        UPDATE objects
        SET metaData = ?
        WHERE id = ?
    ]],
    { json.encode(plant.metaData), pPlantId })

    if not affectedRows or affectedRows < 1 then
        return false
    end

    TriggerClientEvent("ev-objects:updateObjects", -1, weedPlants[pPlantId])
    return true
end)

RPC.register("ev-weed:addFertilizer", function(src, pPlantId, pInput, pNew)
    local plant = weedPlants[pPlantId]

    if plant == nil then
        return false
    end

    if pNew then
        getNewPlayerStrain(src, pInput)
    end

    local strain = plant.metaData
    strain.n = strain.n + ( pInput.n / 100)
    strain.p = strain.p + ( pInput.p / 100)
    strain.k = strain.k + ( pInput.k / 100)

    if tonumber(strain.n) >= tonumber(PlantConfig.NWeight) then
        strain.n = tonumber(PlantConfig.NWeight)
    elseif tonumber(strain.n) <= 0.0 then
        strain.n = 0.0
    end

    if tonumber(strain.k) >= tonumber(PlantConfig.KWeight) then
        strain.k = tonumber(PlantConfig.KWeight)
    elseif tonumber(strain.k) <= 0.0 then
        strain.k = 0.0
    end

    if tonumber(strain.p) >= tonumber(PlantConfig.PWeight) then
        strain.p = tonumber(PlantConfig.PWeight)
    elseif tonumber(strain.p) <= 0.0 then
        strain.p = 0.0
    end

    plant.metaData.k = strain.k
    plant.metaData.n = strain.n
    plant.metaData.p = strain.p

    local affectedRows = MySQL.update.await([[
        UPDATE objects
        SET metaData = ?
        WHERE id = ?
    ]],
    { json.encode(plant.metaData), pPlantId })

    if not affectedRows or affectedRows < 1 then
        return false
    end

    TriggerClientEvent('inventory:removeItem', src, 'fertilizer', 1)
    TriggerClientEvent("ev-objects:updateObjects", -1, weedPlants[pPlantId])
    return true
end)

RPC.register("ev-weed:addMaleSeed", function(src, pPlantId)
    local plant = weedPlants[pPlantId]

    if plant == nil then
        return false
    end

    plant.metaData.gender = 1

    local affectedRows = MySQL.update.await([[
        UPDATE objects
        SET metaData = ?
        WHERE id = ?
    ]],
    { json.encode(plant.metaData), pPlantId })

    if not affectedRows or affectedRows < 1 then
        return false
    end

    TriggerClientEvent('inventory:removeItem', src, 'maleseed', 1)
    TriggerClientEvent("ev-objects:updateObjects", -1, weedPlants[pPlantId])
    return true
end)

RPC.register("ev-weed:removePlant", function(src, pPlantId, pFertilizer)
    local plant = weedPlants[pPlantId]

    if plant == nil then
        return false
    end

    local affectedRows = MySQL.update.await([[
        DELETE FROM objects
        WHERE id = ?
    ]],
    { pPlantId })

    if not affectedRows or affectedRows < 1 then
        return false
    end

    TriggerClientEvent("ev-objects:clearObjects", -1, weedPlants[pPlantId])
    TriggerClientEvent("player:receiveItem", src, "fertilizer", 1)
    weedPlants[pPlantId] = nil

    return true
end)

RPC.register("ev-weed:harvestPlant", function(src, pPlantId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    local weedRep = exports["ev-progression"]:GetIllegalRep(src, "weedPlanting")
    local plant = weedPlants[pPlantId]
    local pTimestamp = os.time()

    if plant == nil then
        return false
    end

    plant.metaData.lastHarvest = pTimestamp
    TriggerClientEvent("ev-objects:updateObjects", -1, weedPlants[pPlantId])
    --local stain, quality = getRepString(weedRep) 
    if plant.metaData.gender == 0 then
        local budMetaData = {
            id = pPlantId,
            HarvestTime = pTimestamp,
            --strain = stain,
            --quality = quality,
            grower = cid,
            _hideKeys = {'HarvestTime', 'grower', 'id'},
        }
        TriggerClientEvent("ev-objects:clearObjects", -1, weedPlants[pPlantId])
        TriggerEvent("ev-objects:DeleteObject", weedPlants[pPlantId])
        TriggerClientEvent("player:receiveItem", src, "wetbud", 1, false, {}, budMetaData)
    elseif plant.metaData.gender == 1 then
        print("This plant is a male")
        --if PlantConfig.RemoveMaleOnHarvest then
            local affectedRows2 = MySQL.update.await([[
                DELETE FROM objects
                WHERE id = ?
            ]],
            { pPlantId })
            
            print("Attempting to remove plant from database")
            if not affectedRows2 or affectedRows2 < 1 then
                TriggerEvent("DoLongHudText", src, "ERROR: affectedRows2 == nil or affectedRows2 < 1", 2)
                return false
            end
            print("Succesfully removed plant from database.")

            weedPlants[pPlantId] = nil
            TriggerClientEvent("ev-objects:clearObjects", -1, weedPlants[pPlantId])
            TriggerEvent("ev-objects:DeleteObject", weedPlants[pPlantId])
            

            print("Lets remove the plant object from sight.")
        --end
            print("attempt to give seeds.")
        local seedAmount = math.random(5, 8)
        for i = 1, seedAmount do
            local chance = roundDecimals(math.random(), 2)
            if chance <= 0.2 then 
                TriggerClientEvent("player:receiveItem", src, "maleseed", 1)
            else
                TriggerClientEvent("player:receiveItem", src, "femaleseed", 1)
            end
        end
    end

    return true
end)

Citizen.CreateThread(function()
    local plants = MySQL.query.await([[
        SELECT *
        FROM objects
    ]])
    for idx, plant in pairs(plants) do
        local isPlant = json.decode(plant.metaData)
        if not isPlant == nil and isPlant.isWeed then 
            plant["coordinates"] = json.decode(plant.coordinates)
            plant["metaData"] = json.decode(plant.metaData)
            plant["coords"] = vector3(plant["coordinates"]["x"], plant["coordinates"]["y"], plant["coordinates"]["z"])
            weedPlants[tonumber(plant.id)] = plant
        end
    end
    while true do
        local time = os.time()
        if PlantConfig ~= nil then
            for id, plant in pairs(weedPlants) do
                if (time - plant.metaData.createdAt) >= (640 * 60) then
                    local affectedRows = MySQL.update.await([[
                        DELETE FROM objects
                        WHERE id = ?
                    ]],
                    { id })

                    if affectedRows and affectedRows > 0 then
                        weedPlants[id] = nil
                        TriggerClientEvent("ev-objects:clearObjects", -1, weedPlants[id])
                    end
                else
                    local pPercent = getPlantGrowthPercent(plant, time, true)
                    local stage = getStageFromPercent(pPercent)
                    plant.metaData.water = plant.metaData.water - math.random(1, 15)
                    plant.metaData.k = plant.metaData.k - (math.random(1, 5) / 10)
                    plant.metaData.n = plant.metaData.n - (math.random(1, 5) / 10)
                    plant.metaData.p = plant.metaData.p - (math.random(1, 5) / 10)

                    if plant.metaData.water <= 0.0 then 
                        plant.metaData.water = 0.0
                    end

                    if plant.metaData.k <= 0.0 then 
                        plant.metaData.k = 0.0 
                    end

                    if plant.metaData.n <= 0.0 then 
                        plant.metaData.n = 0.0 
                    end

                    if plant.metaData.p <= 0.0 then 
                        plant.metaData.p = 0.0 
                    end

                    local affectedRows = MySQL.update.await([[
                        UPDATE objects
                        SET model = ?, metaData = ?
                        WHERE id = ?
                    ]],
                    { GrowthObjects[stage].hash, json.encode(plant.metaData), id })
                    
                    if not affectedRows or affectedRows < 1 then
                        return false
                    end

                    Citizen.Wait(500)
                    getNewPlant()
                    TriggerClientEvent("ev-objects:updateObjects", -1, weedPlants[id])
                end
            end
            getWettingBud()
            Citizen.Wait(PlantConfig.UpdateTimer)
        end
        Citizen.Wait(1000)
    end
end)

function getNewPlant()
    local plants = MySQL.query.await([[
        SELECT *
        FROM objects
    ]])



    for idx, plant in ipairs(plants) do
        local isPlant = json.decode(plant.metaData)
        if isPlant.isWeed then 
            plant["coordinates"] = json.decode(plant.coordinates)
            plant["metaData"] = json.decode(plant.metaData)
            plant["coords"] = vector3(plant["coordinates"]["x"], plant["coordinates"]["y"], plant["coordinates"]["z"])
            weedPlants[tonumber(plant.id)] = plant
        end
    end
end

function getPlayerStrains(src, cid)
    local weedRep = exports["ev-progression"]:GetIllegalRep(src, "weedPlanting")
    local result = MySQL.scalar.await([[
        SELECT strain
        FROM weed
        WHERE cid = ?
    ]],
    { cid })
    
    if not result or result == nil then return false end
    
    local tempStrain = json.decode(result)

    return tempStrain
end

function getNewPlayerStrain(src, pInput)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local weedRep = exports["ev-progression"]:GetIllegalRep(src, "weedPlanting")
    local strain = {   
        strain = {
            n = pInput.n,
            p = pInput.p,
            k = pInput.p,
        },
        name = getStrainName(pInput),
        rep = weedRep,
        canName = false,
    }

    if not getPlayerStrains(src, cid) then
        local result = MySQL.insert.await([[
            INSERT INTO weed (cid, strain)
            VALUES (? , ?)
        ]],
        { cid, json.encode(strain) })

        if not result or result < 1 then
            return false, "Database insert eror"
        end
    else
        local tempStrain = nil
        local data = MySQL.query.await([[
            SELECT *
            FROM weed
            WHERE cid = ?
        ]], { cid })

        tempStrain = json.decode(data[1].strain)
        table.insert(tempStrain, strain)

        local affectedRows = MySQL.update.await([[
            UPDATE weed
            SET strain = ?
            WHERE cid = ?
        ]],
        { json.encode(tempStrain), cid })

        if not affectedRows or affectedRows > 0 then
            return print("couldn't update table in db")
        end
    end
end

function getWettingBud()
    local time = os.time()
    local items = MySQL.query.await([[
        SELECT *
        FROM inventory
    ]])

    if WeedConfig.ValidDryingInvs ~= nil then
        for k, v in pairs(items) do
            for i = 1, #WeedConfig.ValidDryingInvs do 
                if string.find(v.name,  WeedConfig.ValidDryingInvs[i]) then
                    if v["item_id"] == "wetbud" then
                        local info = json.decode(v.information)
                        if info.HarvestTime ~= nil then
                            if (time - info.HarvestTime) >= (WeedConfig.DryTime * 10) then
                                local affectedRows = MySQL.update.await([[
                                    UPDATE inventory
                                    SET item_id = ?
                                    WHERE id = ?
                                ]],
                                { "driedbud", v.id })
                                if not affectedRows or affectedRows < 1 then
                                    return
                                end
                            end
                        end
                    end
                end
            end
        end
    end
end
