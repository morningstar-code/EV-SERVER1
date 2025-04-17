local police_table = {}
local under_table = {}
local dispatch_table = {}
local dispatch_number = 0
local html

-- car
-- heli
-- motorbike
-- bicycle
-- or leave it empty

RegisterNetEvent("dispatch:add-police")
AddEventHandler("dispatch:add-police", function(code, name, icon, under, coords)
    if icon == 'car' then
        icon = 'fa-car-side'
    elseif icon == 'heli' then
        icon = 'fa-helicopter'
    elseif icon == 'motorbike' then
        icon = 'fa-motorcycle'
    elseif icon == 'bicycle' then
        icon = 'fa-bicycle'
    elseif icon == nil then
        icon = 'fa-car-side'
    end

    for k, v in pairs(police_table) do
        if v.name == name then
            police_table[k] = nil
        end
    end

    if coords == nil then
        coords = vector3(300.0, -800.0, -100.0)
    end

    police_table[code] = {
        name = name,
        code = code,
        vehicle = icon,
        owner = false,
        x = coords.x,
        y = coords.y,
        save = "2",
        whounder = "",
        active = false
    }
end)

RegisterNetEvent("dispatch:create-call")
AddEventHandler("dispatch:create-call", function(data)
    dispatch_table[data].mod = 2 
end)

RegisterNetEvent("dispatch:close_ui_sv")
AddEventHandler("dispatch:close_ui_sv", function()
    TriggerClientEvent("dispatch:close_ui_cl", -1)
end)

RegisterNetEvent("dispatch:dismiss-call-2")
AddEventHandler("dispatch:dismiss-call-2", function(data)
    dispatch_table[data].mod = 3
end)

RegisterNetEvent("dispatch:dismiss-call-1")
AddEventHandler("dispatch:dismiss-call-1", function(data)
    dispatch_table[data] = nil
    TriggerClientEvent("dispatch:remove-ping", -1, data)
end)

RegisterNetEvent("dispatch:remove-call")
AddEventHandler("dispatch:remove-call", function(data)
    dispatch_table[data] = nil
    TriggerClientEvent("dispatch:remove-ping", -1, data)
end)

RegisterNetEvent("dispatch:add_police-assign")
AddEventHandler("dispatch:add_police-assign", function(data)
    TriggerClientEvent("dispatch:add_police-assign_cl", -1, data)
end)

RegisterNetEvent("dispatch:delete_police-assign")
AddEventHandler("dispatch:delete_police-assign", function(data)
    TriggerClientEvent("dispatch:delete_police-assign_cl", -1, data)
end)

RegisterNetEvent("dispatch:delete-police_sv")
AddEventHandler("dispatch:delete-police_sv", function(data)
    TriggerClientEvent("dispatch:delete-police_cl", -1, data)
end)

RegisterNetEvent("dispatch:datayok")
AddEventHandler("dispatch:datayok", function()
    for k,v in pairs(police_table) do
        police_table[k].save = "1"
    end
end)

RegisterNetEvent("dispatch:html")
AddEventHandler("dispatch:html", function(data)
    local src = source
    html = data
    Citizen.Wait(500)
    TriggerClientEvent("dispatch:get-html", src, html)
end)

RegisterNetEvent("dispatch:osurcam-html")
AddEventHandler("dispatch:osurcam-html", function()
    local src = source
    TriggerClientEvent("dispatch:get-html", src, html)
end)

RegisterNetEvent("dispatch:coords-police")
AddEventHandler("dispatch:coords-police", function(code, coords, heading)
    if police_table[code] ~= nil then
        police_table[code].x = coords.x
        police_table[code].y = coords.y
        police_table[code].heading = heading
    end
end)

RegisterNetEvent("dispatch:change-police")
AddEventHandler("dispatch:change-police", function(data)
    police_table[data.name].vehicle = data.icon
end)

RegisterNetEvent("dispatch:get-police")
AddEventHandler("dispatch:get-police", function()
    local src = source
    TriggerClientEvent("dispatch:get-police-cl", src, police_table, dispatch_table)
end)

RegisterNetEvent("dispatch:delete-police")
AddEventHandler("dispatch:delete-police", function(name)
    if name ~= nil then
        police_table[name] = nil
        TriggerClientEvent("dispatch:delete-police_cl", -1, name)
    end
end)

RegisterNetEvent("dispatch:table_sv")
AddEventHandler("dispatch:table_sv", function(owner, player)
    police_table[owner].owner = true

    police_table[owner].active = true

    police_table[player].whounder = owner

    police_table[player].active = true

end)

RegisterNetEvent("dispatch:table_ayril")
AddEventHandler("dispatch:table_ayril", function(player)
    police_table[player].whounder = ""
    
    police_table[player].active = false
end)

RegisterNetEvent("dispatch:signoff")
AddEventHandler("dispatch:signoff", function(code, name)
    if name ~= nil then
        police_table[name] = nil
        TriggerClientEvent("dispatch:delete-police_cl", -1, name)
        TriggerClientEvent("dispatch:delete-player", -1, code)
    end
end)

RegisterNetEvent("dispatch:datayok2")
AddEventHandler("dispatch:datayok2", function()
    TriggerClientEvent("dispatch:tasima-force-yeter", -1)
end)

RegisterNetEvent("dispatch:trigger-dispatch-server:normal")
AddEventHandler("dispatch:trigger-dispatch-server:normal", function(alertName, street, alertCoordx, alertCoordy, time, code)
    dispatch_number = dispatch_number + 1

    dispatch_table[dispatch_number] = {
        code = code,
        mod = 1,
        mode = "normal",
        street = street,
        name = alertName,
        x = alertCoordx,
        y = alertCoordy,
        time = time
    }

    TriggerClientEvent("dispatch:trigger-dispatch-client:normal", -1, dispatch_number, code, alertName, street, alertCoordx, alertCoordy, time)
end)

RegisterNetEvent("dispatch:trigger-dispatch-server:full")
AddEventHandler("dispatch:trigger-dispatch-server:full", function(alertName, street, car, plate, colorName, alertCoordx, alertCoordy, time, code)
    dispatch_number = dispatch_number + 1

    dispatch_table[dispatch_number] = {
        code = code,
        mode = "full",
        vehicle = car,
        mod = 1,
        street = street,
        name = alertName,
        x = alertCoordx,
        y = alertCoordy,
        time = time,
        plate = plate,
        color = colorName
    }
    
    TriggerClientEvent("dispatch:trigger-dispatch-client:full", -1, dispatch_number, code, alertName,street, alertCoordx, alertCoordy, time,car,plate,colorName)
end)

RegisterNetEvent("dispatch:trigger-dispatch-server:custom")
AddEventHandler("dispatch:trigger-dispatch-server:custom", function(alertName, street, alertCoordx, alertCoordy, time, code, icon, sa)
    dispatch_number = dispatch_number + 1
    if sa then 
        dispatch_table[dispatch_number] = {
            code = code,
            mod = 1,
            mode = "police",
            street = street,
            name = alertName,
            x = alertCoordx,
            y = alertCoordy,
            time = time,
            icon = icon
        }
        TriggerClientEvent("dispatch:trigger-dispatch-client:custom", -1, dispatch_number, code, alertName, street, alertCoordx, alertCoordy, time, icon, true)
    else
        dispatch_table[dispatch_number] = {
            code = code,
            mod = 1,
            mode = "custom",
            street = street,
            name = alertName,
            x = alertCoordx,
            y = alertCoordy,
            time = time,
            icon = icon
        }
        TriggerClientEvent("dispatch:trigger-dispatch-client:custom", -1, dispatch_number, code, alertName, street, alertCoordx, alertCoordy, time, icon, false)
    end
end)

AddEventHandler('playerDropped', function(reason)
    local src = source   
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local info = user:getCurrentCharacter()
    local fullname = info.first_name .. " " .. info.last_name

    for k,v in pairs(police_table) do
        local check = police_table[k].name
        if police_table[k].name == fullname then
            TriggerClientEvent("dispatch:delete-player", -1, police_table[k].code)
            police_table[k] = nil
        end
    end
end)  

