local config = nil
local isElectrical = "electrial"

Citizen.CreateThread(function()
    config = RPC.execute("ev-jail:GetElectricalConfig")
    for _, v in pairs(config) do
        for k, target in pairs(config.polytargets) do
            exports["ev-polytarget"]:AddBoxZone(
                k,
                vector3(target.coords.x, target.coords.y, target.coords.z),
                target.width,
                target.length,
                target.options
              )
            exports['ev-interact']:AddPeekEntryByPolyTarget(k, {
                {
                    id = k,
                    event = "ev-jail:ElectricalJob",
                    icon = "fas fa-bolt",
                    label = "Fix Electrical",
                    parameters = k,
                }
            }, {
                distance = { radius = 1.5 },
                isEnabled = function()
                    return target.options.data.CanDo and isElectrical == CurrentJob
                end,
            })
        end
    end
end)

AddEventHandler('ev-jail:ElectricalJob', function(pArgs)
    TriggerEvent("animation:PlayAnimation","welding")
    local finished = exports['ev-taskbar']:taskBar(17500, "Fixing")
    if finished == 100 then
        config.polytargets[pArgs].options.data.CanDo = false

        Citizen.CreateThread(function()
            Wait(1000 * 60 * 5) -- 5 min
            config.polytargets[pArgs].options.data.CanDo = true
        end)

        local msg = RPC.execute("ev-jail:reduceTime", JailHardWork())
        TriggerEvent("DoLongHudText", msg)
        if math.random() < 0.2 then
            -- TriggerEvent("player:receiveItem", "chemicals", math.random(1,2))
        end
        ClearPedTasks(PlayerPedId())
    end
end)
