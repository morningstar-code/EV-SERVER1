local nltsDrivers = {}

local function getDriverByCharacterId(pCharacterId)
    for k,v in pairs(nltsDrivers) do
        if v.cid == pCharacterId then
            return v, k
        end
    end

    return nil
end

function fetchNltsDrivers()
    return true, nltsDrivers
end

function nltsAddCharOnDuty(pSource)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false, nltsDrivers end

    if getDriverByCharacterId(user.character.id) then return false, nltsDrivers end

    nltsDrivers[#nltsDrivers+1] = {
        cid = user.character.id,
        name = user.character.first_name .. " " .. user.character.last_name,
        status = "Available",
        phoneNumber = user.character.phone_number
    }

    return true, nltsDrivers
end

function nltsRemoveCharFromDuty(pSource)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false, nltsDrivers end

    if not getDriverByCharacterId(user.character.id) then return false, nltsDrivers end

    local driver, index = getDriverByCharacterId(user.character.id)
    if not driver then return false, nltsDrivers end
    if not index then return false, nltsDrivers end

    table.remove(nltsDrivers, index)

    return true, nltsDrivers
end

function nltsUpdateDriverStatus(pSource, pStatus)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false, nltsDrivers end

    if not getDriverByCharacterId(user.character.id) then return false, nltsDrivers end

    local driver, index = getDriverByCharacterId(user.character.id)
    if not driver then return false, nltsDrivers end
    if not index then return false, nltsDrivers end

    nltsDrivers[index].status = pStatus

    return true, nltsDrivers
end