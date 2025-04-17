local exp = 0
local laptopItems = {
    ["heistlaptop3"] = {
        item = "heistusb4",
        available = math.random(1, 6),
    },
    ["heistlaptop2"] = {
        item = "heistusb1",
        available = math.random(1, 5),
    },
    ["heistlaptop4"] = {
        item = "heistusb2",
        available = math.random(1, 4),
    },
    ["heistlaptop1"] = {
        item = "heistusb3",
        available = math.random(1, 3),
    },
    ["lvaccesscodes"] = {
        item = "heistusb3",
        available = math.random(1, 3),
    },
    ["vcomputerusb"] = {
        item = "heistusb3",
        available = math.random(1, 3),
    },
    ["heistpadyacht"] = {
        item = "heistusb3",
        available = math.random(1, 3),
    },
}
local orders = {}

RPC.register("heists:addPickupItem", function(src, item, crypto_id, price) -- add wallet_id later
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id

    local index = {}
    for k,v in pairs(laptopItems) do 
        if k == item then
            if laptopItems[k].available <= 0 then
                return 0, false
            else
                local success = exports["ev-phone"]:takeCrypto(src, cid, price, crypto_id)
                if not success then
                    return false, "not enough crypto."
                end

                laptopItems[k].available = laptopItems[k].available - 1
                table.insert(orders, {
                    pSrc = src,
                    item = item,
                })
                return laptopItems[k].available, true
            end
        end
    end

    return 0, false
end)

RPC.register("heists:addPickupDarkMarketItem", function(src, item) -- add wallet_id later
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id

    local index = {}

    table.insert(orders, {
        pSrc = src,
        item = item,
    })

    return 1, true
end)

RPC.register("heists:pickupPurchasedItems", function(src)
    local index = {}

    for k,v in pairs(orders) do
        index[v.pSrc] = k
    end

    if orders ~= nil then
        for k, v in pairs(orders) do 
            if tonumber(orders[k].pSrc) == tonumber(src) then
                local info = {
                    id = orders[k].item,
                    Uses = 10,
                    _hideKeys = {'id'},
                }
                TriggerClientEvent("player:receiveItem", src, orders[k].item, 1, false, {}, info)
                table.remove(orders, index[src])
            end
        end
    end
end)

RPC.register("ev-heists:hacks:getExperience", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id

    local exp = exports["ev-progression"]:GetIllegalRep(src, "hackexp")
    
    return exp
end)
