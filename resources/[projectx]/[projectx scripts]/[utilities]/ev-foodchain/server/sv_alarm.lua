RegisterNetEvent('ev-foodchain:triggerSilentAlarm', function(pCoords)
    exports["ev-infinity"]:TriggerAreaEvent("InteractSound_CL:PlayOnOne", pCoords, 50.0, "vault-alarm", 0.1)
    TriggerServerEvent("dispatch:svNotify", {
        dispatchCode = "10-SHELLY",
        origin = {
            x = pCoords.x,
            y = pCoords.y,
            z = pCoords.z
        },
    })
end)