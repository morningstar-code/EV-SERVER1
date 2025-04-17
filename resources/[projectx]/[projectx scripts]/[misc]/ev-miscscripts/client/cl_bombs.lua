local plantedBombs = {}

CreateThread(function ()
    exports["ev-interact"]:AddPeekEntryByModel({`h4_prop_h4_ld_bomb_01a`}, {
        {
            id = "c4_check_time",
            event = "ev-bombs:bombs:checkTime", 
            icon = "stopwatch",
            label = "Check remaining time", 
        },
        {
            id = "c4_cut_red",
            event = "ev-bombs:bombs:cut",
            icon = "cut",
            label = "Cut red wire",
            parameters = { wire = "red" }
        },
        {
            id = "c4_cut_green",
            event = "ev-bombs:bombs:cut",
            icon = "cut",
            label = "Cut green wire",
            parameters = { wire = "green" }
        },
        {
            id = "c4_cut_blue",
            event = "ev-bombs:bombs:cut",
            icon = "cut",
            label = "Cut blue wire",
            parameters = { wire = "blue" }
        },
        {
            id = "c4_cut_yellow",
            event = "ev-bombs:bombs:cut",
            icon = "cut",
            label = "Cut yellow wire",
            parameters = { wire = "yellow" }
        },
        {
            id = "c4_cut_purple",
            event = "ev-bombs:bombs:cut",
            icon = "cut",
            label = "Cut purple wire",
            parameters = { wire = "purple" }
        },
        {
            id = "c4_cut_white",
            event = "ev-bombs:bombs:cut",
            icon = "cut",
            label = "Cut white wire",
            parameters = { wire = "white" }
        },
    }, { distance = { radius = 2.5 }, isEnabled = function (pEntity)
        local nearestBomb = getNearestBomb(GetEntityCoords(pEntity))
        if not nearestBomb then return false end
        return plantedBombs[nearestBomb].defused == false and plantedBombs[nearestBomb].exploded == false
    end })
    Wait(5000)
    RequestAnimDict("amb@world_human_bum_wash@male@low@idle_a")
    while not HasAnimDictLoaded("amb@world_human_bum_wash@male@low@idle_a") do
        Wait(100)
        RequestAnimDict("amb@world_human_bum_wash@male@low@idle_a")
    end
end)

AddEventHandler("ev-bombs:itemUsed", function()
    local wireOptions = {
        { id = "red", name = "Red" },
        { id = "green", name = "Green" },
        { id = "blue", name = "Blue" },
        { id = "yellow", name = "Yellow" },
        { id = "purple", name = "Purple" },
        { id = "white", name = "White" },
        { id = "random", name = "Random :)" },
    }

    local elements = {
        { name = "length", label = "Length in seconds (120-7200)", icon = "fas fa-time", _type = "number" },
        { name = "wire", label = "Wire to cut", icon = "fas fa-cut", _type = "select", options = wireOptions },
        { name = "gridSize", label = "Grid Size (5-12)", icon = "fas fa-time", _type = "number" },
        { name = "coloredSquares", label = "Colored Sqaures (5-20)", icon = "fas fa-time", _type = "number" },
        { name = "timeToComplete", label = "Time To Complete (10-30)", icon = "fas fa-time", _type = "number" },
    }
 
    local prompt = exports['ev-ui']:OpenInputMenu(elements) 

    if not prompt or not prompt.length or not prompt.wire then return end

    local length = tonumber(prompt.length)
    if length < 120 or length > 7200 then
        return TriggerEvent("DoLongHudText", "Time needs to be between 120 and 7200 seconds", 2)
    end

    local gridSize = tonumber(prompt.gridSize)
    if gridSize > 10 or gridSize < 5 then
        return TriggerEvent("DoLongHudText", "Grid size must be between 5-12", 2)
    end

    local coloredSquares = tonumber(prompt.coloredSquares)
    if coloredSquares > 10 or coloredSquares < 5 then
        return TriggerEvent("DoLongHudText", "Colored Sqaures must be between 5-10", 2)
    end

    local timeToComplete = tonumber(prompt.timeToComplete) * 1000
    if timeToComplete < 15000 or timeToComplete > 30000 then
        return TriggerEvent("DoLongHudText", "Time to complete must be between 15-30 seconds", 2)
    end

    local coords = GetEntityCoords(PlayerPedId()) + GetEntityForwardVector(PlayerPedId())

    TaskPlayAnim(PlayerPedId(), "amb@world_human_bum_wash@male@low@idle_a", "idle_a", 8.0, -8.0, -1, 1, 1.0, false, false, false)

    local progress = exports["ev-taskbar"]:taskBar(30000, "Planting bomb...", true)
    ClearPedTasks(PlayerPedId())
    if progress ~= 100 then return end

    local _, GroundZ = GetGroundZAndNormalFor_3dCoord(coords.x, coords.y, coords.z, 0)

    TriggerServerEvent('ev-bombs:plant', {
        x = coords.x,
        y = coords.y,
        z = GroundZ + 0.05
    }, length, prompt.wire, coloredSquares, timeToComplete)
    FreezeEntityPosition(obj, true)
    TriggerEvent("inventory:removeItem", 'C4_dev', 1)

    TriggerEvent("DoLongHudText", "Bomb planted", 2)
end)

RegisterNetEvent("ev-bombs:bombs:UpdateBombs")
AddEventHandler("ev-bombs:bombs:UpdateBombs", function (bombs)
    print(json.encode(bombs))
    plantedBombs = bombs
    for index,bomb in pairs(plantedBombs) do
        DeleteObject(bomb.obj)
        -- if bomb.obj ~= nil then return end 
        local obj = CreateObject(GetHashKey('h4_prop_h4_ld_bomb_01a'), bomb.coords.x, bomb.coords.y, bomb.coords.z-0.15, true, false, false)
        SetEntityRotation(obj, 270.0, 0.0, 0.0, false, true)
        FreezeEntityPosition(obj, true)
        bomb.obj = obj
    end
end)


RegisterNetEvent("ev-bombs:bombs:defuseCorrectBomb")
AddEventHandler("ev-bombs:bombs:defuseCorrectBomb", function (index, coloredSquares, timeToComplete)
    TriggerEvent("doAnim", "kneel2") 
    exports['ev-thermite']:OpenThermiteGame(function(success) 
        TriggerServerEvent('ev-bombs:bombs:completedHacking', success, index)
        ClearPedTasks(PlayerPedId())
    end, coloredSquares, 3, timeToComplete)
end)

AddEventHandler("ev-bombs:bombs:checkTime", function()
    local nearestBomb = getNearestBomb(GetEntityCoords(PlayerPedId()))
    if not nearestBomb then return end
    if plantedBombs[nearestBomb].defused or plantedBombs[nearestBomb].exploded then 
        TriggerEvent("DoLongHudText", "Bomb already defused or exploded.", 2)
       return
    end
    
    local remaining = plantedBombs[nearestBomb].length - (GetGameTimer() - plantedBombs[nearestBomb].startTime)
    seconds =(remaining/1000)%60
    minutes =(remaining/(1000*60))%60
    hours =(remaining/(1000*60*60))%24
    print(remaining)
    -- print(hours, minutes, seconds)
    if math.floor(hours) == 0 then 
        TriggerEvent("DoLongHudText", ("Remaining time: %s  minutes and %s seconds"):format(math.floor(minutes), math.floor(seconds)), 2)
    elseif math.floor(hours) == 0 and math.floor(minutes) == 0 then
        TriggerEvent("DoLongHudText", ("Remaining time: %s seconds"):format(math.floor(hours), math.floor(minutes), math.floor(seconds)), 2)
    else 
        TriggerEvent("DoLongHudText", ("Remaining time:%s hours %s  minutes and %s seconds"):format(math.floor(hours), math.floor(minutes), math.floor(seconds)), 2)
    end
end)

AddEventHandler("ev-bombs:bombs:cut", function (params)
    if not params.wire then return false end

    local nearestBomb = getNearestBomb(GetEntityCoords(PlayerPedId()))
    if not nearestBomb then return false end 

    if plantedBombs[nearestBomb].defused or plantedBombs[nearestBomb].exploded then return false end
    TriggerServerEvent('ev-bombs:bombs:cut', nearestBomb, plantedBombs[nearestBomb], params.wire)
end)

RegisterNetEvent("ev-bombs:bombs:defused")
AddEventHandler("ev-bombs:bombs:defused", function(index)
    if not plantedBombs[index] then return end
    plantedBombs[index].defused = true
    if plantedBombs[index].soundId and plantedBombs[index].handle then
        plantedBombs[index].handle = nil
        plantedBombs[index].soundId = nil 
    end
    Citizen.Wait(500)
    for index, bomb in pairs(plantedBombs) do
        DeleteObject(bomb.obj)
        plantedBombs[index] = nil
    end
    TriggerEvent('player:receiveItem', "C4_defused" , 1)
end)

RegisterNetEvent("ev-bombs:bombs:explode")
AddEventHandler("ev-bombs:bombs:explode", function (index)
    if not plantedBombs[index] then return false end

    AddExplosion(
        plantedBombs[index].coords.x,
        plantedBombs[index].coords.y,
        plantedBombs[index].coords.z,
        15,
        100.0,
        true,
        false,
        0.0
    )
    plantedBombs[index].exploded = true
    for index, bomb in pairs(plantedBombs) do
        DeleteObject(bomb.obj)
        plantedBombs[index] = nil
    end
    TriggerServerEvent("ev-bombs:bombs:exploded", index) 
end)

RegisterNetEvent("ev-bombs:bombs:exploded")
AddEventHandler("ev-bombs:bombs:exploded", function(index)
    if not plantedBombs[index] then return false end
    
    plantedBombs[index].exploded = true
    if plantedBombs[index].soundEnable then
        plantedBombs[index].soundEnable = false
    end
end)


AddEventHandler('onResourceStop', function (resource)
    if resource ~= GetCurrentResourceName() then return end
    for index, bomb in pairs(plantedBombs) do
        DeleteObject(bomb.obj)
        plantedBombs[index] = nil
    end
end)

function getNearestBomb(coords, dist)
    if not dist then dist = 3 end
    local nearestBomb = nil
    local nearestDistance = nil
    for index, bomb in pairs(plantedBombs) do
        local distance = #(vector3(coords.x, coords.y, coords.z) - vector3(bomb.coords.x, bomb.coords.y, bomb.coords.z))
        if not nearestDistance or distance < nearestDistance and (not bomb.exploded and not bomb.defused) then
            nearestBomb = index
            nearestDistance = distance
        end
    end
    if not nearestDistance or nearestDistance > dist then return nil end
    return nearestBomb
end

Citizen.CreateThread(function()
    while true do 
        Citizen.Wait(1000)
        for k,v in pairs(plantedBombs) do
            if not v.defused and not v.exploded then
                if v.soundEnable then
                    PlaySoundFromEntity(-1, 'Beep_Red', v.obj, 'DLC_HEIST_HACKING_SNAKE_SOUNDS', true, 10)
                end
            end
        end
    end
end)

Citizen.CreateThread(function()
    while true do 
        Citizen.Wait(1000)
        for k,v in pairs(plantedBombs) do
            if not v.defused or not v.exploded then
                local remaining = v.length - (GetGameTimer() - v.startTime)
                seconds =(remaining/1000)%60
                minutes =(remaining/(1000*60))%60
                hours =(remaining/(1000*60*60))%24
                if math.floor(hours) == 0 and math.floor(minutes) == 0 and math.floor(seconds) == 0 then
                    TriggerServerEvent("ev-bombs:bombs:exploded", k) 
                end
            end
        end
    end
end)