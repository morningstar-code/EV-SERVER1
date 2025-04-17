config = {}

config.METH_LAB_KEY_PRICE = math.random(15000, 35000)

config.METH_LAB_BATCH_PRICE = 1--math.random(5000, 15000)

config.ACTIVE_CORNERS = {}

config.ACTIVE_LABS = {
    {
        enabled = true,
        polyzone = {
            coords = vector3(2303.28, 4856.15, 41.81),
            w = 4.0,
            h = 12.4,
            options = { heading = 315.0, minZ = 40.81, maxZ = 44.81 },
        },
        polytargets = {
            ["laptop"] = {
                coords = vector3(2299.2, 4842.31, 31.31),
                width = 0.4,
                length = 0.4,
                options = { heading = 45.0, minZ = 31.11, maxZ = 31.46 },
            },
            ["drop"] = {
                coords = vector3(2291.7, 4844.44, 31.31),
                width = 0.8,
                length = 0.8,
                options = { heading = 45.0, minZ = 31.66, maxZ = 32.46 },
            },
            ["fridge"] = {
                coords = vector3(2295.07, 4838.07, 31.31),
                width = 1.1,
                length = 1.7,
                options = { heading = 315.0, minZ = 30.31, maxZ = 32.56 },
            },
            ["temperature"] = {
                coords = vector3(2296.38, 4845.77, 31.31),
                width = 0.8,
                length = 0.7,
                options = { heading = 26.0, minZ = 31.31, maxZ = 32.31 },
            },
            ["settings"] = {
                coords = vector3(2289.83, 4843.44, 31.31),
                width = 0.45,
                length = 1.25,
                options = { heading = 315.0, minZ = 31.11, maxZ = 32.41 },
            },
            ["dis_settings"] = { -- back
                coords = vector3(2289.76, 4840.19, 31.31),
                width = 0.35,
                length = 1.25,
                options = { heading = 315.0, minZ = 31.21, maxZ = 32.01 },
            },
            ["dis_steam"] = { -- front
                coords = vector3(2290.31, 4838.03, 31.31),
                width = 0.35,
                length = 1.25,
                options = { heading = 315.0, minZ = 31.21, maxZ = 32.01 },
            },
        },
    },
    {
        enabled = true,
        polyzone = {
            coords = vector3(378.51, 3562.72, 33.29),
            w = 4.0,
            h = 12.4,
            options = { heading = 75.0, minZ = 32.29, maxZ = 36.29 },
        },
        polytargets = {
            ["laptop"] = {
                coords = vector3(364.31, 3559.14, 22.78),
                width = 0.4,
                length = 0.4,
                options = { heading = 346.0, minZ = 22.58, maxZ = 23.03 },
            },
            ["drop"] = {
                coords = vector3(362.39, 3566.73, 23.26),
                width = 0.8,
                length = 0.8,
                options = { heading = 345.0, minZ = 23.06, maxZ = 23.86 },
            },
            ["fridge"] = {
                coords = vector3(358.53, 3560.54, 22.78),
                width = 1.1,
                length = 1.7,
                options = { heading = 345.0, minZ = 21.78, maxZ = 24.03 },
            },
            ["temperature"] = {
                coords = vector3(365.78, 3563.33, 22.78),
                width = 0.8,
                length = 0.7,
                options = { heading = 330.0, minZ = 22.88, maxZ = 23.53 },
            },
            ["settings"] = {
                coords = vector3(360.51, 3567.81, 22.78),
                width = 0.45,
                length = 1.25,
                options = { heading = 345.0, minZ = 22.58, maxZ = 23.83 },
            },
            ["dis_settings"] = { -- back
                coords = vector3(357.69, 3566.18, 22.78),
                width = 0.35,
                length = 1.25,
                options = { heading = 345.0, minZ = 22.68, maxZ = 23.48 },
            },
            ["dis_steam"] = { -- front
                coords = vector3(356.09, 3564.59, 22.78),
                width = 0.35,
                length = 1.25,
                options = { heading = 345.0, minZ = 22.68, maxZ = 23.48 },
            },
        },
    },
    {
        enabled = true,
        polyzone = {
            coords = vector3(1078.59, -2316.35, 30.15),
            w = 4.0,
            h = 12.4,
            options = { heading = 265.0, minZ = 29.15, maxZ = 33.15 },
        },
        polytargets = {
            ["laptop"] = {
                coords = vector3(1065.64, -2323.36, 19.72),
                width = 0.4,
                length = 0.4,
                options = { heading = 358.0, minZ = 19.47, maxZ = 19.87 },
            },
            ["drop"] = {
                coords = vector3(1062.07, -2316.37, 19.99),
                width = 0.8,
                length = 0.8,
                options = { heading = 0.0, minZ = 20.09, maxZ = 20.69 },
            },
            ["fridge"] = {
                coords = vector3(1059.72, -2323.25, 19.72),
                width = 1.1,
                length = 1.7,
                options = { heading = 88.0, minZ = 18.72, maxZ = 20.97 },
            },
            ["temperature"] = {
                coords = vector3(1066.22, -2318.92, 19.72),
                width = 0.8,
                length = 0.7,
                options = { heading = 342.0, minZ = 19.97, maxZ = 20.37 },
            },
            ["settings"] = {
                coords = vector3(1060.04, -2315.71, 19.72),
                width = 0.45,
                length = 1.25,
                options = { heading = 269.0, minZ = 19.52, maxZ = 20.82 },
            },
            ["dis_settings"] = { -- back
                coords = vector3(1057.62, -2317.93, 19.72),
                width = 0.35,
                length = 1.25,
                options = { heading = 270.0, minZ = 20.42, maxZ = 19.62 },
            },
            ["dis_steam"] = { -- front
                coords = vector3(1056.42, -2319.82, 19.72),
                width = 0.35,
                length = 1.25,
                options = { heading = 268.0, minZ = 20.42, maxZ = 19.62 },
            },
        },
    },
    {
        enabled = true,
        polyzone = {
            coords = vector3(57.29, -2689.3, 6.0),
            w = 4.0,
            h = 12.4,
            options = { heading = 271.0, minZ = 5.0, maxZ = 9.0 },
        },
        polytargets = {
            ["laptop"] = {
                coords = vector3(44.82, -2696.47, -4.51),
                width = 0.4,
                length = 0.4,
                options = { heading = 0.0, minZ = -4.71, maxZ = -4.36 },
            },
            ["drop"] = {
                coords = vector3(41.01, -2689.6, -4.03),
                width = 0.8,
                length = 0.8,
                options = { heading = 0.0, minZ = -4.13, maxZ = -3.53 },
            },
            ["fridge"] = {
                coords = vector3(38.91, -2696.56, -4.51),
                width = 1.1,
                length = 1.7,
                options = { heading = 90.0, minZ = -5.51, maxZ = -3.26 },
            },
            ["temperature"] = {
                coords = vector3(45.26, -2692.01, -4.51),
                width = 0.8,
                length = 0.7,
                options = { heading = 345.0, minZ = -4.36, maxZ = -3.86 },
            },
            ["settings"] = {
                coords = vector3(36.6, -2691.32, -4.51),
                width = 0.35,
                length = 1.25,
                options = { heading = 90.0, minZ = -4.56, maxZ = -3.81 },
            },
            ["dis_settings"] = { -- back
                coords = vector3(38.92, -2688.99, -4.51),
                width = 0.45,
                length = 1.25,
                options = { heading = 90.0, minZ = -4.71, maxZ = -3.41 },
            },
            ["dis_steam"] = { -- front
                coords = vector3(35.48, -2693.22, -4.51),
                width = 0.35,
                length = 1.25,
                options = { heading = 90.0, minZ = -4.61, maxZ = -3.81 },
            },
        },
    },
}

local LabList = {
    ["1"] = 333,
    ["2"] = 334,
    ["3"] = 335,
    ["4"] = 431,
    ["5"] = 432,
    ["6"] = 433,
}

local Containters = {
    ["1"] = {
        doorId = 635,
        location = "Rancho - Little Bighorn Ave",
    },
    ["2"] = {
        doorId = 541,
        location = "El Burro Heights - El Burro Blvd",
    },
    ["3"] = {
        doorId = 1173,
        location = "Grand Senora Desert - Rout 68",
    },
    ["4"] = {
        doorId = 693,
        location = "Galileo Park - Mt Haan Dr",
    },
    ["5"] = {
        doorId = 307,
        location = "La Mesa - Olympic Fwy",
    },
    ["6"] = {
        doorId = 637,
        location = "Los Santos International Airport - Greenwinch Pkwy",
    },
    ["7"] = {
        doorId = 554,
        location = "Grand Senora Desert - Baytree Canyon Rd",
    },
    ["8"] = {
        doorId = 722,
        location = "La Puerta - Mutiny Rd",
    },
    ["9"] = {
        doorId = 719,
        location = "Cypress Flats - Hanger Way",
    },
    ["10"] = {
        doorId = 718,
        location = "Los Santos International Airport - Plaige Pl",
    },
    ["11"] = {
        doorId = 716,
        location = "Redwood Lights Track - Senora Rd",
    },
    ["12"] = {
        doorId = 711,
        location = "Palmer Taylor Power Station - Senora Way",
    },
    ["13"] = {
        doorId = 726,
        location = "Rancho - Little Bighorn Ave",
    },

}

local InsideLab = false

RPC.register("ev-meth:getConfig", function(src)
    return config
end)

RPC.register("ev-meth:MethInformation", function (src)
    local streetRep = exports["ev-progression"]:GetIllegalRep(src, "streetrep")
    local MenuData = {
        {
            title = "Meth Lab",
            icons = "key",
            description = "Access Meth lab by pruchesing a key",
            children = {
                {
                    title = "Lab 1 (3750 SHUNG)",
                    action = "ev-meth:purchaseMethInformation",
                    key = {
                        labId = "1",
                        price = 3750,
                    },
                    disabled = streetRep < 10000,
                },
                {
                    title = "Lab 2 (3750 SHUNG)",
                    action = "ev-meth:purchaseMethInformation",
                    key = {
                        labId = "2",
                        price = 3750,
                    },
                    disabled = streetRep < 10000,
                },
                {
                    title = "Lab 3 (3750 SHUNG)",
                    action = "ev-meth:purchaseMethInformation",
                    key = {
                        labId = "3",
                        price = 3750,
                    },
                    disabled = streetRep < 10000,
                },
                {
                    title = "Lab 4 (3750 SHUNG)",
                    action = "ev-meth:purchaseMethInformation",
                    key = {
                        labId = "4",
                        price = 3750,
                    },
                    disabled = streetRep < 10000,
                },
                {
                    title = "Lab 5 (3750 SHUNG)",
                    action = "ev-meth:purchaseMethInformation",
                    key = {
                        labId = "5",
                        price = 3750,
                    },
                    disabled = streetRep < 10000,
                },
                {
                    title = "Lab 6 (3750 SHUNG)",
                    action = "ev-meth:purchaseMethInformation",
                    key = {
                        labId = "6",
                        price = 3750,
                    },
                    disabled = streetRep < 10000,
                },
            },
        },
        {
            title = "Crafting Location",
            description = "Access Crafting container by pruchesing a key",
            icons = "key",
            children = {
                {
                    title = "Container key (750 SHUNG)",
                    action = "ev-meth:purchaseCraftingnformation",
                    key = {
                        price = 750,
                    },
                },
            },
        },
       
    }
    return MenuData
end)

RPC.register("ev-meth:PurchaseMethInformation", function(src, data)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local cryptoBalance = exports["ev-phone"]:getCryptoBalance(cid, "2")
    
    if cryptoBalance > data.price then
        if exports["ev-phone"]:takeCrypto(src, cid, 3750, "2") then
            local information = { 
                doorId = LabList[data.labId],
                _hideKeys = {"doorId"},
            }
            TriggerClientEvent('player:receiveItem', src, "methlabkey", 1, false, {}, information)
            TriggerClientEvent("ev-meth:keyPurchasedEmail", src)
            return true 
        else
            return false, "not enough SHUNG"
        end
    end

    return false, "not enough SHUNG"
end)

RPC.register("ev-meth:PurchaseCraftingnInformation", function(src, data)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local cryptoBalance = exports["ev-phone"]:getCryptoBalance(cid, "2")
    local rnd = math.random(1, 13)
    local cnt = Containters[tostring(rnd)]

    if cryptoBalance > data.price then
        if exports["ev-phone"]:takeCrypto(src, cid, 750, "2") then
            local information = {
                Location = cnt.location,
                doorId = cnt.doorId,
                cid = cid, 
                _hideKeys = {"doorId", "cid"},
            }
            TriggerClientEvent('player:receiveItem', src, "methlabkey", 1, false, {}, information)
            TriggerClientEvent("ev-meth:keyPurchasedEmail", src)
            return true 
        else
            return false, "not enough SHUNG"
        end
    end

    return false, "not enough SHUNG"
end)

RPC.register("ev-meth:useDoorKey", function(src, info)
    
end)

RPC.register("ev-meth:doAction", function(src, pInsideLab, pAction, data)
    print(pInsideLab, pAction, data)
    InsideLab = pInsideLab
end)
