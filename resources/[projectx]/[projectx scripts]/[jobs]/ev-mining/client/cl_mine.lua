local jobCompleted = false
local divineMiningZone = false
local divineMiningSells = false
local listening = false
local currentlyMining = false
local currentlyDetecting = false
local pFarmed = 0

-- miningprobe
-- miningpickaxe

AddEventHandler("ev-mining:client:collectItem", function(p1)
    if exports['ev-inventory']:getQuantity(p1.itemId, 1) >= 1 then return TriggerEvent('DoLongHudText', 'You already have the tools.', 2) end
    TriggerEvent("player:receiveItem", p1.itemId, 1)
end)

AddEventHandler("ev-inventory:itemUsed", function(item, metaData)
    if areaScanned then
        if item == "miningpickaxe" then
            currentlyMining = true
            local playerPed = PlayerPedId()
            local coords = GetEntityCoords(playerPed)
            FreezeEntityPosition(playerPed, true)
            SetCurrentPedWeapon(playerPed, GetHashKey('WEAPON_UNARMED'))
            Citizen.Wait(200)
            local pickaxe = GetHashKey("prop_tool_pickaxe")
            
            -- Loads Pickaxe
            RequestModel(pickaxe)
            while not HasModelLoaded(pickaxe) do
                Wait(1)
            end
            
            local anim = "melee@large_wpn@streamed_core"
            local action = "ground_attack_on_spot_body"
            
            -- Loads Anims
            RequestAnimDict(anim)
            while not HasAnimDictLoaded(anim) do
                Wait(1)
            end
            
            local object = CreateObject(pickaxe, coords.x, coords.y, coords.z, true, false, false)
            AttachEntityToEntity(object, playerPed, GetPedBoneIndex(playerPed, 28422), 0.04, -0.01, 0.0, 90.0, -4.0, 180.0, true, true, false, true, 1, true)
            TaskPlayAnim(PlayerPedId(), anim, action, 3.0, -3.0, -1, 47, 0, false, false, false)
            local finished = exports['ev-taskbar']:taskBar(5000, 'Probing...', true)

            if finished ~= 100 then
                currentlyMining = false
                ClearPedTasks(PlayerPedId())
                FreezeEntityPosition(playerPed, false)
                DeleteObject(object)
                return
            end

            currentlyMining = false
            ClearPedTasks(PlayerPedId())
            FreezeEntityPosition(playerPed, false)
            DeleteObject(object)
        end
    else
        TriggerEvent('DoLongHudText', 'You need to scan the area first', 2)
    end
end)

AddEventHandler("ev-inventory:itemUsed", function(item, metaData)
    if item == "miningprobe" then
        currentlyDetecting = true
        local playerPed = PlayerPedId()
        local coords = GetEntityCoords(playerPed)
        FreezeEntityPosition(playerPed, true)
        SetCurrentPedWeapon(playerPed, GetHashKey('WEAPON_UNARMED'))
        Citizen.Wait(200)
        local detector = GetHashKey("w_am_metaldetector")
        
        -- Loads Pickaxe
        RequestModel(detector)
        while not HasModelLoaded(detector) do
            Wait(1)
        end
        
        local anim = "amb@world_human_gardener_leaf_blower@base"
        local action = "base"
        
        -- Loads Anims
        RequestAnimDict(anim)
        while not HasAnimDictLoaded(anim) do
            Wait(1)
        end

        Citizen.CreateThread(function()
            for i = 1, 4 do
                PlaySound(-1, '5_SEC_WARNING', 'HUD_MINI_GAME_SOUNDSET', false, 0, true)
                Wait(1500)
            end
        end)
        
        local object = CreateObject(detector, coords.x, coords.y, coords.z, true, false, false)
        AttachEntityToEntity(object, playerPed, GetPedBoneIndex(playerPed, 28422), 0.06, 0.0, 0.1, 0.0, 60.0, 0.0, true, true, false, true, 1, true)
        TaskPlayAnim(PlayerPedId(), anim, action, 3.0, -3.0, -1, 31, 0, false, false, true)
        local finished = exports['ev-taskbar']:taskBar(5000, 'Scaning...', true)

        if finished ~= 100 then
            currentlyMining = false
            ClearPedTasks(PlayerPedId())
            FreezeEntityPosition(playerPed, false)
            DeleteObject(object)
            return
        end

        currentlyMining = false
        ClearPedTasks(PlayerPedId())
        FreezeEntityPosition(playerPed, false)
        DeleteObject(object)
    end
end)

--// Events to get items
RegisterNetEvent('ev-civjobs:mines-items', function()
    local roll = math.random(8)
    if roll == 1 then
        TriggerEvent('player:receiveItem', 'mininggem', 1)
        TriggerEvent('DoLongHudText', 'You Found A Gemstone !', 1)
    elseif roll == 2 then
        TriggerEvent('player:receiveItem', 'miningstone', math.random(1, 3))
        TriggerEvent('DoLongHudText', 'You Found Stone', 1)
    elseif roll == 3 then
        TriggerEvent('player:receiveItem', 'miningcoal', math.random(1, 5))
        TriggerEvent('DoLongHudText', 'You Found Coal', 1)
    elseif roll == 4 then
        TriggerEvent('player:receiveItem', 'miningdiamond', 1)
        TriggerEvent('DoLongHudText', 'You Found A Diamond', 1)
    elseif roll == 5 then
        TriggerEvent('player:receiveItem', 'miningsapphire', 1)
        TriggerEvent('DoLongHudText', 'You found a Sapphire', 1)
    elseif roll == 6 then
        TriggerEvent('player:receiveItem', 'miningstone', math.random(1, 3))
        TriggerEvent('DoLongHudText', 'You Found Stone', 1)
    elseif roll == 7 then
        TriggerEvent('player:receiveItem', 'mininggem', 1)
        TriggerEvent('DoLongHudText', 'You Found A Gemstone', 1)
    elseif roll == 8 then
        TriggerEvent('player:receiveItem', 'miningruby', 1)
        TriggerEvent('DoLongHudText', 'You found a Ruby', 1)
    end
end)

--// Sell Mining Items
RegisterNetEvent("ev-mining:SellAllGoods", function()
    local gemCount = exports['ev-inventory']:getQuantity('mininggem', 1)
    local stoneCount = exports['ev-inventory']:getQuantity('miningstone', 1)
    local coalCount = exports['ev-inventory']:getQuantity('miningcoal', 1)
    local diamondCount = exports['ev-inventory']:getQuantity('miningdiamond', 1)
    local sapphireCount = exports['ev-inventory']:getQuantity('miningsapphire', 1)
    local rubyCount = exports['ev-inventory']:getQuantity('miningruby', 1)
    local totalCount = 0

    if gemCount > 0 then
        totalCount = totalCount + gemCount
    end

    if stoneCount > 0 then
        totalCount = totalCount + stoneCount
    end

    if coalCount > 0 then
        totalCount = totalCount + coalCount
    end

    if diamondCount > 0 then
        totalCount = totalCount + diamondCount
    end

    if sapphireCount > 0 then
        totalCount = totalCount + sapphireCount
    end

    if rubyCount > 0 then
        totalCount = totalCount + rubyCount
    end

    if exports['ev-inventory']:hasEnoughOfItem('mininggem', 1) or exports['ev-inventory']:hasEnoughOfItem('miningstone', 1) or exports['ev-inventory']:hasEnoughOfItem('miningcoal', 1) or exports['ev-inventory']:hasEnoughOfItem('miningdiamond', 1) or exports['ev-inventory']:hasEnoughOfItem('miningsapphire', 1) or exports['ev-inventory']:hasEnoughOfItem('miningruby', 1) then
        jobCompleted = true
        FreezeEntityPosition(PlayerPedId(), true)
        exports['ev-taskbar']:Progress({
            duration = 1000*totalCount,
            label = "Selling Mining Goods",
        }, function(cancelled)
            if not cancelled then
                if exports['ev-inventory']:hasEnoughOfItem('mininggem', 1) or exports['ev-inventory']:hasEnoughOfItem('miningstone', 1) or exports['ev-inventory']:hasEnoughOfItem('miningcoal', 1) or exports['ev-inventory']:hasEnoughOfItem('miningdiamond', 1) or exports['ev-inventory']:hasEnoughOfItem('miningsapphire', 1) or exports['ev-inventory']:hasEnoughOfItem('miningruby', 1) then
            
                    if exports['ev-inventory']:hasEnoughOfItem('mininggem', 1) then
                        TriggerEvent('inventory:removeItem', 'mininggem', exports["ev-inventory"]:getQuantity("mininggem"))
                        TriggerServerEvent('ev-mining:PayPlayer', jobCompleted, math.random(65, 70) * exports["ev-inventory"]:getQuantity("mininggem"))
                    end

                    if exports['ev-inventory']:hasEnoughOfItem('miningstone', 1) then
                        TriggerEvent('inventory:removeItem', 'miningstone', exports["ev-inventory"]:getQuantity("miningstone"))
                        TriggerServerEvent('ev-mining:PayPlayer', jobCompleted, math.random(50, 60) * exports["ev-inventory"]:getQuantity("miningstone"))
                    end
                    
                    if exports['ev-inventory']:hasEnoughOfItem('miningcoal', 1) then
                        TriggerEvent('inventory:removeItem', 'miningcoal', exports["ev-inventory"]:getQuantity("miningcoal"))
                        TriggerServerEvent('ev-mining:PayPlayer', jobCompleted, math.random(70, 85) * exports["ev-inventory"]:getQuantity("miningcoal"))
                    end

                    if exports['ev-inventory']:hasEnoughOfItem('miningdiamond', 1) then
                        TriggerEvent('inventory:removeItem', 'miningdiamond', exports["ev-inventory"]:getQuantity("miningdiamond"))
                        TriggerServerEvent('ev-mining:PayPlayer', jobCompleted, math.random(125, 150) * exports["ev-inventory"]:getQuantity("miningdiamond"))
                    end
                    
                    if exports['ev-inventory']:hasEnoughOfItem('miningsapphire', 1) then
                        TriggerEvent('inventory:removeItem', 'miningsapphire', exports["ev-inventory"]:getQuantity("miningsapphire"))
                        TriggerServerEvent('ev-mining:PayPlayer', jobCompleted, math.random(80, 85) * exports["ev-inventory"]:getQuantity("miningsapphire"))
                    end

                    if exports['ev-inventory']:hasEnoughOfItem('miningruby', 1) then
                        TriggerEvent('inventory:removeItem', 'miningruby', exports["ev-inventory"]:getQuantity("miningruby"))
                        TriggerServerEvent('ev-mining:PayPlayer', jobCompleted, math.random(90, 95) * exports["ev-inventory"]:getQuantity("miningruby"))
                    end

                    jobCompleted = false
                    FreezeEntityPosition(PlayerPedId(), false)
                    totalCount = 0
                    listening = true
                end
            else
                jobCompleted = false
                FreezeEntityPosition(PlayerPedId(), false)
                totalCount = 0
                listening = true
            end
        end) 
    else 
        TriggerEvent('DoLongHudText', 'You have no items to sell!', 2)
        totalCount = 0
    end
end)

RegisterCommand('zone', function(source, args, RawCommand)
    local zone = GetNameOfZone(GetEntityCoords(PlayerPedId()))
    print("Current Zone:", zone)
end)