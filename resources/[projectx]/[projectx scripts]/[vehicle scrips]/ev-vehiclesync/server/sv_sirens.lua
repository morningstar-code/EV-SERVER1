RegisterNetEvent("ev-vehicleSync:updateSirenState")
AddEventHandler("ev-vehicleSync:updateSirenState", function(pNetId, pSirenState, pSirenPreset)
    TriggerClientEvent("ev-vehicleSync:updateSirenState", -1, pNetId, pSirenState, pSirenPreset)
end)