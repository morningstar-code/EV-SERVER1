RegisterCommand("updateplantcreatedat", function (src, args, raw)
    local id = tostring(args[1])
    local createdAt = tonumber(args[2])
    local plant = getPlant(id)

    if not plant then
        print("Plant not found")
        return
    end

    local result = updatePlant(id, nil, {
        gender = plant.gender,
        maleSeeds = plant.maleSeeds,
        water = plant.strain.water,
        n = plant.strain.n,
        p = plant.strain.p,
        k = plant.strain.k,
        createdAt = createdAt,
        lastHarvest = time
    })

    if result then
        print("Plant " .. id .. " createdAt updated to " .. createdAt)
    else
        print("Failed to update plant " .. id .. " createdAt")
    end
end)

RPC.register("ev-weed:plantSeed", function(pSource, pCoords, pRotation, pTypeMod)
    local planted = plantSeed(pSource, pCoords, pRotation, pTypeMod) -- It should update for every1.

    if planted then
        TriggerClientEvent("inventory:removeItem", pSource, "femaleseed", 1)
    end

    return planted
end)

RPC.register("ev-weed:addWater", function(pSource, pPlantId)
    local plant = getPlant(pPlantId)
    if not plant then return end

    local added = addWater(plant.id)
    return added and true or false
end)

RPC.register("ev-weed:addFertilizer", function(pSource, pPlantId, pInputs, pNew)
    local plant = getPlant(pPlantId)
    if not plant then return end

    if pNew then
        local strain = pInputs.n .. '-' .. pInputs.p .. '-' .. pInputs.k

        if doesPlayerHaveStrain(plant.creator, strain) then
            TriggerClientEvent("DoLongHudText", pSource, "You already have this strain.", 2)
            return false
        end

        Await(SQL.execute("INSERT INTO _weed_strain (creator, name, strain, rep) VALUES (@creator, @name, @strain, @rep)", {
            creator = plant.creator,
            name = getStrainName(pInputs),
            strain = strain,
            rep = 0
        }))

        TriggerClientEvent("ev-weed:setPlayerStrains", pSource, fetchPlayerStrains(plant.creator))
    end

    local added = addFertilizer(plant.id, pInputs)

    if added then
        TriggerClientEvent("inventory:removeItem", pSource, "fertilizer", 1)
    end

    return added and true or false
end)

RPC.register("ev-weed:addMaleSeed", function(pSource, pPlantId)
    local plant = getPlant(pPlantId)
    if not plant then return end

    local added = addMaleSeed(plant.id)
    if added then 
        TriggerClientEvent("inventory:removeItem", pSource, "maleseed", 1)
    end

    return added and true or false
end)

RPC.register("ev-weed:removePlant", function(pSource, pPlantId)
    local plant = getPlant(pPlantId)
    if not plant then return end

    local removed = removePlant(plant.id)
    return removed and true or false
end)

RPC.register("ev-weed:harvestPlant", function(pSource, pPlantId)
    local plant = getPlant(pPlantId)
    if not plant then return end

    local harvested = harvestPlant(pSource, plant)
    return harvested
end)

RPC.register("ev-weed:fetchPlayerStrains", function(pSource)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return {} end

    local strains = fetchPlayerStrains(user.character.id)

    return strains
end)