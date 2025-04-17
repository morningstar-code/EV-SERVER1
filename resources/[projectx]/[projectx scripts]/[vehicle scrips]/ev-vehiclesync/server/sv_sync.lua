
RegisterNetEvent("ev-vehicleSync:updateSyncState")
AddEventHandler("ev-vehicleSync:updateSyncState", function(pNetId, pSyncState)
    TriggerClientEvent("ev-vehicleSync:updateSyncState", -1, pNetId, pSyncState)
end)
