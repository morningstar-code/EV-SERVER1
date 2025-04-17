local AirTraffic = {}
local RadarEnabled = false
-- {"pilot":"Rhodinium","passengers":"no one","callsign":"Delta-01","arrival":"Los Santos Airport","deperture":"MRPD"}

RPC.register("ev-atc:updateFlightData", function(src, pNetId, data)
    local entity = NetworkGetEntityFromNetworkId(pNetId)
    local model = GetEntityModel(entity)
    local pPlate = GetVehicleNumberPlateText(entity)
    local pCoord = GetPlayerCoords(src)
    local pSpeed = GetEntitySpeed(entity)

    if AirTraffic[pNetId] then 
        AirTraffic[pNetId] = {
            netId = pNetId,
            type = "helicopter",
            callsign = data.callsign,
            pilot = data.pilot,
            deperture = data.deperture,
            arrival = data.arrival,
            passengers = data.passengers,
            model = model,
            coords = pCoord,
            speed = pSpeed,
            jammed = false, 
            plate = pPlate, 
        }
        TriggerClientEvent("ev-atc:updateFlightData", -1, pNetId, AirTraffic[pNetId])
    else
        print("should add flight data")
        AirTraffic[pNetId] = {
            netId = pNetId,
            type = "helicopter",
            callsign = data.callsign,
            pilot = data.pilot,
            deperture = data.deperture,
            arrival = data.arrival,
            passengers = data.passengers,
            model = model,
            coords = pCoord,
            speed = pSpeed,
            jammed = false, 
            plate = pPlate, 
        }
        TriggerClientEvent("ev-atc:addToAirSpace", -1, AirTraffic[pNetId])
    end
end)

RPC.register("ev-atc:setRadarStatus", function(src, HasRadarEnabled)
    RadarEnabled = HasRadarEnabled
end)

RegisterCommand('kekwAlarm', function(source, args, RawCommand)
    local src = source
    local ped = GetPlayerPed(src)
    local playerCoords = GetEntityCoords(ped)
    TriggerClientEvent("ev-oilers:playMachineAlarm", src, playerCoords)
end)

