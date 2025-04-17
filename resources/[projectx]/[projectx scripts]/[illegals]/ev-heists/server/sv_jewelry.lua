local count = 0

RPC.register("ev-heists:jewelryCanRob", function(src)
    local police = exports["ev-jobmanager"]:getJobCount(src, "police")

    if police < CONFIG.Jewelry.minCop then 
        return false
    end
    
    if (os.time() - CONFIG.Jewelry.cooldown) > CONFIG.Jewelry.lastrobbed then
        for k, v in pairs(CONFIG.Jewelry.jewelryBox) do
            CONFIG.Jewelry.jewelryBox[k] = true
        end
        return true
    end

    return false
end)

RPC.register("ev-heists:jewelryStartRobbery", function(src)
    CONFIG.Jewelry.lastrobbed = os.time()
    CONFIG.Jewelry.startRob = true
    TriggerEvent("ev-doors:change-lock-state", 111 , false)
    TriggerEvent("ev-doors:change-lock-state", 112 , false)

    return true
end)

RPC.register("ev-heists:jewelryCount", function(src)
    count = count + 1
    return count
end)

RPC.register("ev-heists:jewelryCanSmashBox", function(src, pId, pState)
    local police = exports["ev-jobmanager"]:getJobCount(src, "police")

    if police < CONFIG.Jewelry.minCop then 
        return false
    end
    
    local returnvalue = CONFIG.Jewelry.jewelryBox[pId]
    if returnvalue then
        CONFIG.Jewelry.jewelryBox[pId] = not CONFIG.Jewelry.jewelryBox[pId]
        return true
    end

    return false
end)

Citizen.CreateThread(function()
    TriggerEvent("ev-doors:change-lock-state", 111 , true)
    TriggerEvent("ev-doors:change-lock-state", 112 , true)
    count = 0
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait((1000 * 60 ) * 5)
        if CONFIG.Jewelry.startRob then
            if (os.time() - CONFIG.Jewelry.cooldown) > CONFIG.Jewelry.lastrobbed then
                CONFIG.Bobcat.Jewelry = false
                count = 0
                TriggerEvent("ev-doors:change-lock-state", 111 , true)
                TriggerEvent("ev-doors:change-lock-state", 112 , true)
            end
        end
    end
end)