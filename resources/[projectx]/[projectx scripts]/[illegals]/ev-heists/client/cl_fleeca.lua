local function usePanel(laptopId)
    Citizen.CreateThread(function()
        local plyCoords = GetEntityCoords(PlayerPedId())
        local canUsePanel, loc = RPC.execute("heists:fleecaUsePanel", plyCoords, laptopId)
        if not canUsePanel then
            TriggerEvent("DoLongHudText", loc, 2)
            return
        end
        
        exports["ev-dispatch"]:dispatch("10-90B", "Fleeca Bank Robbery")

        local success = Citizen.Await(UseBankPanel(loc.panelCoords, loc.panelHeading, "fleeca"))

        if not success then
            RPC.execute("ev-heists:fleecaPanelFail")
            return
        end

        TriggerServerEvent("dispatch:svNotify", {
            dispatchCode = "10-90B",
            origin = loc.panelCoords,
        })

        local shouldSpawnGold = RPC.execute("heists:fleecaStart", loc)

        SpawnTrolley(loc.cashCoords, "cash", loc.cashHeading)
        if shouldSpawnGold then
            SpawnTrolley(loc.goldCoords, "gold", loc.goldHeading)
        end
    end)
end

function FleecaUsePanel(...)
    usePanel(...)
end

AddEventHandler("heists:fleecaTrolleyGrab", function(loc, type)
    local canGrab = RPC.execute("ev-heists:fleecaCanGrabTrolley", loc, type)
    if canGrab then
        Loot(type)
        TriggerEvent("DoLongHudText", "You discarded the counterfeit items", 1)
        RPC.execute("ev-heists:payoutTrolleyGrab", "fleeca", type)
    else
        TriggerEvent("DoLongHudText", "You can't do that yet...", 2)
    end
end)