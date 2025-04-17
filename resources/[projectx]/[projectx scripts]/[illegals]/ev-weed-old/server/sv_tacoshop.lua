local initialState = {
    IsWeedProcessing = false,
    IsWeedProcessingFinished = false,
}

WeedConfig = {
    -- How long does it take to go from wet bud -> dried bud (minutes) 
    DryTime = 12 * 60,
    -- Which inventories should be valid to dry bud in. (Prefixes)
    ValidDryingInvs = {"warehouse", "motel", "housing"},
    -- How many packed buds (20g) from 1 dried bud (100g)
    BudPerDried = 5,
    -- How much does the Large Delivery list costs
    ListCost = 3000,
    -- server-side cooldown for large dropoffs (only 1 can be active at a time)
    TimeBetweenLrgDeliveries = 45 * 60 * 1000,
    -- How many dried buds per 1 brick
    WeedsPerBrick = 10,
    -- How many bricks for 1 weed run
    BricksPerLargeRun = 10,
    -- How much cash is a brick worth
    BrickValue = 1425,
    -- How much should quality affect sale price (ie. 0% will multiply by 1.0, 50% quality will multiply by 1.1, 100% is 1.2)
    QualityFactor = 1.5,
    -- Chance of alerting police once someone arrives at a delivery spot
    AlertChance = 0.3,
    -- Time to prepare a brick of weed in seconds
    BrickPreparingTime = 150,
    --Selling 500k worth of weed will get you 1.5x payment
    MaxProgressionBonus = 1.5,
}

local Runs = 0

RPC.register("ev-weed:getInitialState", function(src)
    return initialState
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
