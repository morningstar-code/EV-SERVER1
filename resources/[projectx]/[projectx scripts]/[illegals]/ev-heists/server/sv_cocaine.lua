
RPC.register('heists:cocaine_paynow', function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cash = user:getCash() 

    if cash > CONFIG.Cocaine.dropOff then
        user:removeMoney(CONFIG.Cocaine.dropOff)
        return true
    else
        return false
    end
end)

RPC.register('heists:cocaine_start_vehicle', function(src)
    TriggerClientEvent('ev-heists:doVehicle', src, "dinghy",2004.4, 4007.85, 29.22)
    print('Spawn Dinghy At:  ',2004.4, 4007.85, 29.22)
    return 
end)

RPC.register('heists:cocaine_dump_vehicle', function(src, x,y,z)
    TriggerClientEvent('ev-heists:doVehicle', src, "sultan",x,y,z)
    print('Spawn Sultan Suken At:  ',x,y,z)
end)

RegisterServerEvent("fx:spell:target")
AddEventHandler("fx:spell:target", function(x,y,z,pTimesent)
    TriggerClientEvent("fx:do:Effect", -1, x,y,z ,pTimesent)
end)