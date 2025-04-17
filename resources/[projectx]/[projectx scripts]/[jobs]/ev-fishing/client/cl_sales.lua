local fishes = { "fishingbass", "fishingcod", "fishingmackerel", "fishingbluefish", "fishingflounder", "fishingwhale", "fishingdolphin", "fishingshark" }
local nightTime = false
local pricePerFish = 15

local function sellFish()
    local totalFish = 0
    local totalBMarketFish = 0

    function processFish(fish, bMarket)
        local qty = exports["ev-inventory"]:getQuantity(fish, true)

        if not bMarket then
            totalFish = totalFish + qty
        else
            totalBMarketFish = totalBMarketFish + qty
        end
        
        if qty > 0 and (not bMarket or (bMarket and nightTime)) then
            TriggerEvent("inventory:removeItem", fish, qty)
        end
    end

    for _, fish in pairs(fishes) do
        processFish(fish, false)
    end

    if totalFish == 0 and totalBMarketFish == 0 then
        TriggerEvent("DoLongHudText", "Nothing to sell, dummy.", 2)
    end
    
    if totalFish > 0 then
        RPC.execute("ev-financials:giveJobPay", "fishing_sales", totalFish * pricePerFish)
        TriggerEvent("DoLongHudText", "Added to bank!")
    end

    if totalBMarketFish > 0 then
        if nightTime then
            local payoutFactor = exports["ev-config"]:GetModuleConfig("main").payoutFactor
            TriggerEvent("player:receiveItem", "band", math.floor(3 * totalBMarketFish * payoutFactor))
        else
            TriggerEvent("DoLongHudText", "Come back later if you want to sell those extra 'fish'", 1)
        end
    end
end

AddEventHandler("ev-npcs:ped:sellFish", function()
    sellFish()
end)

RegisterNetEvent("timeheader")
AddEventHandler("timeheader", function(pHour, pMinutes)
    if pHour > 19 or pHour < 5 then
        nightTime = true
    else
        nightTime = false
    end
end)

--[[ AddEventHandler("ev-fishing:client:purchaseBucket", function()
    local s, data = RPC.execute("ev-fishing:purchaseBucket")
    if not s then 
        return TriggerEvent('DoLongHudText', data, 2)
    end

    local genId = tostring(math.random(10000, 99999999))
    local invId = "fisher-bucket-" .. genId .. "-container"
    local metaData = json.encode({
        inventoryId = invId,
        slots = data.slots,
        weight = data.weight,
        _hideKeys = {"inventoryId", "slots", "weight"},
    })

    TriggerEvent("player:receiveItem", data.item, 1, false, {}, metaData)
end)

AddEventHandler("ev-inventory:itemUsed", function(pItem, pInfo)
    if pItem == "sealedbucket" then
        local data = json.decode(pInfo)
        print(data.weight)
        TriggerEvent("inventory-open-container", data.inventoryId, data.weight, data.slots)
    end
end) ]]