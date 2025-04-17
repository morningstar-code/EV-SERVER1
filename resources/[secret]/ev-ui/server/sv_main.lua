RegisterNetEvent("ev-ui:server-relay")
AddEventHandler("ev-ui:server-relay", function(pServerId, pData)
    TriggerClientEvent("ev-ui:server-relay", pServerId, pData)
end)