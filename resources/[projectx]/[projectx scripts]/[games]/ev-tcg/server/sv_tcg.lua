RegisterNetEvent("ev-tcg:buy", function(pType)
    local src = source

    local itemInfo = TCG.Items[pType]
    if not itemInfo then
        TriggerClientEvent("DoLongHudText", src, "itemInfo not found?", 2)
        return
    end

    local cid = exports["ev-base"]:getChar(src, "id")
    if not cid then
        TriggerClientEvent("DoLongHudText", src, "cid not found?", 2)
        return
    end

    local accountId = exports["ev-base"]:getChar(src, "bankid")
    local bank = exports["ev-financials"]:getAccountBalance(accountId)

    if itemInfo.price > bank then
        TriggerClientEvent("ev-phone:notification", src, "fas fa-exclamation-circle", "Error", "You dont have this much in your bank account", 5000)
        return false
    end

    local comment = "Brought " .. exports["ev-inventory"]:getItem(pType, "displayname")
    local success, message = exports["ev-financials"]:transaction(accountId, 23, itemInfo.price, comment, cid, 5)
    if not success then
        TriggerClientEvent("ev-phone:notification", src, "fas fa-exclamation-circle", "Error", message, 5000)
        return false
    end

    TriggerClientEvent("player:receiveItem", src, pType, 1)
end)