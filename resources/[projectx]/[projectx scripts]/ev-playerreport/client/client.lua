RegisterCommand("report", function(args,rawCommand) 
    SetNuiFocus(true, true)

    SendNUIMessage({
        type = "open",
    })  
end)

RegisterNetEvent("ev-ui:report")
AddEventHandler("ev-ui:report", function()
    SetNuiFocus(true, true)

    SendNUIMessage({
        type = "open",
    }) 
end)

RegisterNUICallback("exit" , function()
    SetNuiFocus(false, false)
end)

RegisterNUICallback('sumbit', function(data, cb)
    TriggerServerEvent("sendreport", data)
    SetNuiFocus(false, false)
end)