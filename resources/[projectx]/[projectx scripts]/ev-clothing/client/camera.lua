RegisterNUICallback("updateCamera", function(data)
    exports["ev-clothing"]:updateCamera(data)
end)

RegisterNUICallback("rotateCharacter", function(data)
    local ped = PlayerPedId()

    local currentHeading = GetEntityHeading(ped)
    SetEntityHeading(ped, currentHeading + (data))
    print(data)
end)


