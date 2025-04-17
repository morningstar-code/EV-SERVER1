Citizen.CreateThread(function()
    exports["ev-polyzone"]:AddBoxZone("ev-roostersrest:tavern_main", vector3(-163.7, 300.98, 99.42), 23.6, 21.45, {
        heading=179,
        minZ=97.42,
        maxZ=102.02
    })

    exports["ev-polyzone"]:AddBoxZone("ev-roostersrest:tavern_near", vector3(-160.79, 303.37, 105.87), 28.6, 46.8, {
        heading=0,
        minZ=89.67,
        maxZ=103.67,
        zoneEvents={"ev-roostersrest:activePurchase", "ev-roostersrest:closePurchase"}
    })

    exports["ev-polyzone"]:AddBoxZone("ev-roostersrest:tavern_stage", vector3(-163.56, 311.17, 99.11), 2.6, 5.35, {
        heading=179,
        minZ=98.11,
        maxZ=101.11
    })
end)
