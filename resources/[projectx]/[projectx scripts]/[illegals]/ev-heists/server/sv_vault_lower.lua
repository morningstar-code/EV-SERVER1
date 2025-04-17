CODES = {
    ["kp_1"] = {
        attempts = 0,
        doorId = 325,
        code = 1,
    },
    ["kp_2"] = {
        attempts = 0,
        doorId = 281,
        code = 1,
    },
    ["kp_3"] = {
        attempts = 0,
        doorId = 282,
        code = 1
    },
    ["kp_4"] = {
        attempts = 0,
        doorId = 280,
        code = 1
    },
}

RPC.register("heists:vaultLowerDoorAttempt", function(src, pKeyPad, pLaptopId)
    local police = exports["ev-jobmanager"]:getJobCount(src, "police")

    if police < CONFIG.LowerVaultHeist.minCop then 
        return false, "not enough cops"
    end

    if CONFIG.LowerVaultHeist.canUsePanel then
        CONFIG.LowerVaultHeist.canUsePanel = false

        if CONFIG.LowerVaultHeist.canRob then 
            return true, "Unlocked"
        else
            return false, "Locked" 
        end
    else
        return false, "cannot use this panel"
    end
end)

RPC.register("ev-heists:vaultLowerPanelFail", function(src)
    CONFIG.LowerVaultHeist.canUsePanel = true
end)

RPC.register("heists:vaultLowerDoorOpen", function(src)
    TriggerEvent("ev-doors:change-lock-state", 278, false)
    TriggerEvent("ev-doors:change-lock-state", 279, false)
end)

RPC.register("ev-heists:getVaultLowerState", function(src)
    return CONFIG.LowerVaultHeist
end)

RPC.register("ev-heists:lowerVaultEntranceEnter",function(src)
    TriggerClientEvent("ev-heists:checkexplosion", src)
end)

RPC.register("ev-heists:vaultLowerCanGrabTrolley", function(src, pLocation, pType)
    local retunvalue = false

    if pType == "cash" then
        retunvalue = CONFIG.LowerVaultHeist.trolley[pLocation].canGrabCash
        CONFIG.LowerVaultHeist.trolley[pLocation].canGrabCash = false
        return returnvalue
    elseif pType == "gold" then
        retunvalue = CONFIG.LowerVaultHeist.trolley[pLocation].canGrabGold
        CONFIG.LowerVaultHeist.trolley[pLocation].canGrabGold = false
        return returnvalue
    end
    
    return false
end)

RPC.register("ev-heists:lowerVaultPanelPublicPush", function(src, pPanelId, pState)

end)

RPC.register("heists:lowerVaultPanelPush", function(src, pKeyPad, pCode)
    if CODES[pKeyPad].code == tonumber(pCode) then
        TriggerEvent("ev-doors:change-lock-state", CODES[pKeyPad].doorId, false)
    else
        TriggerClientEvent("DoLongHudText", src, "Authorization Failure ("  .. CODES[pKeyPad].attempts + 1 .. "/4)", 2)
        return
    end

    return false
end)

RPC.register("ev-heist:explodeVault", function(src)
    CONFIG.LowerVaultHeist.doorState["np_vault_broken"] = true
    CONFIG.LowerVaultHeist.doorState["np_vault_clean"] = false

    TriggerClientEvent("ev-heists:swapLowerVaultIPL", src, CONFIG.LowerVaultHeist.doorState, CONFIG.LowerVaultHeist.upperVaultEntityState)
end)

RPC.register("ev-heists:registerLVUsbUse", function(src)
    local stuff = {"kp_1", "kp_2", "kp_3", "kp_4"}

    for k,v in pairs(stuff) do
        CODES[v].code = math.random(0, 9) .. math.random(0, 9) .. math.random(0, 9) .. math.random(0, 9)
    end

    return CODES
end)