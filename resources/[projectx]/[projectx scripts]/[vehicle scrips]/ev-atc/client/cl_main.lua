HasRadarEnabled = false

RegisterNetEvent('ev-atc:enableRadar', function ()
    if HasRadarEnabled then return end

    HasRadarEnabled = true

    TriggerEvent('ev-voice:atc:connect')

    TriggerEvent('DoLongHudText', 'Connected to ATC Network')

    RPC.execute('ev-atc:setRadarStatus', HasRadarEnabled)
end)

RegisterNetEvent('ev-atc:disableRadar', function ()
    if not HasRadarEnabled then return end

    HasRadarEnabled = false

    DeleteBlipHandlers()

    TriggerEvent('ev-voice:atc:disconnect')

    TriggerEvent('DoLongHudText', 'Disconnected from ATC Network')

    RPC.execute('ev-atc:setRadarStatus', HasRadarEnabled)
end)

RegisterNetEvent('ev-atc:setAirSpace', function (pAirspace)
    if not HasRadarEnabled then return end

    SetBlipHandlers(pAirspace)

    SetAirTraffic(pAirspace)
end)

RegisterNetEvent('ev-atc:addToAirSpace', function (pAircraft)
    if not HasRadarEnabled then return end

    AddBlipHandler(pAircraft.netId, pAircraft.type, pAircraft.callsign or pAircraft.plate, pAircraft.coords)

    AddAircraftToTraffic(pAircraft.netId, pAircraft)
end)

RegisterNetEvent('ev-atc:removeFromAirSpace', function (pNetId)
    if not HasRadarEnabled then return end

    RemoveBlipHandler(pNetId)

    RemoveAircraftFromTraffic(pNetId)
end)

RegisterNetEvent('ev-atc:updateAirSpace', function (pAirspace)
    print("should send data to be updated")
    if not HasRadarEnabled then return end

    UpdateBlipHandlers(pAirspace)

    UpdateAirTraffic(pAirspace)
    print("data updated")
end)

RegisterNetEvent('ev-atc:updateFlightData', function (pNetID, pData)
    if not HasRadarEnabled then return end

    UpdateFlightData(pNetID, pData)

    if not pData.callsign then return end

    UpdateBlipCallsign(pNetID, pData.callsign)
end)