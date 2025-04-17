-- @param serverId The server id.
-- serverId: int

-- returns
-- characterid: int
function getCharacterId(serverId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(serverId)
    local cid = user:getCurrentCharacter().id

    if not cid then
        return false, "Couldn't find a character"
    end

    return true, cid
end

-- @params
-- serverId: int

-- returns
-- characterJob: string
function getCharacterJob(serverId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(serverId)
    local job = user:getVar("job")

    if not user then
        return false, "Couldn't find a job or a character"
    end

    return true, job
end

-- @params
-- pCharacterId: int

-- returns
-- hasDefaultBankAccount: boolean
function hasDefaultBankAccount(pCharacterId)
    local query = [[
        SELECT count(*) as 'exists' FROM _account_access aa
        INNER JOIN _account a ON a.bank_account_id = aa.account_id
        WHERE character_id = @characterId AND a.account_type = @accountType
    ]]

    local result = Await(SQL.execute(query, {
        characterId = pCharacterId,
        accountType = Default.BankAccountType
    }))

    return result[1].exists > 0
end

-- @params
-- pPhoneNumber: any

-- returns
-- characterId: int
function getCharacterIdByPhoneNumber(pPhoneNumber)
    if not pPhoneNumber then return false, "Phone number required." end

    local query = [[
        SELECT `cid` FROM `_character_phone_number` c
        WHERE phone_number = @phoneNumber AND is_burner = false
    ]]

    local characterId = Await(SQL.execute(query, {
        phoneNumber = pPhoneNumber
    }))

    return character ~= nil and true or false, characterId or 'No phone number'
end

function getAccountNumberByPhoneNumber(pPhoneNumber)
    local query = [[
        SELECT `account_id` FROM `_account_access` aa
        INNER JOIN `characters` c on c.id = aa.character_id
        WHERE c.phone_number = @phoneNumber AND aa.is_owner = true
    ]]

    local account = Await(SQL.execute(query, {
        phoneNumber = pPhoneNumber
    }))

    return account ~= nil and true or false, account[1].account_id or 'No account'
end

-- TODO: Load/Ensure certain accounts exist and have an enum to store known accountTypes
function getDefaultBankAccount(pCharacterId, singleReturn, pIgnoreFrozenCheck)
    local query = [[
        SELECT `account_id`, IFNULL(a.is_frozen, 0) as 'is_frozen'
        FROM `_account_access` aa
        INNER JOIN `_account` a on a.bank_account_id = aa.`account_id`
        WHERE character_id = @characterId and a.account_type = @accountType
    ]]

    local result = Await(SQL.execute(query, {
        characterId = pCharacterId,
        accountType = Default.BankAccountType
    }))

    local account = result[1]

    local hasDefaultAccount = hasDefaultBankAccount(pCharacterId)

    if not hasDefaultAccount then
        print("[FINANCIALS] [ACCOUNT] Character " .. pCharacterId .. " has no bank account, creating one...")
        local accountId = createNewAccount(pCharacterId, "Personal Account", 1, 5000, 31, false, false, true, true)
        if accountId then
            print("[FINANCIALS] [ACCOUNT] Created bank account for character " .. pCharacterId .. " with ID: " .. accountId)
            return accountId
        else
            return false, "Failed to create account"
        end
    end

    if account == nil then
        if singleReturn then
            return "Account does not exist"
        else
            return false, "Account does not exist"
        end
    end

    if not pIgnoreFrozenCheck and account.account_id ~= nil and account.is_frozen == 1 then
        if singleReturn then
            return "Account is frozen"
        else
            return false, "Account is frozen"
        end
    end

    if singleReturn then
        return account.account_id
    else
        return true, account.account_id
    end
end

function getBusinessAccountId(pBusinessId)
    local query = [[
        SELECT * FROM `_business` WHERE code = @businessId 
    ]]

    local result = Await(SQL.execute(query, {
        businessId = pBusinessId
    }))

    if result[1] == nil then
        return false, "Business does not exist"
    end

    return true, result[1].account_id -- bank_account_id
end

function getAccountId(pTarget, pAccountType)
    local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(pTarget))
    local characterId = user:getCurrentCharacter().id

    --local accountId = Await(SQL.scalar("SELECT `account_id` from `_account_access` where character_id = @characterId", characterId, (not pAccountType and 1 or pAccountType))) -- "not pAccountType and 1" ?!! -Alex
    local accountId = Await(SQL.execute("SELECT account_id FROM _account_access WHERE character_id = @characterId", {
        characterId = characterId
    }))

    return accountId, characterId
end

function getAccountTypes()
    local query = [[
        SELECT `id`, `name`, `public_permission` as public FROM _account_type
    ]]
    return true, Await(SQL.execute(query))
end

function getAccounts(pAccountId, pCharacterId, pAccountName, pJob)
    local query = [[
            SELECT a.bank_account_id as 'id', a.name, at.name as 'type', at.id as 'type_id', a.`account_balance` AS balance, access_level as 'access', c.first_name as 'owner_first_name', c.last_name as 'owner_last_name', is_owner, is_frozen, is_monitored
            FROM _account_access aa
            INNER JOIN _account a ON a.bank_account_id = aa.account_id
            INNER JOIN _account_type at ON at.id = a.account_type
            INNER JOIN characters c ON c.id = (SELECT character_id FROM _account_access aa2 WHERE aa.account_id = aa2.account_id LIMIT 1)
            WHERE a.bank_account_id = @accountId or character_id = @characterId or (a.name LIKE @accountName)
        UNION
            SELECT a.bank_account_id as 'id', a.name, at.name as 'type', at.id as 'type_id', a.`account_balance` AS balance, 28 as 'access', c.first_name as 'owner_first_name', c.last_name as 'owner_last_name', 0 as 'is_owner', 0 as 'is_frozen', 0 as 'is_monitored'
            FROM _account a
            INNER JOIN _account_type at ON at.id = a.account_type
            INNER JOIN characters c ON c.id = 1
            WHERE a.bank_account_id = @job
        GROUP by a.id
    ]]
    
    local accounts = Await(SQL.execute(query, {
        accountId = pAccountId or 'NULL',
        characterId = pCharacterId or 'NULL',
        accountName = not pAccountName and 'NULL' or '%' .. pAccountName .. '%',
        job = Default.JobMapping[pJob] or 'NULL'
    }))

    if accounts then
        for idx, account in pairs(accounts) do
            accounts[idx]["access"] = buildPermissions(account.access, account.is_frozen, account.is_owner)
            accounts[idx]["id"] = tonumber(account.id)
            accounts[idx]["bank_account_id"] = tonumber(account.id)
        end
    end

    Wait(100)

    return accounts
end

function createAccount(pName, pCid, pAccess, pAccountType, pIsFrozen, pIsMonitored, pIsOwner)
    local access = reversePermissions(pAccess)
    local result = createNewAccount(pCid, pName, pAccountType, 0, access, pIsFrozen, pIsMonitored, pIsOwner, false)
    return result and true or false, result
end

function editAccount(pId, pName, pAccountType, pIsFrozen, pIsMonitored)
    local query = [[
        UPDATE _account SET is_frozen = @isFrozen, is_monitored = @isMonitored WHERE bank_account_id = @id
    ]]

    local result = Await(SQL.execute(query, {
        isFrozen = pIsFrozen,
        isMonitored = pIsMonitored,
        id = pId,
        name = pName
    }))

    return result and true or false, result and "Account updated" or "Failed to update account"
end

function getCharactersWithAccess(pAccountId)
    local query = [[
        SELECT c.id, CONCAT(c.first_name, ' ', c.last_name) as 'name', aa.access_level as 'access', aa.is_owner
        FROM _account_access aa
        INNER JOIN characters c ON c.id = aa.character_id
        WHERE account_id = @accountId
    ]]

    local accounts = Await(SQL.execute(query, {
        accountId = pAccountId
    }))

    for _, account in pairs(accounts) do
        account.access = buildPermissions(account.access, false, account.is_owner)
    end

    return true, accounts
end

function checkAccountExist(pAccountId, pIgnoreFrozenCheck)
    local query = "SELECT count(bank_account_id) as 'exists', IFNULL(is_frozen, 0) as 'is_frozen' FROM _account WHERE bank_account_id = @accountId"

    local result = Await(SQL.execute(query, {
        accountId = pAccountId
    }))

    local account = result[1]

    if account == nil then return false, "Something went wrong" end
    if not pIgnoreFrozenCheck and account.exists == 1 and account.is_frozen == 1 then return false, "Account is frozen" end

    return account.exists == 1, account.exists == 1 and "Account exist" or "Account does not exist"
end

function getAccountBalance(pAccountId)
    if not pAccountId then return false, "Account id required." end

    local query = [[
        SELECT `account_balance` FROM `_account` a
        WHERE bank_account_id = @accountId
    ]]

    local accountBalance = Await(SQL.execute(query, {
        accountId = pAccountId
    }))

    return accountBalance ~= nil and true or false, accountBalance[1].account_balance or 0
end

function getCharacterCasinoBalance(pCharacterId)
    local query = [[
        SELECT `casino_chip_count` FROM `characters` c
        WHERE c.id = @characterId
    ]]

    local accountBalance = Await(SQL.execute(query, {
        characterId = pCharacterId
    }))

    return accountBalance or 0
end

function adjustAccountBalance(pAccount, pAction, pAmount)
    local query = "UPDATE _account SET account_balance = account_balance %s @accountBalance WHERE bank_account_id = @accountId"

    if pAmount < 0 then
        return false
    end

    local operator = ""

    if pAction == "increase" or pAction == "add" then
        operator = "+"
    elseif pAction == "reduce" or pAction == "remove" then
        operator = "-"
    end

    query = (query):format(operator)

    local pResult = Await(SQL.execute(query, {
        accountBalance = pAmount,
        accountId = pAccount
    }))

    return pResult and pResult.changedRows > 0
end

function createNewAccount(pCharacterId, accountName, accountType, accountBalance, pAccess, pAccountIsFrozen, pAccountIsMonitored, pIsOwner, pReturnAccountId, pBankId)
    if not pCharacterId then return false, "Citizen ID needs to be specified" end

    local bankAccountId = tonumber("6" .. math.random(1000000, 9999999))

    local accountData = Await(SQL.execute("INSERT INTO _account(`bank_account_id`, `name`, `account_type`, `account_balance`, `is_frozen`, `is_monitored`) VALUES(@accountId, @accountName, @accountType, @accountBalance, @pAccountIsFrozen, @pAccountIsMonitored)", {
        accountId = not pBankId and bankAccountId or pBankId,
        accountName = accountName,
        accountType = accountType,
        accountBalance = accountBalance,
        pAccountIsFrozen = pAccountIsFrozen,
        pAccountIsMonitored = pAccountIsMonitored
    }))
    local accountId = accountData.insertId

    if not accountId then return false, "Failed to create account" end
    local accessData = Await(SQL.execute("INSERT INTO _account_access(`account_id`, `character_id`, `access_level`, `is_owner`) VALUES(@accountId, @characterId, @accessLevel, @isOwner)", {
        accountId = not pBankId and bankAccountId or pBankId,
        characterId = pCharacterId,
        accessLevel = pAccess,
        isOwner = pIsOwner
    }))
    if (pReturnAccountId) then 
        return bankAccountId
    end

    return true
end

function addCharacterToAccount(pAccountId, pCharacterId, pAccess)
    local accessLevel = reversePermissions(pAccess)
    if not accessLevel then return false, "Invalid access level" end

    local alreadyExists = Await(SQL.execute("SELECT count(*) as 'exists' FROM _account_access WHERE account_id = @accountId AND character_id = @characterId", {
        accountId = pAccountId,
        characterId = pCharacterId
    }))
    if alreadyExists[1].exists > 0 then return false, "Character already has access to this account" end

    local query = [[
        INSERT INTO _account_access(account_id, character_id, access_level, is_owner) VALUES(@accountId, @characterId, @accessLevel, @isOwner)
    ]]

    local addAccount = Await(SQL.execute(query, {
        accountId = pAccountId,
        characterId = pCharacterId,
        accessLevel = accessLevel,
        isOwner = false
    }))

    if addAccount and addAccount.affectedRows > 0 then
        return true
    end

    return false, "Couldn't add person to account."
end

function editCharacterPermission(pAccountId, pCharacterId, pAccess)
    local accessLevel = reversePermissions(pAccess)
    if not accessLevel then return false, "Invalid access level" end

    local doesExist = Await(SQL.execute("SELECT count(*) as 'exists' FROM _account_access WHERE account_id = @accountId AND character_id = @characterId", {
        accountId = pAccountId,
        characterId = pCharacterId
    }))
    if doesExist[1].exists == 0 then return false, "Character does not have access to this account" end

    local query = [[
        UPDATE _account_access SET access_level = @accessLevel WHERE account_id = @accountId AND character_id = @characterId;
    ]]

    local editAccount = Await(SQL.execute(query, {
        accessLevel = accessLevel,
        accountId = pAccountId,
        characterId = pCharacterId
    }))

    if editAccount and editAccount.affectedRows > 0 then
        return true
    end

    return false, "Couldn't edit persons access."
end

function removeCharacterFromAccount(pAccountId, pCharacterId)
    local query = "DELETE FROM _account_access WHERE account_id = @accountId and character_id = @characterId"

    local removeAccount = Await(SQL.execute(query, {
        accountId = pAccountId,
        characterId = pCharacterId
    }))

    if removeAccount and removeAccount.affectedRows > 0 then
        return true
    end

    return false, "Couldn't remove persons access from the account."
end

exports("BankAccountCreation", createNewAccount)

exports("getAccountBalance", function(pAccountId)
    local success, balance = getAccountBalance(pAccountId)
    return success and balance or 0
end)

exports("adjustAccountBalance", adjustAccountBalance)
exports("getDefaultBankAccount", getDefaultBankAccount)
exports("getAccountId", getAccountId)
exports("getBusinessAccountId", getBusinessAccountId)