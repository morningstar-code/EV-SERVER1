RPC.register("ev-business:hotel:rpc:getRooms", function(pSource, pCid)
    -- find all rooms that this cid is a tenant of.
    local cid = tonumber(pCid or 0)
    
    local tenant = SQL.execute("SELECT * FROM _storage_units_tenants WHERE cid = @cid", {
        cid = cid
    })

    if not tenant then return end

    local rooms = {}
    for i=1, #tenant do
        if room then
            table.insert(rooms, tenant[i].room_id)
        end
    end

    return rooms
end)

RPC.register("ev-business:hotel:rpc:getTenants", function(pSource, pRoomId)
    local room_id = tostring(pRoomId or "")

    local tenants = SQL.execute("SELECT * FROM _storage_units_tenants WHERE room_id = @room_id", {
        room_id = room_id
    })

    if not tenants then return end

    local tenantList = {}
    for i=1, #tenants do
        local cid = tonumber(tenants[i].cid or 0)
        table.insert(tenantList, cid)
    end

    return tenantList
end)

RPC.register("ev-business:hotel:rpc:addTenant", function(pSource, pRoomId, pCid, pIsMainTentant)
    local room_id = tostring(pRoomId or "")
    local cid = tonumber(pCid or 0)
    local is_main_tenant = pIsMainTentant or false

    local tenant = SQL.execute("SELECT * FROM _storage_units_tenants WHERE room_id = @room_id AND cid = @cid", {
        cid = cid,
        room_id = room_id
    })

    if tenant then return end

    local result = SQL.execute("INSERT INTO _storage_units_tenants (cid, room_id, is_main_tenant) VALUES (@room_id, @cid, @is_main)", {
        cid = cid,
        room_id = room_id,
        is_main = is_main_tenant
    })

    if not result then return end

    return true
end)

RPC.register("ev-business:hotel:rpc:removeTenant", function(pSource, pRoomId, pCid)
    local room_id = tostring(pRoomId or "")
    local cid = tonumber(pCid or 0)

    local tenant = SQL.execute("SELECT * FROM _storage_units_tenants WHERE room_id = @room_id AND cid = @cid", {
        cid = cid,
        room_id = room_id
    })

    if not tenant then return end

    local result = SQL.execute("DELETE FROM _storage_units_tenants WHERE room_id = @room_id AND cid = @cid", {
        cid = cid,
        room_id = room_id
    })

    if not result then return end

    return true
end)


RPC.register("ev-business:hotel:rpc:clearTenants", function(pSource, pRoomId)
    local room_id = tostring(pRoomId or "")

    local result = SQL.execute("DELETE FROM _storage_units_tenants WHERE room_id = @room_id", {
        room_id = room_id
    })

    if not result then return end

    return true
end)