CreateThread(function()
    while true do
        local src = source
        local copCount = exports["ev-jobmanager"]:getJobCount(src, "police")
        TriggerClientEvent("police:SetCopCount", -1, copCount)
        Wait(5 * 60 * 1000) -- Sync cops count every 5 minutes  
    end 
end)