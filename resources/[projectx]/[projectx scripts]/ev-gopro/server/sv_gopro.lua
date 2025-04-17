local registeredDashcams = {}

RPC.register("ev-gopro:registerCarForFootage", function(pSource, pCurrentVehicleNetId, pName, pCurrentDashCam)
    local currentVehicleNetId = pCurrentVehicleNetId.param
    local name = pName.param
    local currentDashcam = pCurrentDashCam.param

    if not registeredDashcams[currentVehicleNetId] then
        registeredDashcams[currentVehicleNetId] = {}
    end

    registeredDashcams[currentVehicleNetId].name = name
    registeredDashcams[currentVehicleNetId].type = currentDashcam.type
    registeredDashcams[currentVehicleNetId].netId = currentVehicleNetId

    TriggerClientEvent("ev-gopros:updateRegisteredCams", -1, registeredDashcams)
end)

RPC.register("ev-gopro:removeCarForFootage", function(pSource)
    local netId = pSource.param

    if registeredDashcams[netId] then
        registeredDashcams[netId] = nil
    end

    TriggerClientEvent("ev-gopros:updateRegisteredCams", -1, registeredDashcams)
end)

RPC.register("ev-gopros:playerSpawnedSendCams", function(pSource)
    if registeredDashcams then
        TriggerClientEvent("ev-gopros:updateRegisteredCams", pSource, registeredDashcams)
    else
        TriggerClientEvent("ev-gopros:updateRegisteredCams", pSource, {})
    end
end)

RPC.register("ev-gopro:getRegisteredDashcamData", function(pSource, pNetId)
    local netId = pNetId.param
    if not registeredDashcams[netId] then return end
    local vehicle = NetworkGetEntityFromNetworkId(netId)
    if not vehicle or not DoesEntityExist(vehicle) then return end
    return {
        name = registeredDashcams[netId].name,
        type = registeredDashcams[netId].type,
        netId = netId,
        coords = GetEntityCoords(vehicle),
        heading = GetEntityHeading(vehicle)
    }
end)