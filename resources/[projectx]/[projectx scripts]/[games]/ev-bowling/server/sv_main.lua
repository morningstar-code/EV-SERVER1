local lanesInUse = {}

RPC.register('ev-bowling:purchaseItem',function(pLane ,boolean)
    local src = source
    if pLane == 'bowlingball' and exports['ev-base']:GetModule('GetCash')(src) >= 50 then
        TriggerClientEvent("player:receiveItem", src ,"bowlingball", 1)
        exports['ev-base']:GetModule('RemoveCash')(src, 50)
        return true
    end
    if not lanesInUse[pLane] == boolean and exports['ev-base']:GetModule('GetCash')(src) >= 25 then 
        local information = {
            ["Lane"] = pLane,
          }
          TriggerClientEvent("player:receiveItem", src ,"bowlingreceipt", 1, true, information)
          exports['ev-base']:GetModule('RemoveCash')(src, 25)
        return true
    else
        return false
    end
end)



RPC.register("ev-bowling:purchaseItem", function(key, lane)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local money = tonumber(user:getCash())    
    if(lane == true) then
        if money >= tonumber(25) then
            user:removeMoney(25)
            info = {
                lane = key
            }
            TriggerClientEvent("player:receiveItem", src, "bowlingreceipt", 1, true, information)
            value = true
        else
            TriggerClientEvent("DoLongHudText", src, "Not Enough Money", 2)
        end
    else
        if money >= tonumber(50) then
            value = true
            user:removeMoney(50)
            TriggerClientEvent('player:receiveItem', src, 'bowlingball', 1)
        else
            TriggerClientEvent("DoLongHudText", src, "Not Enough Money", 2)
        end
    end
    return value
end)


RPC.register("ev-bowling:getLaneAccess", function(currentid)
    local value = false
    if(currentid == info.lane) then
        value = true
    end
    return value

end)

RegisterServerEvent("ev-bowling:lanePurchase")
AddEventHandler("ev-bowling:lanePurchase", function(key, lane)
--RPC.register("ev-bowling:lanePurchase", function(key, lane)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local money = tonumber(user:getCash())   
        if money >= tonumber(25) then
            user:removeMoney(25)
            info = {
                lane = key
            }
            TriggerClientEvent("player:receiveItem", src, "bowlingreceipt", 1, true, info)
            value = true 
        else 
            TriggerClientEvent("DoLongHudText", src, "Not Enough Money", 2)
    end
    return value
end)



RegisterServerEvent("ev-bowling:usebowlingball")
AddEventHandler("ev-bowling:usebowlingball" , function()
    TriggerClientEvent('ev-bowling:client:itemused', source)
end)