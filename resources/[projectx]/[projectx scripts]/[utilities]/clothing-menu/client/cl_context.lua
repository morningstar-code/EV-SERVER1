local function showContext(data)
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "OPEN_MENU",
        data = data,
    })
end

exports("showContext", showContext)

RegisterNetEvent("ev-context:showContext")
AddEventHandler("ev-context:showContext", showContext)

RegisterNetEvent("ev-context:preLoadImages")
AddEventHandler("ev-context:preLoadImages", function(images)
    SendNUIMessage({
        action = "LOAD_IMAGES",
        data = images,
    })
end)

local eventQueue = {}

RegisterNUICallback("dataPost", function(data, cb)
    SetNuiFocus(false)
    table.insert(eventQueue, { action = data.action, params = data.params })
    cb("ok")
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if #eventQueue > 0 then
            local eventData = table.remove(eventQueue, 1)
            TriggerEvent(eventData.action, eventData.params)
        end
    end
end)

RegisterNUICallback("cancel", function(data, cb)
    SetNuiFocus(false)
    cb("ok")
    TriggerEvent("attachedItems:block", false)
end)
