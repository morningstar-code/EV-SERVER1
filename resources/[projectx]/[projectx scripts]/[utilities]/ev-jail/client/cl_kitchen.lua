local config = nil
local isKitchen = "kitchen"

Citizen.CreateThread(function()
    config = RPC.execute("ev-jail:kitchenConfig")
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
                    event = "ev-jail:kitchenJob",
                    icon = config.polytargets[k].peek.icon,
                    label = config.polytargets[k].peek.label,
                    parameters =  config.polytargets[k].peek.parameters,
                }
            }, {
                distance = { radius = 1.5 },
                isEnabled = function()
                    return target.options.data.CanDo and isKitchen == CurrentJob
                end,
            })
        end
    end

    exports["ev-polytarget"]:AddBoxZone("kitchen_craft", vector3(1776.81, 2560.83, 45.67), 0.7, 0.75, {
        heading = 0,
        minZ = 44.67,
        maxZ = 46.47,
    })

    exports["ev-interact"]:AddPeekEntryByPolyTarget("kitchen_craft", {{
        id =  "kitchen_craft",
        label = "open",
        icon = "fas fa-pen-ruler",
        event = "ev-jail:KitchenCraft",
        parameters =  {},
      }}, { distance = { radius = 1.5 }, 
        isEnabled = function()
            return isKitchen == CurrentJob
        end,
    })
end)

AddEventHandler('ev-jail:kitchenJob', function(pArgs)
    if pArgs.type == "dish" then
        local animDictName = "anim@amb@business@coc@coc_unpack_cut@"
        RequestAnimDict(animDictName)
        while not HasAnimDictLoaded(animDictName) do
            Citizen.Wait(0)
        end
        TaskPlayAnim(PlayerPedId(), animDictName, "fullcut_cycle_v6_cokecutter", 1.0, 4.0, -1, 18, 0, 0, 0, 0)
    else
        local animDictName = "missexile3"
        RequestAnimDict(animDictName)
        while not HasAnimDictLoaded(animDictName) do
            Citizen.Wait(0)
        end
        local animLength = GetAnimDuration(animDictName, "ex03_dingy_search_case_a_michael")
        TaskPlayAnim(PlayerPedId(), animDictName, "ex03_dingy_search_case_a_michael", 1.0, 1.0, animLength, 1, -1, 0, 0, 0)
    end

    local done = loopSkill(math.random(8, 14))

    if not done then
        ClearPedTasks(PlayerPedId())
    else
        local finished = exports['ev-taskbar']:taskBar(math.random(7500, 12500), pArgs.text)
        if finished == 100 then
            local msg = RPC.execute("ev-jail:reduceTime", JailHardWork())
            TriggerEvent("DoLongHudText", msg)
            if pArgs.type == "dish" then
                if math.random() < 0.2 then
                    TriggerEvent("player:receiveItem", "chemicals", math.random(1,2))
                end
            end
            ClearPedTasks(PlayerPedId())
        end
    end
end)

AddEventHandler("ev-jail:KitchenCraft", function()
    local MenuData = RPC.execute("ev-jail:GetKitchenMenu")
    exports['ev-ui']:showContextMenu(MenuData)
end)