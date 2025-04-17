local bankfleecaname = ""
local cachelaptopfleeca, laptopfleecause = {}, ""
local temps = 0

RPC.register("heists:fleecaUsePanel", function(src, pCoord, pLaptopid)
    local police = exports["ev-jobmanager"]:getJobCount(src, "police")
    local idxselect

    for _, pData in pairs(CONFIG.Fleeca) do
        if #(pData.panelCoords - pCoord) < 2 then
            idxselect = _
        end
    end

    if police < CONFIG.Fleeca[idxselect].minCop then 
        return false, "not enough cops."
    end

    if CONFIG.Fleeca[idxselect].canUsePanel then
        CONFIG.Fleeca[idxselect].canUsePanel = false
        if (os.time() - 1200) > CONFIG.Fleeca[idxselect].lastrobbed then
            bankfleecaname = CONFIG.Fleeca[idxselect].vaultname
            laptopfleecause = pLaptopid
            cachelaptopfleeca[pLaptopid] = CONFIG.Fleeca[idxselect].temps + 1
            TriggerClientEvent("inventory:DegenItemType", src, 10, pLaptopid)

            return true, CONFIG.Fleeca[idxselect]
        else
            return false, "Cannot robbed this time maybe next time.";
        end
    else
        return false, "Cannot using panel."
    end
end)

RPC.register("ev-heists:fleecaCanGrabTrolley", function(src, pLocation, pType)
    local retundata = true

    if pType == "cash" then
        returndata = CONFIG.Fleeca[pLocation].canGrabCash
        CONFIG.Fleeca[pLocation].canGrabCash = not CONFIG.Fleeca[pLocation].canGrabCash
    end

    if pType == "gold" then
        returndata = CONFIG.Fleeca[pLocation].canGrabGold
        CONFIG.Fleeca[pLocation].canGrabGold = not CONFIG.Fleeca[pLocation].canGrabGold
    end

    return retundata
end)

RPC.register("heists:fleecaStart", function(src, loc)
    local rnd = math.random()
    CONFIG.Fleeca[loc.vaultname].isRobbed = true
    bankfleecaname = loc.vaultname
    CONFIG.Fleeca[loc.vaultname].lastrobbed = os.time()

    SetTimeout(1000 * 60 * 5, function() -- 5m
        CONFIG.VaultDoor[loc.vaultname].open = not CONFIG.VaultDoor[loc.vaultname].open
        TriggerClientEvent("ev-heists:updateDoorStatus", -1, loc.vaultname, CONFIG.VaultDoor[loc.vaultname].headingOpen, 200)
    end)
    
    if loc.canGrabGold then
        if rnd < 0.10 and rnd > 0.05 then
            return true
        end
    end 

    return false
end)

RPC.register("ev-heists:fleecaPanelFail", function(src)
    if cachelaptopfleeca[laptopfleecause] > 3 then
        TriggerClientEvent("inventory:DegenItemType", src, 10, laptopfleecause)
    end

    CONFIG.Fleeca[bankfleecaname].canUsePanel = true

    return CONFIG.Fleeca[bankfleecaname].canUsePanel
end)

RPC.register("heists:fleecaDoorOpen", function(src, loc)
    TriggerEvent("ev-doors:change-lock-state", CONFIG.Fleeca[loc].doorId , false)
end)

Citizen.CreateThread(function()
    while true do
        for _, pData in pairs(CONFIG.Fleeca) do
            if pData.isRobbed then
                Citizen.Wait((1000 * 60) * 60)
                fleecarobbed = false
                pData.temps = 0
                pData.canGrabCash = true
                pData.canGrabGold = true
                CONFIG.VaultDoor[pData.vaultname].open = false
                TriggerClientEvent("ev-heists:updateDoorStatus", -1, pData.vaultname, CONFIG.VaultDoor[pData.vaultname].headingClosed, 1)
            else
                Citizen.Wait(1000)
            end
        end
    end
end)