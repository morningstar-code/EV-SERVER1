--Example : 
    --{
    --     id = 1,
    --     floors = {
    --         name = "test",
    --         description = "test",
    --         teleport = {
    --             coords = typedata vector3,
    --             heading = 0,
    --             onArriveEvent = "",
    --             onLeaveEvent = "",
    --         },
    --         locked = false,
    --         forceUnlocked = false,
    --         zone = {
    --             center =  ,
    --             width = ,
    --             length = ,
    --             options = {
    --                 data =
    --             },
    --             target = true / false
    --         }
    --     },
    -- }

ELEVATOR_CONFIG = {
    {
        id = 1,
        info = "casino elevator",
        dec = "caino",
        active = true,
        access = {
            job = {},
            business = {
                ["casino"] = true,
                ["casino_hotel"] = true,
                ["casino_staff"] = true
            },
        },
        floors = {
            {
                name = "Hotel",
                description = "Rooms for Rent",
                teleport = {
                    coords = vector3(910.50, -52.85, 21.01),
                    heading = 151.5,
                    onArriveEvent = "ev-casino:enterHotel",
                },
                zone = {
                    center = vector3(910.12, -52.07, 21.0),
                    width = 0.4,
                    length = 0.6,
                    target = true,
                    options = { heading = 311.0, minZ = 21.0, maxZ = 21.6 }
                },
                locked = false,
                forceUnlocked = false,
            },
            {
                name = "Penthouse",
                description = "ERP Arena",
                teleport = {
                    coords = vector3(982.44, 55.46, 116.17),
                    heading = 51.58,
                    onArriveEvent = "ev-casino:enterPenthouse",
                },
                zone = {
                    center = vector3(982.43, 57.07, 116.16),
                    width = 0.4,
                    length = 0.6,
                    target = true,
                    options = { heading = 328.0, minZ = 116.16, maxZ = 116.76 }
                },
                locked = true,
                forceUnlocked = false,
            },
            {
                name = "Roof",
                description = "Rooftop pleasures",
                teleport = {
                    coords = vector3(964.49, 58.83, 112.56),
                    heading = 49.08,
                    onArriveEvent = "ev-casino:elevatorExitCasino",
                },
                zone = {
                    center = vector3(964.39, 57.66, 112.55),
                    width = 0.4,
                    length = 0.4,
                    target = true,
                    options = { heading = 60.0, minZ = 112.35, maxZ = 112.95 }
                },
                locked = false,
                forceUnlocked = false,
            },
            {
                name = "Office",
                description = "Management",
                teleport = {
                    coords = vector3(994.02, 56.06, 75.06),
                    heading = 244.09,
                    onArriveEvent = "ev-casino:elevatorEnterCasino",
                },
                zone = {
                    center = vector3(993.42, 55.50, 75.06),
                    width = 0.4,
                    length = 0.4,
                    target = true,
                    options = { heading = 329.0, minZ = 75.01, maxZ = 75.61 }
                },
                locked = true,
                forceUnlocked = false,
            },
            {
                name = "Casino",
                description = "Casino Main Floor",
                teleport = {
                    coords = vector3(960.55, 43.24, 71.71),
                    heading = 244.09,
                    onArriveEvent = "ev-casino:elevatorEnterCasino",
                },
                zone = {
                    center = vector3(960.12, 42.3, 71.7),
                    width = 0.15,
                    length = 0.1,
                    target = true,
                    options = { heading = 13, minZ = 71.75, maxZ = 72.1 }
                },
                locked = false,
                forceUnlocked = false,
            },
        },
    }, 
    {
        id = 2,
        info = "stadium",
        dec = "stadium",
        active = true,
        access = {
            job = {
                ["PD"] = true
            },
            --business = {
                --["npa"] = true
            --},
        },
        floors = {
            {
                name = "Stadium Entrance",
                description = "",
                teleport = {
                    coords = vector3(-282.4, -2031.43, 30.15),
                    heading = 292.15,
                    onArriveEvent = "ev-paintball:leaveStadium", -- leave
                    onLeaveEvent = "ev-paintball:enterStadium", -- enter
                },
                zone = {
                    center = vector3(-282.78, -2031.66, 30.15),
                    width = 0.4,
                    length = 1.2,
                    target = true,
                    options = { heading = 290.0, minZ = 29.95, maxZ = 30.75 },
                },
                locked = false,
            },
            {
                name = "VIP Lounge",
                description = "",
                teleport = {
                    coords = vector3(5516.81, 5964.62, 635.84),
                    heading = 179.45,
                },
                zone = {
                    center = vector3(5518.08, 5965.40, 635.84),
                    width = 0.4,
                    length = 1.2,
                    target = true,
                    options = { heading = 0.0, minZ = 635.64, maxZ = 636.44 },
                },
                locked = false,
            },
            {
                name = "Arena",
                description = "",
                teleport = {
                    coords = vector3(5503.43, 5980.24, 590.01),
                    heading = 14.4,
                    onArriveEvent = "ev-paintball:enterArena",
                    onLeaveEvent = "ev-paintball:leaveArena",
                },
                zone = {
                    center = vector3(5504.97, 5979.59, 590.0),
                    width = 0.4,
                    length = 1.2,
                    target = true,
                    options = { heading = 0.0, minZ = 589.80, maxZ = 590.60 },
                },
                locked = false,
            },
        },
    },   
    {
        id = 3,
        info = "pillbox",
        dec = "Pillbox",
        active = true,
        access = {
            job = {},
            business = {},
        },
        floors = {
            {
                name = "Pillbox Roof",
                description = "Helipad",
                teleport = {
                    coords = vector3(338.96, -584.11, 74.16),
                    heading = 249.005,
                },
                zone = {
                    center = vector3(338.22, -583.7, 74.16),
                    width = 0.8,
                    length = 0.2,
                    target = true,
                    options = { heading = 340.0, minZ = 74.06, maxZ = 74.66 },
                },
                locked = false,
            },
            {
                name = "Pillbox Main Floor",
                description = "ER Rooms",
                teleport = {
                    coords = vector3(331.66, -595.45, 43.28),
                    heading = 69.74,
                },
                zone = {
                    center = vector3(331.96, -597.19, 43.28),
                    width = 0.15,
                    length = 0.1,
                    target = true,
                    options = { heading = 338.0, minZ = 43.43, maxZ = 43.78 },
                },
                locked = false,
            },
            {
                name = "Pillbox Basement",
                description = "Garages, and  stuff",
                teleport = {
                    coords = vector3(345.09, -586.57, 28.79),
                    heading = 260.5,
                },
                zone = {
                    center = vector3(344.73, -584.71, 28.8),
                    width = 0.2,
                    length = 0.3,
                    target = true,
                    options = { heading = 70.0, minZ = 28.95, maxZ = 29.3 },
                },
                locked = false,
            },
        },
    },   
    {
        id = 4,
        info = "vicery",
        dec = "Vicery",
        active = true,
        access = {
            job = {},
            business = {},
        },
        floors = {
            {
                name = "Vicery Roof",
                description = "Helipad",
                teleport = {
                    coords = vector3(-773.993, -1207.437, 51.146),
                    heading = 320.240,
                },
                zone = {
                    center = vector3(-775.61, -1207.0, 51.15),
                    width = 1.0,
                    length = 0.2,
                    target = true,
                    options = { heading = 321.0, minZ = 51.35, maxZ = 51.65 },
                },
                locked = false,
            },
            {
                name = "Vicery Main Floor",
                description = "ER Rooms",
                teleport = {
                    coords = vector3(-794.016, -1245.763, 7.337),
                    heading = 47.251,
                },
                zone = {
                    center = vector3(-794.76, -1247.26, 7.34),
                    width = 0.1,
                    length = 0.15,
                    target = true,
                    options = { heading = 50, minZ = 7.54, maxZ = 7.84 },
                },
                locked = false,
            },
        },
    },   
    {
        id = 5,
        info = "musical_records",
        dec = "Musical Records",
        active = true,
        access = {
            job = {},
            business = {},
        },
        floors = {
            {
                name = "Musical Records",
                description = "Studio Floor",
                teleport = {
                    coords = vector3(-817.886, -709.586, 32.342),
                    heading = 86.518,
                },
                zone = {
                    center = vector3(-819.41, -710.65, 32.34),
                    width = 0.1,
                    length = 0.2,
                    target = true,
                    options = { heading = 271.0, minZ = 32.39, maxZ = 32.69 },
                },
                locked = false,
            },
            {
                name = "Musical Records",
                description = "Main Floor",
                teleport = {
                    coords = vector3(-818.050, -709.534, 28.061),
                    heading = 85.643,
                },
                zone = {
                    center = vector3(-819.45, -710.65, 28.06),
                    width = 0.1,
                    length = 0.2,
                    target = true,
                    options = { heading = 271, minZ = 28.11, maxZ = 28.41 },
                },
                locked = false,
            },
            {
                name = "Musical Records",
                description = "Storage Floor",
                teleport = {
                    coords = vector3( -818.104, -709.547, 23.781),
                    heading = 88.465,
                },
                zone = {
                    center = vector3(-819.45, -710.67, 23.78),
                    width = 0.1,
                    length = 0.2,
                    target = true,
                    options = { heading = 271, minZ = 23.83, maxZ = 24.13 },
                },
                locked = false,
            },
        },
    },   
    {
        id = 6,
        info = "vespucci_pd",
        dec = "Vespucci PD",
        active = true,
        access = {
            job = {
                ["PD"] = true,
            },
            business = {},
        },
        floors = {
            {
                name = "Main Floor",
                description = "PD offices",
                teleport = {
                    coords = vector3(-1098.31, -829.58, 19.30),
                    heading = 301.253,
                },
                zone = {
                    center = vector3(-1096.65, -829.65, 19.3),
                    width = 0.25,
                    length = 0.2,
                    target = true,
                    options = { heading = 38.0, minZ = 19.3, maxZ = 19.7 },
                },
                locked = true,
            },
            {
                name = "2nd Floor",
                description = "Prison Cells",
                teleport = {
                    coords = vector3(-1092.27, -848.33, 13.52),
                    heading = 307.36,
                },
                zone = {
                    center = vector3(-1090.57, -848.28, 13.53),
                    width = 0.25,
                    length = 0.2,
                    target = true,
                    options = { heading = 38.0, minZ = 13.58, maxZ = 13.98 },
                },
                locked = true,
            },
            {
                name = "Ground Floor",
                description = "Garage",
                teleport = {
                    coords = vector3(-1158.59, -856.98, 3.75),
                    heading = 300.34,
                },
                zone = {
                    center = vector3(-1157.03, -857.04, 3.75),
                    width = 0.25,
                    length = 0.2,
                    target = true,
                    options = { heading = 37.0, minZ = 3.7, maxZ = 4.1 },
                },
                locked = true,
            },
        },
    },   
    {
        id = 7,
        info = "weazel_news",
        dec = "Weazel News",
        active = true,
        access = {
            job = {
                ["news"] = true,
            },
            business = {
                ["lsbn"] = true,
            },
        },
        floors = {
            {
                name = "Main Floor",
                description = "Weazel offices",
                teleport = {
                    coords = vector3(-575.83, -920.41, 23.78),
                    heading = 88.12,
                },
                zone = {
                    center = vector3(-575.59, -919.23, 23.78),
                    width = 0.3,
                    length = 0.2,
                    target = true,
                    options = { heading = 0.0, minZ = 24.18, maxZ = 23.78 },
                },
                locked = true,
            },
            {
                name = "Roof",
                description = "Heli Pad",
                teleport = {
                    coords = vector3(-568.77, -927.76, 36.79),
                    heading = 90.52,
                },
                zone = {
                    center = vector3(-568.43, -927.18, 36.79),
                    width = 0.3,
                    length = 0.2,
                    target = true,
                    options = { heading = 1.0, minZ = 37.29, maxZ = 36.89 },
                },
                locked = true,
            },
        },
    }   
}