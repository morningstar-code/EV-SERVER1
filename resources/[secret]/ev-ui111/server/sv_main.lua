RegisterNetEvent("np-ui:server-relay")
AddEventHandler("np-ui:server-relay", function(pServerId, pData)
    TriggerClientEvent("np-ui:server-relay", pServerId, pData)
end)