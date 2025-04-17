local doors = {}
local elevators = {}

RegisterServerEvent("ev-doors:request-lock-state")
AddEventHandler("ev-doors:request-lock-state", function(door)
    local src = source
    TriggerClientEvent('ev-doors:initial-lock-state', src, doors)
end)

RegisterServerEvent("ev-doors:change-lock-state")
AddEventHandler("ev-doors:change-lock-state", function(pDoorId, pDoorLockState)
    if doors[pDoorId] then
        doors[pDoorId].lock = pDoorLockState
        TriggerClientEvent('ev-doors:change-lock-state', -1, pDoorId, pDoorLockState) 
    end
end)

RegisterNetEvent("ev-doors:change-elevator-state")
AddEventHandler("ev-doors:change-elevator-state", function (pElevatorId, pFloorId, pRestricted, pForceUnlock)
    if not elevators[pElevatorId] then return end
    if not elevators[pElevatorId]["floors"][pFloorId] then return end

    elevators[pElevatorId]["floors"][pFloorId]["locked"] = pRestricted

    TriggerClientEvent("ev-doors:elevators:updateState", -1, pElevatorId, pFloorId, pRestricted, pForceUnlock)
end)

local TempState = false
RPC.register("ev-doors:useDoorKey", function(src, netId, info)
    TempState = not TempState
    local ped = GetPlayerPed(src)
    local data = json.decode(info)
    local dId = tonumber(data.doorId)

        if doors[dId] then
        if #(GetEntityCoords(ped) - doors[dId].coords) > 2 then 
            return print("to far ?")
        end
        TriggerClientEvent('ev-doors:change-lock-state', -1, dId, TempState) 
    else
        TriggerClientEvent('DoLongHudText', src, "Looks like this does not work.", 2)
    end
end)

Citizen.CreateThread(function()
    for _, door in ipairs(DOOR_CONFIG) do
        doors[#doors + 1] = door
    end
end)


-- CreateThread(function()
--     for _, door in pairs(DOOR_CONFIG) do
--         local doorModelHash = (type(door.model) == "string" and GetHashKey(door.model) or door.model)
--         local generatedDoorId = GetMapObjectId(doorModelHash, door.coords)
--         doors[generatedDoorId] = {
--             id = generatedDoorId,
--             active = door.active,
--             access = door.access,
--             coords = door.coords,
--             automatic = door.automatic,
--             forceUnlocked = door.forceUnlocked,
--             lock = door.lock,
--             info = door.info,
--             model = doorModelHash,
--             hidden = door.hidden,
--             cellNumber = door.cellNumber
--         }
--     end
-- end)

RegisterNetEvent("ev-doors:save-config")
AddEventHandler("ev-doors:save-config", function(pDoorData)
    if pDoorData ~= nil then
        local fileHandle = io.open("doorCoords.log", "a")
        if fileHandle then
            fileHandle:write(json.encode(pDoorData))
        end
        fileHandle:close()
    end
end)

RPC.register("ev-doors:elevators:fetch",function(src)
    return ELEVATOR_CONFIG
end)

RPC.register("ev-doors:charHasMrpdKeys", function(src, id)
    local hasKey = false
    exports.oxmysql:execute("SELECT * FROM characters WHERE id = @id LIMIT 1;", {["id"] = id}, function(result)
        if result[1].keys ~= nil then
            hasKey = true
        else
            hasKey = false
        end
    end)
    return hasKey
end)

RPC.register("ev-doors:triggerCasinoLaundryDoor", function(src)

end)

RegisterServerEvent("ev-door:add")
AddEventHandler("ev-door:add", function(pDoorCoords, pDoorModel)
    file = io.open("doorConfig.log", "a")
    io.output(file)
    io.write(("\n vector3(%s , %s, %s)\t %s"):format(pDoorCoords.x, pDoorCoords.y, pDoorCoords.z, pDoorModel))
    io.close(file)
end)

-- RegisterCommand('getKey', function(source, args, RawCommand)
--     local src = source
    -- local information = {
    --     location = args[1],
    --     doorId = tonumber(args[2]),
    -- }

    -- TriggerClientEvent('player:receiveItem', src, "methlabkey", 1, true, information)
-- end)