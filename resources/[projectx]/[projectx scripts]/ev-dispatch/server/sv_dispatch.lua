local calls = {}
local pings = {}
local units = {}
local unitAssignments = {}
local codes = {
    ["10-13A"] = {
        title = "Officer Down URGENT ",
        dispatchCode = "10-13A",
        dispatchMessage = nil,
        blipDescription = "Officer Down URGENT",
        blipSprite = 630,
        blipColor = 49,
        blipArea = nil, -- radius
        isTracker = false,
        playSound = true,
        soundName = "polalert",
        priority = 3
    },
    ["10-13B"] = {
        title = "Officer Down",
        dispatchCode = "10-13B",
        dispatchMessage = nil,
        blipDescription = "Officer Down",
        blipSprite = 630,
        blipColor = 45,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-14A"] = {
        title = "EMS Down URGENT",
        dispatchCode = "10-14A",
        dispatchMessage = nil,
        blipDescription = "EMS Down URGENT",
        blipSprite = 630,
        blipColor = 49,
        blipArea = nil, -- radius
        isTracker = false,
        playSound = true,
        soundName = "polalert",
        priority = 3
    },
    ["10-14B"] = {
        title = "EMS Down",
        dispatchCode = "10-14B",
        dispatchMessage = nil,
        blipDescription = "EMS Down",
        blipSprite = 630,
        blipColor = 45,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-90F"] = {
        title = "Fleeca Bank Alarm",
        dispatchCode = "10-90F",
        dispatchMessage = nil,
        blipDescription = "Fleeca Bank Robbery",
        blipSprite = 500,
        blipColor = 2,
        blipArea = nil, -- radius
        isTracker = false,
        playSound = true,
        soundName = "HighPrioCrime",
    },
    ["10-90P"] = {
        title = "Paleto Bank Alarm",
        dispatchCode = "10-90P",
        dispatchMessage = nil,
        blipDescription = "Paleto Bank Robbery",
        blipSprite = 434,
        blipColor = 46,
        blipArea = nil, -- radius
        isTracker = false,
        playSound = true,
        soundName = "HighPrioCrime",
    },
    ["10-90V"] = {
        title = "Vault Bank Alarm",
        dispatchCode = "10-90V",
        dispatchMessage = nil,
        blipDescription = "Vault Bank Robbery",
        blipSprite = 605,
        blipColor = 5,
        blipArea = nil, -- radius
        isTracker = false,
        playSound = true,
        soundName = "HighPrioCrime",
    },
    ["10-90J"] = {
        title = "Jewelery Store Alarm",
        dispatchCode = "10-90J",
        dispatchMessage = nil,
        blipDescription = "Jewelery Store Robbery",
        blipSprite = 617,
        blipColor = 5,
        blipArea = nil, -- radius
        isTracker = false,
        playSound = true,
        soundName = "HighPrioCrime",
    },
    ["10-90S"] = {
        title = "Store Alarm",
        dispatchCode = "10-90S",
        dispatchMessage = nil,
        blipDescription = "Store Robbery",
        blipSprite = 628,
        blipColor = 0,
        blipArea = nil, -- radius
        isTracker = false,
        playSound = true,
        soundName = "HighPrioCrime",
    },
    ["10-31A"] = {
        title = "House Alarm",
        dispatchCode = "10-31A",
        dispatchMessage = nil,
        blipDescription = "House Robbery",
        blipSprite = 40,
        blipColor = 0,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-90BC"] = {
        title = "Bob Cat Alarm",
        dispatchCode = "10-90BC",
        dispatchMessage = nil,
        blipDescription = "Bob Cat Robbery",
        blipSprite = 556,
        blipColor = 25,
        blipArea = nil, -- radius
        isTracker = false,
        playSound = true,
        soundName = "HighPrioCrime",
    },
    ["10-90Y"] = {
        title = "Yacht Alarm",
        dispatchCode = "10-90Y",
        dispatchMessage = nil,
        blipDescription = "yacht Robbery",
        blipSprite = 445,
        blipColor = 32,
        blipArea = nil, -- radius
        isTracker = false,
        playSound = true,
        soundName = "HighPrioCrime",
    },
    ["10-90D"] = {
        title = "Bank Truck",
        dispatchCode = "10-90D",
        dispatchMessage = nil,
        blipDescription = "Bank Truck Robbery",
        blipSprite = 110,
        blipColor = 3,
        blipArea = nil, -- radius
        isTracker = false,
        playSound = true,
        soundName = "HighPrioCrime",
    },
    ["10-47"] = {
        title = "Injured Person",
        dispatchCode = "10-47",
        dispatchMessage = nil,
        blipDescription = "Person's Injured",
        blipSprite = 280,
        blipColor = 3,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-37"] = {
        title = "Suspicious Activity Drug Sale",
        dispatchCode = "10-37",
        dispatchMessage = nil,
        blipDescription = "Suspicious Activity",
        blipSprite = 110,
        blipColor = 3,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-100"] = {
        title = "City Power Disturbance ",
        dispatchCode = "10-100",
        dispatchMessage = nil,
        blipDescription = "Disturbance At City Power",
        blipSprite = 354,
        blipColor = 26,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-71A"] = {
        title = "Shots Fired",
        dispatchCode = "10-71A",
        dispatchMessage = nil,
        blipDescription = "Shot Fired",
        blipSprite = 567,
        blipColor = 21,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-71B"] = {
        title = "Shots Fired From Vehicle",
        dispatchCode = "10-71B",
        dispatchMessage = nil,
        blipDescription = "Shot Fired From Vehicle",
        blipSprite = 229,
        blipColor = 21,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-34"] = {
        title = "Suspicious activity drug sale",
        dispatchCode = "10-34",
        dispatchMessage = nil,
        blipDescription = "Drug Sale Activity",
        blipSprite = 51,
        blipColor = 0,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-37"] = {
        title = "Suspicious Activity ",
        dispatchCode = "10-37",
        dispatchMessage = nil,
        blipDescription = "Suspicious Activity",
        blipSprite = 456,
        blipColor = 0,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-60"] = {
        title = "Vehicle Theft",
        dispatchCode = "10-60",
        dispatchMessage = nil,
        blipDescription = "Vehicle Hotwired",
        blipSprite = 225,
        blipColor = 81,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-45"] = {
        title = "Illegal Hunting",
        dispatchCode = "10-45",
        dispatchMessage = nil,
        blipDescription = "Illegal Hunting",
        blipSprite = 774,
        blipColor = 56,
        blipArea = nil, -- radius
        isTracker = false
    },
    ["10-101"] = {
        title = "Monitored Account Activity"
    },
    ["10-90R"] = {
        title = "Restaurant Alarm",
        dispatchCode = "10-90R",
        dispatchMessage = nil,
        blipDescription = "Store Alarm Triggered",
        blipSprite = 110,
        blipColor = 3,
        blipArea = nil, -- radius
        isTracker = false,
        playSound = true,
        soundName = "HighPrioCrime",
    }
}
local unitLocations = {}

RPC.register("ev-dispatch:getDispatchData", function(pSource)
    local dispatchData = {
        calls = calls,
        pings = pings,
        units = units,
        unitAssignments = unitAssignments
    }

    print("dispatch data", json.encode(dispatchData))

    return dispatchData
end)

RPC.register("ev-dispatch:createCall", function(pSource, pCtxId)
    local ctxId = tonumber(pCtxId.param or 0)
    if not pings[ctxId] then return end

    local ping = pings[ctxId]

    ping.timestamp = os.time()

    if not calls[ctxId] then
        calls[ctxId] = {}
        calls[ctxId] = ping
    end

    TriggerClientEvent("ev-dispatch:updateDispatch", -1, {
        action = "addCall",
        data = calls[ctxId]
    })
end)

RPC.register("ev-dispatch:dismissPing", function(pSource, pCtxId)
    local ctxId = tonumber(pCtxId.param or 0)
    if not pings[ctxId] then return end

    TriggerClientEvent("ev-dispatch:updateDispatch", pSource, {
        action = "delPing",
        data = pings[ctxId]
    })
end)

RPC.register("ev-dispatch:dismissCall", function(pSource, pCtxId)
    local ctxId = tonumber(pCtxId.param or 0)
    if not calls[ctxId] then return end

    TriggerClientEvent("ev-dispatch:updateDispatch", pSource, {
        action = "delCall",
        data = calls[ctxId]
    })
end)

RPC.register("ev-dispatch:toggleUnitAssignment", function(pSource, pCtxId, pUnit)
    local ctxId = tonumber(pCtxId.param or 0)
    local unit = pUnit.param

    local found = false
    for k, v in pairs(unitAssignments) do
        if tonumber(v.ctxId) == ctxId then
            if v.serverId == unit.serverId then
                found = true
                table.remove(unitAssignments, k)
            end
        end
    end

    if not found then
        unitAssignments[#unitAssignments + 1] = {
            ctxId = ctxId,
            serverId = unit.serverId
        }
    end

    TriggerClientEvent("ev-dispatch:updateDispatch", -1, {
        action = "updateUnitAssignments",
        data = unitAssignments
    })
end)

RPC.register("ev-dispatch:setUnitVehicle", function(pSource, pData)
    local data = pData.param
    local src = tonumber(data.unit)
    units[src].vehicle = data.vehicle

    TriggerClientEvent("ev-dispatch:updateUnits", -1, units)
end)

RPC.register("ev-dispatch:setUnitRidingWith", function(pSource, pData)
    local data = pData.param
    local unit = data.unit
    local parent = data.parent
    local unitServerId = tonumber(unit.serverId)

    if units[unitServerId] then
        if parent then
            if units[tonumber(parent.serverId)] then
                if units[tonumber(parent.serverId)].attachedTo == nil then
                    units[unit.serverId].attachedTo = tonumber(parent.serverId)
                end
            end
        else
            units[unitServerId].attachedTo = nil
        end
    end

    TriggerClientEvent("ev-dispatch:updateUnits", -1, units)
end)

RPC.register("ev-dispatch:setUnitStatus", function(pSource, pData)
    local data = pData.param
    local src = tonumber(data.unit)

    if units[src] then
        units[src].status = data.status
    end

    TriggerClientEvent("ev-dispatch:updateUnits", -1, units)
end)

RPC.register("ev-dispatch:getDispatchersOnDuty", function(pSource, pData)
end)

RPC.register("ev-dispatch:getDispatchUnits", function(pSource)
    local dispatchUnits = {}

    for k,v in pairs(units) do
        dispatchUnits[#dispatchUnits + 1] = {
            serverId = v.serverId,
            callSign = v.callSign,
            name = v.name,
            attachedTo = v.attachedTo,
            job = v.job,
            vehicle = v.vehicle,
            status = v.status
        }
    end

    return dispatchUnits
end)

RegisterNetEvent("dispatch:svNotify")
AddEventHandler("dispatch:svNotify", function(data)
    data.ctxId = #pings + 1
    data.timestamp = os.time()
    
    if data.recipientList == nil then
        data.recipientList = {
            ["police"] = true
        }
    end

    if codes[data.dispatchCode] then
        data.dispatchMessage = codes[data.dispatchCode].dispatchMessage or nil
        data.blipDescription = codes[data.dispatchCode].blipDescription
        data.blipLocation = data.origin
        data.blipSprite = codes[data.dispatchCode].blipSprite
        data.blipColor = codes[data.dispatchCode].blipColor
        data.title = codes[data.dispatchCode].title
        data.playSound = codes[data.dispatchCode].playSound or false
        data.soundName = codes[data.dispatchCode].soundName or nil
        data.blipTenCode = codes[data.dispatchCode].dispatchCode
        data.priority = codes[data.dispatchCode].priority or 1
    end
    
    pings[#pings + 1] = data

    TriggerClientEvent("dispatch:clNotify", -1, data)
end)

RegisterNetEvent("ev-dispatch:mapIsOpen")
AddEventHandler("ev-dispatch:mapIsOpen", function(mapOpen)
end)

RegisterCommand("addunit", function()
    units[2] = {
        serverId = 2,
        callSign = '102',
        name = 'Bozo Da Clown',
        attachedTo = nil,
        job = 'police',
        vehicle = 'car',
        status = '10-8'
    }

    TriggerClientEvent("ev-dispatch:updateUnits", -1, units)
end)

RegisterNetEvent("ev-dispatch:addUnit")
AddEventHandler("ev-dispatch:addUnit", function(src, cid, name, callsign, job)
    if units[src] == nil then
        units[src] = {
            serverId = src,
            callSign = callsign,
            name = name,
            attachedTo = nil,
            job = job,
            vehicle = 'car',
            status = '10-8'
        }
    end

    TriggerClientEvent("ev-dispatch:updateUnits", -1, units)
end)

exports("GetUnits", function()
    return units
end)

RegisterNetEvent("ev-dispatch:removeUnit")
AddEventHandler("ev-dispatch:removeUnit", function(src)
    --units[src] = nil
    table.remove(units, src)
    TriggerClientEvent("ev-dispatch:updateUnits", -1, units)
end)

RegisterNetEvent("phone:assistRemove")
AddEventHandler("phone:assistRemove", function(id, jobType)
    TriggerClientEvent("phone:assistClear", -1, id, jobType)
end)

RegisterNetEvent("phone:checkJob")
AddEventHandler("phone:checkJob", function()
end)

AddEventHandler('playerDropped', function()
    -- TODO: Handle calls and pings
    local src = source
    print("[DISPATCH] playerDropped: " .. src .. "")
    if units[src] ~= nil then
        print("[DISPATCH] Removing unit: " .. src .. "")
        --units[src] = nil -- ui doesnt like nil values, use table.remove?
        table.remove(units, src)
        TriggerClientEvent("ev-dispatch:updateUnits", -1, units)

        -- TODO: Remove from map?
        for k,v in pairs(unitLocations) do
            if v.serverId == src then
                table.remove(unitLocations, k)
            end
        end

        TriggerClientEvent("ev-dispatch:updateUnitCoords", -1, unitLocations)
    end
end)

Citizen.CreateThread(function()
    while true do
        Wait(2500)

        for k,v in pairs(units) do
            local coords = exports["ev-infinity"]:GetPlayerCoords(tonumber(v.serverId))

            unitLocations[k] = {
                serverId = v.serverId,
                coords = coords
            }

            -- unitLocations[#unitLocations + 1] = {
            --     serverId = v.serverId,
            --     coords = coords
            -- }
        end

        TriggerClientEvent("ev-dispatch:updateUnitCoords", -1, unitLocations)
    end
end)