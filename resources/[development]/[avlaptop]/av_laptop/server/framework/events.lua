RegisterServerEvent('av_laptop:alertOwner', function(serial, coords)
    if Config.Framework == "QBCore" then
        local Player = QBCore.Functions.GetPlayerByCitizenId(serial)
        if Player then
            TriggerClientEvent('av_laptop:alert', Player.PlayerData.source, Lang['alert_description'], coords)
        end
    elseif Config.Framework == "ESX" then
        local xPlayer = ESX.GetPlayerFromIdentifier(serial)
        if xPlayer then
            TriggerClientEvent('av_laptop:alert', xPlayer.source, Lang['alert_description'], coords)
        end
    end
end)

RegisterServerEvent('av_laptop:alertCops', function(msg,coords)
    exports['ev-dispatch']:dispatchadd('10-99', msg, '227')
end)

-- Triggered when script is restarted to sync laptop data
CreateThread(function()
    Wait(500)
    TriggerClientEvent('av_laptop:playerSpawn',-1)
end)