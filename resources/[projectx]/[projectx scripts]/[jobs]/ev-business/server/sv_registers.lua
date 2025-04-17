RPC.register("ev-business:startPurchase", function(pSource, pData)
    local source = pSource
    local data = pData
    
    local identifier = GetPlayerIdentifiers(source)[1]
    local message = ("Business Purchase Started | Business: %s | Amount: %s | Charger ID: %s | Charger Name: %s | Charger Identifier: %s"):format(data.business, data.cost, source, GetPlayerName(source), identifier)

    --exports["ev-log"]:AddLog("business", message)

    TriggerClientEvent("ev-business:activePurchase", -1, {
        charger = source, 
        cost = data.cost, 
        comment = data.comment,
        registerId = data.registerId,
        business = data.business
    })
end)

RPC.register("ev-business:completePurchase", function(pSource, pData)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    local data = pData
    local taxAmount = data.cost

    local taxValue = taxAmount - data.withoutTax

    if data.cash == true then
        if tonumber(taxAmount) > tonumber(user.character.cash) then return false, "You can't afford this purchase" end
        local businessAccountResult, businessAccountId = exports["ev-financials"]:getBusinessAccountId(data.business)
        if not businessAccountResult then return false, businessAccountId end

        local transactionResult, transactionMessage  = exports["ev-financials"]:DoCashTransaction(pSource, businessAccountId, 4, tonumber(data.withoutTax), "deposit", "Business Cash Deposit", false, false, false)
        if not transactionResult then return false, transactionMessage or "Failed to complete transaction" end
    else
        local accountResult, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
        if not accountResult then return false, accountId end

        local balance = exports["ev-financials"]:getAccountBalance(accountId)

        if (tonumber(taxAmount) > tonumber(balance)) then return false, "You can't afford this purchase" end

        local businessAccountResult, businessAccountId = exports["ev-financials"]:getBusinessAccountId(data.business)
        if not businessAccountResult then return false, businessAccountId end

        local transactionResult, message = exports["ev-financials"]:DoBusinessTransaction(-1, accountId, businessAccountId, tonumber(data.withoutTax), 4, ("Business Services Payment | Total: $%s | Tax Amount: $%s"):format(taxAmount, taxValue),  user.character.id, tonumber(data.withoutTax)) -- user.character.id should be charger??
        if not transactionResult then return false, "Failed to complete transaction" end
    end

    local charger = exports["ev-base"]:getModule("Player"):GetUser(data.charger)

    TriggerClientEvent("player:receiveItem", data.charger, "ownerreceipt", 1, true, {
        ["Price"] = tonumber(data.withoutTax),
        ["Creator"] = charger.character.first_name .. " " ..charger.character.last_name,
        ["Comment"] = data.comment
    })

    local getBizNameByID = Await(SQL.execute("SELECT name FROM _business WHERE code = @code", {
        ["code"] = data.business
    }))

    local business_name = getBizNameByID[1].name
    
    TriggerClientEvent("player:receiveItem", pSource, "receipt", 1, true, {["Comment"] =  "Thanks for your order at " .. business_name})

    TriggerClientEvent("ev-business:closePurchase", -1, {
        registerId = data.registerId
    })
    
    if data.cash == false then
        TriggerClientEvent("ev-ui:server-relay", pSource, {
            source = "ev-nui",
            app = "phone",
            data = {
                action = "notification",
                target_app = "home-screen",
                title = business_name,
                body = "$" .. tostring(format_int(tonumber(taxAmount))) .. " was withdrawn from your account.",
                show_even_if_app_active = true -- true | false, show this notification even if the app is active
            }
        })
    end

    return true
end)