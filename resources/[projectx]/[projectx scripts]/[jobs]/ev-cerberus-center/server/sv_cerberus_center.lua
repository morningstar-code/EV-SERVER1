local previewOfficesLocked = false

local ownedOfficesLockState = {}

function doElevatorAction(pSource, pData)
    if pData.type == "lock" then
        previewOfficesLocked = true
        return TriggerClientEvent("DoLongHudText", pSource, "Offices are now locked", 1)
    elseif pData.type == "unlock" then
        previewOfficesLocked = false
        return TriggerClientEvent("DoLongHudText", pSource, "Offices are now unlocked", 1)
    elseif pData.type == "preview" then
        if previewOfficesLocked then return TriggerClientEvent("DoLongHudText", pSource, "Offices are locked", 2) end
        return TriggerClientEvent("ev-cbc:office", pSource, tonumber(pData.office), ("cbc_preview_%s"):format(pData.office))
    end
end

function addBusinessToCenter(pSource, pBusinessId, pOfficeType)
    local query = [[
        INSERT INTO _cerberus_office
        (business_id, office_type)
        VALUES
        (@business_id, @office_type)
    ]]

    local result = Await(SQL.execute(query, {
        business_id = pBusinessId,
        office_type = pOfficeType
    }))

    return TriggerClientEvent("DoLongHudText", pSource, result and "Successfully added business to center" or "Failed to add business to center", result and 1 or 2)
end

function deleteBusinessFromCenter(pSource, pCbcId)
    local query = [[
        DELETE FROM
            _cerberus_office
        WHERE
            id = @id
    ]]

    local result = Await(SQL.execute(query, {
        id = pCbcId
    }))

    return TriggerClientEvent("DoLongHudText", pSource, result and "Successfully deleted business from center" or "Failed to delete business from center", result and 1 or 2)
end

function getCreatedOffices()
    local query = [[
        SELECT
            co.id,
            co.office_type as 'type',
            co.business_id,
            b.name
        FROM
            _cerberus_office co
            LEFT JOIN _business b ON b.id = co.business_id
    ]]

    local result = Await(SQL.execute(query))

    if not result then return {} end

    return result
end

function actionOffice(pSource, pAction, pOffice, pCid, pIsGov)
    local isCerberusEmployee = exports["ev-business"]:IsEmployedAtBusiness({ character = { id = pCid }, business = { id = "cerberus" } })
    local isEmployed = exports["ev-business"]:IsEmployedAtBusinessById(pSource, pOffice.business_id)
    if pAction == "visit" then
        if not pIsGov and ownedOfficesLockState[pOffice.id] then return TriggerClientEvent("DoLongHudText", pSource, "This office is locked!", 2) end
        return TriggerClientEvent("ev-cbc:office", pSource, tonumber(pOffice.type), ("cbc_%s"):format(pOffice.id))
    elseif pAction == "lock" then
        if not isCerberusEmployee and not isEmployed then return TriggerClientEvent("DoLongHudText", pSource, "You are not employed at this business!", 2) end

        ownedOfficesLockState[pOffice.id] = true

        return TriggerClientEvent("DoLongHudText", pSource, "Office is now locked", 1)
    elseif pAction == "unlock" then
        if not isCerberusEmployee and not isEmployed then return TriggerClientEvent("DoLongHudText", pSource, "You are not employed at this business!", 2) end

        ownedOfficesLockState[pOffice.id] = false

        return TriggerClientEvent("DoLongHudText", pSource, "Office is now unlocked", 1)
    elseif pAction == "unlockvisit" then -- IDK
        if not isCerberusEmployee and not isEmployed then return TriggerClientEvent("DoLongHudText", pSource, "You are not employed at this business!", 2) end
    end
end