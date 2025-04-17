Config = {
    ItemRemoveTrigger = function(source)
        local src = source 
        TriggerEvent("inventory:removeItem", "c4", 1)
    end,
}