RPC.register("GetTransactionLogs", function(pSource, pSourceAccountId, pTransactionType, pStartDate, pEndDate)
    return getTransactionLogs(pSourceAccountId, pTransactionType, pStartDate, pEndDate)
end)

RPC.register("GetAccounts", function(pSource, pAccountId, pCharacterId, pAccountName)      
    local validJob, jobResponse = getCharacterJob(pSource)

    if not validJob then print("Error", jobResponse) else  end

    if not pAccountId and not pCharacterId and not pAccountName then
        local validCharacter, response = getCharacterId(pSource)

        if validCharacter then
            return getAccounts(pAccountId, response, pAccountName, validJob and jobResponse or nil)
        else
            return validCharacter, response
        end
    else
        return getAccounts(pAccountId, pCharacterId, pAccountName, validJob and jobResponse or nil)
    end
end)

RPC.register("CreateAccount", function(pSource, pName, pCid, pAccess, pAccountType, pIsFrozen, pIsMonitored, pIsOwner)
    return createAccount(pName, pCid, pAccess, pAccountType, pIsFrozen, pIsMonitored, pIsOwner)
end)

RPC.register("EditAccount", function(pSource, pId, pName, pAccountType, pIsFrozen, pIsMonitored)
    -- They cannot change name of account, only account type, frozen, and monitored?
    return editAccount(pId, pName, pAccountType, pIsFrozen, pIsMonitored)
end)

RPC.register("GetDefaultBankAccount", function(pSource, pCharacterId, pIgnoreFrozenCheck)
    return getDefaultBankAccount(pCharacterId, false, pIgnoreFrozenCheck)
end)

RPC.register("GetCharactersWithAccess", function(pSource, pAccountId)
    return getCharactersWithAccess(pAccountId)
end)

RPC.register("AddCharacterToAccount", function(pSource, pAccountId, pCharacterId, pAccess)
    return addCharacterToAccount(pAccountId, pCharacterId, pAccess)
end)

RPC.register("EditCharacterPermission", function(pSource, pAccountId, pCharacterId, pAccess)
    return editCharacterPermission(pAccountId, pCharacterId, pAccess)
end)

RPC.register("RemoveCharacterFromAccount", function(pSource, pAccountId, pCharacterId)
    return removeCharacterFromAccount(pAccountId, pCharacterId)
end)

RPC.register("GetAccountTypes", function(pSource)
    return getAccountTypes()
end)

RPC.register("GetTaxLevel", function(pSource, pType)
    if (type(pType) == "string") then
        return getTaxLevelByName(pType)
    elseif (type(pType) == "number") then
        return getTaxLevelById(pType)
    end

    return false, "Invalid type"
end)

RPC.register("PriceWithTaxString", function(pSource, pPrice, pTaxLevel)
    return priceWithTaxString(pPrice, pTaxLevel)
end)

RPC.register("GetTaxLevels", function(source, pOnlyEditable)
    return getTaxLevels(pOnlyEditable)
end)

RPC.register("GetTaxHistory", function(source)
    return getTaxHistory()
end)

RPC.register("SetTaxLevel", function(source, pNewTaxLevels)
    return setTaxLevel(pNewTaxLevels)
end)

RPC.register("GetAssetTaxes", function(source, pCharacterId)
    return getAssetTaxes(pCharacterId)
end)

RPC.register("PayAssetTaxes", function(source, pCharacterId, pSourceAccountId, pAssetTaxId, pAssetName)
    return payAssetTaxes(pCharacterId, pSourceAccountId, pAssetTaxId, pAssetName)
end)

RPC.register("CalculateTax", function(pSource, pSalePrice, pTaxLevel)
    return calculateTax(pSalePrice, pTaxLevel)
end)

RPC.register("GetCurrentBank", function(pSource, pAccountId)
    return getAccountBalance(pAccountId)
end)

RPC.register("doStateForfeiture", function(pSource, pAmount)
    return doStateForfeiture(pSource, pAmount)
end)

RPC.register("GenerateBankAccount", function(pSource)
    local validCharacter, characterId = getCharacterId(pSource)
    if not validCharacter then return false, "Error" end
    return createNewAccount(characterId, "Personal Account", 1, 5000, 31, false, false, true, false)
end)

RPC.register("GetAccountNumberByPhoneNumber", function(pSource, pPhoneNumber)
    return getAccountNumberByPhoneNumber(pPhoneNumber)
end)

RPC.register("ev-financials:giveJobPay", function(pSource, pType, pAmount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false end

    local success, accountId = getDefaultBankAccount(user.character.id, false, false)
    if not success then return TriggerClientEvent("DoLongHudText", pSource, accountId, 2) end

    local message = "Job: " .. Default.JobNames[pType]
    
    local success = DoJobPayTransaction(accountId, tonumber(pAmount), message)
    if not success then return TriggerClientEvent("DoLongHudText", pSource, "Error", 2) end

    TriggerClientEvent("ev-ui:server-relay", pSource, {
        source = "ev-nui",
        app = "phone",
        data = {
            action = "notification",
            target_app = "home-screen",
            title = "Job Pay",
            body = "$" .. tostring(format_int(tonumber(pAmount))) .. " was added to your account.",
            show_even_if_app_active = true -- true | false, show this notification even if the app is active
        }
    })
end)

RegisterCommand("cash", function(src, args, raw)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    if not user then return false end
    local cash = user:getCash()
    TriggerClientEvent("ev-financials:cash", src, cash)
end)

RegisterCommand("givecash", function(src, args, raw)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    if not user then return false end

    local target = tonumber(args[1])
    local amount = tonumber(args[2])
    local cash = user.character.cash

    if not target or not amount then return TriggerClientEvent("DoLongHudText", src, "Unknown error") end

    if target == src then return TriggerClientEvent("DoLongHudText", src, "You can't give yourself money", 2) end

    if cash < amount then return TriggerClientEvent("DoLongHudText", src, "You don't have enough money", 2) end

    local playerPed = GetPlayerPed(src)
    local targetPed = GetPlayerPed(target)

    local distance = #(GetEntityCoords(playerPed) - GetEntityCoords(targetPed))
    if distance > 3.0 then return TriggerClientEvent("DoLongHudText", src, "You are too far away from the player", 2) end

    local target = exports["ev-base"]:getModule("Player"):GetUser(target)
    if not target then return false end

    user:removeMoney(amount)
    target:addMoney(amount)

    TriggerClientEvent("DoLongHudText", src, "You gave $" .. amount .. " to " .. target.character.first_name .. " " .. target.character.last_name)
end)

RegisterCommand("genbankaccount", function(src, args, raw)
    local validCharacter, characterId = getCharacterId(src)
    if not validCharacter then return false, "Error" end
    local result = createNewAccount(characterId, "Personal Account", 1, 5000, 31, false, false, true, true)
    print("Account ID: " .. result)
end)

RegisterCommand("genbusinessbankaccount", function(src, args, raw)
    local validCharacter, characterId = getCharacterId(src)
    if not validCharacter then return false, "Error" end
    
    local businesses = Await(SQL.execute("SELECT * FROM _business"))
    if not businesses then return false, "Error" end

    for _, business in pairs(businesses) do
        local alreadyExists = Await(SQL.execute("SELECT COUNT(*) AS total FROM _account WHERE bank_account_id = @account_id", {
            account_id = business.account_id
        }))

        if alreadyExists[1].total > 0 then
            print("Account already exists for " .. business.name)
            goto continue
        end

        local result = createNewAccount(characterId, business.name, 4, 0, 31, false, false, true, true, business.account_id)
        print("Created account for " .. business.name .. " with ID: " .. result)

        ::continue::
    end
end)

RegisterNetEvent("ev-spawn:characterSpawned")
AddEventHandler("ev-spawn:characterSpawned", function(cid) -- TODO: Fix this function
    print("[FINANCIALS] Checking for characters with no bank account...")
    local characters = Await(SQL.execute("SELECT * FROM characters"))
    if not characters then return false, "Error" end

    for k,v in pairs(characters) do
        local accountId = getDefaultBankAccount(v.id, true, true)
        if not accountId then
            print("[FINANCIALS] Character " .. v.id .. " has no bank account, creating one...")
            local result = createNewAccount(v.id, "Personal Account", 1, 5000, 31, false, false, true, true)
            if result then
                print("[FINANCIALS] Created bank account for character " .. v.id)
            else
                print("[FINANCIALS] Failed to create bank account for character " .. v.id)
            end
        end
    end
end)