local hasActivePins = false
local currentLane = 0
local totalThrown = 0
local totalDowned = 0
local lastBall = 0
local lanes = Config.BowlingLanes
local inBowlingZone = false

local function canUseLane(pLaneId)
    local info = (exports["ev-inventory"]:GetInfoForFirstItemOfName("bowlingreceipt") or { information = "{}" })
    local laneId = json.decode(info.information).Lane
    return (exports['ev-inventory']:hasEnoughOfItem("bowlingreceipt", 1, false, true)) and (laneId == pLaneId)
end

Citizen.CreateThread(function()
    for k, v in pairs(lanes) do
        if (not v.enabled) then goto continueBox end

        exports["ev-polyzone"]:AddBoxZone("ev-bowling:lane_"..k, v.pos, 1.8, 2.0, {
            heading=0,
            minZ=23.85,
            maxZ=27.85
        })

        ::continueBox::
    end
  
    exports["ev-polyzone"]:AddBoxZone("bowling_alley", vector3(743.95, -774.54, 26.34), 16.8, 30.4, {
        heading=0,
        minZ=23.85,
        maxZ=28.85
    })

    local data = {
        id = 'bowling_npc_vendor',
        position = {
            coords = vector3(756.39, -774.74, 25.34),
            heading = 102.85,
        },
        pedType = 4,
        model = "a_m_o_salton_01",
        networked = false,
        distance = 25.0,
        settings = {
            { mode = 'invincible', active = true },
            { mode = 'ignore', active = true },
            { mode = 'freeze', active = true },
        },
        flags = {
            isNPC = true,
        },
    }

    local bowlingVendor = exports["ev-npcs"]:RegisterNPC(data, "ev-bowling:bowlingVendor")
    exports["ev-npcs"]:EnableNPC(bowlingVendor)

    for k, v in pairs(lanes) do
        if (not v.enabled) then goto continuePeak end

        exports['ev-interact']:AddPeekEntryByPolyTarget('ev-bowling:lane_'..k, {{
            event = "ev-bowling:setupPins",
            id = "bowling_pins_"..k,
            icon = "bowling-ball",
            label = "Setup Pins",
            parameters = {lane = k}
        }}, { distance = { radius = 3.5 }, isEnabled = function(pEntity, pContext) return (not hasActivePins) and (canUseLane(k)) end })

        ::continuePeak::
    end

    exports["ev-interact"]:AddPeekEntryByFlag({'isNPC'}, {{
            id = 'buy_bowling_ball',
            label = "View Store",
            icon = "bowling-ball",
            event = 'ev-bowling:handleVendorPurchase',
    }}, { distance = { radius = 2.5 }, npcIds = { 'bowling_npc_vendor' }})
end)

local function drawStatusHUD(state, pValues)
    local title = "Bowling - Lane #" .. currentLane
    local values = {}
  
    table.insert(values,  "Throws" .. ": " .. totalThrown)
    table.insert(values, "Downed" .. ": " .. totalDowned)

    if (pValues) then
        for k, v in pairs(pValues) do
        table.insert(values, v)
        end
    end

    if state == false then
        SendNUIMessage({
            app = "status-hud",
            show = false,
            data = { show = false },
        })
        return 
    end

    SendNUIMessage({
        app = "status-hud",
        show = false,
        data = {
            show = true,
            title = title,
            values = values,
        },
    })
end

AddEventHandler('ev-bowling:handleVendorPurchase', function(pParams)
    local options = Config.BowlingVendor
    local data = {}

    for itemId, item in pairs(options) do
        if (itemId == 'bowlingreceipt') then
            local lanesSorted = {}

            for k, v in ipairs(lanes) do
                table.insert(lanesSorted, { title = "Lane #" .. k, action = "ev-ui:lanePurchase", key = k, disabled = not v.enabled })
            end

            data[#data + 1] = {
                title = item.name,
                description = "$" .. item.price .. "",
                icon = 'dollar-sign',
                item = itemId,
                children = lanesSorted,
            }
        else
            data[#data + 1] = {
                title = item.name,
                description = "$" .. item.price .. "",
                icon = 'bowling-ball',
                key = itemId,
                children = {
                    { title = "Confirm Purchase", action = "ev-ui:bowlingPurchase", key = itemId },
                },
            }
        end
    end
    exports["ev-ui"]:showContextMenu(data)
end)

RegisterUICallback("ev-ui:lanePurchase", function(data, cb)
    local isLane = type(data.key) == "number"
    TriggerServerEvent('ev-bowling:lanePurchase', data.key, isLane) 
        cb({ data = {}, meta = { ok = success, message = message } })
    cb({ data = {}, meta = { ok = true, message = "done" } })
end)

RegisterUICallback("ev-ui:bowlingPurchase", function(data, cb)
    local isLane = type(data.key) == "number"
    exports["ev-ui"]:hideContextMenu()
    local success, message = RPC.execute("ev-bowling:purchaseItem", data.key, isLane)
    if not success then
        cb({ data = {}, meta = { ok = success, message = message } })
        TriggerEvent("DoLongHudText", "You can't afford that.", 2)
        return
    end

    cb({ data = {}, meta = { ok = true, message = "done" } })
end)

AddEventHandler('ev-bowling:setupPins', function(pParameters, pEntity, pContext)
    local lane = pParameters.lane

    if (not lanes[lane]) then return end
    if (hasActivePins) then return end

    hasActivePins = true
    currentLane = lane

    drawStatusHUD(true)
    TriggerEvent("inventory:removeItem","bowlingreceipt", 1)
    createPins(lanes[lane].pins)
end)

local function canUseBall()
    return (lastBall == 0 or lastBall + 6000 < GetGameTimer()) and (inBowlingZone)
end

local function resetBowling()
    removePins()
    hasActivePins = false
    drawStatusHUD(false)
end

local gameState = {}
gameState[1] = {
    onState = function()
        if (totalDowned >= 10) then
            TriggerEvent("DoLongHudText","Strike!")
            drawStatusHUD(true, {"Strike!"})

            Citizen.Wait(1500)

            resetBowling()
            totalDowned = 0
            totalThrown = 0
        elseif (totalDowned < 10) then
            removeDownedPins()
            drawStatusHUD(true, {"Throw again!"})
        end
    end
}
gameState[2] = {
    onState = function()
        if (totalDowned >= 10) then
            TriggerEvent("DoLongHudText", "Spare!")
            drawStatusHUD(true, {"Spare!"})

            Citizen.Wait(500)

            resetBowling()
        elseif (totalDowned < 10) then
            local uiText = ("You downed %s pins!"):format(totalDowned)
            TriggerEvent("DoLongHudText", uiText)

            Citizen.Wait(1500)

            resetBowling()
        end

        totalDowned = 0
        totalThrown = 0
    end
}

AddEventHandler('ev-inventory:itemUsed', function(pItemId)
    if (pItemId ~= 'bowlingball') then return end
    if (IsPedInAnyVehicle(PlayerPedId(), true)) then return end

    -- Cooldown
    if (not canUseBall()) then return end

    startBowling(false, function(ballObject)
        lastBall = GetGameTimer()
        
        if (hasActivePins) then
            totalThrown = totalThrown + 1

            local isRolling = true
            local timeOut = false

            while (isRolling and not timeOut) do
                Citizen.Wait(100)

                local ballPos = GetEntityCoords(ballObject)
                
                if (lastBall == 0 or lastBall + 10000 < GetGameTimer()) then
                    timeOut = true
                end 

                if (ballPos.x < 730.0) then
                    -- Finish line baby
                    isRolling = false
                end
            end

            Citizen.Wait(5000)

            totalDowned = getPinsDownedCount()

            if (timeOut) then
                drawStatusHUD(true, { "Time's up!"})
                timeOut = false
            end

            if (gameState[totalThrown]) then
                gameState[totalThrown].onState()
            end

            removeBowlingBall()
        end
    end)
end)

AddEventHandler('onResourceStop', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
      return
    end

    drawStatusHUD(false)
end)

AddEventHandler("ev-polyzone:enter", function(zone, data)
    if zone ~= "bowling_alley" then return end

    inBowlingZone = true
end)

AddEventHandler("ev-polyzone:exit", function(zone, data)
    if zone ~= "bowling_alley" then return end

    inBowlingZone = false

    if (hasActivePins) then
        resetBowling()
        totalDowned = 0
        totalThrown = 0
    end
end)
