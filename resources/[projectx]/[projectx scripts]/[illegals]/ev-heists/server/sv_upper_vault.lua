RPC.register("heists:vaultUpperDoorAttempt", function(src, pKeyPad, pLaptopId)
    local police = exports["ev-jobmanager"]:getJobCount(src, "police")

    if police < CONFIG.UpperVaultHeist.minCop then 
        return false, "not enough cops"
    end

    if CONFIG.UpperVaultHeist.canUsePanel then
        CONFIG.UpperVaultHeist.canUsePanel = false

        if CONFIG.UpperVaultHeist.doors[pKeyPad].locked then
            return true, "Hacked"
        else
            return false, "Already Hacked"
        end
    else
        return false, "cannot use this panel"
    end
end)

RPC.register("ev-heists:vaultUpperPanelFail",function(src)
    CONFIG.UpperVaultHeist.canUsePanel = true
end)

RPC.register("heists:vaultUpperDoorOpen", function(src, pKeyPad)
    local gold = math.random(1, 10)

    CONFIG.UpperVaultHeist.doors[pKeyPad].locked = false
    CONFIG.UpperVaultHeist.robberyprogression = true

    if pKeyPad ~= "vault_door" then
        TriggerEvent("ev-doors:change-lock-state", CONFIG.UpperVaultHeist.doors[pKeyPad].doorId, false)
    else
        local pdata = {
            ["vault_upper_cash_1"] = "cash",
            ["vault_upper_cash_2"] = "cash"
        }
        if gold >= 5 then
            pdata = {
                ["vault_upper_cash_1"] = "gold",
                ["vault_upper_cash_2"] = "cash"
            }
        elseif gold >= 8 then
            pdata = {
                ["vault_upper_cash_1"] = "gold",
                ["vault_upper_cash_2"] = "gold"
            }
        else
            pdata = {
                ["vault_upper_cash_1"] = "cash",
                ["vault_upper_cash_2"] = "cash"
            }
        end

        CONFIG.VaultDoor["vault_door"].open = true
        TriggerClientEvent("ev-heists:updateDoorStatus", -1, pKeyPad, CONFIG.VaultDoor[pKeyPad].headingOpen, 200)

        return pdata
    end

    return true
end)

RPC.register("ev-heists:vaultUpperCanGrabTrolley", function(src, pLocation, pType)
    local retunvalue = false

    if pType == "cash" then
        retunvalue = CONFIG.UpperVaultHeist.trolley[pLocation].canGrabCash
        CONFIG.UpperVaultHeist.trolley[pLocation].canGrabCash = false

        return returnvalue
    elseif pType == "gold" then
        retunvalue = CONFIG.UpperVaultHeist.trolley[pLocation].canGrabGold
        CONFIG.UpperVaultHeist.trolley[pLocation].canGrabGold = false

        return returnvalue
    end

    return false
end)

RPC.register("heists:vault:canBeHit", function(src) -- Start Upper Vault 
    if (os.time() - CONFIG.UpperVaultHeist.cooldown) > CONFIG.UpperVaultHeist.lastrobbed then
        if CONFIG.UpperVaultHeist.doors["vault_upper_first_door"].locked then
            -- Send Dispatch event
            CONFIG.UpperVaultHeist.lastrobbed = os.time()
            return true
        else

            return false
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        if CONFIG.UpperVaultHeist.robberyprogression then
            -- body
            Citizen.Wait((1000 * 60) * 60) -- 1 hours
            CONFIG.UpperVaultHeist.robberyprogression = false

            for pName, pData in pairs(CONFIG.UpperVaultHeist.doors) do
                if pKeyPad ~= "vault_door" then
                    TriggerEvent("ev-doors:change-lock-state", CONFIG.UpperVaultHeist.doors[pKeyPad].doorId,false)
                else
                    CONFIG.VaultDoor["vault_door"].open = false
                    TriggerClientEvent("ev-heists:updateDoorStatus", -1, "vault_door", CONFIG.VaultDoor["vault_door"].headingClosed, 200)
                end
            end
        else
            Citizen.Wait(1000)
        end
    end
end)