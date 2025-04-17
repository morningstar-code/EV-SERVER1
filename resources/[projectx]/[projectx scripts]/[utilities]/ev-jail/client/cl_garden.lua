local isInGarden = false
local isGarden = "garden"

Citizen.CreateThread(function()
    exports["ev-polyzone"]:AddPolyZone("prison_garden", {
        vector2(1728.080078125, 2542.6994628906),
        vector2(1721.5087890625, 2555.5285644531),
        vector2(1699.443359375, 2555.4582519531),
        vector2(1708.8802490234, 2536.8315429688),
        vector2(1710.9262695313, 2533.857421875),
    }, {
        -- debugPoly = true,
        minZ = 45.55,
        maxZ = 45.55,
    })
end)


AddEventHandler("ev-polyzone:enter", function(zone, data)
    if zone == "prison_garden" then
        
        isInGarden = true
    end
end)

AddEventHandler("ev-polyzone:exit", function(zone, data)
    if zone == "prison_garden" then

        isInGarden = false
    end
end)
