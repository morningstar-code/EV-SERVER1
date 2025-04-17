local isInScrapyard = false
local isScrapyard = "scrapyard"
local currTask = ""
local ScrapBlip = nil

local TirePile = {
    "pvcpipe",
    "pvcjoint",
    "pvcvalve",
}

local text = ""
local msg = ""

Citizen.CreateThread(function()
    exports["ev-polyzone"]:AddCircleZone("prison_scrapPile", vector3(1642.52, 2524.77, 45.55), 4.65, {
		useZ = true,
        data = {
            id = "prison_scrapPile",
        },
	})

    exports["ev-polyzone"]:AddCircleZone("prison_tiresPile", vector3(1649.91, 2531.21, 45.55), 2.88, {
		useZ = true,
        data = {
            id = "prison_tiresPile",
        },
	})

    exports["ev-polyzone"]:AddCircleZone("prison_bricksPile", vector3(1642.0, 2535.49, 45.55), 2.36, {
		useZ = true,
        data = {
            id = "prison_bricksPile",
        },
	})

    exports["ev-polytarget"]:AddBoxZone("prison_deliver_scrap", vector3(1720.72, 2567.06, 45.55), 3.1, 0.2, {
        heading = 45,
        minZ = 44.1,
        maxZ = 47.05,
    })

    exports["ev-interact"]:AddPeekEntryByPolyTarget("prison_deliver_scrap", {{
        id =  "prison_deliver_scrap",
        label = "turn in materials",
        icon = "fas fa-inbox",
        event = "ev-jail:turnInMaterials",
        parameters =  {},
      }}, { distance = { radius = 1.5 }, 
        isEnabled = function()
            return isScrapyard == CurrentJob
        end,
    })

    exports["ev-interact"]:AddPeekEntryByModel({ 631304913 }, {{
        id =  "prison_scrap_yard_craft",
        label = "open",
        icon = "fas fa-pen-ruler",
        event = "ev-jail:scrapYardCraft",
        parameters =  {},
      }}, { distance = { radius = 2.5 }, 
        isEnabled = function()
            return isScrapyard == CurrentJob
        end,
    })

    exports["ev-interact"]:AddPeekEntryByPolyTarget("prison_tiresPile", {{
        event = "ev-jail:scrapYard",
        id = "scrapYard_tires",
        icon = "fas fa-cookie",
        label = "strip tires",
        parameters = 1
      }}, {
        distance = { radius = 2.5 },
        isEnabled = function()
            return isScrapyard == CurrentJob and isInScrapyard
        end,
    })

    exports["ev-interact"]:AddPeekEntryByPolyTarget("prison_scrapPile", {{
        event = "ev-jail:scrapYard",
        id = "scrapYard_scrap",
        icon = "fas fa-trash-arrow-up",
        label = "stor scrap",
        parameters = 2
      }}, {
        distance = { radius = 2.5 },
        isEnabled = function()
            return isScrapyard == CurrentJob and isInScrapyard
        end,
    })

    exports["ev-interact"]:AddPeekEntryByPolyTarget("prison_bricksPile", {{
        event = "ev-jail:scrapYard",
        id = "scrapYard_bricks",
        icon = "fas fa-chess-rook",
        label = "stack bricks",
        parameters = 3
      }}, {
        distance = { radius = 2.5 },
        isEnabled = function()
            return isScrapyard == CurrentJob and isInScrapyard
        end,
    })
end)

AddEventHandler("ev-polyzone:enter", function(zone, info)
    if zone == "prison_scrapPile" then
        isInScrapyard = true
    elseif zone == "prison_tiresPile" then
        isInScrapyard = true
    elseif zone == "prison_bricksPile" then
        isInScrapyard = true
    end
end)

AddEventHandler("ev-polyzone:exit", function(zone, data)
    if zone == "prison_scrapPile" then
        isInScrapyard = false
    elseif zone == "prison_tiresPile" then
        isInScrapyard = false
    elseif zone == "prison_bricksPile" then
        isInScrapyard = false
    end
end)

AddEventHandler("ev-jail:scrapYard", function(data)
    local rnd = math.random()
    if data == 1 then
        text = "Stripping"
        msg = "Scraped Tire"
        if rnd < 0.24 then
            TriggerEvent("animation:PlayAnimation","sit2")
        elseif rnd > 0.24 and rnd < 0.51 then
            TriggerEvent("animation:PlayAnimation","notepad")
        elseif  rnd > 0.50 and rnd < 0.76 then
            TriggerEvent("animation:PlayAnimation","searchground")
        elseif  rnd > 0.75 and rnd < 1 then
            TriggerEvent("animation:PlayAnimation","flex")
        end
    elseif data == 2 then
        text = "Scrapping Materials"
        msg = "Sorted through scraps"
        if rnd < 0.5 then
            TriggerEvent("animation:PlayAnimation","welding")
        else
            TriggerEvent("animation:PlayAnimation","drill")
        end
    elseif data == 3 then
        text = "Watching Bricks"
        msg = "Didn't find anything"
        if rnd < 0.24 then
            TriggerEvent("animation:PlayAnimation","sit2")
        elseif rnd > 0.24 and rnd < 0.51 then
            TriggerEvent("animation:PlayAnimation","notepad")
        elseif  rnd > 0.50 and rnd < 0.76 then
            TriggerEvent("animation:PlayAnimation","searchground")
        elseif  rnd > 0.75 and rnd < 1 then
            TriggerEvent("animation:PlayAnimation","flex")
        end
    end

    local finished = exports['ev-taskbar']:taskBar(17500, text)
    if finished == 100 then
        if data == 2 then
            if rnd < 0.15 then
                TriggerEvent("player:receiveItem", "boxscraps", 1)
                msg = "You filled up a box of scraps, take it to the dropoff point."
            end
        elseif data == 3 then
            if rnd < 0.08 then
                TriggerEvent("player:receiveItem", "1064738331", 1)
                msg = "Wow you found a brick!"
            end
        elseif data == 3 then
            if rnd < 0.08 then
                TriggerEvent("player:receiveItem", TirePile[math.random(1, 3)], 1)
                msg = "It seemes useful for something"
            end
        end
        TriggerEvent("DoLongHudText", msg, 1)
        TriggerEvent("animation:c")
    end
end)

AddEventHandler("ev-jail:scrapYardCraft", function()
    local MenuData = RPC.execute("ev-jail:GetScrapYardMenu")
    exports['ev-ui']:showContextMenu(MenuData)
end)

AddEventHandler("ev-jail:turnInMaterials", function()
    local hasBox = exports['ev-inventory']:hasEnoughOfItem('boxscraps', 1, false)
    if not hasBox then
        TriggerEvent("DoLongHudText", "Where's the box idiot ?", 2)
        return
    end

    local finished = exports['ev-taskbar']:taskBar(17500, "Delivering Box")
    if finished == 100 then
        local item = RPC.execute("ev-jail:GetScrapMaterials")
        TriggerEvent("inventory:removeItem", "boxscraps", 1)
        TriggerEvent("player:receiveItem", item, math.random(2, 4))
        TriggerServerEvent("ev-jail:PayThePoor")
    end
end)

RegisterUICallback("ev-jail:CraftItem", function(data, cb)
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
    cb({ data = res, meta = { ok = true, message = 'done' } })
end)

RegisterNetEvent("ev-jail:PrisonJob")
AddEventHandler("ev-jail:PrisonJob", function(pJob)
    if pJob == isScrapyard then
        local coords = vector3(1720.72, 2567.06, 45.55)
        ScrapBlip = AddBlipForCoord(coords)
        SetBlipSprite(ScrapBlip, 50)
        SetBlipScale(ScrapBlip, 0.6)
        SetBlipColour(ScrapBlip, 39)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString("Process Materials")
        EndTextCommandSetBlipName(ScrapBlip)
    else
        if ScrapBlip ~= nil then
            RemoveBlip(ScrapBlip)
        end
    end
end)