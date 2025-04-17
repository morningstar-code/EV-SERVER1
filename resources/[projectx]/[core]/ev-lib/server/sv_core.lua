exports('getCharacter', function(pSource)
    local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(pSource))
    if not user then
        return false
    end
    return user:getCurrentCharacter()
end)

exports('getPlayerModule', function(pSource)
    local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(pSource))
    if not user then
        return false
    end
    return user
end)

exports('addMoney', function(pSource, pAmount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(pSource))
    if not user then return end

    user:addMoney(tonumber(pAmount))
end)

exports('removeMoney', function(pSource, pAmount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(pSource))
    if not user then return end

    user:removeMoney(tonumber(pAmount))
end)