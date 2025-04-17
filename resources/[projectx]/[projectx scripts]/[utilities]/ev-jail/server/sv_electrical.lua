local ElectricalConfig = {
    polytargets = {
        ["electrical_1"] = {
            coords = vector3(1775.83, 2553.68, 45.55),
            width = 0.85,
            length =  0.8,
            options = {                
                heading = 269,
                minZ = 40.35,
                maxZ = 46.3,
                data = {
                    id = 1,
                    CanDo = true,
                },
            },
        },
        ["electrical_2"] = {
            coords = vector3(1763.55, 2566.35, 45.55),
            width = 0.85,
            length =  0.8,
            options = {  
                heading = 179,
                minZ = 40.35,
                maxZ = 46.3,
                data = {
                    id = 2,
                    CanDo = true,
                },
            },
        },
        ["electrical_3"] = {
            coords = vector3(1689.85, 2566.28, 45.55),
            width = 0.85,
            length =  0.8,
            options = {  
                heading = 179,
                minZ = 40.35,
                maxZ = 46.3,
                data = {
                    id = 3,
                    CanDo = true,
                },
            },
        },
        ["electrical_4"] = {
            coords = vector3(1635.03, 2565.61, 45.55),
            width = 0.85,
            length =  0.8,
            options = {  
                heading = 179,
                minZ = 40.35,
                maxZ = 46.3,
                data = {
                    id = 4,
                    CanDo = true,
                },
            },
        },
        ["electrical_5"] = {
            coords = vector3(1626.84, 2489.67, 45.59),
            width = 0.85,
            length =  0.55,
            options = {  
                heading = 141,
                minZ = 44.79,
                maxZ = 46.49,
                data = {
                    id = 5,
                    CanDo = true,
                },
            },
        },
        ["electrical_6"] = {
            coords = vector3(1694.65, 2469.17, 45.61),
            width = 0.85,
            length =  0.55,
            options = {  
                heading = 181,
                minZ = 44.81,
                maxZ = 46.51,
                data = {
                    id = 6,
                    CanDo = true,
                },
            },
        },
        ["electrical_7"] = {
            coords = vector3(1755.81, 2502.56, 45.61),
            width = 0.85,
            length =  0.55,
            options = {  
                heading = 211,
                minZ = 44.81,
                maxZ = 46.51,
                data = {
                    id = 7,
                    CanDo = true,
                },
            },
        },
        ["electrical_8"] = {
            coords = vector3(1792.09, 2550.41, 45.55),
            width = 0.85,
            length =  0.55,
            options = {  
                heading = 271,
                minZ = 44.75,
                maxZ = 46.45,
                data = {
                    id = 8,
                    CanDo = true,
                },
            },
        },
        ["electrical_9"] = {
            coords = vector3(1792.35, 2589.78, 45.55),
            width = 0.85,
            length =  0.55,
            options = {  
                heading = 271,
                minZ = 40.75,
                maxZ = 46.35,
                data = {
                    id = 9,
                    CanDo = true,
                },
            },
        },
        ["electrical_10"] = {
            coords = vector3(1818.71, 2592.7, 45.75),
            width = 0.85,
            length =  0.55,
            options = {  
                heading = 271,
                minZ = 44.65,
                maxZ = 46.45,
                data = {
                    id = 10,
                    CanDo = true,
                },
            },
        },
        ["electrical_10"] = {
            coords = vector3(1691.1, 2529.56, 45.55),
            width = 0.65,
            length =  0.55,
            options = {  
                heading = 1,
                minZ = 44.6,
                maxZ = 46.35,
                data = {
                    id = 10,
                    CanDo = true,
                },
            },
        },
    },
}

RPC.register("ev-jail:GetElectricalConfig", function(src)
    return ElectricalConfig
end)



-- prison_mm_screen --Screen
-- np_prison_garden -- Garden