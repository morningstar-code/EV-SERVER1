plantedBombs = {}


RegisterServerEvent('ev-bombs:bombs:exploded')
AddEventHandler('ev-bombs:bombs:exploded', function(index)
    TriggerClientEvent('ev-bombs:bombs:exploded', -1, index)
end)

RegisterServerEvent('ev-bombs:bombs:explode')
AddEventHandler('ev-bombs:bombs:explode', function(index)
    TriggerClientEvent('ev-bombs:bombs:explode', -1, index)
end)

RegisterServerEvent("ev-bombs:removeItem")
AddEventHandler("ev-bombs:removeItem",function()
    local src = source
    Config.ItemRemoveTrigger(src) 
end)

RegisterServerEvent('ev-bombs:bombs:completedHacking')
AddEventHandler('ev-bombs:bombs:completedHacking', function(success, index)
    if success then
        TriggerClientEvent('ev-bombs:bombs:defused', -1, index)
    else 
        TriggerClientEvent('ev-bombs:bombs:explode', -1, index)
    end
end) 
 
RegisterServerEvent('ev-bombs:bombs:cut')
AddEventHandler('ev-bombs:bombs:cut', function(index, bomb, wire)
    local src = source
    if bomb.wire == wire then
        TriggerClientEvent('ev-bombs:bombs:defuseCorrectBomb', src, index, bomb.coloredSquares, bomb.timeToComplete)
    else 
        TriggerClientEvent('ev-bombs:bombs:explode', -1, index)
    end
end)

RegisterServerEvent('ev-bombs:plant')
AddEventHandler('ev-bombs:plant', function(coords, length, wire, coloredSquares, timeToComplete)
    local lastIndex = 0
    for k, v in pairs(plantedBombs) do
        lastIndex = k
    end
    plantedBombs[lastIndex + 1] = {
        defused = false,
        exploded = false,
        length = length * 1000,
        wire = wire,
        coloredSquares = coloredSquares,
        timeToComplete = timeToComplete,
        startTime = GetGameTimer(),
        soundEnable = true,
        coords = coords 
    }
    TriggerClientEvent('ev-bombs:bombs:UpdateBombs', -1, plantedBombs)
end)

