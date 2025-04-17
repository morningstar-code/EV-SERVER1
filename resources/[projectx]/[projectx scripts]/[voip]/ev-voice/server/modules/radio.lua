local activeChannels = {} --key is channel id, value is table with sub count and list of users in the channel
local channelSubscribers = {} --key is player server id, value is channel id
local encryptedChannels = {
    ["118.0"] = true,
    ["120.6"] = true,
    ["101.1"] = true,
    ["0.0"] = true,
}

function removePlayerFromRadioR(sId, channelId)
    if not activeChannels[channelId] then return end

    for index, subscriber in ipairs(activeChannels[channelId]["subscribers"]) do
        if sId == subscriber then
            table.remove(activeChannels[channelId]["subscribers"], index)
        end
    end

    if #activeChannels[channelId]["subscribers"] == 0 then
        activeChannels[channelId] = nil
    else
        for _, subscriber in ipairs(activeChannels[channelId]["subscribers"]) do
            TriggerClientEvent("ev:voice:radio:removed", subscriber, channelId, sId)
        end
    end

    channelSubscribers[sId] = nil
    TriggerClientEvent('ev:voice:radio:disconnect', sId, channelId)
end

function addPlayerToRadioR(sId, channelId, removeOld)
    if removeOld then
        if channelSubscribers then  
            removePlayerFromRadioR(sId, channelSubscribers[sId])
        end
    end

    if activeChannels[channelId] == nil then
        activeChannels[channelId] = {}
        activeChannels[channelId]["subscribers"] = {}
    end

    for _, subscriber in ipairs(activeChannels[channelId]["subscribers"]) do
        TriggerClientEvent("ev:voice:radio:added", subscriber, channelId, sId)
    end

    table.insert(activeChannels[channelId]["subscribers"], sId)

    channelSubscribers[sId] = channelId

    TriggerClientEvent('ev:voice:radio:connect', sId, channelId, activeChannels[channelId]["subscribers"])
end

RegisterNetEvent("ev:voice:radio:addPlayerToRadio")
AddEventHandler("ev:voice:radio:addPlayerToRadio", function(channelId, removeOld)
    local sId = source
    addPlayerToRadio(sId, channelId, removeOld)
end)

RegisterNetEvent("ev:voice:radio:removePlayerFromRadio")
AddEventHandler("ev:voice:radio:removePlayerFromRadio", function(channelId)
    local sId = source
    removePlayerFromRadioR(sId, channelId)
end)

RPC.register("ev-voice:addPlayerToRadio", function(src, pFrequency)
    if tonumber(pFrequency) == 0 then return false end
    
    if tonumber(pFrequency) >= 1 and tonumber(pFrequency) <= 20 then
        local pass = canBypassFrequency(src)
        if not pass then return false end
    end

    for k,v in pairs(encryptedChannels) do 
        if encryptedChannels[tostring(pFrequency)] == true then
            return false
        else
            return true, exports["ev-voice"]:addPlayerToRadio(pFrequency, src)
        end
    end
end)

local jobsList = {
    'police',
    'ems',
    'doctor',
    'therapist',
    'doc',
} 

function canBypassFrequency(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local job = user:getVar("job")
    local state = false
    
    for i = 1, #jobsList do
        if jobsList[i] == job then
            state = true
            break
        end
    end

    return state
end

AddEventHandler('playerDropped', function(source, reason)
    if channelSubscribers[source] then
        removePlayerFromRadioR(source, channelSubscribers[source])
    end
end)