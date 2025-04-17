local generatedPeds = false
local currentSpawnLocation = {}
local isPublic = false

Generic.SpawnLocations = {
    vector4(-1605.03, -994.58, 7.53 - 1.0, 136.79),
    vector4(-278.84, 2205.93, 129.0 - 1.0, 62.05),
    vector4(-1164.633, -2022.285, 13.16054 - 1.0, 135.32376),
    vector4(-1250.894, -271.5982, 38.987239 - 1.0, 21.918216),
    vector4(-371.4682, 192.68656, 83.656547 - 1.0, 92.466224),
    vector4(474.32934, -635.0139, 25.64837 - 1.0, 261.0968),
    vector4(-77.93057, -1390.123, 29.320751 - 1.0, 176.48597),
    vector4(124.31025, -1675.898, 29.413127 - 1.0, 229.95028),
    vector4(197.01554, -1493.925, 29.14162 - 1.0, 142.48146),
    vector4(-690.9793, -1155.546, 10.814217 - 1.0, 310.07781)
}

Generic.PickUpLocations = {
    vector4(608.79, -459.17, 24.74, 181.92),
    vector4(740.43, -2634.68, 6.47, 189.84),
    vector4(-1161.83, -1250.07, 6.8, 306.16),
    vector4(-2223.13, -365.75, 13.32, 260.99),
    vector4(-2982.84, 1585.71, 23.82, 359.91),
    vector4(-287.47, 2535.68, 75.47, 271.17),
    vector4(1577.8146, 3607.0107, 35.421791, 116.27641),
    vector4(811.08282, -3330.376, 6.1194748, 238.18768),
    vector4(-163.8758, 6575.9799, 6.6199145, 313.41705),
    vector4(1416.317, 6360.5214, 24.007526,  232.23353),
    vector4(-545.8489, -1802.74, 21.708265,  60.059482)
}

function getNpcLocationById(id)
    for _, npc in pairs(Generic.NPCS) do
        if npc.id == id then
            local location = currentSpawnLocation[npc.id]
            local coords = {
                x = location.x,
                y = location.y,
                z = location.z
            }
            return coords
        end
    end
end

exports("getNpcLocationById", getNpcLocationById)

local function shuffleTable(pTable)
    math.randomseed(os.time())
    local returnTable = {}
    for i = #pTable, 1, -1 do
        local j = math.random(i)
        pTable[i], pTable[j] = pTable[j], pTable[i]
        returnTable[#returnTable + 1] = pTable[i]
    end
    return returnTable
end

-- function name should be lowercase
function getPedsWithRandomSpawnPoints()
    local peds = 0

    for i in pairs(Generic.NPCS) do
        if Generic.NPCS[i].position.random then
            peds = peds + 1
        end
    end

    return peds
end

RegisterServerEvent("ev-npcs:location:fetch")
AddEventHandler("ev-npcs:location:fetch", function()   
    local src = source
    -- Peds with random locations
    TriggerClientEvent("ev-npcs:set:ped", src, Generic.NPCS)
end)

Citizen.CreateThread(function()
    -- Peds
    GenerateDarkmarketNPCs()
    GenerateShopKeepers()
    GenerateLiqourKeeper()
    GeneratePaintballVendors()
    GenerateGolfVendors()
    GeneratePaintballSignUp()
    GenerateArenaVendors()
    GenerateArenaGrassSwappers()
    GenerateGolfVendors()
    GenerateCasinoInteriorSwaps()
    GenerateSionisMaterials()
    GenerateGalleryInteriorSwaps()
    GenerateMiningVendors()
    if isPublic then
        GenerateWeedShopKeepers()
        GenerateJobVehicleNPCs()
    end
    GenerateLaptopVendor()
    GenerateHOImportVendors()
    GenerateHOImportDriftVendors()
    GenerateCGJewelryVendors()
    GenerateSportShopKeepers()
    GenerateDwDropoffNpcs()
    GenerateDwAdminNpc()
    GenerateDwBumperNpc()
    GeneratePCAGraderNpcs()
    GenerateCasinoHotelVendors()
    GenerateXCoinRedeem()
    GenerateGangSprayVendors()
    GenerateHNOVendors()
    GenerateCasinoMembershipGiver()
    GenerateCasinoRestRoom()
    GenerateCasinoRestRoom2()
    GenerateCasinoJewelStore()
    GenerateCasinoChipSeller()
    GenerateCasinoWheelSpinNpc()
    GenerateCasinoDrinkGiver()
    GenerateWeaponShopKeepers()
    GenerateToolShopKeepers()
    GenerateGemShopLocations()
    GenerateFarmersMarketCraftLocations()
    GenerateFactoryShopLocations()
    GenerateWineryBuyLocations()
    GenerateBennysNPC()
    --GenerateRentals()
    --GenerateBoatShop()
    --GenerateAirShop()
    --GeneratemrpdK9Npcs()
    Generatemrpdvehiclegarage()
    GenerateLicenseVendors()
    GenerateFruitVendorKeeper()
    GenerateTacoshop()
    GenerateVehicleShopKeepersDataBike()
    GenerateVehicleShopKeepersDataVeh()
    GenerateVehicleShopKeepersDataVeh2()
    GenerateVehicleShopKeepersDataBoat()
    GenerateVehicleShopKeepersDataAir()

    Generic.SpawnLocations = shuffleTable(Generic.SpawnLocations)
    Generic.PickUpLocations = shuffleTable(Generic.PickUpLocations)
    if #Generic.SpawnLocations < getPedsWithRandomSpawnPoints() then 
        print("There are more NPC's than spawnPoints...") 
        return 
    end

    if not generatedPeds then
        for _, npc in ipairs(Generic.NPCS) do
            if Generic.NPCS[_].position.random then
                local location = Generic.SpawnLocations[math.random(#Generic.SpawnLocations)]
                currentSpawnLocation[npc.id] = location
                Generic.NPCS[_].position.coords = vector3(location.x, location.y, location.z - 1.0)
                Generic.NPCS[_].position.heading = location.w
                print(("[NPCs] Spawned %s at %s"):format(npc.id, Generic.NPCS[_].position.coords))
            elseif Generic.NPCS[_].flags.isDarkmarket then
                local location = Generic.PickUpLocations[math.random(#Generic.PickUpLocations)]
                currentSpawnLocation[npc.id] = location
                Generic.NPCS[_].position.coords = vector3(location.x, location.y, location.z - 1.0)
                Generic.NPCS[_].position.heading = location.w
                print(("[NPCs] Spawned %s at %s"):format(npc.id, Generic.NPCS[_].position.coords))
            end
        end
    else
        for _, npc in ipairs(Generic.NPCS) do
            if Generic.NPCS[_].position.random then
                local location = currentSpawnLocation[npc.id]
                Generic.NPCS[_].position.coords = vector3(location.x, location.y, location.z - 1.0)
                Generic.NPCS[_].position.heading = location.w
                print(("[NPCs] Spawned %s at %s"):format(npc.id, Generic.NPCS[_].position.coords))
            elseif Generic.NPCS[_].flags.isDarkmarket then
                local location = currentSpawnLocation[npc.id]
                Generic.NPCS[_].position.coords = vector3(location.x, location.y, location.z - 1.0)
                Generic.NPCS[_].position.heading = location.w
                print(("[NPCs] Spawned %s at %s"):format(npc.id, Generic.NPCS[_].position.coords))
            end
        end
    end

    generatedPeds = true
end)

function GenerateDarkmarketNPCs()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "darkmarket_goods",
        name = "darkmarket_goods",
        pedType = 4,
        model = "s_m_y_dealer_01",
        networked = false,
        distance = 25.0,
        position = {
            coords = vector3(0, 0, 0),
            heading = 0,
            random = false,
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
            ['isDarkmarket'] = true
        },
    }
end

function GenerateShopKeepers()
    for _, location in ipairs(Generic.ShopKeeperLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "shop_keeper_" .. _,
            name = ("Shop Keeper %s"):format(_),
            pedType = 4,
            model = "mp_m_shopkeep_01",
            scenario = "WORLD_HUMAN_STAND_MOBILE",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isShopKeeper'] = true,
            },
            blip = {
                sprite = 52,
                color = 2,
                scale = 0.7,
                short = true,
                text = "24/7 Store",
            },
        }
    end
end

function GenerateLiqourKeeper()
    for _, location in ipairs(Generic.LiqourKeeperLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "liqourkeeper_" .. _,
            name = ("Liqour Shop Keeper %s"):format(_),
            pedType = 4,
            model = "mp_m_forgery_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            }
        }
    end
end

function GenerateFruitVendorKeeper()
    for _, location in ipairs(Generic.FruitVendorLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "fruitstand_vendor_" .. _,
            name = ("fruit stand vendor %s"):format(_),
            pedType = 4,
            model = "mp_m_weed_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            }
        }
    end
end

function GenerateGolfVendors()
    for _, keeperLocations in ipairs(Generic.GolfVendor) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "golfclubseller",
            name = ("Golf Club Seller %s"):format(_),
            pedType = 4,
            model = "a_f_y_golfer_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = keeperLocations.xyz,
                heading = keeperLocations.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GeneratePaintballVendors()
    for _, keeperLocations in ipairs(Generic.PaintballVendor) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "paintball_vendor",
            name = ("Paintball Vendor %s"):format(_),
            pedType = 4,
            model = "a_m_y_beachvesp_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = keeperLocations.xyz,
                heading = keeperLocations.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
  end

function GeneratePaintballSignUp()
    for _, keeperLocations in ipairs(Generic.PaintballSignupNPC) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "paintball_signup",
            name = ("Paintball Signup %s"):format(_),
            pedType = 4,
            model = "a_m_y_beachvesp_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = keeperLocations.xyz,
                heading = keeperLocations.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
  end

function GenerateArenaVendors()
    for _, keeperLocations in ipairs(Generic.ArenaVendor) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "paintball_arena_map",
            name = ("Paintball Arena Map %s"):format(_),
            pedType = 4,
            model = "s_m_y_construct_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = keeperLocations.xyz,
                heading = keeperLocations.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
  end

  function GenerateArenaGrassSwappers()
    for _, keeperLocations in ipairs(Generic.ArenaGrassSwapper) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = ("paintball_arena_grass_swapper_%s"):format(_),
            name = ("Paintball Arena Grass Swapper %s"):format(_),
            pedType = 4,
            model = "mp_f_helistaff_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = keeperLocations.xyz,
                heading = keeperLocations.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
  end

function GenerateCasinoInteriorSwaps()
    for _, location in ipairs(Generic.CasinoInteriorSwap) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "casino_interior_swap",
            name = ("Casino Interior Swap %s"):format(_),
            pedType = 4,
            model = "s_m_y_casino_01",
            scenario = "",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = '{ "face":{"params":[0,1,0,2],"mode":"component"}, "hair":{"params":[2,1,0,1],"mode":"component"}, "haircolor":{"params":[1,0],"mode":"haircolor"}, "torso":{"params":[11,2,0,1],"mode":"component"}, "undershirt":{"params":[8,0,0,1],"mode":"component"}, "accesory":{"params":[7,0,2,1],"mode":"component"} }',
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateSionisMaterials()
    for _, location in ipairs(Generic.SionisMaterials) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "sionis_material_worker",
            name = ("Stonis Materials %s"):format(_),
            pedType = 4,
            model = "s_m_m_lathandy_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
            scenario = "WORLD_HUMAN_CLIPBOARD",
            blip = {
                color = 1,
                sprite = 566,
                scale = 0.7,
                text = "Stonis Industries",
                short = true
            }
        }
    end
end

function GenerateGalleryInteriorSwaps()
    for _, location in ipairs(Generic.GalleryInteriorSwap) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "gallery_interior_swap",
            name = ("Gallery Interior Swap %s"):format(_),
            pedType = 4,
            model = "ig_dale",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateMiningVendors()
    for _, location in ipairs(Generic.MiningVendor) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "mining_vendor",
            name = ("Mining Vendor %s"):format(_),
            pedType = 4,
            model = "s_m_y_construct_02",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateHOImportVendors()
    for _, location in ipairs(Generic.HOImportVendor) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "hoimport_vendor",
            name = ("HOImport Vendor %s"):format(_),
            pedType = 4,
            model = "s_m_y_construct_02",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateHOImportDriftVendors()
    for _, location in ipairs(Generic.HOImportDriftVendor) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "hoimport_drift_vendor",
            name = ("HOImport Drift Vendor %s"):format(_),
            pedType = 4,
            model = "s_m_y_construct_02",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateCGJewelryVendors()
    for _, location in ipairs(Generic.CGJewelryVendor) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "cgjvendor",
            name = ("Jewelry Vendor %s"):format(_),
            pedType = 4,
            model = "s_m_y_devinsec_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateSportShopKeepers()
    for _, location in ipairs(Generic.SportShopLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "sportshopKeeper_" .. _,
            name = ("Sport Shop %s"):format(_),
            pedType = 4,
            model = "ig_hunter",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isSportShopKeeper'] = true,
            },
            
        }
    end
end

function GenerateDwDropoffNpcs()
    for _, location in ipairs(Generic.DwDropOffNpc) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "dwdropoffnpc",
            name = ("Drop Off Npc %s"):format(_),
            pedType = 4,
            model = "csb_customer",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateDwAdminNpc()
    for _, location in ipairs(Generic.DwAdminNpc) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "dwadminnpc",
            name = ("Admin Npc %s"):format(_),
            pedType = 4,
            model = "u_m_y_chip",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateDwFoodShitNpcs()
    for _, location in ipairs(Generic.DwFoodShitNpc) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "dwfoodshitnpc",
            name = ("Food Npc %s"):format(_),
            pedType = 4,
            model = "s_m_y_chef_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateDwBumperNpc()
    for _, location in ipairs(Generic.DwBumperNpc) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "dwbumpernpc",
            name = ("Bumper Npc %s"):format(_),
            pedType = 4,
            model = "u_m_y_chip",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GeneratePCAGraderNpcs()
    for _, location in ipairs(Generic.PCAGraders) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "pcagraders",
            name = ("PCAGraders %s"):format(_),
            pedType = 4,
            model = "a_m_y_vinewood_02",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateCasinoHotelVendors()
    for _, location in ipairs(Generic.CasinoHotelVendor) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "casino_hotel_worker",
            name = ("Casino Hotel Vendor %s"):format(_),
            pedType = 4,
            model = "s_f_y_casino_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateXCoinRedeem()
    for _, location in ipairs(Generic.XCoinRedeem) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = ("xcoinredeem_%s"):format(_),
            name = ("XCoinRedeem %s"):format(_),
            pedType = 4,
            model = "hc_hacker",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateGangSprayVendors()
    for _, location in ipairs(Generic.GangSprayVendor) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = ("gangspray_%s"):format(_),
            name = ("Gang Spray Vendor %s"):format(_),
            pedType = 4,
            model = "g_m_y_famfor_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateHNOVendors()
    for _, location in ipairs(Generic.HNOVendor) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "hnovendor",
            name = ("HNOVendor %s"):format(_),
            pedType = 4,
            model = "a_m_y_business_03",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
            scenario = "WORLD_HUMAN_CLIPBOARD",
        }
    end
end

function GenerateLicenseVendors()
    for _, location in ipairs(Generic.LicenseBuyLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "npc_license_keeper_" .. _,
            name = ("vendor license keeper %s"):format(_),
            pedType = 4,
            model = "a_f_y_business_04",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
            scenario = "WORLD_HUMAN_CLIPBOARD",
        }
    end
end

function GenerateCasinoMembershipGiver()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.CasinoLocations[1].npcId,
        name = "Casino Membership Giver",
        pedType = 4,
        model = "s_f_y_casino_01",
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.CasinoLocations[1].coords.xyz,
            heading = Generic.CasinoLocations[1].coords[4],
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
            ['isCasinoMembershipGiver'] = true,
        },
    }
end

function GenerateCasinoRestRoom()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "casino_rest_room_1",
        name = "Casino Rest Room",
        pedType = 4,
        model = "s_f_y_casino_01",
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.CasinoLocations[2].coords.xyz,
            heading = Generic.CasinoLocations[2].coords[4],
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }
end

function GenerateTacoshop()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "tacoshop",
        name = "Taco Shop",
        pedType = 4,
        model = "a_m_y_eastsa_01",
        networked = false,
        distance = 25.0,
        position = {
            coords = vector3(180.06, -1637.66, 28.29),
            heading = 212.855,
            random = false
        },
        appearance = nil,
        settings = {
            {mode = "invincible", active = true},
            {mode = "ignore", active = true},
            {mode = "freeze", active = true},
        },
        flags = {
            ['isNPC'] = true,
        },
        job = "tacoshop",
    }
end


function GenerateCasinoRestRoom2()
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "casino_rest_room_2",
            name = "Casino Rest Room 2",
            pedType = 4,
            model = "s_f_y_casino_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = Generic.CasinoLocations[3].coords.xyz,
                heading = Generic.CasinoLocations[3].coords[4],
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
end

function GenerateCasinoJewelStore()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "casino_jewel_store",
        name = "Casino Jewel Store",
        pedType = 4,
        model = "s_m_y_casino_01",
        scenario = "WORLD_HUMAN_GUARD_STAND",
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.CasinoLocations[4].coords.xyz,
            heading = Generic.CasinoLocations[4].coords[4],
            random = false
        },
        appearance = '{ "face":{"params":[0,2,0,2],"mode":"component"}, "hair":{"params":[2,2,0,1],"mode":"component"}, "haircolor":{"params":[1,0],"mode":"haircolor"}, "torso":{"params":[11,1,0,1],"mode":"component"}, "undershirt":{"params":[8,1,0,1],"mode":"component"}, "accesory":{"params":[7,2,2,1],"mode":"component"} }',
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }
end

function GenerateCasinoChipSeller()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.CasinoLocations[5].npcId,
        name = "Casino Chip Seller",
        pedType = 4,
        model = "s_f_y_casino_01",
        scenario = "WORLD_HUMAN_STAND_IMPATIENT",
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.CasinoLocations[5].coords.xyz,
            heading = Generic.CasinoLocations[5].coords[4],
            random = false
        },
        appearance = '{ "face":{"params":[0,2,0,2],"mode":"component"}, "hair":{"params":[2,1,0,1],"mode":"component"}, "haircolor":{"params":[1,0],"mode":"haircolor"}, "accesory":{"params":[7,2,2,1],"mode":"component"} }',
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
            ['isCasinoChipSeller'] = true,
        },
    }
end

function GenerateLaptopVendor()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = "laptop_1",
        name = "Laptop Vendor",
        pedType = 4,
        model = "a_m_y_vinewood_04",
        networked = false,
        distance = 50.0,
        position = {
            coords = vector3(-1358.93, -759.38, 21.32),
            heading = 346.47,
            random = false
        },
        appearance = nil,
        settings = {
            {mode = "invincible", active = true},
            {mode = "ignore", active = true},
            {mode = "freeze", active = true},
        },
        flags = {
            ['isNPC'] = true,
        }
    }
end

function GenerateCasinoWheelSpinNpc()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.CasinoLocations[6].npcId,
        name = "Casino Wheel Spin Npc",
        pedType = 4,
        model = "s_f_y_casino_01",
        scenario = "WORLD_HUMAN_STAND_IMPATIENT",
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.CasinoLocations[6].coords.xyz,
            heading = Generic.CasinoLocations[6].coords[4],
            random = false
        },
        appearance = '{ "face":{"params":[0,2,0,2],"mode":"component"}, "hair":{"params":[2,2,0,1],"mode":"component"}, "haircolor":{"params":[1,0],"mode":"haircolor"}, "undershirt":{"params":[8,2,0,1],"mode":"component"}, "accesory":{"params":[7,0,2,1],"mode":"component"} }',
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }
end

function GenerateCasinoDrinkGiver()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.CasinoLocations[7].npcId,
        name = "Casino Drink Giver",
        pedType = 4,
        model = "s_f_y_casino_01",
        scenario = "WORLD_HUMAN_STAND_IMPATIENT_UPRIGHT",
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.CasinoLocations[7].coords.xyz,
            heading = Generic.CasinoLocations[7].coords[4],
            random = false
        },
        appearance = '{ "undershirt":{"params":[8,1,0,1],"mode":"component"}, "accesory":{"params":[7,2,2,1],"mode":"component"} }',
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
            ['isCasinoDrinkGiver'] = true,
        },
    }
end

function GenerateWeaponShopKeepers()
    for _, location in ipairs(Generic.WeaponShopLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "weaponShopKeeper_" .. _,
            name = ("Weapon Shop Keeper %s"):format(_),
            pedType = 4,
            model = "s_m_y_ammucity_01",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isWeaponShopKeeper'] = true
            },
            blip = {
                sprite = 110,
                color = 1,
                scale = 0.7,
                short = true,
                text = "Gun Store",
            },
        }
    end
end

function GenerateToolShopKeepers()
    for _, location in ipairs(Generic.ToolShopLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "toolsShopKeeper_" .. _,
            name = ("Tool Shop %s"):format(_),
            pedType = 4,
            model = "s_m_m_lathandy_01",
            scenario = "WORLD_HUMAN_CLIPBOARD",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isToolShopKeeper'] = true
            },
            blip = {
                sprite = 52,
                color = 2,
                scale = 0.7,
                short = true,
                text = "Tool Shop",
            },
        }
    end
end

function GenerateGemShopLocations()
    for _, location in ipairs(Generic.GemShopLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "gem_shop_locations_" .. _,
            name = ("Gem Shop %s"):format(_),
            pedType = 4,
            model = "a_m_y_busicas_01",
            scenario = "WORLD_HUMAN_CLIPBOARD",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateWeedShopKeepers()
    for _, location in ipairs(Generic.WeedShopLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "weedshop_keeper",
            name = ("Weed Shop %s"):format(_),
            pedType = 4,
            model = "s_m_m_bouncer_02",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isWeedShopKeeper'] = true,
            },
        }
    end
end

function GenerateFarmersMarketCraftLocations()
    for _, location in ipairs(Generic.FarmersMarketCraftLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "farmersmarketcraftlocations",
            name = ("Farmers Market Craft %s"):format(_),
            pedType = 4, 
            model = "ig_paige",
            scenario = "WORLD_HUMAN_GUARD_STAND",
            networked = false, 
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateFactoryShopLocations()
    for _, location in ipairs(Generic.FactoryShopLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "factoryshoplocations",
            name = ("Factory Shop %s"):format(_),
            pedType = 4,
            model = "ig_dale",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

function GenerateJobVehicleNPCs()
    for _, location in ipairs(Generic.JobVehLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "jobveh_keeper",
            name = ("Job Veh %s"):format(_),
            pedType = 4,
            model = "a_m_m_business_01",
            scenario = "WORLD_HUMAN_CLIPBOARD",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isJobVehShopKeeper'] = true,
            },
        }
    end
end

function GenerateWineryBuyLocations()
    for _, location in ipairs(Generic.WineryBuyLocations) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "winery_keeper_goods",
            name = ("Winery Buy %s"):format(_),
            pedType = 4,
            model = "a_f_y_business_02",
            scenario = "WORLD_HUMAN_DRINKING",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isWineryShopKeeper'] = true,
            },
        }
    end
end

function GenerateBennysNPC()
    for _, location in ipairs({vector4(-227.08, -1326.74, 30.89 - 1, 240.83)}) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "bennysnpc",
            name = "Bennys NPC",
            pedType = 4,
            model = "a_f_y_hipster_01",
            scenario = "WORLD_HUMAN_STAND_MOBILE_UPRIGHT",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

--rentals 
function GenerateVehicleShopKeepersDataBike()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.VehicleShopKeepersData[1].id,
        name = "Public License Keepers",
        pedType = 4,
        model = Generic.VehicleShopKeepersData[1].model,
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.VehicleShopKeepersData[1].location.xyz,
            heading = Generic.VehicleShopKeepersData[1].location[4],
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }
end

function GenerateVehicleShopKeepersDataVeh()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.VehicleShopKeepersData[2].id,
        name = "Public License Keepers",
        pedType = 4,
        model = Generic.VehicleShopKeepersData[2].model,
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.VehicleShopKeepersData[2].location.xyz,
            heading = Generic.VehicleShopKeepersData[2].location[4],
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }
end

function GenerateVehicleShopKeepersDataVeh2()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.VehicleShopKeepersData[3].id,
        name = "Public License Keepers",
        pedType = 4,
        model = Generic.VehicleShopKeepersData[3].model,
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.VehicleShopKeepersData[3].location.xyz,
            heading = Generic.VehicleShopKeepersData[3].location[4],
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }
end

function GenerateVehicleShopKeepersDataBoat()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.VehicleShopKeepersData[4].id,
        name = "Public License Keepers",
        pedType = 4,
        model = Generic.VehicleShopKeepersData[4].model,
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.VehicleShopKeepersData[4].location.xyz,
            heading = Generic.VehicleShopKeepersData[4].location[4],
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }
end

function GenerateVehicleShopKeepersDataAir()
    Generic.NPCS[#Generic.NPCS + 1] = {
        id = Generic.VehicleShopKeepersData[5].id,
        name = "Public License Keepers",
        pedType = 4,
        model = Generic.VehicleShopKeepersData[5].model,
        networked = false,
        distance = 25.0,
        position = {
            coords = Generic.VehicleShopKeepersData[5].location.xyz,
            heading = Generic.VehicleShopKeepersData[5].location[4],
            random = false
        },
        appearance = nil,
        settings = {
            { mode = "invincible", active = true },
            { mode = "ignore", active = true },
            { mode = "freeze", active = true },
        },
        flags = {
            ['isNPC'] = true,
        },
    }
end

function GeneratemrpdK9Npcs()
    for _, location in ipairs(Generic.mrpdK9Npcs) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = ("mrpdK9Npcs_%s"):format(_),
            name = ("mrpd K9 Npcs %s"):format(_),
            pedType = 4,
            model = "a_c_shepherd_np",
            scenario = "WORLD_DOG_SITTING_SHEPHERD",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
                ['isPetshopSeller'] = true,
            },
        }
    end
end

function Generatemrpdvehiclegarage()
    for _, location in ipairs(Generic.mrpdvehiclegarage) do
        Generic.NPCS[#Generic.NPCS + 1] = {
            id = "mrpdvehiclegarage",
            name = "mrpd vehicle shop",
            pedType = 4,
            model = "mp_g_m_pros_01",
            scenario = "WORLD_HUMAN_STAND_MOBILE_UPRIGHT",
            networked = false,
            distance = 25.0,
            position = {
                coords = location.xyz,
                heading = location.w,
                random = false
            },
            appearance = nil,
            settings = {
                { mode = "invincible", active = true },
                { mode = "ignore", active = true },
                { mode = "freeze", active = true },
            },
            flags = {
                ['isNPC'] = true,
            },
        }
    end
end

RPC.register("ev-npcs:weedShopOpen", function(src)
    local time = GetGameTimer()
    if time >= 12 and time <= 6 then
        result = true
    else
        result = false
        message = "shop is closed"
    end

    return result, message
end)

RPC.register("ev-npcs:purchaseDriversLicense", function(src, pType)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local char = user:getCurrentCharacter()
    local cash = user:getCash()
    local success, bankId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end
    local balance = exports["ev-financials"]:getAccountBalance(bankId)
    local gender = "Male"

    if char.gender ~= 0 then
        gender = "Female"
    end

    local tmep = {
        Identifier = char.id,
        Name = char.first_name,
        Surname = char.last_name,
        Sex = gender,
        DOB = char.dob
    }

    if pType == "cash" then
        if cash >= 1000 then
            user:removeMoney(1000)
        else
            return false
        end
    else
        if balance >= 500 then
            local comment = "License Renewal fees $500."
            exports["ev-financials"]:adjustAccountBalance(bankId, "remove", 500)
        else
            return false
        end
    end

    TriggerClientEvent('player:receiveItem', src, "idcard", 1, false, {}, tmep)
end)
