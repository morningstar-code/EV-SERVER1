exports("hasItem", function(name,amount)
    local hasItem = exports["ev-inventory"]:hasEnoughOfItem(name, amount, false, true);
    return hasItem
end)

exports("removeItem", function(name,amount)
    TriggerEvent("inventory:removeItem", name, amount)
end)
 
exports("alertCops", function(message)
    local coords = GetEntityCoords(PlayerPedId())
    -- Add your own dispatch event here
    TriggerServerEvent("av_laptop:alertCops",message,coords)
end)

exports("getJob", function()
    return PlayerJob
end)