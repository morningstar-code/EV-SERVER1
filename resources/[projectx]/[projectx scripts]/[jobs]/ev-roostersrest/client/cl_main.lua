local isStageActive = false
local isPerforming = false
local interiorSetNames = {
    ["table"] = "set_crimeschool_table",
    ["roulette"] = "set_crimeschool_roulette",
}
local ssInteriorSetNames = {
    ["chairs"] = "set_splitsides_chairs",
    ["empty"] = "",
}

Citizen.CreateThread(function()
    exports['ev-interact']:AddPeekEntryByPolyTarget('ev-roostersrest:tavern_stage', {{
        event = "ev-roostersrest:stageSignOn",
        id = "roosters_rest_stage_signon",
        icon = "circle",
        label = "Start Performing"
    }}, { distance = { radius = 3.5 }, isEnabled = function(pEntity, pContext) return not isStageActive end })

    exports['ev-interact']:AddPeekEntryByPolyTarget('ev-roostersrest:tavern_stage', {{
        event = "ev-roostersrest:stageSignOff",
        id = "roosters_rest_stage_signoff",
        icon = "circle",
        label = "Stop Performing"
    }}, { distance = { radius = 3.5 }, isEnabled = function(pEntity, pContext) return isPerforming end })

    RPC.execute("ev-roostersrest:getCurrentInteriorSetName")
end)

AddEventHandler('ev-roostersrest:stageSignOn', function(pParameters, pEntity, pContext)
    if not isStageActive then
        local success = RPC.execute("ev-roostersrest:startPerforming")
        if success then
            isPerforming = true
            TriggerEvent("DoLongHudText", "Performance started... break a leg!")
        elseif success ~= nil then
            TriggerEvent("DoLongHudText", "A performer is already active.")
        end
    end
end)

RegisterNetEvent('ev-roostersrest:stageSignOff', function(pParameters, pEntity, pContext)
    if not isStageActive then
        local success = RPC.execute("ev-roostersrest:stopPerforming")

        if success then
            isPerforming = false
            TriggerEvent("DoLongHudText", "Performance ended...Good job!")
        elseif success == false then
            TriggerEvent("DoLongHudText", "Not in an active performance.")
        end
    end
end)

RegisterNetEvent('ev-roostersrest:startPerformance', function()
    isStageActive = true
end)

RegisterNetEvent('ev-roostersrest:stopPerformance', function()
    isStageActive = false
end)

AddEventHandler("ev-polyzone:enter", function(zone, data)
    if zone == "ev-roostersrest:tavern_near" then
        RPC.execute("ev-roostersrest:enterTavern")
    end
    if zone == "ev-roostersrest:tavern_stage" then
      TriggerEvent('np:voice:proximity:override', 'roostersrest-stage', 3, 15.0, 3)
    end
end)

AddEventHandler("ev-polyzone:exit", function(zone)
    if zone == "ev-roostersrest:tavern_near" then
        RPC.execute("ev-roostersrest:leaveTavern")
    end

    if zone == "ev-roostersrest:tavern_main" and isPerforming then
        TriggerEvent("ev-roostersrest:stageSignOff")
    end

    if zone == "ev-roostersrest:tavern_stage" then
      TriggerEvent('np:voice:proximity:override', 'roostersrest-stage', 3, -1, -1)
    end
end)

RegisterNetEvent("ev-roostersrest:entitySetSwap", function(set)
    local cInteriorId = GetInteriorAtCoords(-160.429, 302.4148, 98.5095)
    for _, v in pairs(interiorSetNames) do
      DeactivateInteriorEntitySet(cInteriorId, v)
    end
    ActivateInteriorEntitySet(cInteriorId, interiorSetNames[set])
    RefreshInterior(cInteriorId)
end)

RegisterNetEvent("ev-splitsides:entitySetSwap", function(set)
    local cInteriorId = GetInteriorAtCoords(-439.44140000, 272.84150000, 86.35978000)
    for _, v in pairs(ssInteriorSetNames) do
        DeactivateInteriorEntitySet(cInteriorId, v)
    end
    if set then
        ActivateInteriorEntitySet(cInteriorId, ssInteriorSetNames[set])
    end
    RefreshInterior(cInteriorId)
end)
