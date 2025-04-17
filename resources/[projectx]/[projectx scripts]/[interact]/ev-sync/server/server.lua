local readyPlayers = {}

RegisterServerEvent("ev:sync:player:ready")
AddEventHandler("ev:sync:player:ready",function()
    local src = source

    readyPlayers[src] = true
end)

RegisterServerEvent("sync:request")
AddEventHandler("sync:request", function(native, playerid, entityid, args)
    local src = source

    if readyPlayers[playerid] then
        TriggerClientEvent("sync:execut", playerid, native, entityid, args)
    end
end)

RegisterServerEvent("ev-sync:executeSyncNative")
AddEventHandler("ev-sync:executeSyncNative", function(native, netEntity, options, args)
    local src = source

    TriggerClientEvent("ev-sync:clientExecuteSyncNative", -1, native, netEntity, options, args)
end)