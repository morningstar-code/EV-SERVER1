local config = nil
local isCleaner = "cleaner"
local ClaimedCell = false
local TempData = {}
local rndItem = {
    "shitlockpick",
    "assphone",
}

Citizen.CreateThread(function()
    exports["ev-polytarget"]:AddBoxZone("clean_products", vector3(1747.42, 2497.01, 45.82), 0.2, 1.2, {
        heading = 30,
        minZ = 44.82,
        maxZ = 70.07,
    })

    exports["ev-interact"]:AddPeekEntryByPolyTarget("clean_products", {{
        id =  "clean_products",
        label = "pickup supplies",
        icon = "fas fa-broom",
        event = "ev-jail:GetCleanProducts",
        parameters =  {},
      }}, { 
        distance = { radius = 1.5 }, 
        isEnabled = function()
            return isCleaner == CurrentJob
        end,
    })

    exports["ev-interact"]:AddPeekEntryByModel({ `prison_cells_details_right`, `prison_cells_details_slim`, 631304913 }, 
    {
        {
            event = "ev-jail:cleanCell",
            id = "clean_cell",
            icon = "fas fa-hand-sparkles",
            label = "clean cell",
            parameters = {},
        },
    }, {
        distance = { radius = 3.5 },
        isEnabled = function(pEntity)
            return isCleaner == CurrentJob
        end,
    })


    exports["ev-interact"]:AddPeekEntryByModel({ `prison_cells_details_right`, `prison_cells_details_slim`, 631304913 }, 
    {
        {
            event = "ev-jail:OpenStash",
            id = "open_stash",
            icon = "fas fa-box",
            label = "stash",
            parameters = {},
        },
    }, {
        distance = { radius = 2.5 },
        isEnabled = function(pEntity)
            if ClaimedCell then
                return true
            end
            return false
        end,
    })
    exports["ev-interact"]:AddPeekEntryByModel({ `prison_cells_details_right`, `prison_cells_details_slim`, 631304913 }, 
    {
        {
            event = "ev-jail:claimCell",
            id = "claim_cell",
            icon = "fas fa-flag",
            label = "claim",
            parameters = {},
        },
    }, {
        distance = { radius = 2.5 },
        isEnabled = function(pEntity)
            if not ClaimedCell then
                return true
            end 
            return false
        end,
    })
end)

AddEventHandler("ev-jail:cleanCell", function(pArgs)
    local hasBox = exports['ev-inventory']:hasEnoughOfItem('cleaningproduct1', 1, false)
    if not hasBox then
        TriggerEvent("DoLongHudText", "You need some cleaning prodcuts", 2)
        return
    end

    TriggerEvent("animation:PlayAnimation","cleanfront")
    local finished = exports['ev-taskbar']:taskBar(17500, "Cleaing")
    if finished == 100 then
        config.polytargets[pArgs].options.data.CanDo = false

        Citizen.CreateThread(function()
            Wait(1000 * 60 * 8) -- 8 min
            config.polytargets[pArgs].options.data.CanDo = true
        end)

        -- local msg = RPC.execute("ev-jail:reduceTime", JailHardWork())
        -- TriggerEvent("DoLongHudText", msg)
        if math.random() < 0.05 then
            TriggerEvent("player:receiveItem", rndItem[math.random(1,2)], 1)
        end
        ClearPedTasks(PlayerPedId())
    end
end)

AddEventHandler("ev-jail:GetCleanProducts", function()
    TriggerEvent("player:receiveItem", "cleaningproduct1", 1)
end)

AddEventHandler("ev-jail:claimCell", function()
    ClaimedCell = not ClaimedCell
end)

AddEventHandler("ev-jail:OpenStash", function()
    local cid = exports["isPed"]:isPed("cid")
    local name = exports["isPed"]:isPed("fullname")
    local plyPed = PlayerPedId()
    local coord = GetEntityCoords(plyPed)
    TriggerEvent("inventory-jail", coord, cid, name)
end)
