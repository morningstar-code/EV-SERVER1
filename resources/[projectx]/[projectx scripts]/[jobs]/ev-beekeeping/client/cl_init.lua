Citizen.CreateThread(function()
    for id, zone in ipairs(HiveZones) do
        exports["ev-polyzone"]:AddCircleZone("ev-beekeeping:bee_zone", zone[1], zone[2],{
            zoneEvents={"ev-beekeeping:trigger_zone"},
            data = {
                id = id,
            },
        })
    end
end)