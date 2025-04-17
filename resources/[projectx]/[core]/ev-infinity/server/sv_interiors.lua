local interiors = {}
local currentWorld = {}
local buildEvents = {}
local tempWorlds = {}

RegisterNetEvent("ev-infinity:interiors:exitInterior")
AddEventHandler("ev-infinity:interiors:exitInterior", function(pID)
    local src = source
    local state = Player(src).state
    local newWorld = GetPlayerRoutingBucket(src)

    if tonumber(newWorld) ~= 0 then
        SetPlayerRoutingBucket(src, pID)
        state.routingBucketName = "default"
    end
end)

RegisterNetEvent("ev-infinity:interiors:enteredInterior")
AddEventHandler("ev-infinity:interiors:enteredInterior", function(pID)
    local src = source
    local state = Player(src).state
    local newWorld = GetPlayerRoutingBucket(src)


    if tonumber(newWorld) ~= 0 then
        SetPlayerRoutingBucket(src, 0)
        state.routingBucketName = "default"
    end
end)

RegisterServerEvent("build:event:inside")
AddEventHandler("build:event:inside", function(pState, planData)
    local src = source
    local state = Player(src).state
    if pState then
        SetPlayerRoutingBucket(src, planData.name .. "_" .. planData.posGen)
        local newWorld = GetPlayerRoutingBucket(src)
        SetRoutingBucketPopulationEnabled(newWorld, true)
        SetRoutingBucketEntityLockdownMode(newWorld, "inactive")
        buildEvents[src] = {
            name = planData.name .. "_" .. planData.posGen,
            interior = planData.name,
            world = newWorld
        }
        state.routingBucketName = buildEvents[src].name
    else
        buildEvents[src] = nil
        SetPlayerRoutingBucket(src, 0)
        local newWorld = GetPlayerRoutingBucket(src)
        SetRoutingBucketPopulationEnabled(newWorld, true)
        SetRoutingBucketEntityLockdownMode(newWorld, "inactive")
        state.routingBucketName = "default"
    end
end)

function setWorld(pSource, bucket, pType, pState)
    local state = Player(pSource).state
    local newWorld = 0 
    local bucketString = bucket and bucket or "srp_"

    if bucket == "default" then
        SetPlayerRoutingBucket(pSource, 0)
        newWorld = GetPlayerRoutingBucket(pSource)
        state.routingBucketName = bucketString
    else
        local name, id = CreateTempWorld(bucketString)
        SetPlayerRoutingBucket(pSource, id)
        newWorld = GetPlayerRoutingBucket(pSource)
        state.routingBucketName = name
    end

    if pType then
        SetRoutingBucketEntityLockdownMode(newWorld, pType)
    end

    if pState then
        SetRoutingBucketPopulationEnabled(newWorld, pState)
    else
        SetRoutingBucketPopulationEnabled(newWorld, true)
    end
end

function getWorld(pSource)
    local state = Player(pSource).state
    return state.routingBucketName or "default"
end

function resetWorld(pSource)
    local state = Player(pSource).state

    -- local newWorld = GetPlayerRoutingBucket(pSource)

    -- SetRoutingBucketPopulationEnabled(newWorld, true)
    -- SetRoutingBucketEntityLockdownMode(newWorld, "inactive")

    SetPlayerRoutingBucket(pSource, 0)

    state.routingBucketName = "default"
end

function setEntityWorld(netId, bucketString)
    local entity = NetworkGetEntityFromNetworkId(netId)

    if DoesEntityExist(entity) and tempWorlds[bucketString] then
        local name, id = CreateTempWorld(bucketString)
        SetEntityRoutingBucket(entity, id)
    end
end

function spawnBackAtGame(pSource, game)
    local state = Player(pSource).state
end

function CreateTempWorld(bucketString)
    if bucketString == "default" then
        return "default", 0
    end

    if tempWorlds[bucketString] then
        if bucketString == tempWorlds[bucketString].bucket then
            return tempWorlds[bucketString].bucket, tempWorlds[bucketString].id
        end
    else
        tempWorlds[bucketString] = {
            id = math.random(11111, 55555), -- TODO: Make ID higher.
            bucket = bucketString,
        }
        for k, v in pairs(tempWorlds) do
            if v.bucket == bucketString then
                return v.bucket, v.id
            end
        end
    end
end

RPC.register("ev-infinity:setWorld", setWorld)
RPC.register("ev-infinity:setEntityWorld", setEntityWorld)
RPC.register("ev-infinity:getWorld", getWorld)
RPC.register("ev-infinity:resetWorld", resetWorld)

exports("SetWorld", setWorld)
exports("SetEntityWorld", setEntityWorld)
exports("GetWorld", getWorld)
exports("ResetWorld", resetWorld)
exports("SpawnBackAtGame", spawnBackAtGame)