local charactersCoords = {}
local spawnData = {}

function checkOverwrites(char)
    local rev = nil
    if char.overwrites == "jail" then
        rev = "jail"
    elseif char.overwrites == "maxsec" then
        rev = "maxsec"
    elseif char.overwrites == "rehab" then
        rev = "rehab"
    end

    return rev
end

function roomNum()
    local GenNum = math.random(1, 999)
    return GenNum
end

function GetHotelRoom(cid)
    local roomIds = ""
    local data = MySQL.query.await([[
        SELECT * FROM hotels
        WHERE owner = ?
    ]],
    { cid })

    if not data[1] then return "" end

    local tenants = json.encode(data[1].tenants)

    for i=1, #tenants do
        if (tenants[i] == cid) then
            roomIds = data[1].room
        end
    end
    if data[1].owner == cid then
        roomIds = data[1].room
    end

    return roomIds
end

RegisterNetEvent("character:loadspawns")
AddEventHandler("character:loadspawns", function()
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local char = user:getCurrentCharacter()
    local cid = char.id

    if not cid then return end

    local roomIds = GetHotelRoom(cid)

    spawnData = {
        ["hospital"] = {},
        ["hotelRooms"] = {},
        ["motelRoom"] = {},
        ["houses"] = {},
        ["keys"] = {},
        ["overwrites"] = {},
        ["Crash"] = nil,
    }

    spawnData["houses"] = exports["ev-housing"]:getCurrentOwned(src)
    spawnData["keys"] = exports["ev-housing"]:currentKeys(src)
    spawnData["overwrites"] = checkOverwrites(char)


    if roomIds then
        spawnData["hotelRooms"] = {
            ["room"] = roomIds,
        }
    end

    if char.new == 0 then
        local num, pType = exports["ev-apartments"]:GetApartInfo(src, cid)
        spawnData["motelRoom"] = {["roomType"] = pType}

        local health = MySQL.query.await([[
            SELECT * FROM hospital_patients
            WHERE cid = ?
        ]],
        { cid })

        spawnData["hospital"] = {
            ["illness"] = health.illness,
            ["level"] = health.level,
            ["time"] = health.time,
            ["icu"] = health.icu,
        }
    else
        local insertId = MySQL.insert.await([[
            INSERT INTO character_motel (cid, roomnum, building_type, ptype, btype)
            VALUES (?, ?, ?, ?, ?)
        ]],
        { cid, cid, 1,"np_apartments_room", "Apartments 1" })

        if not insertId then return print("ev-spawn | Failed to inert apartment info for new player") end

        local insertId = MySQL.insert.await([[
            INSERT INTO hospital_patients (cid, level, illness, time, icu)
            VALUES (?, ?, ?, ?, ?)
        ]],
        { cid, 0, "none", 0, 0 })

        if not insertId then return print("ev-spawn | Failed to inert apartment info for new player") end
        spawnData["overwrites"] = "new" 
    end


    if charactersCoords[cid] then
        spawnData["Crash"] = charactersCoords[cid]
    else
        spawnData["Crash"] = nil
    end

    TriggerClientEvent("spawn:clientSpawnData", src, spawnData)
end)

RegisterServerEvent("ev-spawn:newPlayerFullySpawned")
AddEventHandler("ev-spawn:newPlayerFullySpawned", function()
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local char = user:getCurrentCharacter()

    local isNew = MySQL.update.await([[
        UPDATE characters
        SET new = 0
        WHERE id = ?
    ]],
    { char.id })

    if not isNew then return print("^3[ev-spawn] ".. " | " .. "^5 Player still new and cannot be changed for some reason") end

    local tmep = {
        Identifier = char.id,
        Name = char.first_name,
        Surname = char.last_name,
        Sex = char.gender,
        DOB = char.dob
    }

    TriggerClientEvent("ev-spawn:getStartingItems", src, char.id, tmep)
end)

RPC.register("ev-spawn:canCreateHardcoreCharacter", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local char = user:getCurrentCharacter()

    if not char then return false end
    local CanCreate = MySQL.query.await([[
        SELECT *
        FROM characters
        WHERE id = ?
    ]],
    { char.id })

    return false
end)

Citizen.CreateThread(function()
	while true do
		-- Citizen.Wait(10 * 60 * 5000)
		Citizen.Wait(2000)

        local users = exports["ev-base"]:FetchPlayerData()

        for user, vars in pairs(users) do
            if vars.character and vars.character.id then
                local ped = GetPlayerPed(user)
                local coords = GetEntityCoords(ped)

                charactersCoords[vars.character.id] = {
                    ["pos"] = vector3(coords.x, coords.y, coords.z),
                    ["info"] = "Last Location",
                }
            end
        end
	end
end)