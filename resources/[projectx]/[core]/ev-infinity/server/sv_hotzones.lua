local HotZones = {}

RegisterNetEvent("ev-infinity:hotzones:requestList")
AddEventHandler("ev-infinity:hotzones:requestList", function()
    local src = source

    TriggerClientEvent("ev-infinity:hotzones:updateList", src, HotZones)
end)

RegisterNetEvent("ev-infinity:hotzones:enteredZone")
AddEventHandler("ev-infinity:hotzones:enteredZone", function(zoneId)
    local src = source
    HotZones[zoneId] = src
end)

RegisterNetEvent("ev-infinity:hotzones:exitZone")
AddEventHandler("ev-infinity:hotzones:exitZone", function(zoneId)
    local src = source
    HotZones[zoneId] = nil
end)