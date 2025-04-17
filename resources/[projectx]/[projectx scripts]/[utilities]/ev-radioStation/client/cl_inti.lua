
Citizen.CreateThread(function()
    exports["ev-polytarget"]:AddBoxZone("Rhodinium_radio", vector3(-1987.68, -509.26, 25.74), 0.45, 1.2, {
        heading = 50,
        minZ = 25.34,
        maxZ = 25.49
    })

    exports["ev-interact"]:AddPeekEntryByPolyTarget("Rhodinium_radio", {{
        event = "ev-radio:ChangeStation",
        id = "Rhodinium_radio",
        icon = "fas fa-tower-cell",
        label = "Control Staion",
        parameters = { "22" }
    }}, { distance = { radius = 3.5 },
        isEnabled = function()
            return exports["isPed"]:isPed("cid") == 70 
        end,
    })
end)