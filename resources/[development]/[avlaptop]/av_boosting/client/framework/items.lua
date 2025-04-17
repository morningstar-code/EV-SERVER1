AddEventHandler("ev-inventory:itemUsed", function(item)
    if item ~= "phonedongle" then return end
    local src = source
    TriggerEvent('av_boosting:dongle',src) 
end)

AddEventHandler("ev-inventory:itemUsed", function(item)
    if item ~= "hackingdevice" then return end
    local src = source
    TriggerEvent('av_boosting:useCracker',src)
end)

AddEventHandler("ev-inventory:itemUsed", function(item)
    if item ~= "trackerdisabler" then return end
    local src = source
    TriggerEvent('av_boosting:trackerMinigame',src)
end)