local Promises, PlayerCoords, EntityCoords = {}, {}, {}

TriggerServerEvent("ev:infinity:player:ready")

RegisterNetEvent('ev:infinity:player:coords')
AddEventHandler('ev:infinity:player:coords', function (pCoords)
    PlayerCoords = pCoords

    --Fucking lack of support for vector3
    TriggerEvent('ev:infinity:player:coords:array', GetCoordsArray(PlayerCoords))
end)

RegisterNetEvent('ev:infinity:entity:coords')
AddEventHandler('ev:infinity:entity:coords', function (pNetId, pCoords)
    if Promises[pNetId] then
        Promises[pNetId]:resolve(pCoords)
    end
end)

function FetchEntityCoords(pNetId)
    local result = promise:new()
    local timeout = PromiseTimeout(1000)

    Promises[pNetId] = result

    TriggerServerEvent('ev:infinity:entity:coords', pNetId)

    local coords = Citizen.Await(promise.first({ timeout, result }))

    EntityCoords[pNetId] = coords

    Citizen.SetTimeout(1000, function()
        EntityCoords[pNetId] = nil
        TriggerEvent('ev:infinity:entity:coords:array', pNetId, nil)
    end)

    Promises[pNetId] = nil

    return coords
end

exports('FetchEntityCoords', FetchEntityCoords)

exports('GetPlayerCoords', function (pServerId, pArray)
    local coords = PlayerCoords[tonumber(pServerId)]

    if pArray and coords then
        coords = VectorToArray(coords)
    end

    return coords
end)

exports('DoesPlayerExist', function (pServerId)
    local playerId = GetPlayerFromServerId(tonumber(pServerId))

    if playerId ~= -1 then
        return true
    end
end)

exports('IsPlayerActive', function (pServerId)
    return PlayerCoords[tonumber(pServerId)] ~= nil
end)

exports('GetPlayerList', function()
    return PlayerCoords
end)

exports('GetPlayerListJS', function()
    local returnTable = {}

    for k,v in pairs(PlayerCoords) do
        returnTable[#returnTable+1] = {serverId = k}
    end

    return returnTable
end)

exports('GetNetworkedCoords', function (pType, pNetId, pArray)
    local coords

    if pType == 'player' then
        local playerIndex = GetPlayerFromServerId(pNetId)
        coords = playerIndex == -1 and PlayerCoords[pNetId] or GetEntityCoords(GetPlayerPed(playerIndex))
    else
        local entity = NetworkGetEntityFromNetworkId(pNetId)

        if DoesEntityExist(entity) then
            coords = GetEntityCoords(entity)
        else
            coords = EntityCoords[pNetId] or FetchEntityCoords(pNetId)
        end
    end

    if pArray and coords then
        coords = VectorToArray(coords)
    end

    return coords
end)

exports('GetLocalEntity', function (pType, pNetId)
    local entity

    if pType == 'player' then
        local playerIndex = GetPlayerFromServerId(pNetId)
        entity = playerIndex ~= -1 and GetPlayerPed(playerIndex) or 0
    else
        entity = NetworkGetEntityFromNetworkId(pNetId)
    end

    return entity
end)