currentRoomLocks = {
    [1] = {},
    [2] = {},
    [3] = {}
}

currentRoomLockdown = {
    [1] = {},
    [2] = {},
    [3] = {}
}

ApartInfo = {}


RPC.register("GetMotelInformation", function(src, currentRoomType, currentRoomNumber)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
 
    exports.oxmysql:execute("SELECT * FROM character_motel WHERE cid = @cid", {["cid"] = cid}, function(data)
        if data[1].roomnum == nil then
            exports.oxmysql:execute("UPDATE character_motel SET roomnum=@roomnum WHERE cid=@cid ", {
                ["cid"] = cid,
                ["roomnum"] = currentRoomNumber
            })
            ApartInfo = data
        else
            ApartInfo = data
        end
    end)

    Citizen.Wait(100)
    return ApartInfo
end)

RPC.register("GetMotelInformation:character", function(src, cid)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local ApartInfo 
    exports.oxmysql:execute("SELECT * FROM character_motel WHERE cid = @cid", {["cid"] = tonumber(cid)}, function(data)
        if data[1] ~= nil then
            ApartInfo = data[1]
        end
    end)

    Citizen.Wait(100)
    return ApartInfo
end)

RPC.register("IsValidRoom", function(src, RoomType, RoomNumber)
    local data = exports.oxmysql:execute("SELECT * FROM character_motel WHERE id=@roomnum AND building_type=@ptype", {
        ["roomnum"] = RoomNumber,
        ["ptype"] = RoomType
    })
    local retval = false
    if data[1] then
        retval = true
    end

    Citizen.Wait(100)
    return retval
end)

RPC.register("apartment:forclose", function(src, RoomType, RoomNumber)
    currentRoomLockdown[RoomType][RoomNumber] = not currentRoomLockdown[RoomType][RoomNumber]
end)

RPC.register("apartment:getOwner", function(src, RoomType, RoomNumber)
    local data = exports.oxmysql:execute("SELECT * FROM character_motel WHERE id=@roomnum AND building_type=@ptype", {
        ["roomnum"] = RoomNumber,
        ["ptype"] = RoomType
    })

    Citizen.Wait(100)
    return data[1].cid
end)

RPC.register("upgradeApartment", function(src, apartmentTargetType, RoomType, RoomNumber)
    local data = exports.oxmysql:execute("SELECT * FROM character_motel WHERE id=@roomnum AND building_type=@ptype", {
        ["roomnum"] = RoomNumber,
        ["ptype"] = RoomType
    })
    exports.oxmysql:execute("UPDATE character_motel SET building_type=@btype WHERE id=@roomnum", {
        ["roomnum"] = RoomNumber,
        ["btype"] = apartmentTargetType
    })
    return true
end)

RPC.register("getApartmentInformation", function(src)
    return Apart.info
end)

RPC.register("apartment:allCurrentApartmentsOfRoomType", function(src, Roomtype)
    return currentRoomLocks[Roomtype]
end)

RegisterServerEvent("apartment:serverApartmentSpawn")
AddEventHandler("apartment:serverApartmentSpawn", function(roomType, isNew, instance, isSpawn)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    exports.oxmysql:execute("SELECT * from character_motel WHERE cid=@cid", {
        ["cid"] = cid
    }, function(result)
        if result[1] ~= nil then
            if isSpawn then
                TriggerClientEvent("apartments:enterMotel", src, result[1].roomnum, roomType, isSpawn)
            elseif isNew then
                TriggerClientEvent("apartments:enterMotel", src, result[1].roomnum, roomType, isSpawn)
            end
            TriggerClientEvent("apartments:apartmentSpawn",src, result[1], result[1].roomnum)
        end
        currentRoomLocks[roomType][result[1].roomnum] = true
        TriggerClientEvent("apartments:apartmentLocks", -1, currentRoomLocks)
    end)
end)

RegisterServerEvent("apartment:serverEnterAprts")
AddEventHandler("apartment:serverEnterAprts", function(roomType)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local char = user:getCurrentCharacter()

    local data = MySQL.query.await([[
        SELECT *
        FROM character_motel
        WHERE cid = ?
    ]],
    { char.id })

    if #data > 0 then
        if data[1].building_type == roomType then
            TriggerClientEvent("apartments:enterMotel", src, data[1].roomnum, roomType)
        else
            TriggerClientEvent("DoLongHudText", src, "You don't have a Apartment here", 5)
        end
    end
end)

RegisterServerEvent("apartment:serverUnlockAprts")
AddEventHandler("apartment:serverUnlockAprts", function(roomType)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local char = user:getCurrentCharacter()

    local data = MySQL.query.await([[
        SELECT *
        FROM character_motel
        WHERE cid = ?
    ]],
    { char.id })

    if #data > 0 then
        if data[1].building_type == roomType then
            TriggerClientEvent("ev-apps:unlocks1", src, data[1].roomnum)
        else
            TriggerClientEvent("ev-apps:unlocks2", src, data[1].roomnum)
        end
    end
end)

RegisterServerEvent("apartments:ToggleLocks")
AddEventHandler("apartments:ToggleLocks", function(RoomType, RoomNumber)
    currentRoomLocks[RoomType][RoomNumber] = not currentRoomLocks[RoomType][RoomNumber]
    TriggerClientEvent("apartments:apartmentLocks", -1, currentRoomLocks)
end)

RegisterServerEvent("apartment:serverLockdown")
AddEventHandler("apartment:serverLockdown", function(RoomType, RoomNumber)
    currentRoomLocks[RoomType][RoomNumber] = not currentRoomLocks[RoomType][RoomNumber]
    currentRoomLockdown[RoomType][RoomNumber] = not currentRoomLockdown[RoomType][RoomNumber]

    TriggerClientEvent("apartments:apartmentLocks", -1, currentRoomLocks)
    TriggerClientEvent("apartments:apartmentLockDown", -1, currentRoomLockdown)
end)

RegisterServerEvent("apartment:serverLockdownCID")
AddEventHandler("apartment:serverLockdownCID", function(cid, RoomType)
    local data = MySQL.query.await([[
        SELECT *
        FROM character_motel
        WHERE cid = ?
    ]],
    { cid })

    if data[1] ~= nil then
        currentRoomLockdown[tonumber(RoomType)][tonumber(data[1].roomnum)] = not currentRoomLockdown[tonumber(RoomType)][tonumber(data[1].roomnum)]
        TriggerClientEvent("apartments:apartmentLockDown", -1, currentRoomLockdown)
    end
end)

RegisterServerEvent("apartments:cleanUpRoom")
AddEventHandler("apartments:cleanUpRoom", function()
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    local num, pType = exports["ev-apartments"]:GetApartInfo(src, cid)
    
    TriggerClientEvent("ev-death:reset", src) -- check later
    TriggerClientEvent("ev-police:resetCuffs", src)
    TriggerClientEvent("ev-police:resetEscort", src) -- check later
    TriggerClientEvent("ev-housing:reset", src) -- check later
    TriggerClientEvent("ev-evidence:reset", src)
    TriggerClientEvent("ev-jail:reset", src)

    TriggerClientEvent("apartment:removeFromBuilding", -1, num, pType)

    TriggerClientEvent("insideShell", src, false)
    exports["ev-infinity"]:setWorld(src, "default")
end)

function GetApartInfo(src, pCid)
	local data = MySQL.query.await([[
		SELECT * FROM character_motel
		WHERE cid = ?
	]],
	{ pCid })

    if not data then return "ERROR fetching Apartment data..." end

    return data[1].roomnum, data[1].building_type
end

exports("GetApartInfo", GetApartInfo)

AddEventHandler("playerDropped", function()
	local src = source

    for i, v in ipairs(ApartInfo) do
        for i2, v2 in ipairs(v) do
            if v2 ~= 0 then
                if v2.src == src then
                    ApartInfo[i][i2] = 0
                end
            end
        end
    end
end)
