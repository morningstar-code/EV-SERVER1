--TODO: Make this actually use the metadata on the item instead of making it forced.

RegisterServerEvent('ev-laptop:openThisShit', function() 
    local src = source
    local identifier = getIdentifier(src) 
    --local metadata, slot = exports['av_laptop']:getMetadata(item,item)
    local isAdmin = false --getPermission(src, Config.AdminLevel)
    local metadata = {}
    metadata['serial'] = identifier
    metadata['battery'] = 100
    TriggerClientEvent("av_laptop:openUI", src, metadata, identifier, isAdmin)
end)

lib.callback.register('av_laptop:getItem', function(source,item, amount)
    local src = source
    local qty = 1
    if tonumber(amount) then
        qty = tonumber(amount)
    end
    if type(item) == "table" then
        local count = 0
        for k, v in pairs(item) do
            if hasItem(src,v,qty) then
                count = count + 1
            end
        end
        if count == #item then
            return true
        else
            return false
        end
    end
    return hasItem(src,item,qty)
end)

lib.callback.register('av_laptop:removeItem', function(source,item,amount)
    local src = source
    return removeItem(src,item,amount)
end)