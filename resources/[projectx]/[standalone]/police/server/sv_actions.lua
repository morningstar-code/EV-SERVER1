RegisterNetEvent("police:remmaskGranted")
AddEventHandler("police:remmaskGranted", function(pTarget)
    TriggerClientEvent("police:remmaskAccepted", pTarget)
end)

RegisterNetEvent("police:rob")
AddEventHandler("police:rob", function(pTarget)
    local src = source
    local Target = exports["ev-base"]:getModule("Player"):GetUser(pTarget) 
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local Targetcash = Target:getCash()

    if Targetcash > 0 then
        --if Target:removeMoney(Targetcash) then
            Target:removeMoney(Targetcash)
            print(Targetcash)
            print(tonumber(Targetcash))
            user:addMoney(tonumber(Targetcash)) 
        --end
    end
end)

RegisterNetEvent("police:gsr")
AddEventHandler("police:gsr", function(pTarget)
	local src = source

    local shotRecently = RPC.execute(pTarget, "police:gsr")

    if shotRecently then
        TriggerClientEvent("DoLongHudText", src, "We found gunpowder residue")
    else
        TriggerClientEvent("DoLongHudText", src, "We did not find any powder residue.")
    end
end)
 
RegisterServerEvent('police:dnaAsk') 
AddEventHandler('police:dnaAsk', function(t)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(t)
    local name = user.character.first_name .. " ".. user.character.last_name

    TriggerClientEvent("DoLongHudText", t, 'You have been DNA tested', 1)
    TriggerClientEvent("DoLongHudText", src, 'DNA swab comes back to a : ' .. name, 1)
    TriggerClientEvent("DoLongHudText", src, 'DNA: ' .. user.character.id, 2)

    exports['ev-mdt']:createCivilianProfile(user.character.id, name)
end)

RegisterNetEvent("police:targetCheckBank")
AddEventHandler("police:targetCheckBank", function(pTarget)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(pTarget) 
    local success, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end
    local bank = exports["ev-financials"]:getAccountBalance(accountId)

    TriggerClientEvent("DoLongHudText", src, "Have $ " .. bank .. " in the account " .. accountId)
end)

RegisterNetEvent("ev-jail:giveTicket", function(pTarget, pAmount, pComment)
    local src = source

    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then
        TriggerClientEvent("DoLongHudText", src, "cid not found?", 2)
        return
    end

    local success, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end

    local success, message = exports["ev-financials"]:transaction(accountId, 1, pAmount, pComment, cid, 8)
    if not success then
        return false, TriggerClientEvent("DoLongHudText", src, message, 2)
    end

    TriggerClientEvent("DoLongHudText", src, "Fine sent successfully!")
    TriggerClientEvent("ev-phone:notification", pTarget, "fas fa-university", "Bank", "You received a fine of $" .. pAmount, 5000)
end)