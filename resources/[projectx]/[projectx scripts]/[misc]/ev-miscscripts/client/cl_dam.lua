local DAM_COORDS = vector4(1661.3, -27.9, 161.5, 105.25)
local damdata

CreateThread(function ()
    exports["ev-polytarget"]:AddBoxZone("dam_controls", vector3(1664.16, -25.04, 162.43), 0.3, 1.5, {
        heading=12,
        minZ=159.43,
        maxZ=164.03
    })
    exports["ev-interact"]:AddPeekEntryByPolyTarget("dam_controls", {{
        id =  'dam_controls',
        label =  'Controls',
        icon =  'smile',
        CPXEvent = "ev-miscscripts:dam:control",
        parameters =  {},
    }}, { distance = { radius = 1.5 } })
end)

CPX.Events.on("ev-miscscripts:dam:control", function ()
    if not damdata then
        local sliderSettings = CPX.Procedures.execute("ev-miscscripts:dam:getSliders")
        damdata = sliderSettings.data
    end

    exports['ev-ui']:openApplication('range-picker', {
        ["sliders"] = 4,
        ["submitUrl"] = "ev-miscscripts:dam:submitSliders"
    })
end)

RegisterUICallback("ev-miscscripts:dam:submitSliders", function (result, cb)
    cb({ data = {}, meta = { ok = true, message = 'done' } })
    exports['ev-ui']:closeApplication('range-picker')
    local diff = 0
    for i = 1, 4 do
        diff = diff + math.abs(damdata[i] - tonumber(result.ranges[i]))
    end
    SetEntityCoords(PlayerPedId(), DAM_COORDS)
    SetEntityHeading(PlayerPedId(), DAM_COORDS.w)
    FreezeEntityPosition(PlayerPedId(), true)
    TriggerEvent("DoLongHudText", "the suspense....")
    Wait(5000)
    local strength = 10
    if diff > 200 then
        TriggerEvent("DoLongHudText", "You are fucked.")
        strength = 4000
        Wait(2000)
    elseif diff > 100 then
        TriggerEvent("DoLongHudText", "Meh.")
        strength = 3000
        Wait(2000)
    elseif diff > 50 then
        TriggerEvent("DoLongHudText", "Pretty good I guess, but not good enough.")
        strength = 2000
        Wait(2000)
    elseif diff > 10 then
        TriggerEvent("DoLongHudText", "Good job! You did it")
        strength = 1200
        Wait(2000)
        TriggerEvent("DoLongHudText", "Haha nevermind")
    else
        strength = 0
        TriggerEvent("DoLongHudText", "Well played. You are free.")
        Wait(2000)
    end
    FreezeEntityPosition(PlayerPedId(), false)
    strength = strength + 0.1
    Wait(500)
    if strength > 0 then
        ApplyForceToEntityCenterOfMass(PlayerPedId(), 0, strength * (-1.5), strength / 50, 100.0, false, false, true, false)
    end
end)