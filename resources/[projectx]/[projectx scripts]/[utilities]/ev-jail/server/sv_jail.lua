RPC.register("ev-jail:seizeItems", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return end

    local name = "ply-" .. cid
    local jail = "jail-" .. cid

    MySQL.update.await([[
        UPDATE inventory
        SET name = ?
        WHERE name = ?
    ]],
    { jail, name })
end)

RegisterNetEvent("ev-jail:sendToJail")
AddEventHandler("ev-jail:sendToJail", function(pTarget, pTime)
	local src = source

    if #(GetEntityCoords(GetPlayerPed(src)) - GetEntityCoords(GetPlayerPed(pTarget))) > 5.0 then
        TriggerClientEvent("DoLongHudText", src, "You're too far to from the player.")
        return
    end

    local player = exports["ev-base"]:getModule("Player"):GetUser(tonumber(pTarget)) 
    local cid = player:getCurrentCharacter().id
    local character = player:getCurrentCharacter()
    if not cid then return end

    local affectedRows = MySQL.update.await([[
        UPDATE characters
        SET jail_time = ?, overwrites = ?
        WHERE id = ?
    ]],
    { tonumber(pTime), "jail", cid })

    if not affectedRows or affectedRows < 1 then return end

	local playerName = character.first_name .. ' ' .. character.last_name

    TriggerEvent("ev:news:newConviction", {name = playerName, duration = pTime})

    local date = os.date("%d/%m/%Y %H:%M:%S", os.time())

    TriggerClientEvent("ev-jail:beginJail", pTarget, true, pTime, playerName, cid, date)
    TriggerEvent("ev-log:server:CreateLog", "policeJail", "Jail", "red", "**" .. GetPlayerName(src) .. "** ( ID: " .. src .. " | State ID: " .. char.id .. ") Jailed " .. GetPlayerName(tonumber(pTarget)) .. "** ( ID: " .. tonumber(pTarget) .. " | State ID: " .. cid .. ") ".. pTime .." month/s")
end)

RegisterNetEvent("ev-jail:updateJailTime")
AddEventHandler("ev-jail:updateJailTime", function(pTime)
    local src = source

    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id

    if not cid then return end

    if pTime == -1 then
        local affectedRows = MySQL.update.await([[
            UPDATE characters
            SET overwrites = ?
            WHERE id = ?
        ]],
        { nil, cid })
    end

    local affectedRows = MySQL.update.await([[
        UPDATE characters
        SET jail_time = ?
        WHERE id = ?
    ]],
    { tonumber(pTime), cid })
end)

RegisterNetEvent("ev-jail:claimPossessions")
AddEventHandler("ev-jail:claimPossessions", function(cid, state, pSrc)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSrc) 
    if not cid then return end
    local name = "ply-" .. cid
    local jail = "jail-" .. cid
    MySQL.update.await([[
        UPDATE inventory
        SET name = ?
        WHERE name = ?
    ]],
    { name, jail })
end)

RegisterNetEvent("ev-jail:ReleaseByRhodinium", function(pSrc)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSrc) 
    local cid = user:getCurrentCharacter().id

    if not cid then return end
    local affectedRows = MySQL.update.await([[
        UPDATE characters
        SET jail_time = ?
        WHERE id = ?
    ]],
    { 0, cid })

    TriggerEvent("DoLongHudText", pSrc, "You Servied Your Sentence, You Can Leave The Prison")
end)

RPC.register("ev-jail:reduceTime", function(src, pTime)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id

    if not cid then return end
    local currTime = GetJailTime(src, cid)

    local finalTime = tonumber(currTime - pTime)

    if finalTime < 0 then
        finalTime = 0
    end
    
    local affectedRows = MySQL.update.await([[
        UPDATE characters
        SET jail_time = ?
        WHERE id = ?
    ]],
    { tonumber(finalTime), cid })

    if not affectedRows then return print("ev-jail | reduce time | something went wrong") end

    return "You sentence has been reduced " .. pTime .. " months."
end)

RPC.register("ev-jail:GetJailTime", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    local JailTime = MySQL.scalar.await([[
        SELECT jail_time
        FROM characters
        WHERE id = ? 
    ]],
    { cid })

    return JailTime
end)

RPC.register("ev-jail:GetCurrInmate", function(src)
    local inmatesTable = {}
    local data = MySQL.query.await([[
        SELECT *
        FROM characters
    ]],{})

    for k,v in pairs(data) do
        if v.jail_time > 0  then
            local date  = "Invalid Date"
            inmatesTable[#inmatesTable + 1] = {
                title = "Inmate #" .. v.id .. " - " .. v.first_name .. " " .. v.last_name,
                description = "Jailed Since: ".. date .. " - Months Remaining: " .. v.jail_time,
                action = "",
                key = {},
            }
            return inmatesTable 
        end
    end

    return false
end)

RPC.register("GetConvictionList", function(src)
    local inmatesTable = {}
    local data = MySQL.query.await([[
        SELECT *
        FROM characters
    ]],{})

    for k,v in pairs(data) do
        if v.jail_time > 0  then
            local date  = "Invalid Date"
            inmatesTable[#inmatesTable + 1] = {
                title = "Inmate #" .. v.id .. " - " .. v.first_name .. " " .. v.last_name,
                description = "Jailed Since: ".. date .. " - Months Remaining: " .. v.jail_time,
            }
            return inmatesTable 
        end
    end

    return false
end)

function GetJailTime(src, pCid)
    local time = MySQL.query.await([[
        SELECT jail_time
        FROM characters
        WHERE id = ?
    ]], { pCid })

    print("ev-jail | Get Jail time | Current Time is:", time[1].jail_time)

    return time[1].jail_time
end