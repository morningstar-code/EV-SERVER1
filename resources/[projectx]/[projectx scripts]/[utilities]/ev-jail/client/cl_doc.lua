RegisterNetEvent('ev-jailbreak:JailAlarm')
AddEventHandler('ev-jailbreak:JailAlarm', function(toggle)
    if toggle then
        local alarmIpl = GetInteriorAtCoordsWithType(1787.004,2593.1984,45.7978, "lr_cs6_04_mainblock")
        print("alarmIpl", alarmIpl)
        RefreshInterior(alarmIpl)
        ActivateInteriorEntitySet(alarmIpl, "prison_alarm")
    
        Citizen.CreateThread(function()
            while not PrepareAlarm("PRISON_ALARMS") do
                Citizen.Wait(100)
            end
            StartAlarm("PRISON_ALARMS", true)
        end)
    else
        local alarmIpl = GetInteriorAtCoordsWithType(1787.004,2593.1984,45.7978, "lr_cs6_04_mainblock")

        RefreshInterior(alarmIpl)
        DeactivateInteriorEntitySet(alarmIpl, "prison_alarm")
    
        Citizen.CreateThread(function()
            while not PrepareAlarm("PRISON_ALARMS") do
                Citizen.Wait(100)
            end
            StopAllAlarms(true)
        end)
    end
end)

local state = false
RegisterCommand('alarm', function(source, args, RawCommand)
    state = not state
    TriggerEvent("ev-jailbreak:JailAlarm", state)
end)

RegisterCommand('mloInfo', function(source, args, RawCommand)
    -- 595963700
    local playerPed = PlayerPedId()
    local interiorId = GetInteriorFromEntity(playerPed)
    local roomHash = GetRoomKeyFromEntity(playerPed)
    local roomId = GetInteriorRoomIndexByHash(interiorId, roomHash)
    local roomName = GetInteriorRoomName(interiorId, roomId)
    -- local key = GetRoomKeyFromEntity(interiorId)
    local key = GetRoomKeyForGameViewport()
    local minX, minY, minZ, maxX, maxY, maxZ = GetInteriorEntitiesExtents(interiorId, roomId)
    local info = GetInteriorInfo(interiorId)
    print("interiorId", interiorId, "roomHash", roomHash, "roomId", roomId)
    print("current room index is: " .. roomId)
    print("current room name is: " .. roomName)
    print("current entities extents is: Min " .. vec(minX, minY, minZ) .." / Max " .. vec(maxX, maxY, maxZ))
    print(key, "Key")
    print("info", info)
    local portalIndex = 0
    if interiorId ~= 0 then
        local count = GetInteriorPortalEntityCount(interiorId, portalIndex)
        for i=0, count-1 do
            local archetype = GetInteriorPortalEntityArchetype(interiorId, portalIndex, i)
            print("portal " .. portalIndex .." entity " .. i .. " archetype is: " .. archetype)
        end
    end
end)
    
Citizen.CreateThread(function()
    exports["ev-polytarget"]:AddBoxZone("prison_rental", vector3(1635.27, 2587.56, 45.55), 0.4, 2.4, {
        heading = 0,
        minZ = 45.5,
        maxZ = 45.95,
    })

    exports["ev-interact"]:AddPeekEntryByPolyTarget("prison_rental", {{
        id =  "prison_rental",
        label = "rent bicycle",
        icon = "fas fa-bicycle",
        event = "ev-jail:RentBicycle",
        parameters =  {},
      }}, { 
        distance = { radius = 1.5 }
    })
end)

AddEventHandler("ev-jail:RentBicycle", function()
    local MenuData = RPC.execute("ev-jail:GetBikeMenu")
    exports['ev-ui']:showContextMenu(MenuData)
end)

RegisterUICallback('ev-jail:RentBike', function(data, cb)
    local suc, msg = RPC.execute("ev-jail:RentBike", data)
    if not suc then 
        TriggerEvent("DoLongHudText", msg, 2)
        return
    end
end)

RegisterUICallback('ev-jail:CraftBike', function(data, cb)
    local pItemId = data.key.item
    local pAmount = data.key.amount
    local pIngredients = data.key.ingredients

    local animDictName = "anim@amb@clubhouse@tutorial@bkr_tut_ig3@"
    RequestAnimDict(animDictName)
    while not HasAnimDictLoaded(animDictName) do
        Citizen.Wait(0)
    end
    local animLength = GetAnimDuration(animDictName, "machinic_loop_mechandplayer")
    TaskPlayAnim(PlayerPedId(), animDictName, "machinic_loop_mechandplayer", 1.0, 4.0, animLength, 0, 0, 0, 0, 0)

    local finished = exports['ev-taskbar']:taskBar(17500, "Preparing")
    if finished == 100 then
        for k, v in pairs(pIngredients) do 
            local required = exports['ev-inventory']:hasEnoughOfItem(k, v, false)
            if not required then
                TriggerEvent("DoLongHudText", "Not enough ingredients", 1)
                return
            end
            TriggerEvent("inventory:removeItem", k, v)
        end
        TriggerEvent("player:receiveItem", pItemId, pAmount, false)
        ClearPedTasks(PlayerPedId())
    end
    ClearPedTasks(PlayerPedId())
end)