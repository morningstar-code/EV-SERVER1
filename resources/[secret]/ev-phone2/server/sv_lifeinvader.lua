--[[
    SQL Tables
        _lifeinvader_address - Stores the email address of a character
        _lifeinvader_contact - Stores the contacts of a character
        _lifeinvader_ad - Stores the ads of a character
        _lifeinvader_email - Stores the emails of a character
]]

function addEmailContact(pSource, pName, pEmail)
    local success, user = getUser(pSource)
    if not success then return false, user end

    local query = [[
        INSERT INTO _lifeinvader_contact
        (character_id, name, email)
        VALUES
        (@character_id, @name, @email)
    ]]

    local pResult = Await(SQL.execute(query, {
        character_id = user.character.id,
        name = pName,
        email = pEmail
    }))

    return pResult and true or false, pResult and "done" or "Could not add contact"
end

function deleteEmailContact(pSource, pContact)
    local success, user = getUser(pSource)
    if not success then return false, user end

    local query = [[
        DELETE FROM
            _lifeinvader_contact
        WHERE
            id = @id AND character_id = @character_id
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pContact.id,
        character_id = user.character.id
    }))

    return pResult and true or false, pResult and "done" or "Could not delete contact"
end

function getEmailContacts(pSource)
    local success, user = getUser(pSource)
    if not success then return false, user end

    local query = [[
        SELECT
            id, name, email
        FROM
            _lifeinvader_contact
        WHERE
            character_id = @character_id
    ]]

    local pResult = Await(SQL.execute(query, {
        character_id = user.character.id
    }))

    return pResult and true or false, pResult and pResult or "Could not get contacts"
end

function getEmails(pSource, pCategoryId)
    local success, email = getEmailAddress(pSource)
    if not success then return false, email end

    local query = [[
        SELECT
            id,
            sender,
            `to`,
            title,
            category,
            timestamp,
            cc
        FROM
            _lifeinvader_email
    ]]

    local pResult = Await(SQL.execute(query, {
        category = pCategoryId
    }))

    for k,v in pairs(pResult) do
        v.cc = json.decode(v.cc or "[]")
    end

    local emails = {}

    for k,v in pairs(pResult) do
        if pCategoryId == "draft" and v.category == "draft" and v.sender == email then
            v.category = "draft"
            table.insert(emails, v)
        end

        if pCategoryId == "sent" and v.sender == email and v.category ~= "draft" and v.category ~= "trash" then
            v.category = "sent"
            table.insert(emails, v)
        end

        if pCategoryId == "inbox" and v.to == email and v.category ~= "draft" and v.category ~= "trash" and v.sender ~= "system@lifeinvader.net" then
            v.category = "inbox"
            table.insert(emails, v)
        end

        if pCategoryId == "inbox" and v.category == "inbox" and v.to == email and v.sender == "system@lifeinvader.net" then
            print("Selected inbox, and cat is inbox. Aswell as TO is to ME, and is SYSTEM")
            v.category = "inbox"
            table.insert(emails, v)
        end

        for _,cc in pairs(v.cc) do
            if pCategoryId == "inbox" and cc == email and v.category ~= "draft" and v.category ~= "trash" then
                v.category = "inbox"
                table.insert(emails, v)
            end
        end
    end

    return pResult and true or false, pResult and emails or "Could not get emails"
end

function getEmailContent(pId)
    local query = [[
        SELECT
            body
        FROM
            _lifeinvader_email
        WHERE
            id = @id
    ]]

    local pResult = Await(SQL.execute(query, {
        id = tonumber(pId or 0)
    }))

    return pResult and true or false, pResult and pResult[1] and pResult[1] or "Could not get email content"
end

function createEmail(pEmail)
    local query = [[
        INSERT INTO _lifeinvader_email
        (sender, `to`, title, body, category, timestamp, cc)
        VALUES
        (@sender, @to, @title, @body, @category, @timestamp, @cc)
    ]]

    local pResult = Await(SQL.execute(query, {
        sender = pEmail.sender,
        to = pEmail.to,
        title = pEmail.title,
        body = pEmail.body,
        category = pEmail.category,
        timestamp = os.time(),
        cc = json.encode(pEmail.cc)
    }))

    return pResult and true or false, pResult and { insertId = pResult.insertId or -1 }
end

function sendEmail(pEmail)
    local query = [[
        UPDATE
            _lifeinvader_email
        SET
            sender = @sender,
            `to` = @to,
            title = @title,
            body = @body,
            category = @category,
            timestamp = @timestamp,
            cc = @cc
        WHERE
            id = @id
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pEmail.id,
        sender = pEmail.sender,
        to = pEmail.to,
        title = pEmail.title,
        body = pEmail.body,
        category = "sent",
        timestamp = os.time(),
        cc = json.encode(pEmail.cc)
    }))

    return pResult and true or false, pResult and "done" or "Could not send email"
end

function updateEmail(pEmail)
    local query = [[
        UPDATE
            _lifeinvader_email
        SET
            sender = @sender,
            `to` = @to,
            title = @title,
            body = @body,
            category = @category,
            timestamp = @timestamp,
            cc = @cc
        WHERE
            id = @id
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pEmail.id,
        sender = pEmail.sender,
        to = pEmail.to,
        title = pEmail.title,
        body = pEmail.body,
        category = pEmail.category,
        timestamp = os.time(),
        cc = json.encode(pEmail.cc)
    }))

    return pResult and true or false, pResult and "done" or "Could not update email"
end

function discardDraft(pEmail)
    local query = [[
        DELETE FROM
            _lifeinvader_email
        WHERE
            id = @id
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pEmail.id
    }))

    return pResult and true or false, pResult and "done" or "Could not discard draft"
end

function deleteEmail(pEmail)
    local query = [[
        DELETE FROM
            _lifeinvader_email
        WHERE
            id = @id
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pEmail.id
    }))

    return pResult and true or false, pResult and "done" or "Could not delete email"
end

function getRandomAdURL()
    local query = [[
        SELECT
            id,
            url
        FROM
            _lifeinvader_ad
        WHERE
            duration > @now
        ORDER BY RAND()
        LIMIT 1
    ]]

    local pResult = Await(SQL.execute(query, {
        now = os.time()
    }))

    if pResult[1] then
        Await(SQL.execute("UPDATE _lifeinvader_ad SET hits = hits + 1 WHERE id = @id", {
            id = pResult[1].id
        }))

        return true, pResult[1]
    end

    return true, { url = "https://s3.amazonaws.com/primagames-prod-assets/_resized/images/news/gtav_Grand_Theft_Auto_5_How_to_Use_LifeInvader.jpg_1200x500_.jpg" }
end

function getAdListings()
    local query = [[
        SELECT
            id,
            url,
            hits,
            duration as 'expiresAt'
        FROM
            _lifeinvader_ad
        WHERE
            duration > @now
    ]]

    local pResult = Await(SQL.execute(query, {
        now = os.time()
    }))

    return pResult and pResult or {}
end

function createAdListing(pUrl, pDuration)
    local query = [[
        INSERT INTO _lifeinvader_ad
        (url, duration)
        VALUES
        (@url, @duration)
    ]]

    local pResult = Await(SQL.execute(query, {
        url = pUrl,
        duration = os.time() + pDuration
    }))

    return pResult and true or false, pResult and "done" or "Could not create ad listing"
end

function removeAdListing(pId)
    local query = [[
        DELETE FROM
            _lifeinvader_ad
        WHERE
            id = @id
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pId
    }))

    return pResult and true or false, pResult and "done" or "Could not remove ad listing"
end

function sendSystemMail(pTitle, pBody)
    local addresses = Await(SQL.execute("SELECT email_address FROM _lifeinvader_address"))
    if not addresses then return false, "Could not get email addresses" end

    for k,v in pairs(addresses) do
        local email = {
            sender = "system@lifeinvader.net",
            to = v.email_address,
            title = pTitle,
            body = pBody,
            category = "inbox",
            timestamp = os.time(),
            cc = {}
        }

        local success, message = createEmail(email)
    end

    return true, "Successfully sent system mail"
end

function getEmailAddress(pSource)
    local success, user = getUser(pSource)
    if not success then return false, user end

    local query = [[
        SELECT
            email_address as email
        FROM
            _lifeinvader_address
        WHERE
            character_id = @character_id
    ]]

    local pResult = Await(SQL.execute(query, {
        character_id = user.character.id
    }))

    return pResult[1] and true or false, pResult[1] and pResult[1].email or "Could not get email address"
end

function setEmailAddress(pSource, pEmail, pFromUpdate)
    local success, user = getUser(pSource)
    if not success then return false, user end

    local emailTaken = Await(SQL.execute("SELECT email_address FROM _lifeinvader_address WHERE email_address = @email", {
        email = pEmail
    }))

    if emailTaken[1] then return false, "Email address already taken" end

    if pFromUpdate then
        local accountResult, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
        if not accountResult then return false, accountId end

        local balance = exports["ev-financials"]:getAccountBalance(accountId)

        if (tonumber(balance) < 5000) then return false, "You can't afford this purchase" end

        local transactionResult, message = exports["ev-financials"]:DoBusinessTransaction(-1, accountId, 1, 5000, 4, "LifeInvader Email Change - $5000", user.character.id, 5000)
        if not transactionResult then return false, "Failed to complete transaction" end

        TriggerClientEvent("ev-ui:server-relay", pSource, {
            source = "ev-nui",
            app = "phone",
            data = {
                action = "notification",
                target_app = "home-screen",
                title = "LifeInvader Email",
                body = "$" .. tostring(format_int(tonumber(5000))) .. " was withdrawn from your account.",
                show_even_if_app_active = true
            }
        })
    end

    local hasEmail, email = getEmailAddress(pSource)

    local query = [[]]

    if not hasEmail then
        query = [[
            INSERT INTO _lifeinvader_address
            (character_id, email_address)
            VALUES
            (@character_id, @email)
        ]]
    else
        query = [[
            UPDATE
                _lifeinvader_address
            SET
                email_address = @email
            WHERE
                character_id = @character_id
        ]]
    end

    local pResult = Await(SQL.execute(query, {
        character_id = user.character.id,
        email = pEmail
    }))

    local success = pResult and true or false

    if hasEmail and success then
        -- TODO: Update all emails with new email address

        Await(SQL.execute([[
            UPDATE
                _lifeinvader_contact
            SET
                email = @email
            WHERE
                email = @old_email
        ]], {
            email = pEmail,
            old_email = email
        }))
    end

    return pResult and true or false, pResult and "done" or "Could not set email address"
end