local VenmoTransactions = {}

function isTransactionValid(pAccount, pTargetAccount, pAmount, pIgnoreFrozenCheck)
    local pAccountExist, pReasonExists = checkAccountExist(pAccount, pIgnoreFrozenCheck)

    if pAmount < 0 then
        return false, "Amount must be positive"
    end

    if pAmount > 9999999 then
        return false, "Amount can't be more than $9,999,999.00"
    end

    if not pAccountExist then
        return false, pReasonExists
    end

    local pTargetAccountExist, pTargetReasonExists = checkAccountExist(pTargetAccount, pIgnoreFrozenCheck)

    if not pTargetReasonExists then
        return false, pTargetReasonExists
    end

    local success, accountBalance = getAccountBalance(pAccount)

    if not success then
        return false, "Account does not exist or has no transactions"
    end

    if pAccount == 1 then
        return true
    end

    local hasEnoughBalance = (accountBalance - pAmount) >= 0

    if not hasEnoughBalance then
        return false, ("Not enough money, you only have $%s"):format(accountBalance)
    end

    return true
end

function addTransactionLog(pSourceAccountId, pTargetAccountId, pAmount, pComment, pTaxCategory, pSourceId, pTransactionType)
    local taxLevel = (type(pTaxCategory) == "number" and getTaxLevelById(pTaxCategory)) or (type(pTaxCategory) == "string" and getTaxLevelByName(pTaxCategory))
    local taxCategoryId = (type(pTaxCategory) == "number" and pTaxCategory) or getTaxCategoryIdByName(pTaxCategory)
    local query = [[
        INSERT INTO _transaction_log (transaction_id, payee_account_id, receiver_account_id, _transaction_log.change, comment, triggered_by, tax_level, tax_category, transaction_type, updated_at)
        VALUES(@transaction_id, @payee_account_id, @receiver_account_id, @logChange, @comment, @triggered_by, @tax_level, @tax_category, @transaction_type, @updated_at)
    ]]

    local pResult = Await(SQL.execute(query, {
        transaction_id = uuid(),
        payee_account_id = pSourceAccountId,
        receiver_account_id = pTargetAccountId,
        logChange = pAmount,
        comment = pComment,
        triggered_by = pSourceId,
        tax_level = taxLevel,
        tax_category = taxCategoryId,
        transaction_type = pTransactionType,
        updated_at = os.time()
    }))

    return pResult and pResult.affectedRows > 0
end

function doTransAction(pSourceAccountId, pTargetAccountId, pAmount, pComment, pTaxCategory, pSourceId, pTransactionType)   
    local pLogSuccess = addTransactionLog(pSourceAccountId, pTargetAccountId, pAmount, pComment, pTaxCategory, pSourceId, pTransactionType)

    if not pLogSuccess then
        return false, "Couldn't insert the transaction into the logs."
    end

    local pSourceBalanceChanged = adjustAccountBalance(pSourceAccountId, "reduce", pAmount)

    if not pSourceBalanceChanged then
        return false, "Couldn't update the source account balance."
    end

    local pTargetBalanceChanged = adjustAccountBalance(pTargetAccountId, "increase", pAmount)

    if not pTargetBalanceChanged then
        return false, "Couldn't update the target account balance."
    end

    return true
end

function prepareTransaction(pSource, pSourceAccountId, pTargetAccountId, pAmount, pComment, pTaxCategory, pTransactionType, pIgnoreFrozenCheck)
    local sourceAccount = -1

    -- TODO: Add check for AccountType (if exists)
    if (type(pTaxCategory) == "number" and not getTaxLevelById(pTaxCategory)) or (type(pTaxCategory) == "string" and not getTaxLevelByName(pTaxCategory)) then
        return false
    end

    if tonumber(pSourceAccountId) == tonumber(pTargetBalanceChanged) and pTransactionType ~= "withdraw" then
        return false
    end

    local isValid, message = isTransactionValid(pSourceAccountId, pTargetAccountId, pAmount, pIgnoreFrozenCheck)

    if not isValid then
        return false
    end

    local pTransaction, pReason = doTransAction(pSourceAccountId, pTargetAccountId, pAmount, pComment, pTaxCategory, pSource, pTransactionType)

    if pTransaction then
        return true
    else
        return false
    end
end

RPC.register("DoTransaction", function(pSource, pSourceAccountId, pTargetAccountId, pAmount, pComment, pTaxCategory, pTransactionType, pIgnoreFrozenCheck)
    return prepareTransaction(pSource, pSourceAccountId, pTargetAccountId, pAmount, pComment, pTaxCategory, pTransactionType, pIgnoreFrozenCheck)
end)

function getTransactions(pSourceAccountId, pTransactionType, pStartDate, pEndDate)
    local query = [[
    SELECT
        `transaction_id` AS 'id',
        comment,
        transaction_type AS 'type',
        IF(payee_account_id != @accountId OR transaction_type = 'deposit', 'in', 'out') AS 'direction',
        payee_account_id AS 'from_account_id',
        IF(transaction_type = 'payslip', 'Government Pay', CONCAT(from_c.first_name, ' ', from_c.last_name)) AS 'from_civ_name',
        acc.name AS 'from_account_name',
        receiver_account_id AS 'to_account_id',
        CONCAT(to_c.first_name, ' ', to_c.last_name) AS 'to_civ_name',
        acc2.name AS 'to_account_name',
        receiver_account_id AS 'to_account_id',
        `change` AS 'amount',
        updated_at AS 'date',
        tc.name as 'tax_type',
        tax_level AS 'tax_percentage',
        tax_category AS 'tax_id'
    FROM
        _transaction_log
        LEFT JOIN _account_access a ON _transaction_log.receiver_account_id = a.account_id
        LEFT JOIN _account_access a2 ON _transaction_log.payee_account_id = a2.account_id
        LEFT JOIN _account acc ON acc.bank_account_id = a2.account_id
        LEFT JOIN _account acc2 ON acc2.bank_account_id = a.account_id
        LEFT JOIN characters from_c ON a2.character_id = from_c.id
        LEFT JOIN characters to_c ON a.character_id = to_c.id
        LEFT JOIN _tax_category tc ON _transaction_log.tax_category = tc.id
    WHERE
        (payee_account_id = @accountId OR receiver_account_id = @accountId)
        AND updated_at > @startDate AND updated_at < @endDate
    ]]

    if pTransactionType then
        query = query .. [[
            AND transaction_type = @transactionType
        ]]
    end

    query = query .. [[
        GROUP BY transaction_id
        ORDER BY updated_at desc
        LIMIT 0, 50
    ]]

    local pResult = Await(SQL.execute(query, {
        accountId = pSourceAccountId,
        startDate = pStartDate,
        endDate = pEndDate,
        transactionType = pTransactionType
    }))

    return pResult
end

function bankDeposit(pSource, pTargetAccountId, pAmount, pComment)
    local isValid, isValidReason = checkAccountExist(pTargetAccountId)

    if not isValid then
        return false, isValidReason
    end

    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    local char = user:getCurrentCharacter()
    local cash = user:getCash()

    if (cash - pAmount) < 0 then
        return false, ("There is not enough money, you only have $%s"):format(cash)
    end

    -- TODO: Add Transaction log

    local success = adjustAccountBalance(pTargetAccountId, "increase", pAmount)

    if success then
        user:removeMoney(pAmount)
        local pLogSuccess = addTransactionLog(pTargetAccountId, pTargetAccountId, pAmount, pComment, 1, (char.id), "deposit")

        if not pLogSuccess then
            return false, "Couldn't insert the transaction into the logs."
        end
    end

    return success
end

RPC.register("BankDeposit", function(pSource, pTargetAccountId, pAmount, pComment)
    return bankDeposit(pSource, pTargetAccountId, pAmount, pComment)
end)

function bankWithdraw(pSource, pTargetAccountId, pAmount, pComment)
    local isValid, message = isTransactionValid(pTargetAccountId, pTargetAccountId, pAmount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    local char = user:getCurrentCharacter()

    if not isValid then
        return isValid, message
    end

    -- TODO: Add Transaction log

    local success = adjustAccountBalance(pTargetAccountId, "reduce", pAmount)

    if success then
        user:addMoney(pAmount)
        local pLogSuccess = addTransactionLog(pTargetAccountId, pTargetAccountId, pAmount, pComment, 1, (char.id), "withdraw")

        if not pLogSuccess then
            return false, "Couldn't insert the transaction into the logs"
        end
    end

    return success
end

RPC.register("BankWithdraw", function(pSource, pTargetAccountId, pAmount, pComment)
    return bankWithdraw(pSource, pTargetAccountId, pAmount, pComment)
end)

function getTransactionLogs(pSourceAccountId, pTransactionType, pStartDate, pEndDate)
    local startDate = pStartDate ~= nil and pStartDate or (os.time(os.date("!*t")) - (30 * 24 * 60 * 60))
    local endDate = pEndDate ~= nil and pEndDate or (os.time(os.date("!*t")) + (2 * 24 * 60 * 60))
    local pExists, pExistsReason = checkAccountExist(pSourceAccountId, true)

    if pExists ~= nil and pExist ~= false then
        return true, getTransactions(pSourceAccountId, pTransactionType, startDate, endDate)
    else
        return false, pExistsReason
    end
end

function DoVenmoTransaction(pCharacterId, pAmount)
    if pAmount >= Default.VenmoLimit then
        return false, "This exceeds the daily limit."
    end
    local venmoTxAmount = VenmoTransactions[pCharacterId]

    if not venmoTxAmount and pAmount <= Default.VenmoLimit then
        VenmoTransactions[pCharacterId] = pAmount
        return true, "Success"
    end

    if venmoTxAmount and (venmoTxAmount + pAmount) <= Default.VenmoLimit then
        VenmoTransactions[pCharacterId] = venmoTxAmount + pAmount
        return true, "Success"
    end

    return false, "This exceeds the daily limit."
end

function DoCashTransaction(pSource, pTargetAccountId, pTaxCategory, pAmount, pTransactionType, pTransactionLog, pLogType, pCallback, pDontRemoveMoney)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    local totalAmount = pAmount + taxOfSale(pAmount, pTaxCategory)
    pTransactionType = pTransactionType ~= nil and pTransactionType or "deposit"
    pTransactionLog = pTransactionLog ~= nil and pTransactionLog or "Business Cash Deposit"

    local success = adjustAccountBalance(pTargetAccountId, "increase", pAmount) -- totalAmount

    if success and not pDontRemoveMoney then
        if (user:getCash() - pAmount) < 0 then
            return false, "Not enough money on you"
        end

        user:removeMoney(totalAmount)
    end

    if pCallback then
        pCallback(success)
    end

    if pTransactionLog then
        local pLogSuccess = addTransactionLog(pTargetAccountId, pTargetAccountId, pAmount, pTransactionLog, pTaxCategory, (user.character.id), pTransactionType)

        if not pLogSuccess then
            return false, "Couldn't insert the transaction into the logs."
        end
    end

    return success and true or false, success and "Success" or "Failed to complete transaction"
end

function DoLoanTransaction(pTargetAccountId, pAmount, pComment)
    local pSourceAccountId = Default.StateAccountId
    local isValid, message = isTransactionValid(pSourceAccountId, pTargetAccountId, pAmount)

    if not isValid then
        return false, message
    end

    local success = adjustAccountBalance(pSourceAccountId, "remove", pAmount)
    if not success then
        return false, "Couldn't remove the money from the state account."
    end

    local addMoneyToTarget = adjustAccountBalance(pTargetAccountId, "add", pAmount)
    if not addMoneyToTarget then
        return false, "Couldn't add the money to the target account."
    end

    local logAdded = addTransactionLog(pSourceAccountId, pTargetAccountId, pAmount, pComment, 1, 1, "loan")
    if not logAdded then
        return false, "Failed to add transaction log."
    end

    return true
end

-- TODO: Tax this
function DoJobPayTransaction(pTargetAccountId, pAmount, pComment)
    local pSourceAccountId = Default.StateAccountId
    local isValid, message = isTransactionValid(pSourceAccountId, pTargetAccountId, pAmount)

    if not isValid then
        return message
    end

    local addMoneyToTarget = adjustAccountBalance(pTargetAccountId, "add", pAmount)
    if not addMoneyToTarget then
        return "Couldn't add the money to the target account."
    end

    local logAdded = addTransactionLog(pSourceAccountId, pTargetAccountId, pAmount, pComment, 6, 1, "payslip")
    if not logAdded then
        return false
    end

    return true
end

-- pMinusAmount = import price and shit like that for business goods/transactions
function DoBusinessTransaction(pSource, pSourceAccountId, pTargetAccountId, pAmount, pTaxCategory, pComment, pSourceId, pMinusAmount, pTransactionType)
    if pTransactionType == nil then pTransactionType = "purchase" end
    local taxAmount = pTaxCategory == 1 and 0 or (calculateTax(pAmount, pTaxCategory) - pAmount)

    local isValid, message = isTransactionValid(pSourceAccountId, pTargetAccountId, pAmount + taxAmount)

    if not isValid then
        return message
    end

    -- local _, sourceBalance = getAccountBalance(pSourceAccountId)
    -- if sourceBalance < pAmount + taxAmount then
    --     return false
    -- end

    local totalRemove = pMinusAmount + taxAmount
    if (pMinusAmount > 0) then
        local success = adjustAccountBalance(pSourceAccountId, "remove", totalRemove)
        if not success then
            return false, "Couldn't remove the money from the source account."
        end

        if (taxAmount > 0) then
            local addTaxToGovAccount = adjustAccountBalance(Default.StateAccountId, "add", taxAmount)
            if not addTaxToGovAccount then
                return false, "Couldn't add the tax to the government account."
            end
        end

        local addMoneyToTarget = adjustAccountBalance(pTargetAccountId, "add", pMinusAmount)
        if not addMoneyToTarget then
            return false, "Couldn't add the money to the target account."
        end
    end
    local logAdded = addTransactionLog(pSourceAccountId, pTargetAccountId, pAmount, pComment, pTaxCategory, pSourceId, pTransactionType)
    if not logAdded then
        return false, "Failed to add transaction log."
    end

    return true
end

-- payslips n shit bruh 
function DoPersonalIncomeTransaction(pSource, pSourceAccountId, pTargetAccountId, pAmount, pComment, pTransactionType)
    local transactionType = pTransactionType or "transfer"
    local taxCategory = "Personal Income"
    local taxAmount = calculateTax(pAmount, taxCategory) - pAmount

    Await(SQL.execute("CALL PersonalIncome(?, ?, ?, ?, ?)"), pSourceAccountId, pTargetAccountId, pAmount, pComment, taxCategory, pSource, pTransactionType)

    addTransactionLog(pSourceAccountId, pTargetAccountId, pAmount, pComment, taxCategory, pSource, pTransactionType)

    return true
end

function doStateForfeiture(pSource, pAmount)
    local validCharacter, characterId = getCharacterId(pSource)
    if not validCharacter then
        return false, "Could not get a character id"
    end

    local success, accountId = getDefaultBankAccount(characterId)

    local withdraw = adjustAccountBalance(accountId, "remove", pAmount)

    if withdraw then
        addTransactionLog(accountId, Default.StateAccountId, pAmount, "Fine", "No Tax", characterId, 'forfeiture')
    else
        return false, "Could not withdraw."
    end

    local deposit = adjustAccountBalance(Default.StateAccountId, "add", pAmount)
    if not deposit then
        return false, "Could not deposit into state account."
    end

    return true, "Successfully billed."
end

-- function undoStateForfeiture(pSource, pAmount)
--     local validCharacter, characterId = getCharacterId(pSource)
--     if not validCharacter then return false, "Could not get a character id" end

--     local withdraw = adjustAccountBalance(Default.StateAccountId, "remove", pAmount)

--     if withdraw then
--         addTransactionLog(Default.StateAccountId, accountId, pAmount, "Fine", "No Tax", characterId, 'forfeiture')
--     else
--         return false, "Could not withdraw."
--     end

--     local deposit = adjustAccountBalance(accountId, "add", pAmount)
--     if not deposit then
--         return false, "Could not deposit into state account."
--     end

--     return true, "Successfully un-billed."
-- end

function doStateGrantGetDefaultAccount(pSource, pAmount, pComment)
    local validCharacter, characterId = getCharacterId(pSource)
    if not validCharacter then
        return false, "Could not get a character id"
    end
    
    local success, accountId = getDefaultBankAccount(characterId)

    return doStateGrant(accountId, pAmount, pComment, characterId) -- Default.StateAccountId is the state account
end

function doStateGrant(pAccountId, pAmount, pComment, pGranteeCharacterId)
    local pAccountExists, pAccountExistsReason = checkAccountExist(pAccountId)
    if not pAccountExists then
        return false, pAccountExistsReason
    end

    local withdraw = adjustAccountBalance(Default.StateAccountId, "remove", pAmount)

    if withdraw then
        addTransActionLog(Default.StateAccountId, pAccountId, pAmount, pComment, 1, pGranteeCharacterId or Default.StateAccountId, 'grant')
    else
        return false, "Could not withdraw from state account."
    end

    local deposit = adjustAccountBalance(pAccountId, "add", pAmount)
    if not deposit then
        return false, "Could not deposit into account."
    end

    return true, "Successfully Given State Funds."
end

exports("DoLoanTransaction", DoLoanTransaction)
exports("DoJobPayTransaction", DoJobPayTransaction)
exports("DoBusinessTransaction", DoBusinessTransaction)
exports("DoPersonalIncomeTransaction", DoPersonalIncomeTransaction)
exports("DoCashTransaction", DoCashTransaction)
exports("DoStateGrantGetDefaultAccount", doStateGrantGetDefaultAccount)
exports("DoStateGrant", doStateGrant)
exports("DoTransaction", function(...)
    local success = prepareTransaction(...)
    return success
end)