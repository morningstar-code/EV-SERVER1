local cornering = {}

local baggyPrice = math.random(87, 165) -- 

CornerConfig = {
    BaggiesPerBrick = 28,
    -- default: 2 min/populate, -1 to disable
    PopulateRate = 1000 * 60 * 2,
    -- default: 1 min/ped
    TimeBetweenAcquisition = 60 * 1000,
    --How much should repeatedly selling in an area bring players
    MaxZoneBonus = 1.2,
    -- other config stuff
    RequireScales = true,
    DropEvidence = true,
}


RPC.register("ev-weed:startCorner", function(pSource, pCoords)
    local src = pSource
    local user = exports['ev-base']:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    
    for id, d in ipairs(cornering) do
        local dist = #(CurrentCornerCoords - d.coords)
        if dist < 200 then
            return false, "Someone already selling in the area"
        end
    end
    local data = { cid = cid, coords = CurrentCornerCoords}
    table.insert(cornering, data)

    return true, "You are now Cornering"
end)

RPC.register("ev-weed:cornerPed", function(pSource, pCoords, pPed, pVehicle)
    TriggerClientEvent("ev-weed:cornerPed", pSource, pPed, pCoords, pVehicle)
    return true
end)

RPC.register("ev-weed:cornerSyncHandoff", function(pSource, pCoords, pPed)
    TriggerClientEvent("ev-weed:cornerSyncHandoff", pSource, pPed)
    return true
end)

RPC.register("ev-weed:cornerSale", function(pSource, pCoords, pNetId, CurrentCornerZone, baggieInfo)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    local cid = user:getCurrentCharacter().id
    local baggies = exports.oxmysql:query_async("SELECT COUNT(*) as qty FROM inventory WHERE name=? AND item_id = ?", {"ply-"..cid, "weedbaggie"})
    local max = baggies[1].qty >= 4 and 3 or baggies[1].qty
    local amount = math.random(1, max)
    TriggerClientEvent("inventory:removeItem", pSource, "weedbaggie", amount)  
        user:addMoney((amount * baggyPrice))  
    return true
end)

RPC.register("ev-weed:prepareBaggies", function(pSource, pInfo) 
    TriggerClientEvent("inventory:removeItem", pSource, 'weedpackage' , 1)
    TriggerClientEvent("inventory:removeItem", pSource, "emptybaggies", 7)
    TriggerClientEvent("player:receiveItem", pSource, "weedbaggie", 28)
    return true 
end)

RPC.register("ev-weed:stopCorner", function(pSource)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    local cid = user:getCurrentCharacter().id
    for id, d in ipairs(cornering) do
        if cid == d.cid then
            table.remove(cornering, id)
        end
    end
    TriggerLatentClientEvent('ev-weed:cleanCornerPeds',pSource)
    return false
end)
