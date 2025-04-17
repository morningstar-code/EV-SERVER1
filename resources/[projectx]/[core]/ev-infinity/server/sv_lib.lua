PlayerCoords = {}

RegisterServerEvent('ev:infinity:player:ready')
AddEventHandler('ev:infinity:player:ready', function()
    print("[INFINITY] Player Ready")
    local src = source
    local ped = GetPlayerPed(src)
    local playerCoords = GetEntityCoords(ped)
    PlayerCoords[src] = playerCoords    
    TriggerClientEvent('ev:infinity:player:coords', -1, playerCoords)
end)

RegisterServerEvent('ev:infinity:entity:coords')
AddEventHandler('ev:infinity:entity:coords', function(pNetId)
    local entity = NetworkGetEntityFromNetworkId(pNetId)
    local coords = GetEntityCoords(entity)

    TriggerClientEvent('ev:infinity:entity:coords', -1, pNetId, coords)
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(5000)
        local playerCoords = GetEntityCoords(source)

        --TriggerClientEvent('ev:infinity:player:coords', -1, playerCoords) -- WTF
        TriggerEvent("ev-base:updatecoords", playerCoords.x, playerCoords.y, playerCoords.z)

        if #PlayerCoords > 0 then
            for k,v in pairs(PlayerCoords) do
                if v ~= nil then
                    local ped = GetPlayerPed(k)
                    local playerCoords = GetEntityCoords(ped)
                    PlayerCoords[k] = playerCoords
                end
            end

            TriggerClientEvent('ev:infinity:player:coords', -1, PlayerCoords)
        end
    end
end)

AddEventHandler("playerDropped", function()
    local src = source
    if #PlayerCoords > 0 then
        PlayerCoords[src] = nil
    end
end)

function GetPlayerCoords(serverid)
    if PlayerCoords[serverid] then
        return PlayerCoords[serverid]
    else
        return false
    end
end

exports("GetPlayerCoords", GetPlayerCoords)

function GetNearbyPlayers(pCoords, pDistance)
    local pData = PlayerCoords
    local returndata = {}
    for pPlayer,COORD in pairs(pData) do
        if #(vector3(pCoords.x,pCoords.y,pCoords.z) - vector3(COORD.x,COORD.y,COORD.z)) < pDistance then
            table.insert( returndata, pPlayer )
        end
    end
    return returndata
end

exports("GetNearbyPlayers", GetNearbyPlayers)

function SetWorld(pSource, pBucketName, pType, pBool)
    -- convert string to number?
    SetPlayerRoutingBucket(pSource, pBucketName)
end

exports("SetWorld", SetWorld)

function ResetWorld(pSource)
    SetPlayerRoutingBucket(pSource, 0)
end

exports("ResetWorld", ResetWorld)