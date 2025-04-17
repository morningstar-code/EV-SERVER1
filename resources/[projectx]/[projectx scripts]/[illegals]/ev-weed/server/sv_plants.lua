function getPlant(pId)
    local plant = exports["ev-objects"]:GetObject(pId)
    if not plant then return false end

    local metadata = plant.public

    return {
        id = plant.id,
        creator = metadata.creator,
        coords = vector3(plant.coords.x, plant.coords.y, plant.coords.z),
        gender = metadata.gender,
        strain = { water = metadata.water, n = metadata.n, p = metadata.p, k = metadata.k },
        createdAt = metadata.createdAt,
        lastHarvest = metadata.lastHarvest,
        metadata = plant.public
    }
end

function updatePlant(pId, pHash, pMetaData)
    local p = promise:new()

    exports["ev-objects"]:UpdateObjectPromise(
        function(result)
            print("WEED - Plant updated!", result)
            p:resolve(result)
        end,
        true, -- Updates object list
        pId,
        pMetaData,
        {},
        pHash
    )

    local success = Citizen.Await(p)

    return success
end

function plantSeed(pSource, pCoords, pRotation, pTypeMod)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false end

    local p = promise:new()

    local time = os.time()

    exports["ev-objects"]:SaveObjectPromise(
        function(result)
            print("WEED - Plant saved!")
            p:resolve(result)
        end,
        pSource,
        "weed",
        PlantConfig.GrowthObjects[1].hash,
        { x = pCoords.x, y = pCoords.y, z = pCoords.z },
        { x = pRotation.x, y = pRotation.y, z = pRotation.z },
        { creator = user.character.id, gender = 0, water = 0, n = pTypeMod.n, p = pTypeMod.p, k = pTypeMod.k, createdAt = time, lastHarvest = 0},
        {},
        'dynamic'
    )

    local object = Citizen.Await(p)
    if not object then return false end

    return true
end

function addWater(pId)
    local plant = getPlant(pId)

    local metadata = plant.metadata or {}
    metadata.water = metadata.water + PlantConfig.WaterAdd * 100

    local result = updatePlant(pId, nil, metadata)

    if result then
        plant.strain.water = metadata.water
        return true
    end

    return false
end

function addFertilizer(pId, pInputs)
    local plant = getPlant(pId)

    local metadata = plant.metadata or {}

    metadata.n = pInputs.n
    metadata.p = pInputs.p
    metadata.k = pInputs.k

    local result = updatePlant(pId, nil, metadata)

    if result then
        plant.strain.n = metadata.n
        plant.strain.p = metadata.p
        plant.strain.k = metadata.k
        return true
    end

    return false
end

function addMaleSeed(pId)
    local plant = getPlant(pId)

    local metadata = plant.metadata or {}
    metadata.gender = 1

    local result = updatePlant(pId, nil, metadata)

    if result then
        plant.gender = metadata.gender
        return true
    end

    return false
end

function removePlant(pSource, pPlantId)
    local p = promise:new()

    local result = exports["ev-objects"]:DeleteObjectPromise(
        function(result)
            print("WEED - Plant removed!")
            p:resolve(result)
        end,
        pPlantId
    )

    local success = Citizen.Await(p)

    return success
end

function harvestPlant(pSource, pPlant)
    local time = os.time()

    local result = updatePlant(pPlant.id, PlantConfig.GrowthObjects[1].hash, {
        gender = pPlant.gender,
        water = pPlant.strain.water,
        n = pPlant.strain.n,
        p = pPlant.strain.p,
        k = pPlant.strain.k,
        createdAt = time,
        lastHarvest = time
    })

    if result then
        if pPlant.gender == 0 then -- Is female
            TriggerClientEvent("player:receiveItem", pSource, "wetbud", 1, false, {
                _hideKeys = {"timestamp"},
                timestamp = time,
                --strain = pStrain.strain
                --quality = pStrain.quality
            })
        else -- Is male
            math.randomseed(os.time())

            if math.random() < PlantConfig.MaleChance then
                TriggerClientEvent("player:receiveItem", pSource, "maleseed", 1)
            end

            TriggerClientEvent("player:receiveItem", pSource, "femaleseed", math.random(PlantConfig.SeedsFromMale[1], PlantConfig.SeedsFromMale[2]), false, {
                _hideKeys = {"strain"},
                strain = pPlant.strain 
            })

            if PlantConfig.RemoveMaleOnHarvest then
                removePlant(pPlant.id)
            end
        end

        return true
    end

    return false
end

function fetchPlayerStrains(pCharacterId)
    local strains = Await(SQL.execute("SELECT * FROM _weed_strain WHERE creator = @creator", {
        creator = pCharacterId
    }))

    return strains
end

function doesPlayerHaveStrain(pCharacterId, pStrain)
    local strains = Await(SQL.execute("SELECT * FROM _weed_strain WHERE creator = @creator AND strain = @strain", {
        creator = pCharacterId,
        strain = pStrain
    }))

    return strains and #strains > 0
end

--[[
    Plant Update Thread
]]

Citizen.CreateThread(function() -- Hmm, how is this gonna work with the object system?
    while true do
        print("[WEED] Updating plants...")

        local plants = exports["ev-objects"]:GetObjectsByNamespace("weed")

        for i = 1, #plants do
            local plant = plants[i]
            local time = os.time()
            local growthPercent = getPlantGrowthPercent(plant, time, true)

            local stage = getStageFromPercent(growthPercent)

            -- If model doesn't match stage, update it
            if stage > 1 or plant.model ~= PlantConfig.GrowthObjects[1].hash then
                print("[WEED] Stage is more than 1, or model doesn't match, updating...")

                local growthObject = PlantConfig.GrowthObjects[stage]
                if growthObject then
                    exports["ev-objects"]:UpdateObject(
                        plant.id,
                        plant.public,
                        plant.private,
                        growthObject.hash,
                        nil,
                        nil,
                        nil,
                        true -- Updates object list
                    )
                end
            end
        end

        Citizen.Wait(PlantConfig.UpdateTimer)
    end
end)

--[[
    Plant Expire Thread
]]

Citizen.CreateThread(function() -- Maybe use objects expiry system? But it's not finished...
    local plants = exports["ev-objects"]:GetObjectsByNamespace("weed")
    for i = 1, #plants do
        local plant = plants[i]
        local metadata = plant.public
        local time = os.time()
        local timeDiff = time - metadata.createdAt
        local timeDiffMins = timeDiff / 60

        if timeDiffMins >= PlantConfig.LifeTime then
            print("Plant " .. plant.id .. " has expired, removing")
            removePlant(plant.id)
        end
    end
end)

--[[
    Wet Bud Drying Thread
]]

Citizen.CreateThread(function()
    while true do
        print("[WEED] Checking for dried wet buds...")

        local result = Await(SQL.execute("SELECT * FROM inventory WHERE name NOT LIKE @name AND item_id = @item_id", {
            name = "ply",
            item_id = "wetbud"
        }))

        if not result then
            print("[WEED] Failed to get wet buds from database")
            goto continue
        end

        for i = 1, #result do
            for j = 1, #WeedConfig.ValidDryingInvs do
                if string.find(result[i].name,  WeedConfig.ValidDryingInvs[j]) then
                    local item = result[i]
                    local metaData = json.decode(item.information or "{}")

                    if metaData.timestamp ~= nil then
                        local currentTime = os.time()
                        local timeDiff = currentTime - metaData.timestamp
                        local dryTime = WeedConfig.DryTime * 60

                        if timeDiff >= dryTime then
                            local updated = Await(SQL.execute("UPDATE inventory SET item_id = @item_id WHERE id = @id", {
                                item_id = "driedbud",
                                id = item.id
                            }))

                            if updated then
                                print("[WEED] Wet bud " .. item.id .. " has dried")
                            else
                                print("[WEED] Failed to update wet bud " .. item.id)
                            end
                        end
                    end
                end
            end
        end

        ::continue::

        Citizen.Wait(1000 * 60 * 60) -- 1 hour
    end
end)