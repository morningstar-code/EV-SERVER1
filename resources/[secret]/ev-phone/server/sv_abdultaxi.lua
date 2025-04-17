local abdulDrivers = {}

local function getDriverByCharacterId(pCharacterId)
    for k,v in pairs(abdulDrivers) do
        if v.cid == pCharacterId then
            return v, k
        end
    end

    return nil
end

function fetchAbdulDrivers()
    return true, abdulDrivers
end

function abdulAddCharOnDuty(pSource)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false, abdulDrivers end

    if getDriverByCharacterId(user.character.id) then return false, abdulDrivers end

    abdulDrivers[#abdulDrivers+1] = {
        cid = user.character.id,
        name = user.character.first_name .. " " .. user.character.last_name,
        status = "Available",
        phoneNumber = user.character.phone_number
    }

    return true, abdulDrivers
end

function abdulRemoveCharFromDuty(pSource)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false, abdulDrivers end

    if not getDriverByCharacterId(user.character.id) then return false, abdulDrivers end

    local driver, index = getDriverByCharacterId(user.character.id)
    if not driver then return false, abdulDrivers end
    if not index then return false, abdulDrivers end

    table.remove(abdulDrivers, index)

    return true, abdulDrivers
end

function abdulUpdateDriverStatus(pSource, pStatus)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false, abdulDrivers end

    if not getDriverByCharacterId(user.character.id) then return false, abdulDrivers end

    local driver, index = getDriverByCharacterId(user.character.id)
    if not driver then return false, abdulDrivers end
    if not index then return false, abdulDrivers end

    abdulDrivers[index].status = pStatus

    return true, abdulDrivers
end