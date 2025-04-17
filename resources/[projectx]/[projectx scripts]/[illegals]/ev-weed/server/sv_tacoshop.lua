
local Runs = 0

local initialState = {
    IsWeedProcessing = false,
    IsWeedProcessingFinished = false,
}

RPC.register("ev-weed:getInitialState", function(pSource)
    return {
        IsWeedProcessing = false,
        IsWeedProcessingFinished = false
    }
end)

-- TODO: package should have label + quality
-- TODO: give rep points to the main grower when others sell packages
RPC.register("ev-weed:processWeed", function(src)
    local duration = math.random(3, 10)
    if not initialState.IsWeedProcessing then
        initialState.IsWeedProcessing = true
        TriggerClientEvent("ev-weed:weedProcessing", -1, initialState.IsWeedProcessing)
        SetTimeout((duration * 1000 * 10), function()
            TriggerClientEvent("ev-weed:weedReady", src, true) 
        end)
        return true
    end

    return false
end)

RPC.register("ev-weed:buyDelivery", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local cash = user:getCash()
    local itemData = exports["ev-inventory"]:GetItemsByItemMetaKVsv(src, "weedpackage", "grower", cid) --May be incorect

    if cash >= 3000 then
        user:removeMoney(3000)
        local listData = {
            cb = "completetask",
            TaskCode = "first_handoff_taco",
            Activity = parsedInfo.grower,
            Objective = parsedInfo.grower,
            _hideKeys = {'cb', 'TaskCode', 'Activity', 'Objective' },
        }
        TriggerClientEvent("player:receiveItem", src, 'darkmarketdeliveries', 1, false, {}, {}) 
    else
        TriggerClientEvent('DoLongHudText', src, 'Not enough cash', 2)
    end
end)

RPC.register("ev-weed:nameStrain", function(src, pId, pName)
    
end)

RPC.register("ev-weed:getRuns", function(src)
    Runs = Runs + 1
    return Runs 
end)

RPC.register("ev-weed:collectpackage", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    initialState.IsWeedProcessing = false
    TriggerClientEvent("ev-weed:weedReady", src, false)
    TriggerClientEvent("ev-weed:weedProcessing", -1, initialState.IsWeedProcessing)
    local itemData = exports["ev-inventory"]:GetItemsByItemMetaKVsv(src, "smallbud", "grower", cid)
    local parsedInfo = json.decode(itemData[1].information)
    local PackData = {
        label = parsedInfo.strain,
        quality = parsedInfo.quality,
        grower = parsedInfo.grower,
        _hideKeys = {'grower'},
    }
    TriggerClientEvent('inventory:removeItemByMetaKV', src, 'smallbud', 10, "grower", cid)
    TriggerClientEvent("player:receiveItem", src, 'weedpackage', 1, false, {}, PackData)
end)

RPC.register("ev-weed:deliverpackage", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local streetRep = exports["ev-progression"]:GetIllegalRep(src, "streetrep")
    local addition = streetRep / 100
    print("addition", addition)
    -- local hasItem = exports["ev-inventory"]:hasEnoughOfItemSv(src, 'weedpackage', 1, false, true)

    -- if not hasItem then return TriggerClientEvent('DoLongHudText', src, "Where's the package ??", 2) end
    -- local parsedInfo = json.decode(hasItem[1].information)

    TriggerClientEvent('inventory:removeItem', src, 'weedpackage', 1)
    -- TODO: more money with high rep

    local finalAmount = 1425 * addition
    user:addMoney(finalAmount)

    exports["ev-progression"]:addIllegalRep(src, 1, "streetrep")
end)