RegisterServerEvent('ev-driftschool:takemoney')
AddEventHandler('ev-driftschool:takemoney', function(data)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(source)

	if user:getCash() >= data then
        user:removeMoney(data)
    TriggerClientEvent('ev-driftschool:tookmoney', source, true)
    else
        TriggerClientEvent('DoLongHudText', source, 'You dont have enough money to do that little bitch.', 2)
    end
end)


