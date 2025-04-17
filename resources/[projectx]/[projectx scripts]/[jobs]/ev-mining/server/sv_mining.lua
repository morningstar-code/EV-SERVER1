RegisterServerEvent('ev-mining:PayPlayer')
AddEventHandler('ev-mining:PayPlayer', function(jobStatus, money)
    local src = source
    local user = exports['ev-base']:GetModule('GetPlayer')(src)
    if jobStatus then
        exports['ev-base']:GetModule('AddCash')(src, money)
        --TriggerEvent('ev-base:fishingLog', src, money)
    else
        --PerformHttpRequest('https://discord.com/api/webhooks/940103326303944756/wSuwZmWbAwkQ4zqHq6hAe5giX2x_NLgveBS54-vWwA6zjeQjccnoBGXka_ALwbNT3X4n', function(err, text, headers) end, 'POST', json.encode({username = "pixel10", content = GetPlayerName(source).."("..GetPlayerIdentifiers(source)[1]..") Edited sell fish event and has given themselves " ..money}), { ['Content-Type'] = 'application/json' })
    end    
end)