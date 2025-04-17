local TWATTER_BLUE_PRICE = 8000

Citizen.CreateThread(function()
    -- Reset Twatter Entries
    Await(SQL.execute("DELETE FROM _phone_twat"))

    print("[TWATTER] Checking twatter blue subscriptions!")

    local blueQuery = [[
        SELECT
            character_id
        FROM
            _phone_twat_blue
        WHERE
            last_payment <= UNIX_TIMESTAMP() - 604800
    ]] -- Grabs everyone who paid last week

    local result = Await(SQL.execute(blueQuery))
    if not result then return end

    for k,v in pairs(result) do
        local success = true

        local accountResult, accountId = exports["ev-financials"]:getDefaultBankAccount(v.character_id, false, false)
        if not accountResult then success = false end
    
        local transactionResult = exports["ev-financials"]:DoTransaction(-1, accountId, 1, TWATTER_BLUE_PRICE, ("Twatter Blue Subscription ($%s)"):format(TWATTER_BLUE_PRICE), 1, "transfer")
        if not transactionResult.success then success = false end
    
        local pResult = Await(SQL.execute("UPDATE _phone_twat_blue SET last_payment = @last_payment WHERE character_id = @character_id", {
            last_payment = os.time(),
            character_id = v.character_id
        }))

        local querySuccess = pResult and pResult.affectedRows > 0

        if not querySuccess then success = false end

        if success then
            print(("[TWATTER] Renewed twatter blue for ID: %s"):format(v.character_id))
        else
            print(("[TWATTER] Removing twatter blue for ID: %s"):format(v.character_id))
            removeTwatterBlue(v.character_id)
        end
    end
end)

local function hasTwatterBlue(pCharacterId)
    local result = Await(SQL.execute("SELECT COUNT(*) AS total FROM _phone_twat_blue WHERE character_id = @character_id", {
        character_id = pCharacterId
    }))

    return result[1].total == 1
end

local function removeTwatterBlue(pCharacterId)
    local result = Await(SQL.execute("DELETE FROM _phone_twat_blue WHERE character_id = @character_id", {
        character_id = pCharacterId
    }))

    return result and result.affectedRows > 0
end

function getTwatterEntries()
    local query = [[
        SELECT
            t.text,
            t.timestamp,
            c.first_name,
            c.last_name,
            ptb.is_blue
        FROM
            _phone_twat t
            LEFT JOIN characters c ON c.id = t.character_id
            LEFT JOIN _phone_twat_blue ptb ON ptb.character_id = t.character_id
    ]]

    local result = Await(SQL.execute(query))

    if not result then return false, "Failed to fetch twats" end

    local entries = {}

    for k,v in pairs(result) do
        entries[#entries+1] = {
            character = {
                first_name = v.first_name,
                last_name = v.last_name,
            },
            text = v.text,
            timestamp = tonumber(v.timestamp or 0),
            isBlue = v.is_blue or false
        }
    end

    return entries and true or false, entries and entries or "Couldn't get twatter entries"
end

function addTwatterEntry(pCharacterId, pFirstName, pLastName, pText)
    local timestamp = os.time() * 1000

    local data = Await(SQL.execute("INSERT INTO _phone_twat (character_id, text, timestamp) VALUES (@character_id, @text, @timestamp)", {
        character_id = pCharacterId,
        text = pText,
        timestamp = timestamp
    }))

    if not data then return false, "Failed to post twat" end

    local hasBlue = hasTwatterBlue(pCharacterId)

    TriggerClientEvent("phone:twatter:receive", -1, {
        character = {
            id = pCharacterId,
            first_name = pFirstName,
            last_name = pLastName
        },
        timestamp = timestamp,
        text = pText,
        isBlue = hasBlue
    })

    return true
end

exports("addTwatterEntry", addTwatterEntry)

function getTwatterBlue(pSource)
    local success, user = getUser(pSource)
    if not success then return false end

    return hasTwatterBlue(user.character.id)
end

function purchaseBlue(pSource) -- TODO;
    local success, user = getUser(pSource)
    if not success then return false end

    local amount = TWATTER_BLUE_PRICE

    local accountResult, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not accountResult then return false, accountId end

    local balance = exports["ev-financials"]:getAccountBalance(accountId)
    if balance < amount then return false, "You can't afford this!" end

    local transactionResult = exports["ev-financials"]:DoTransaction(-1, accountId, 1, amount, ("Twatter Blue Subscription ($%s)"):format(TWATTER_BLUE_PRICE), 1, "transfer")
    if not transactionResult.success then return false, transactionResult.message end

    -- TODO: Need to delete old entries?

    local query = [[
        INSERT INTO _phone_twat_blue
        (character_id, is_blue, last_payment)
        VALUES
        (@character_id, @is_blue, @last_payment)
    ]]

    local pResult = Await(SQL.execute(query, {
        character_id = user.character.id,
        is_blue = true,
        last_payment = os.time()
    }))
    
    local success = pResult and pResult.affectedRows > 0

    return success, success and "Successfully purchased twatter blue subscription" or "Unknown error"
end

function cancelBlue(pSource)
    local success, user = getUser(pSource)
    if not success then return false end

    local query = [[
        DELETE FROM
            _phone_twat_blue
        WHERE
            character_id = @character_id AND is_blue = 1
    ]]

    local pResult = Await(SQL.execute(query, {
        character_id = user.character.id,
    }))
    
    local success = pResult and pResult.affectedRows > 0

    return success, success and "Successfully cancelled subscription" or "Failed to cancel subscription"
end

function getBlockedUsers(pSource)
    local success, user = getUser(pSource)
    if not success then return {} end

    local query = [[
        SELECT
            ptb.id, ptb.character_id, ptb.blocked_character_id,
            CONCAT(c.first_name, ' ', c.last_name) as 'name'
        FROM
            _phone_twat_block ptb
            LEFT JOIN characters c ON ptb.blocked_character_id = c.id
        WHERE
            character_id = @character_id
    ]]

    local result = Await(SQL.execute(query, {
        character_id = user.character.id
    }))
    if not result then return {} end

    local blockedUsers = {}

    for k,v in pairs(result) do
        blockedUsers[tostring(v.blocked_character_id)] = {
            name = v.name
        }
    end

    return blockedUsers
end

function blockTwatterUser(pSource, pCid)
    local success, user = getUser(pSource)
    if not success then return false, user end

    local characterSuccess, character = getCharacterById(pCid)
    if not characterSuccess then return false, character end

    local query = [[
        INSERT INTO _phone_twat_block
        (character_id, blocked_character_id)
        VALUES
        (@character_id, @blocked_character_id)
    ]]

    local pResult = Await(SQL.execute(query, {
        character_id = user.character.id,
        blocked_character_id = character.id
    }))
    
    local success = pResult and pResult.affectedRows > 0

    return success, success and "Blocked twatter user" or "Failed to block twatter user"
end

function unblockTwatterUser(pSource, pCharacterId)
    local success, user = getUser(pSource)
    if not success then return false end

    local query = [[
        DELETE FROM
            _phone_twat_block
        WHERE
            character_id = @character_id AND blocked_character_id = @blocked_character_id
    ]]

    local pResult = Await(SQL.execute(query, {
        character_id = user.character.id,
        blocked_character_id = pCharacterId
    }))
    
    local success = pResult and pResult.affectedRows > 0

    return success
end