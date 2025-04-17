
RegisterServerEvent("ev-heists:bobcat:inStockade")
AddEventHandler("ev-heists:bobcat:inStockade", function(netId, atDeliveryLocation)
    local src = source
    -- body
end)

RegisterServerEvent("ev-heists:bobcat:acceptBobcatOffer")
AddEventHandler("ev-heists:bobcat:acceptBobcatOffer", function()
    local src = source
    
end)

RPC.register("heists:bobcatGetIplStates",function(src)
    return CONFIG.Bobcat.iplState
end)

RPC.register("ev-heists:bobcatMoneyTruckBegin", function(src, pNetId)

end)

RPC.register("ev-heists:bobcat:updateMyLocationForTruck", function(src, pCoord)

end)

RPC.register("ev-heists:bobcatMoneyTruckLootPlease", function(src, pNetId)

end)

RPC.register("ev-heists:bobcatMoneyTruckBegin", function(src, pNetId)

end)

RPC.register("heists:bobcatUseSecurityCard", function(src)
    local police = exports["ev-jobmanager"]:getJobCount(src, "police")

    if police < CONFIG.Bobcat.minCop then 
        TriggerClientEvent("DoLongHudText", src, "not enough cops", 2) 
        return false
    end

    if not CONFIG.Bobcat["startRob"] then
        if (os.time() - CONFIG.Bobcat["cooldown"]) > CONFIG.Bobcat.lastrobbedbobcat then
            lastrobbedbobcat = os.time()
            CONFIG.Bobcat["startRob"] = true
            for k,v in pairs(CONFIG.Bobcat["securityDoor"]) do
                TriggerEvent("ev-doors:change-lock-state", v,false)
            end
            for k,v in pairs(CONFIG.Bobcat["securityNpc"]) do
                local model = `s_m_y_swat_01`
                local pPed = CreatePed(0, model, v.x, v.y, v.z, v.h, 1, 0)
                local mnetid = NetworkGetNetworkIdFromEntity(pPed)
                TriggerClientEvent("ev-heists:controlBobcatNpc", -1, mnetid)
            end
            local modelhostage = `cs_casey`
            local hostagePed = CreatePed(0, modelhostage, CONFIG.Bobcat["hostageNpc"].x, CONFIG.Bobcat["hostageNpc"].y, CONFIG.Bobcat["hostageNpc"].z, CONFIG.Bobcat["hostageNpc"].h, 1, 0)
            local hostagenetid = NetworkGetNetworkIdFromEntity(hostagePed)
            for k,v in pairs(CONFIG.Bobcat["createBox"]) do
                CreateObject(v.objHash, v.objCoord,1,1,0)
            end
            TriggerClientEvent("heists:bobcatControlC4Npc", -1, hostagenetid)
            return true
        else
            CONFIG.Bobcat["startRob"] = false
            CONFIG.Bobcat["iplState"]["np_prolog_clean"] = true
            CONFIG.Bobcat["iplState"]["np_prolog_broken"] = false
            TriggerClientEvent("heists:updatebobcatIplStates", -1, CONFIG.Bobcat["iplState"])
            for k,v in pairs(Config.vaultUpperDoor["bobcat_security_entry"]) do
                TriggerEvent("ev-doors:change-lock-state", v,true)
            end
            for k,v in pairs(Config.vaultUpperDoor["bobcat_security_inner_1"]) do
                TriggerEvent("ev-doors:change-lock-state", v,true)
            end
            for k,v in pairs(CONFIG.Bobcat["securityDoor"]) do
                TriggerEvent("ev-doors:change-lock-state", v,true)
            end
            TriggerClientEvent("DoHudLong", src, "You can't rob please wait a while more")
            return false
        end
    end
end)

RPC.register("heists:bobcatLootCache", function(src, pType)
    local luck = math.random()
    if pType == "smgs" then
        if not CONFIG.Bobcat.createBox[1].isLooted then
            exports["ev-lootsystem"]:DrawFromLootTable(src, "event_bobcat_smgs", 2)
            CONFIG.Bobcat.createBox[1].isLooted = true
        else
            TriggerClientEvent("DoLongHudText", src, "Empty, shucks.", 2)
        end
    elseif pType == "explosives" then
        if not CONFIG.Bobcat.createBox[2].isLooted then
            CONFIG.Bobcat.createBox[2].isLooted = true
            if luck > 0.05 and luck < 0.15 then
                exports["ev-lootsystem"]:DrawFromLootTable(src, "event_bobcat_explosive", 2)
            else
                TriggerClientEvent("DoLongHudText", src, "Looks empty.", 2)
            end
        else
            TriggerClientEvent("DoLongHudText", src, "Empty, shucks.", 2)
        end
    else
        if not CONFIG.Bobcat.createBox[3].isLooted then
            exports["ev-lootsystem"]:DrawFromLootTable(src, "event_bobcat_rifle", 2)
            CONFIG.Bobcat.createBox[3].isLooted = true
        else
            TriggerClientEvent("DoLongHudText", src, "Empty, shucks.", 2)
        end
    end
end)

RPC.register("heists:activateC4Npc", function(src, pNetId)
    TriggerClientEvent("heists:bobcatControlC4NpcActivate", -1, src, pNetId)
    Citizen.Wait(20000)

    CONFIG.Bobcat["iplState"]["np_prolog_clean"] = false
    CONFIG.Bobcat["iplState"]["np_prolog_broken"] = true

    TriggerClientEvent("heists:updatebobcatIplStates", -1, CONFIG.Bobcat["iplState"])

    for k,v in pairs(CONFIG.Bobcat["createBox"]) do
        CreateObject(v.objHash,v.objCoord,1,1,0)
    end
end)

RPC.register("heists:bobcatDoorOpen", function(src, pLocationName)
    for k,v in pairs(Config.vaultUpperDoor[pLocationName]) do
        TriggerEvent("ev-doors:change-lock-state", v,false)
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait((1000 * 60 ) * 5)
        if CONFIG.Bobcat.startRob then
            if (os.time() - CONFIG.Bobcat["cooldown"]) > CONFIG.Bobcat.lastrobbedbobcat then
                CONFIG.Bobcat.startRob = false
                CONFIG.Bobcat.iplState["np_prolog_clean"] = true
                CONFIG.Bobcat.iplState["np_prolog_broken"] = false
                CONFIG.Bobcat.createBox[1].isLooted = false
                CONFIG.Bobcat.createBox[2].isLooted = false
                CONFIG.Bobcat.createBox[3].isLooted = false

                TriggerClientEvent("heists:updatebobcatIplStates", -1, CONFIG.Bobcat.iplState)
                TriggerEvent("ev-doors:change-lock-state", 273, true)
                TriggerEvent("ev-doors:change-lock-state", 274, true)
                TriggerEvent("ev-doors:change-lock-state", 275, true)

                for k,v in pairs(CONFIG.Bobcat["securityDoor"]) do
                    TriggerEvent("ev-doors:change-lock-state", v, true)
                end
            end
        end
    end
end)