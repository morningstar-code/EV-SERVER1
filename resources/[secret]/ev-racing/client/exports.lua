--[[

    Functions

]]

function createPendingRace(id, options)
    if curRace then return end

    local canJoinOrErr = canJoinOrStartRace(options.vehicleClass)
    if canJoinOrErr ~= true then
        return canJoinOrErr
    end

    RPC.execute("ev-racing:createPendingRace", id, options)
end

function clearPreview()
    currentlyEnabledPreview = nil
    clearBlips()
end

function previewRace(id)
    local race = races[id]
    if race == nil then return end
    race.checkpoints = race.checkpoints or RPC.execute("ev-racing:getRaceCheckpoints", id)
    if id == currentlyEnabledPreview then
        clearPreview()
        return
    end
    clearPreview()
    SetWaypointOff()
    race.start.pos = tableToVector3(race.start.pos)
    for i=1, #race.checkpoints do
        race.checkpoints[i].pos = tableToVector3(race.checkpoints[i].pos)
    end
    local checkpoints = race.checkpoints
    for i=1, #checkpoints do
        addCheckpointBlip(checkpoints, i)
    end
    if race.type == "Sprint" then
        addBlip(race.start.pos, 0, true)
    end
    currentlyEnabledPreview = id
    local enabledPreview = currentlyEnabledPreview
    -- Thread to continously render the route
    Citizen.CreateThread(function()
        while currentlyEnabledPreview and currentlyEnabledPreview == enabledPreview do
            -- If a race has been started, or waypoint has been placed, preview is disabled and cleared
            if IsWaypointActive() or curRace then
                clearPreview()
            end
            Citizen.Wait(0)
        end
    end)
end
exports("previewRace", previewRace)

function locateRace(id, eventId, reverse)
    local race, start = races[id], nil
    if race.id == "random" then
        race = pendingRaces[eventId]
        if race == nil then return end
        race.checkpoints = race.checkpoints or RPC.execute("ev-racing:getRaceCheckpoints", eventId)
        start = race.start.pos
    else
        race.checkpoints = race.checkpoints or RPC.execute("ev-racing:getRaceCheckpoints", id)
        start = race.start.pos
        if reverse then start = race.checkpoints[#race.checkpoints].pos end
    end
    clearPreview()
    SetNewWaypoint(start.x, start.y, start.z)
end

function getHudPosition()
    return config.nui.hud.position
end
exports("getHudPosition", getHudPosition)

function setHudPosition(position)
    config.nui.hud.position = {
        top = position.top,
        bottom = position.bottom,
        left = position.left,
        right = position.right
    }
    SendNUIMessage({ hudPosition = config.nui.hud.position })
end
exports("setHudPosition", setHudPosition)

function resetHudPosition()
    config.nui.hud.position = originalHudPosition
    SendNUIMessage({ hudPosition = config.nui.hud.position })
end
exports("resetHudPosition", resetHudPosition)

function startRace(countdown)
    local characterId = getCharacterId()
    for k, v in pairs(pendingRaces) do
        if v.owner == characterId then
            RPC.execute("ev-racing:startRace", v.id, countdown or v.countdown)
            return
        end
    end
end

function endRace()
    print("Ending Race")
    --if curRace then
    --    print("Is in a race, ending")
    RPC.execute("ev-racing:endRace")
    --else
    --    print("Is not in a race, leaving")
    --    RPC.execute("ev-racing:leaveRace")
    --end
end

function joinRace(id, alias, characterId, password)
    local err = RPC.execute("ev-racing:joinRace", id, alias, characterId, password)
    return err
end

function leaveRace()
    SendNUIMessage({
        showHUD = false
    })

    if curRace then
        RPC.execute("ev-racing:dnfRace", curRace.id)
        cleanupRace()
    else
        RPC.execute("ev-racing:leaveRace")
    end
end

function getAllRaces()
    if races then -- TEMP
        return {
            races = races,
            pendingRaces = pendingRaces,
            activeRaces = activeRaces,
            completed = finishedRaces,
        }
    end

    local res = RPC.execute("ev-racing:getAllRaces")

    races = res.races
    pendingRaces = res.pendingRaces
    activeRaces = res.activeRaces
    finishedRaces = res.finishedRaces

    return res
end

local currentJob = nil

RegisterNetEvent("ev-jobmanager:playerBecameJob")
AddEventHandler("ev-jobmanager:playerBecameJob", function(job, name, notify)
    currentJob = job
end)

function getHasRaceUsbAndAlias()
    local characterId = exports["isPed"]:isPed("cid")
    local racingCreateUsbItem = exports["ev-inventory"]:GetInfoForFirstItemOfName("racingusb0")
    local racingUsbItem = exports["ev-inventory"]:GetInfoForFirstItemOfName("racingusb2")
    local pdRacingUsbItem = exports["ev-inventory"]:GetInfoForFirstItemOfName("racingusb3")
    local has_usb_racing = racingUsbItem ~= nil and racingUsbItem.quality > 0
    local has_usb_racing_create = racingCreateUsbItem ~= nil and racingCreateUsbItem.quality > 0
    local has_usb_pd_racing = pdRacingUsbItem ~= nil and currentJob == "police"
    local usbMetadata = has_usb_racing and json.decode(racingUsbItem.information) or {}
    local usbCreateMetadata = has_usb_racing_create and json.decode(racingCreateUsbItem.information) or {}
    has_usb_racing = has_usb_racing and characterId == usbMetadata.characterId
    has_usb_racing_create = has_usb_racing_create and characterId == usbCreateMetadata.characterId
    local racingAlias = has_usb_racing and usbMetadata.Alias or nil
    return { has_usb_racing = has_usb_racing, has_usb_racing_create = has_usb_racing_create, has_usb_pd_racing = has_usb_pd_racing, racingAlias = racingAlias }
end

function canJoinOrStartRace(expectedVehicleClass)
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped, false)
    if veh == 0 then return "Must be in vehicle" end
    local driver = GetPedInVehicleSeat(veh, -1)
    if ped ~= driver then return "Must be the driver" end
    local vehicleModel = GetEntityModel(veh)
    local vehicleClass = exports["ev-racing"]:GetVehicleClassByModel(vehicleModel)
    local vehicleClassError = isUnacceptedVehicleClass(expectedVehicleClass, vehicleClass)
    if vehicleClassError ~= nil then return vehicleClassError end
    return true
end
exports("canJoinOrStartRace", canJoinOrStartRace)

--[[

    Exports

]]

exports("createPendingRace", createPendingRace)
exports("previewRace", previewRace)
exports("locateRace", locateRace)
exports("startRace", startRace)
exports("endRace", endRace)
exports("joinRace", joinRace)
exports("leaveRace", leaveRace)
exports("getAllRaces", getAllRaces)
exports("getHasRaceUsbAndAlias", getHasRaceUsbAndAlias)