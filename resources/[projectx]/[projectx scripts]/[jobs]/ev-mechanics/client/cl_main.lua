local currOrder = {}
local BUSINESS_CODES = { 'hayes_autos', 'harmony_repairs', 'ottos_auto', 'iron_hog', 'tuner' }

AddEventHandler("ev-jobs:bennys:order", function(pVehicle, pChanges)
    local model = GetEntityModel(pVehicle)
    local orderId = math.random(10000000)
    local netId = NetworkGetNetworkIdFromEntity(pVehicle)

    if model == "NULL" then
        model = GetDisplayNameFromVehicleModel(GetEntityModel(pVehicle))
    end

    currOrder = {
        order = orderId,
        vehicle = GetDisplayNameFromVehicleModel(model),
        list = pChanges,
        netId = netId,
        _hideKeys = {"list", "netId"},
    }

    TriggerEvent("player:receiveItem", "bennysorder", 1, false, {}, currOrder)
end)

AddEventHandler("ev-inventory:itemUsed", function(item, metaData)
    local meta = json.decode(metaData)
    if item == "bennysorder" then
        local entity = exports['ev-target']:GetCurrentEntity()
        local VehicleClass = exports["ev-vehicles"]:GetVehicleRatingClass(entity)
        local orderData = RPC.execute('ev-bennys:getOrderData', meta.list, VehicleClass, meta.order, meta.vehicle, meta.netId)
        exports["ev-ui"]:showContextMenu(orderData)
    end
end)

RegisterUICallback("ev-mechanics:order:view", function(data, cb)
    cb({ data = {}, meta = { ok = true, message = "" } })
    local passed = false
    local coords = GetEntityCoords(PlayerPedId(), false) 
    local info = data.key
    local veh = NetworkGetEntityFromNetworkId(info.netId)
    local partNedded = 1
    for _, biz in ipairs(BUSINESS_CODES) do
        if exports["ev-business"]:IsEmployedAt(biz) then
            passed = true
            break
        end
    end

    if not passed then
        return
    end

    if #(coords - GetEntityCoords(veh)) > 3.0 then
        TriggerEvent("DoLongHudText", "You're too far to from the Vehicle.", 2)
        return
    end

    if info.cat == "performance" then
        if info.type > 0 then
            partNedded = info.type
        end
        if info.item then
            if not exports['ev-inventory']:hasEnoughOfItem(info.item, partNedded, false, true) then
                TriggerEvent("DoLongHudText", "You are missing" .. info.item .. " Amount: ".. partNedded, 2)
                return
            end
        end
    end

    local vehData = exports["ev-mechanics"]:getBeenysSettings('vehicle:' .. info.settings)
    local finished = exports["ev-mechanics"]:applyBennysSettings(PlayerPedId(), veh ,vehData)
    if finished ~= 100 then
        return 
    end

    if info.cat == "performance" then
        TriggerEvent('inventory:removeItem', info.item, partNedded)
        exports['ev-vehicles']:SetVehicleMod(veh, info.mod, info.type)
    elseif info.cat == "Appearance" then
        exports['ev-vehicles']:SetVehicleColor(veh, info.mod, info.type)
    elseif info.cat == "Neon" then
        exports['ev-vehicles']:SetVehicleNeons(veh, info.type)
    elseif info.cat == "Additional" then
        exports['ev-vehicles']:SetVehicleAdditional(veh, info.mod, info.type)
    end
end)

AddEventHandler("ev-selector:selectionChanged", function(data)
    return exports["ev-selector"]:getCurrentSelection(data.selectedEntity)
end)