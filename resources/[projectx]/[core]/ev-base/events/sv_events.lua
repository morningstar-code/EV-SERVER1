CPX.Events = CPX.Events or {}
CPX.Events.Registered = CPX.Events.Registered or {}

RegisterServerEvent("ev-events:listenEvent")
AddEventHandler("ev-events:listenEvent", function(id, name, args)
    local src = source

    if not CPX.Events.Registered[name] then return end

    CPX.Events.Registered[name].f(CPX.Events.Registered[name].mod, args, src, function(data)
        TriggerClientEvent("ev-events:listenEvent", src, id, data)
    end)
end)

function CPX.Events.AddEvent(self, module, func, name)
    CPX.Events.Registered[name] = {
        mod = module,
        f = func
    }
end