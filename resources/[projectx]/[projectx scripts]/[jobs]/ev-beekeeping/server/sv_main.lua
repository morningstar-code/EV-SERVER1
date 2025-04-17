RPC.register("ev-beekeeping:installHive", function(src, pCoords, pHeading)
    local timestamp = os.time()
    -- local installHive = Await(SQL.executedynamicparam("INSERT INTO beehives (coords, heading, timestamp) VALUES (@coords, @heading, @timestamp)", {
    --     ['@coords'] = json.encode(pCoords),
    --     ['@heading'] = pHeading,
    --     ['@timestamp'] = timestamp}
    -- ))

    local installHive = MySQL.insert.await([[
        INSERT INTO beehives (coords, heading, timestamp)
        VALUES (? , ?, ?)
    ]],
    { json.encode(pCoords), pHeading, timestamp })

    if not installHive or installHive < 1 then
        TriggerClientEvent("ev-beekeeping:trigger_zone", -1, 2, {
            id = installHive.insertId,
            coords = pCoords,
            heading = pHeading,
            has_queen = false,
            last_harvest = 0,
            timestamp = timestamp
        })
    end

    return true
end)

RPC.register("ev-beekeeping:addQueen", function(src, pID)
    local execute = Await(SQL.executedynamicparam("UPDATE beehives SET has_queen = ? WHERE id = ?", true, pID))
    if execute.affectedRows > 0 then
        local dataQueen = Await(SQL.executedynamicparam("SELECT * FROM beehives WHERE id = ?", pID))
        local coords = json.decode(dataQueen[1].coords)
        dataQueen[1].coords = vector3(coords.x, coords.y, coords.z)
        TriggerClientEvent("ev-beekeeping:trigger_zone", -1, 3, dataQueen[1])
    end
    return true
end)

RPC.register("ev-beekeeping:removeHive", function(src, pData, pIsReady)
    Await(SQL.executedynamicparam("DELETE FROM beehives WHERE id = ?", {tonumber(pData.id)} ))
    TriggerClientEvent("ev-beekeeping:trigger_zone", -1, 4, pData)
    return true
end)

RPC.register("ev-beekeeping:harvestHive", function(src, pID)
    local chance = math.random()
    if HiveConfig.QueenChance > chance then
        TriggerClientEvent("player:receiveItem", src, "beequeen", 1)
    end

    TriggerClientEvent("player:receiveItem", src, "beeswax", 1)
    TriggerClientEvent("player:receiveItem", src, "honey", 3)
    
    local execute = Await(SQL.executedynamicparam("UPDATE beehives SET last_harvest = ? WHERE id = ?", {os.time(), pID} ))
    
    if execute.affectedRows > 0 then
        local dataHive = Await(SQL.executedynamicparam("SELECT * FROM beehives WHERE id = ?", {pID}))

        local coords = json.decode(dataHive[1].coords)
        dataHive[1].coords = vector3(coords.x, coords.y, coords.z)
        if ((os.time() - dataHive[1].timestamp) / 60) >= HiveConfig.LifeTime then
            Await(SQL.executedynamicparam("DELETE FROM beehives WHERE id = ?", {pID} ))

            TriggerClientEvent("ev-beekeeping:trigger_zone", -1, 4, dataHive[1])
        else
            TriggerClientEvent("ev-beekeeping:trigger_zone", -1, 3, dataHive[1])
        end
        return true
    end
end)

RPC.register("ev-beekeeping:getBeehives", function(src)
    local retrievehives = Await(SQL.executedynamicparam("SELECT * FROM beehives"))
    for k, v in pairs(retrievehives) do
        local coords = json.decode(v.coords)
        local getX = coords.x
        local getY = coords.y
        local getZ = coords.z
        v.coords = vector3(getX, getY, getZ)
    end
    TriggerClientEvent("ev-beekeeping:trigger_zone", -1, 1, retrievehives)
    return true
end)