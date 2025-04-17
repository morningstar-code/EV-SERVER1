RegisterNUICallback("exit" , function()
    SetNuiFocus(false, false)
end)

RegisterNUICallback('sumbit', function(data, cb)
    TriggerServerEvent("send", data)
    SetNuiFocus(false, false)
end)

RegisterNetEvent("ev-bugreport:open")
AddEventHandler("ev-bugreport:open", function ()
    SetNuiFocus(true, true)

    SendNUIMessage({
        type = "open",
    })  
end)