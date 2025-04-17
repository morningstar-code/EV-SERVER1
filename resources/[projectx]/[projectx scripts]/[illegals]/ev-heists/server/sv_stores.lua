local Safes = {}

RPC.register("ev-heists:store:canHitSafe", function(src, pId, pCoord)
    local police = exports["ev-jobmanager"]:getJobCount(src, "police")

    if police < CONFIG.Safe.minCop then 
        TriggerClientEvent("DoLongHudText", src, "not enough cops", 2) 
        return false
    end

    if Safes[pId] ~= nil then
        if Safes[pId].coords == pCoord then
            Safes[pId] = {
                coords = pCoord,
                canLoot = false,
            }
            return false
        end
    else
        Safes[pId] = {
            coords = pCoord,
            canLoot = false,
        }
        return true
    end
end)

RPC.register("ev-heists:store:canHitSafeSuccess", function(src, pId)
    Citizen.CreateThread(function()
        if not Safes[pId].canLoot then
            Wait(1000 * 60 * math.random(3, 5)) -- 3-5 min
            Safes[pId].canLoot = true
        end
        Wait(1000 * 60 * 45) -- 45 min
        Safes[pId] = nil
    end)
end)

RPC.register("ev-heists:store:openCrackedSafe", function(src, pId, pCoord)
    if Safes[pId].canLoot then
        exports["ev-lootsystem"]:DrawFromLootTable(src, "event_store_safes", math.random(1, 3))
        Safes[pId].canLoot = false
    else
        TriggerClientEvent("DoLongHudText", src, "Safe not open, maybe i should wait ?", 2) 
    end
end)
