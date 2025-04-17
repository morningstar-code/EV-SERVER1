RegisterNetEvent("SpawnEventsServer")
AddEventHandler("SpawnEventsServer", function()
    local src = source

    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return end

    local bones = MySQL.scalar.await([[
        SELECT bones
        FROM characters
        WHERE id = ?
    ]],
    { cid })
    
    if bones ~= "{}" then
        TriggerClientEvent("bones:client:updatefromDB", src, json.decode(bones))
    else
        TriggerClientEvent("bones:client:updateServer", src)
    end
end)

RegisterNetEvent("bones:server:updateServer")
AddEventHandler("bones:server:updateServer", function(bones)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return end

    local bones = MySQL.update.await([[
        UPDATE characters
        SET bones = ?
        WHERE id = ?
    ]],
    { json.encode(bones), cid })

    if not bones then return print("ev-evidence | Bones | Error ... Couldn't add bones to db ") end
end)

RegisterNetEvent("Evidence:GetWounds")
AddEventHandler("Evidence:GetWounds", function(target)
    local src = source
    TriggerClientEvent("Evidence:GiveWounds", target, src)
end)

RegisterNetEvent("Evidence:GiveWoundsFinish")
AddEventHandler("Evidence:GiveWoundsFinish", function(damage, target, bones)
    print(target, bones)
    local src = source
    TriggerClientEvent("Evidence:CurrentDamageListTarget", target, damage, bones, src)
end)

RegisterNetEvent("updateHealLocation")
AddEventHandler("updateHealLocation", function(bonestarget, targetid)
    TriggerClientEvent("updateHealLocation:client", targetid, bonestarget)
end)

RPC.register("ev-evidence:canHeal", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return false end

    local success, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end
    local bank = exports["ev-financials"]:getAccountBalance(accountId)

    if bank < 200 then
        TriggerClientEvent("DoLongHudText", src, "You do not have $" .. 200 .. " in your bank account", 2)
        return false
    end

    return true
end)

RegisterNetEvent("ev-evidence:hospitalHeal")
AddEventHandler("ev-evidence:hospitalHeal", function()
    local src = source

    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return end

    local success, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end
    local bank = exports["ev-financials"]:getAccountBalance(accountId)


    local comment = "Medical care expenses"
    -- exports["ev-financials"]:transaction(accountId, groupBank, 200, comment, cid, 1)
end)
