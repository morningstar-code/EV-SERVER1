--[[ AddEventHandler("ev-inventory:itemUsed", function(item)
    if item ~= "phonedongle" then return end
    local src = source
    TriggerClientEvent('av_boosting:dongle',src)
end)

AddEventHandler("ev-inventory:itemUsed", function(item)
    if item ~= "hackingdevice" then return end
    local src = source
    TriggerClientEvent('av_boosting:useCracker',src)
end)

AddEventHandler("ev-inventory:itemUsed", function(item)
    if item ~= "phonedongle" then return end
    local src = source
    TriggerClientEvent('av_boosting:trackerMinigame',source)
end) ]]