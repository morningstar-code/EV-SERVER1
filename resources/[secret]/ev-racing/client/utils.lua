-- Get heading from current checkpoint to next checkpoint
function getHeadingToNextCheckpoint(curCheckpointPos, nextCheckpointPos)
    return GetHeadingFromVector_2d(curCheckpointPos.x - nextCheckpointPos.x, curCheckpointPos.y - nextCheckpointPos.y) + 90
end

function rotate(origin, point, theta)
    if theta == 0.0 then return point end

    local p = point - origin
    local pX, pY = p.x, p.y
    theta = math.rad(theta)
    local cosTheta = math.cos(theta)
    local sinTheta = math.sin(theta)
    local x = pX * cosTheta - pY * sinTheta
    local y = pX * sinTheta + pY * cosTheta

    return vector3(x, y, 0.0) + origin
end

function areLinesIntersecting(a, b, c, d)
    -- Store calculations in local variables for performance
    local ax_minus_cx = a.x - c.x
    local bx_minus_ax = b.x - a.x
    local dx_minus_cx = d.x - c.x
    local ay_minus_cy = a.y - c.y
    local by_minus_ay = b.y - a.y
    local dy_minus_cy = d.y - c.y
    local denominator = ((bx_minus_ax) * (dy_minus_cy)) - ((by_minus_ay) * (dx_minus_cx))
    local numerator1 = ((ay_minus_cy) * (dx_minus_cx)) - ((ax_minus_cx) * (dy_minus_cy))
    local numerator2 = ((ay_minus_cy) * (bx_minus_ax)) - ((ax_minus_cx) * (by_minus_ay))
    
    -- Detect coincident lines
    if denominator == 0 then return numerator1 == 0 and numerator2 == 0 end

    local r = numerator1 / denominator
    local s = numerator2 / denominator

    return (r >= 0 and r <= 1) and (s >= 0 and s <= 1)
end

function getCheckpointObjectPositions(origin, radius, heading)
    local leftObjPos = vector3(origin.x - radius, origin.y, origin.z)
    local rightObjPos = vector3(origin.x + radius, origin.y, origin.z)

    return rotate(origin, leftObjPos, heading), rotate(origin, rightObjPos, heading)
end

local blips = {}
function addBlip(pos, displayNum, isFinishOrStart)
    local blip = AddBlipForCoord(pos.x, pos.y, pos.z)

    if isFinishOrStart then
        SetBlipSprite(blip, 38)
        SetBlipColour(blip, 4)
    else
        ShowNumberOnBlip(blip, displayNum)
        SetBlipColour(blip, config.checkpointBlipColor)
    end

    SetBlipDisplay(blip, 8)
    SetBlipScale(blip, config.checkpointBlipScale)
    SetBlipAsShortRange(blip, true)

    blips[#blips + 1] = blip

    return blip
end

function addCheckpointBlip(checkpoints, checkpointNum)
    return addBlip(
        checkpoints[checkpointNum].pos,
        checkpointNum,
        checkpointNum == #checkpoints
    )
end

function clearBlips()
    for i=1, #blips do
        RemoveBlip(blips[i])
    end

    blips = {}
end

function addWaypointAndBlip(checkpoints, checkpointNum, lookahead, isLastLap)
    clearBlips()
    SetWaypointOff()
    ClearGpsMultiRoute()

    local blip = addCheckpointBlip(checkpoints, checkpointNum)
    StartGpsMultiRoute(config.checkpointGPSRouteColor, true, false)
    local pos = checkpoints[checkpointNum].pos
    AddPointToGpsMultiRoute(pos.x, pos.y, pos.z)
    SetBlipAsShortRange(blip, false)

    for i=1, math.min(lookahead, #checkpoints - 1) do
        checkpointNum = (checkpointNum % #checkpoints) + 1

        if checkpointNum == 1 and isLastLap then
            break
        end

        addCheckpointBlip(checkpoints, checkpointNum)
        pos = checkpoints[checkpointNum].pos
        AddPointToGpsMultiRoute(pos.x, pos.y, pos.z)
    end

    SetGpsMultiRouteRender(true)
end

function currentlyJoinedPendingRace()
    local characterId = getCharacterId()

    for k, v in pairs(pendingRaces) do
        if isInRace(v, characterId) then
            return v.id
        end
    end

    return nil
end

function isInRace(race, characterId)
    if not race or not race.players then return false end

    for k, v in pairs(race.players) do
        if v.characterId == characterId then
            return true
        end
    end

    return false
end

function isInVehicle()
    local plyPed = PlayerPedId()
    local veh = GetVehiclePedIsIn(plyPed)

    return veh ~= 0
end

function isInVehicleAndDriver()
    local plyPed = PlayerPedId()
    local veh = GetVehiclePedIsIn(plyPed)

    if veh ~= 0 and GetPedInVehicleSeat(veh, -1) == plyPed then
        return true
    end

    return false
end

function tableToVector3(v)
    return vector3(v.x, v.y, v.z)
end

function tableLength(t)
    local count = 0

    for k, v in pairs(t) do
        count = count + 1
    end

    return count
end

function DrawText3D(x, y, z, text, rectScale)
    local onScreen,_x,_y=World3dToScreen2d(x,y,z)
    if not onScreen then return end

    SetTextScale(0.40, 0.40)
    SetTextFont(4)
    SetTextProportional(1)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry("STRING")
    SetTextCentre(1)
    AddTextComponentString(text)
    DrawText(_x,_y)
    local factor = rectScale or (string.len(text) / 340) + 0.015
    DrawRect(_x,_y+0.0145, factor, 0.035, 41, 11, 41, 68)
end

function KBInput(TextEntry, ExampleText, MaxStringLength)
    AddTextEntry('FMMC_KEY_TIP1', TextEntry) --Sets the Text above the typing field in the black square
    DisplayOnscreenKeyboard(1, "FMMC_KEY_TIP1", "", ExampleText, "", "", "", MaxStringLength) --Actually calls the Keyboard Input
    blockinput = true --Blocks new input while typing if **blockinput** is used

    while UpdateOnscreenKeyboard() ~= 1 and UpdateOnscreenKeyboard() ~= 2 do --While typing is not aborted and not finished, this loop waits
        Citizen.Wait(0)
    end

    if UpdateOnscreenKeyboard() ~= 2 then
        local result = GetOnscreenKeyboardResult() --Gets the result of the typing
        Citizen.Wait(500) --Little Time Delay, so the Keyboard won't open again if you press enter to finish the typing
        blockinput = false --This unblocks new Input when typing is done
        return result --Returns the result
    else
        Citizen.Wait(500) --Little Time Delay, so the Keyboard won't open again if you press enter to finish the typing
        blockinput = false --This unblocks new Input when typing is done
        return nil --Returns nil if the typing got aborted
    end
end

function RequestModelAndLoad(hash)
    RequestModel(hash)
    while not HasModelLoaded(hash) do
        Wait(0)
    end
end

function tablelength(tbl)
    if tbl == nil then return 0 end
    local count = 0
    for _ in pairs(tbl) do count = count + 1 end
    return count
end

function tableToArray(tbl)
    local ret = {}
    for k, v in pairs(tbl) do
        ret[#ret+1] = v
    end
    return ret
end

function isLocalVehicle(vin)
    return vin == nil or string.sub(vin or "", 1, 1) == "1"
end

function isRentalVehicle(vin)
    return vin ~= nil and string.sub(vin or "", 2, 3) == "RN"
end

function isLocalOrRentalVehicle(vin)
    return vin and (isLocalVehicle(vin) or isRentalVehicle(vin))
end

function getCardinalDirectionFromHeading()
    local heading = GetEntityHeading(PlayerPedId())
    if heading >= 315 or heading < 45 then
        return "North Bound"
    elseif heading >= 45 and heading < 135 then
        return "West Bound"
    elseif heading >=135 and heading < 225 then
        return "South Bound"
    elseif heading >= 225 and heading < 315 then
        return "East Bound"
    end
end

function AlertReckless()
    local ped = PlayerPedId()
    local plyPos = GetEntityCoords(ped)
    local zone = GetLabelText(GetNameOfZone(plyPos))
    local dir = getCardinalDirectionFromHeading()

    local s1, s2 = GetStreetNameAtCoord(plyPos.x, plyPos.y, plyPos.z)
    local firstStreet = GetStreetNameFromHashKey(s1) .. ", " .. zone
    local secondStreet = GetStreetNameFromHashKey(s2) .. " " .. dir
    if s2 == 0 then
        secondStreet = " " .. dir
    end

    TriggerServerEvent("dispatch:svNotify", { dispatchCode = "10-94", firstStreet = firstStreet, secondStreet = secondStreet } )
end

function AlertSuspiciousVehicle()
    local ped = PlayerPedId()
    local plyPos = GetEntityCoords(ped)
    local zone = GetLabelText(GetNameOfZone(plyPos))
    local dir = getCardinalDirectionFromHeading()

    local currentVehicle = GetVehiclePedIsIn(ped, false)
    local plate = GetVehicleNumberPlateText(currentVehicle)
    local model = GetDisplayNameFromVehicleModel(GetEntityModel(currentVehicle))
    local color1, color2 = GetVehicleColours(currentVehicle)

    local s1, s2 = GetStreetNameAtCoord(plyPos.x, plyPos.y, plyPos.z)
    local firstStreet = GetStreetNameFromHashKey(s1) .. ", " .. zone
    local secondStreet = GetStreetNameFromHashKey(s2) .. " " .. dir
    if s2 == 0 then
        secondStreet = " " .. dir
    end

    TriggerServerEvent("AlertSuspicious", firstStreet, secondStreet, plate, model, color1, color2)
end

function isUnacceptedVehicleClass(expectedVehicleClass, vehicleClass)
    if expectedVehicleClass == "B" then
        if not (vehicleClass == "B" or vehicleClass == "C" or vehicleClass == "D") then
            return "Must be in B, C, or D class vehicle"
        end
    elseif expectedVehicleClass ~= "Open" and vehicleClass ~= expectedVehicleClass then
        return "Must be in " .. expectedVehicleClass .. " class vehicle"
    end
    return nil
end