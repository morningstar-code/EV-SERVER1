SIGNED_IN = false
CURRENT_RESTAURANT = nil
SERVER_CODE = 'wl'

local activePurchases = {}

local debugMode = GetConvar('sv_environment', 'prod') == 'debug'

function isSignedOn()
    return SIGNED_IN or CURRENT_RESTAURANT == 'prison_cooks'
end

function signOff()
    SIGNED_IN = false
    TriggerEvent("DoLongHudText", "Clocked out.")
end

AddEventHandler('ev-restaurants:signOnPrompt', function(pParameters, pEntity, pContext)
    local biz = pContext.zones['restaurant_sign_on'].biz
    local type = pContext.zones['restaurant_sign_on'].type
    SIGNED_IN, message = RPC.execute("ev-restaurants:joinJob", biz, type)
    TriggerEvent("DoLongHudText", "Clocked in.")
end)

AddEventHandler('ev-restaurants:signOffPrompt', function(pParameters, pEntity, pContext)
    local biz = pContext.zones['restaurant_sign_on'].biz
    RPC.execute("ev-restaurants:leaveJob", biz)
    signOff()
end)

RegisterNetEvent('ev-restaurants:forceLeaveJob', function()
    signOff()
end)

AddEventHandler('ev-restaurants:viewActiveEmployees', function(pParameters, pEntity, pContext)
    local biz = pContext.zones['restaurant_sign_on'].biz
    local employees = RPC.execute('ev-restaurants:getActiveEmployees', biz)

    local mappedEmployees = {}
    
    if employees == nil then
        table.insert(mappedEmployees, {
            title = "Nobody is clocked in currently",
            description = "",
        })
        exports['ev-ui']:showContextMenu(mappedEmployees)
        return 
    end

    for _, employee in pairs(employees) do
        local fancyLocationName = GetBusinessConfig(biz).name
        table.insert(mappedEmployees, {
            title = string.format("%s (%s)", employee.name, employee.cid),
            description = string.format("Clocked in at %s", fancyLocationName),
        })
    end
    if #mappedEmployees == 0 then
        table.insert(mappedEmployees, {
            title = "Nobody is clocked in currently",
        })
    end

    exports['ev-ui']:showContextMenu(mappedEmployees)
end)

AddEventHandler('ev-restaurants:makePayment', function(pParameters, pEntity, pContext)
    local id, biz
    local isNotRestaurant = false

    if pParameters and pParameters.isEditorPeek then
        id = exports["ev-housing"]:getOwnerOfCurrentProperty()
        biz = exports["ev-housing"]:getCurrentPropertyID()
        isNotRestaurant = true
    else
        id = pContext.zones['restaurant_registers'].id
        biz = pContext.zones['restaurant_registers'].biz
    end

    if id == nil or biz == nil then return end

    local activeRegisterId = id
    if not activePurchases[activeRegisterId] or activePurchases[activeRegisterId] == nil then
        TriggerEvent("DoLongHudText", "No purchase active.")
        return
    end
    local priceWithTax = RPC.execute("PriceWithTaxString", activePurchases[activeRegisterId].cost, "Goods")
    
    local acceptContext = {
        {
            title = "Restaurant Purchase",
            description = "$" .. priceWithTax.total .. " | " .. activePurchases[activeRegisterId].comment,
        },
        {
            title = "Purchase with Bank",
            action = "ev-restaurants:finishPurchasePrompt",
            icon = 'credit-card',
            key = {cost = priceWithTax.total, comment = activePurchases[activeRegisterId].comment, registerId = id, charger = activePurchases[activeRegisterId].charger, biz = biz, cash = false},
        },
        {
            title = "Purchase with Cash",
            action = "ev-restaurants:finishPurchasePrompt",
            icon = 'money-bill',
            key = {cost = priceWithTax.total, comment = activePurchases[activeRegisterId].comment, registerId = id, charger = activePurchases[activeRegisterId].charger, biz = biz, cash = true},
        }
    }
    exports['ev-ui']:showContextMenu(acceptContext)
end)

RegisterUICallback('ev-restaurants:finishPurchasePrompt', function (data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local success = RPC.execute("ev-restaurants:completePurchase", data.key)
    if not success then
        TriggerEvent("DoLongHudText", "The purchase could not be completed.")
    end
end)

AddEventHandler('ev-restaurants:chargeCustomer', function(pParameters, pEntity, pContext)
    local id, biz

    if pParameters.isEditorPeek then
        id = exports["ev-housing"]:getOwnerOfCurrentProperty()
        biz = exports["ev-housing"]:getCurrentPropertyID()
    else
        id = pContext.zones['restaurant_registers'].id
        biz = pContext.zones['restaurant_registers'].biz
    end

    if id == nil or biz == nil then return end

    local elements = {
     {
            icon = "fas fa-dollar-sign",
            label = "Cost",
            name = "cost",
        },
        {
            icon = "fas fa-pencil-alt",
            label = "Comment",
            name = "comment",
        },
    }

    local prompt = exports['ev-ui']:OpenInputMenu(elements)

    if not prompt then return end

    local cost = tonumber(prompt.cost)
    local comment = prompt.comment
    --check if cost is actually a number
    if cost == nil or not cost then return end
    if comment == nil then comment = "" end

    if cost < 5 then cost = 5 end --Minimum $10

    --Send event to everyone indicating a purchase is ready at specified register
    RPC.execute("ev-restaurants:startPurchase", {cost = cost, comment = comment, registerId = id})
end)

RegisterNetEvent('ev-restaurants:activePurchase', function(data)
    activePurchases[data.registerId] = data
end)

RegisterNetEvent('ev-restaurants:closePurchase', function(data)
    activePurchases[data] = nil
end)

AddEventHandler('ev-polyzone:enter', function(pZone, pData)
    if pZone == 'restaurant_buff_zone' then
        CURRENT_RESTAURANT = pData.id
        TriggerEvent("ev-buffs:inDoubleBuffZone", true, pData.id)
        checkForHeadset()
    end

    if pZone == 'restaurant_bs_drivethru' then
        enterDriveThru()
    end
end)

AddEventHandler('ev-polyzone:exit', function(pZone, pData)
    if pZone == 'restaurant_buff_zone' then
        if SIGNED_IN then
            SIGNED_IN = false
            RPC.execute("ev-restaurants:leaveJob", CURRENT_RESTAURANT)

            TriggerEvent("DoLongHudText", "You went too far away! Clocked out.")
        end
        CURRENT_RESTAURANT = nil
        TriggerEvent("ev-buffs:inDoubleBuffZone", false)
        turnOffHeadset()
    end

    if pZone == 'restaurant_bs_drivethru' then
        exitDriveThru()
    end
end)

AddEventHandler("ev-restaurants:silentAlarm", function()
    local finished = exports["ev-taskbar"]:taskBar(4000, "Pressing Alarm")
    if finished ~= 100 then return end
    local plyPos = GetEntityCoords(PlayerPedId())
    local streetName, crossingRoad = GetStreetNameAtCoord(plyPos.x, plyPos.y, plyPos.z)

    TriggerServerEvent('InteractSound_SV:PlayWithinDistance', 2.5, 'vault-alarm', 0.4)
  
    TriggerServerEvent('dispatch:svNotify', {
      dispatchCode = "10-90R",
      firstStreet = GetStreetNameFromHashKey(streetName),
      secondStreet = GetStreetNameFromHashKey(crossingRoad),
      extraData = exports["isPed"]:isPed("fullname"),
      origin = { x = plyPos.x, y = plyPos.y, z = plyPos.z }
    })
    --TriggerServerEvent("ev-restaurants:triggerSilentAlarm", GetEntityCoords(PlayerPedId()))
end)