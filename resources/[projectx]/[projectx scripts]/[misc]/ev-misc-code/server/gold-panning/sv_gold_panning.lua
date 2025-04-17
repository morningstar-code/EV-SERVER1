local LastCoords = nil

RegisterNetEvent("ev-goldpanning:getLoot")
AddEventHandler("ev-goldpanning:getLoot", function(pCoords)
    local src = source
    local ped = GetPlayerPed(src)

    if LastCoords then
        local dist = #(LastCoords - pCoords)
        if dist < 2 then 
            TriggerClientEvent("DoLongHudText", src, "Go find another spot.", 2)
            return  
        end
    else
        LastCoords = pCoords
    end

    if math.random() < 0.51 then
        exports["ev-lootsystem"]:DrawFromLootTable(src, "event_goldpanning", math.random(1, 6))
    else
        TriggerClientEvent("DoLongHudText", src, "Nothing.", 2)
    end
end)
