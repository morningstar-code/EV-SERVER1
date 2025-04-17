-- FiveM Heli Cam by davwheat and mraes edit for Victoro
-- Version 2.0 05-11-2018 (DD-MM-YYYY)
local spotlight_state = false
RegisterServerEvent("heli:spotlight_on")
RegisterServerEvent("heli:spotlight_off")

AddEventHandler("heli:spotlight_on", function(playerId)
    TriggerClientEvent("heli:spotlight_on", -1, playerId, 0)
end)

AddEventHandler("heli:spotlight_off", function(playerId)
    TriggerClientEvent("heli:spotlight_off", -1, playerId, 0)
end)

RegisterServerEvent("heli:spotlight")
AddEventHandler("heli:spotlight", function(pState)
    local src = source
    local ped = GetPlayerPed(src)
    local playerCoords = GetEntityCoords(ped)
    local players = exports["ev-infinity"]:GetNerbyPlayers(playerCoords, 100)
    spotlight_state = pState
    
    for k,v in pairs(players) do 
        TriggerClientEvent("heli:spotlight", -1, v, spotlight_state)
    end
end)