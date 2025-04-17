RPC.register("apartment:search", function(pSource, pCid)
    local cid = pCid

    local buildingTypeMappedToName = {
        [1] = "No 1"
    }

    local apartments = Await(SQL.execute("SELECT * FROM character_motel WHERE cid = @cid", {
        cid = tonumber(cid)
    }))
    if not apartments then return { apartment = "Unknown" } end
    
    local apartment = apartments[1]

    return { apartment = buildingTypeMappedToName[apartment.building_type] }
end)

RPC.register("housing:search", function(pSource, pCid)
    local cid = pCid

    local housing = {}

    local housing = Await(SQL.execute("SELECT * FROM housing WHERE cid = @cid", {
        cid = tonumber(cid)
    }))

    if housing then
        for k,v in pairs(housing) do
            local housingTable = exports["ev-housing"].retriveHousingTable()
            housing[#housing+1] = {
                address = housingTable[tonumber(v.hid)].Street,
                key_type = "Owner"
            }
        end
    end

    local housingKeys = Await(SQL.execute("SELECT * FROM housing_keys WHERE cid = @cid", {
        cid = tonumber(cid)
    }))

    if housingKeys then
        for k,v in pairs(housingKeys) do
            local housingTable = exports["ev-housing"].retriveHousingTable()
            housing[#housing+1] = {
                address = housingTable[tonumber(v.hid)].Street,
                key_type = "Key Holder"
            }
        end
    end

    return housing
end)

RPC.register("ev-mdt:isPlayerOnline", function(pSource, pCid, pBool)
    local cid = pCid
    local bool = pBool

    local playerId = FindPlayerIdById(tonumber(cid))
    if not playerId then return { online = false } end

    return { online = true }
end)

RPC.register("ev:vehicles:getPlayerVehicles", function(pSource, pCid, pBool)
    local cid = pCid
    local bool = pBool

    local vehicles = Await(SQL.execute("SELECT * FROM characters_cars WHERE cid = @cid", {
        cid = cid
    }))

    if not vehicles then return end

    return vehicles
end)