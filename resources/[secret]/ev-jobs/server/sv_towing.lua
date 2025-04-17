RegisterNetEvent("tow:attachVehicle")
AddEventHandler("tow:attachVehicle", function(serverId, model, towVehicle, targetVehicle)
    TriggerClientEvent("tow:attachVehicle", -1, model, towVehicle, targetVehicle)
end)