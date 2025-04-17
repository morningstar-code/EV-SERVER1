function pingRequest(pSource, pTargetId, pCoords, pIsAnon)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return end

    local name = pIsAnon and "Anonymous" or user.character.first_name .. " " .. user.character.last_name

    TriggerClientEvent("phone:ping:receive", pTargetId, pCoords, src, name)
end

function pingAccepted(pSource, pLastPingerId)
end

function pingRejected(pSource, pLastPingerId)
end