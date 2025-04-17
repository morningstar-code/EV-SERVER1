CPX.Events = CPX.Events or {}
CPX.Events.Total = 0
CPX.Events.Active = {}

function CPX.Events.Trigger(self, event, args, callback)
    local id = CPX.Events.Total + 1
    CPX.Events.Total = id

    id = event .. ":" .. id

    if CPX.Events.Active[id] then return end

    CPX.Events.Active[id] = {cb = callback}
    
    TriggerServerEvent("ev-events:listenEvent", id, event, args)
end

RegisterNetEvent("ev-events:listenEvent")
AddEventHandler("ev-events:listenEvent", function(id, data)
    local ev = CPX.Events.Active[id]
    
    if ev then
        ev.cb(data)
        CPX.Events.Active[id] = nil
    end
end)

RegisterCommand("fml:admin-report", function()
    TriggerServerEvent("ev:fml:isInTime", true)
end)
RegisterCommand("fml:admin-report2", function()
    TriggerServerEvent("ev:fml:isInTime", false)
end)
