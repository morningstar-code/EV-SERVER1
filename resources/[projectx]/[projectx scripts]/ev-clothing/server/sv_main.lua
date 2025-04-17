local pnpFirstCreateChar = false

RegisterNetEvent("ev:FirstCreateChar")
AddEventHandler("ev:FirstCreateChar", function(pSrc)
    pnpFirstCreateChar = true
end)

RegisterNetEvent("ev:FirstCreateCharFalse")
AddEventHandler("ev:FirstCreateCharFalse", function(pSrc)
    pnpFirstCreateChar = false
end)

RPC.register("ev-clothing:saveSkin",function(pSource,data)
    local save = TriggerClientEvent("ev-clothing:save", pSource)
    return save, true
end)

RPC.register("clothing:purchasecash",function(pSource,pPrice)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource) 
    if user:getCash() >= pPrice.param then
        if not pnpFirstCreateChar then 
        user:removeMoney(pPrice.param)
        else
            return true
        end
    else
    end
    return true
end)

RPC.register("clothing:bankpurchase",function(pSource,pPrice)
	local pSrc = source
	local user = exports["ev-base"]:getModule("Player"):GetUser(pSrc)
    if user:getBalance() >= pPrice.param then
        if not pnpFirstCreateChar then 
		user:removeBank(pPrice.param)
        else
         return true
        end
    else
    end
    return true
end)

RPC.register("ev-clothing:getTextureNames",function(source,cb,name)
    local data = LoadResourceFile(GetCurrentResourceName(), "./client/names.json")
    data = json.decode(data)

    if data then
        cb(data[1][name])
    else 
        cb({})
    end
    return true
end)

RPC.register("ev-clothing:purchaseClothes",function(pSource, pType, pAmount)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if user:getCash() >= pAmount then
        user:removeMoney(pAmount)
    else
        TriggerClientEvent('DoLongHudText', src, 'You do not have enough money ! Required Ammount : $200', 2)
    end
    return true
end)