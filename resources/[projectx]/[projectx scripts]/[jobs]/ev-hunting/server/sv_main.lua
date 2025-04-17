RPC.register("ev-hunting:getSettings", function(src)
    return Config.Hunting
end)

RPC.register("ev-hunting:getSkinnedItem", function(src, pEntity, mySpawn, illegalSpawn, animalName, buffStartTime)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local pNetId = NetworkGetEntityFromNetworkId(pEntity)
    local randomAmount = math.random(1,30)
    print(randomAmount)
    if not illegalSpawn then
        if randomAmount >= 1 and randomAmount <= 15 then
            TriggerClientEvent('player:receiveItem', src, 'huntingcarcass1', 1)
            --TriggerClientEvent('player:receiveItem', src, 'huntingpelt', math.random(1,3))
            TriggerClientEvent('player:receiveItem', src, 'huntingmeat', math.random(1,2))
        elseif randomAmount >= 16 and randomAmount <= 23 then
            TriggerClientEvent('player:receiveItem', src, 'huntingcarcass2', 1)
            --TriggerClientEvent('player:receiveItem', src, 'huntingpelt', math.random(1,3))
            TriggerClientEvent('player:receiveItem', src, 'huntingmeat', math.random(1,2)) 
        elseif randomAmount >= 24 and randomAmount <= 30 then
            TriggerClientEvent('player:receiveItem', src, 'huntingcarcass3', 1)
            --TriggerClientEvent('player:receiveItem', src, 'huntingpelt', math.random(1,3))
            TriggerClientEvent('player:receiveItem', src, 'huntingmeat', math.random(1,2))
        end
    else
        TriggerClientEvent('player:receiveItem', src, "huntingcarcass4", 1)
        --TriggerClientEvent('player:receiveItem', src, 'huntingpelt', math.random(1,3))
        TriggerClientEvent('player:receiveItem', src, 'huntingmeat', math.random(1,2))
    end

    DeleteEntity(pNetId)
end)
