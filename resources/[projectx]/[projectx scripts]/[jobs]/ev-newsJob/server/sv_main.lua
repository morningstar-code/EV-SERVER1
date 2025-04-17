local currentLights = {}

RPC.register("ev-newsjob:playClip", function(src, link)

end)

RPC.register("ev-newsjob:placeLight", function(src, pos, heading, prompt)
    local player = exports["ev-base"]:getModule("Player"):GetUser(src)
    -- for i,v in ipairs(currentLights) do
    --     if v.pID == src then
    --         table.remove(currentLights, 1)
    --         TriggerClientEvent('ev-newsjob:removeLight', -1, v.Object)
    --     end
    -- end

    local ped = GetPlayerPed(src)
    local pHeading = GetEntityHeading(ped)
    local Light = CreateObject(`prop_studio_light_02`, pos.x, pos.y, pos.z - 0.5, true, true, true)
    local timeout = 1000
    while not DoesEntityExist(Light) do
        Wait(100)
        timeout = timeout - 1
        if timeout <= 0 then
            return
        end
    end

    local CurrNetId = NetworkGetNetworkIdFromEntity(Light)
    SetEntityHeading(Light, pHeading)

    local tableInsert = {["netId"] = CurrNetId, ["pID"] = tonumber(src), ["rgb"] = prompt, ["pos"] = pos, ["heading"] = heading}
   
    currentLights[#currentLights + 1] = tableInsert
    success = true
    message = {
        netId = CurrNetId,
    }

    TriggerClientEvent('ev-newsjob:setLights', -1, currentLights)
    return success, message
end)

RPC.register("ev-newsjob:getLights", function(src)
    return currentLights
end)

RPC.register("ev-newsjob:removeLight", function(src, pEntity)
    local netId = NetworkGetEntityFromNetworkId(pEntity)
    DeleteEntity(netId)
    removeLight(src)

    TriggerClientEvent("player:receiveItem", src, "newslight", 1, false, {})
end)

function removeLight(src)
    for i,v in ipairs(currentLights) do
        if v.pID == src then
            table.remove(currentLights, i)
            TriggerClientEvent('ev-newsjob:removeLight',-1, v.Object)
        end
    end
    TriggerClientEvent('ev-newsjob:setLights', -1, currentLights)
end
