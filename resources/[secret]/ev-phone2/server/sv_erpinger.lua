
local activePings = {}

RegisterNetEvent("phone:ping:request")
AddEventHandler("phone:ping:request", function(targetId, coords, is_anon)
    local _source = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(_source)
    if not user then return end
    local name = is_anon and "Anonymous" or user.character.first_name .. " " .. user.character.last_name

    if user then
        local pingId = math.random(100000, 999999)
        TriggerClientEvent("phone:ping:receive", targetId, coords, _source, name, pingId)
    end
end)

RegisterNetEvent("phone:ping:accepted")
AddEventHandler("phone:ping:accepted", function(senderId)
    local _source = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(_source)
    if not user then return end
    local name = is_anon and "Anonymous" or user.character.first_name .. " " .. user.character.last_name
    local pingId = getPingIdFromSource(senderId)


    TriggerClientEvent("phone:ping:accept", _source, name)
    TriggerClientEvent("phone:ping:accept", senderId, name)
end)

RegisterNetEvent("phone:ping:rejected")
AddEventHandler("phone:ping:rejected", function(senderId)
    local _source = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(_source)
    if not user then return end
    local name = is_anon and "Anonymous" or user.character.first_name .. " " .. user.character.last_name
    local pingId = getPingIdFromSource(senderId)

    if pingId then
        activePings[pingId] = nil
    end

end)

function getPingIdFromSource(senderId)
    for pingId, pingData in pairs(activePings) do
        if pingData.senderId == senderId then
            return pingId
        end
    end
    return nil
end
