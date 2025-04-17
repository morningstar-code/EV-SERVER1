RegisterNetEvent("ev-police:drag:attempt")
AddEventHandler("ev-police:drag:attempt", function(pTarget, pToggle, pDrag)
    local src = source

    if pToggle == -1 then
        pToggle = src
    end

    TriggerClientEvent("ev-police:escortReceive", pTarget, pToggle, pDrag)
    TriggerClientEvent("ev-police:drag:escort", src)
end)

RegisterNetEvent("ev-police:escorting")
AddEventHandler("ev-police:escorting", function(pTarget, pToggle, pDrag)
    local src = source

    if not pTarget or pTarget == 0 then return end

    if pToggle == -1 then
        pToggle = src
    end

    TriggerClientEvent("ev-police:escortingReceive", pTarget, pToggle, pDrag)
end)

RegisterNetEvent("police:tellSitInVehicle")
AddEventHandler("police:tellSitInVehicle", function(pTarget, pVehicle, pSeat)
    TriggerClientEvent("police:forceSeatPlayer", pTarget, pVehicle, pSeat)
end)

RegisterNetEvent("police:tellGetOutOfVehicle")
AddEventHandler("police:tellGetOutOfVehicle", function(pTarget, pVehicle)
    TriggerClientEvent("police:forceUnseatPlayer", pTarget, pVehicle)
end)