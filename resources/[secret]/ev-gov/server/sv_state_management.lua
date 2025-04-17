function getLicenses(characterId)
    local query = [[
        SELECT
            ul.`status`,
            l.name,
            l.code
        FROM
            user_licenses ul
            LEFT JOIN _license l ON l.code = ul.code
        WHERE
            ul.character_id = @characterId
    ]]

    local result = Await(SQL.execute(query, {
        characterId = characterId
    }))

    if not result then return false, "Could not get licenses" end

    return true, result
end

--[[
    local licenses = Await(SQL.execute("SELECT * FROM user_licenses WHERE cid = @cid", {
        ["cid"] = pCid.param
    }))

    if not licenses then return false, "" end

    userLicenses = {}

    for k,v in pairs(licenses) do
        local licensestatus = false
        if tonumber(v.status) == 1 then
            licensestatus = true
        end

        userLicenses[#userLicenses+1] = {
            name = v.type,
            status = licensestatus
        }
    end

    return true, userLicenses
]]

function getActiveLicenses(characterId)
    local query = [[
        SELECT
            ul.`status`,
            l.name
        FROM
            user_licenses ul
            LEFT JOIN _license l ON l.code = ul.code
        WHERE
            ul.character_id = @characterId
            AND l.is_active = 1
    ]]

    local result = Await(SQL.execute(query, {
        characterId = characterId
    }))

    if not result then return false, "" end

    return true, result
end

function getAllLicenses()
    local query = [[
        SELECT * FROM _license
    ]]

    local result = Await(SQL.execute(query))

    if not result then return false, "" end

    return true, result
end

function getStateAccess(pSource)
	local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
	local job = user:getVar("job")

    if job == "senator" or user.character.id == 1 then
        return true, {
            modules = { "licenses_management", "bank_management", "loan_management", "tax_management", "ballot_management", "farmers_management", "phonelogs_management" }, -- ""create_licenses_management"
            permissions = { "grant_license", "revoke_license" }
        }
    end

    if job == "judge" then
        return true, {
            modules = { "licenses_management", "bank_management", "loan_management", "phonelogs_management" } -- "create_licenses_management"
        }
    end

    if job == "mayor" then
        return true, {
            modules = { "tax_management", "ballot_management" }
        }
    end

    TriggerClientEvent("DoLongHudText", pSource, "No Access.", 2)

    return false, {}
end

function getCharacterDetails(data)
    local searchType = data.type
    local character = data.character

    if searchType ~= "name" and searchType ~= "id" then
        return false, "Invalid search type"
    end

    local query = [[
        SELECT * FROM characters
    ]]

    local params = {}

    if searchType == "name" then
        query = query .. " WHERE first_name LIKE @name OR last_name LIKE @name"
        params.name = "%" .. data.name .. "%"
    else
        query = query .. " WHERE id = @character"
        params.character = data.id
    end

    local result = Await(SQL.execute(query, params))

    if not result then return false, "Could not get character details" end

    return true, result
end

function checkLicenseForCharacter(cid, name)
    local query = [[
        SELECT
            ul.`status`,
            l.name
        FROM
            user_licenses ul
            LEFT JOIN _license l ON l.code = ul.code
        WHERE
            ul.character_id = @characterId
            AND l.name = @name
    ]]

    local result = Await(SQL.execute(query, {
        characterId = cid,
        name = name
    }))

    if not result or #result == 0 then return false end

    return result[1].status == 1 and true or false
end

function revokeLicense(licenseName, targetId, characterId)
    local license = Await(SQL.execute("SELECT * FROM _license WHERE name = @name", {
        name = licenseName
    }))

    if not license then return false, "Could not get license" end

    local query = [[
        UPDATE user_licenses
        SET status = 0
        WHERE character_id = @characterId
        AND code = @code
    ]]

    local result = Await(SQL.execute(query, {
        characterId = targetId,
        code = license[1].code
    }))

    if not result then return false, "Could not revoke license" end

    return true, result
end

function grantLicense(targetId, licenseId, characterId)
    local license = Await(SQL.execute("SELECT * FROM _license WHERE id = @id", {
        id = licenseId
    }))

    if not license then return false, "Could not get license" end

    local hasLicense = Await(SQL.execute("SELECT COUNT(*) AS total FROM user_licenses WHERE character_id = @characterId AND code = @code", {
        characterId = targetId,
        code = license[1].code
    }))

    local query = [[]]

    if hasLicense[1].total > 0 then
        query = [[
            UPDATE user_licenses
            SET status = 1
            WHERE character_id = @characterId
            AND code = @code
        ]]
    else
        query = [[
            INSERT INTO user_licenses (character_id, code, status)
            VALUES (@characterId, @code, 1)
        ]]
    end

    local result = Await(SQL.execute(query, {
        characterId = targetId,
        code = license[1].code
    }))

    if not result then return false, "Could not grant license" end

    return true, result
end