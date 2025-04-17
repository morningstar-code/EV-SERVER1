Housing.currentHousingLocks = {}
Housing.currentHousingLockdown = {}
Housing.BuisnessLocations = {}
Housing.Players = {}

function getCurrentOwned(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local char = user:getCurrentCharacter()
    if not char.id then return {} end

    local result = MySQL.query.await([[
        SELECT *, DATEDIFF(FROM_UNIXTIME(UNIX_TIMESTAMP()), FROM_UNIXTIME(last_payment)) AS last_payment
        FROM housing
        WHERE cid = ?
    ]],
    { char.id })

    local owned = {}
    for i, v in ipairs(result) do 
        owned[tonumber(v.hid)] = {
            housingOwnedBy = {
                first_name = char.first_name,
                last_name = char.last_name,
            },
            housingKeys = {},
            id = tonumber(v.hid),
            is_locked = v.status,
            housingName = Housing.info[tonumber(v.hid)]["Street"],
            housingCat = v.category,
            housingInformation = v.information,

            property_id = tonumber(v.hid),
            propertyname = Housing.info[tonumber(v.hid)]["Street"],
            category = v.category,
            pos = Housing.info[tonumber(v.hid)][1],
            locked = v.status,
            cid = v.cid,
        }
    end

    return owned
end

function GetHouseZone(hId)
    local zone = nil

    for k, v in pairs(Housing.zone) do 
        for _, index in pairs(Housing.zone[k]['locations']) do 
            if _ == tonumber(hId) then
                zone = Housing.zone[k]["zoneName"]
            end
        end
    end

    return zone
end

function GetPriceFromZone(pZone)
    local price = nil

    for k, v in pairs(Housing.zoningPrices) do 
        if k == pZone then
            price = Housing.zoningPrices[pZone]["baseSellPrice"]
        end
    end

    return price
end

function currentKeys(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local char = user:getCurrentCharacter()
    if not char.id then return {} end

    local result = MySQL.query.await([[
        SELECT k.hid, DATEDIFF(FROM_UNIXTIME(UNIX_TIMESTAMP()), FROM_UNIXTIME(h.last_payment)) AS last_payment
        FROM housing_keys k
        INNER JOIN housing h ON h.hid = k.hid
        WHERE k.cid = ?
    ]],
    { char.id })

    local Keys = {}

    for i, v in ipairs(result) do
        Keys[tonumber(v.hid)] = {
            information = {
                housingName = v.housename,
                name = {
                    first_name = char.first_name,
                    last_name = char.last_name,
                },
            },
            key_id = tonumber(v.hid),
            property_id = tonumber(v.hid),
            propertyname = Housing.info[tonumber(v.hid)]["Street"],
            category = v.category,
            pos = Housing.info[tonumber(v.hid)][1],
            cid = v.cid
        }
    end

    return Keys
end

exports("getCurrentOwned", getCurrentOwned)
exports("currentKeys", currentKeys)
exports("GetHouseZone", GetHouseZone)
exports("GetPriceFromZone", GetPriceFromZone)

RegisterNetEvent("ev-housing:enterHouse")
AddEventHandler("ev-housing:enterHouse", function(pPropertyId)
    local src = source
    Housing.Players[src] = pPropertyId
end)

RegisterNetEvent("ev-housing:leftHouse")
AddEventHandler("ev-housing:leftHouse", function(pPropertyId)
    local src = source
    Housing.Players[src] = nil
end)

RegisterNetEvent("ev-housing:CheckFurniture")
AddEventHandler("ev-housing:CheckFurniture", function(pData, pPropertyId)
    print("i got the data and should do some check then open editor...")
    local src = source
    local isOwner = getCurrentOwned(src)
    local hasKeys = currentKeys(src)

    for k,v in pairs(isOwner) do
        if v.property_id == pPropertyId then
            TriggerClientEvent("ev-editor:loadEditor", src, pData)
        else
            for x,s in pairs(hasKeys) do
                if s.property_id == pPropertyId then
                    TriggerClientEvent("ev-editor:loadEditor", src, pData)
                end
            end
        end
    end
end)

RPC.register("getCurrentOwned", function(src)
    return getCurrentOwned(src)
end)

RPC.register("GetHouseZone", function(src, hId)
    return GetHouseZone(hId)
end)

RPC.register("GetPriceFromZone", function(src, pZone)
    return GetPriceFromZone(pZone)
end)

RPC.register("getCostOfProperty", function(src, propertyId)
    local zone = GetHouseZone(propertyId)
    local price = GetPriceFromZone(zone)
    
    return price
end)

RPC.register("currentKeys", function(src)
    return currentKeys(src)
end)

RPC.register("getCurrentLockdown", function(src)
    return Housing.currentHousingLockdown
end)

RPC.register("getCurrentLocks", function(src)
    return Housing.currentHousingLocks
end)

RPC.register("getBuisnessLocations", function(src)
    return Housing.BuisnessLocations
end)

RPC.register("getCurrentSelected", function(src, pPropertyId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id

    local finished = true

    local _information = MySQL.scalar.await([[
        SELECT information
        FROM housing
        WHERE hid = ?
    ]],
    { pPropertyId })

    local housingInformation = {}
    if _information and type(_information) == "string" then
        housingInformation = json.decode(_information)
        for k, v in pairs(housingInformation) do
            if k == "backdoor_coordinates" then
                for k2, v2 in pairs(v) do
                    housingInformation[k][k2] = vector3(v2.x, v2.y, v2.z)
                end
            elseif k == "garage_coordinates" then
                if v.w then
                    housingInformation[k] = vector4(v.x, v.y, v.z, v.w)
                else
                    housingInformation[k] = vector3(v.x, v.y, v.z)
                end
            else
                housingInformation[k] = vector3(v.x, v.y, v.z)
            end
        end
    end

    local currentHousingLocks = Housing.currentHousingLocks

    local keys = currentKeys(src)
    for k, v in pairs(keys) do
        currentHousingLocks[k] = false
    end

    local _result = MySQL.scalar.await([[
        SELECT id
        FROM housing
        WHERE hid = ? AND cid = ?
    ]],
    { pPropertyId, cid })

    local isResult = false
    if _result then
        isResult = true
    end

    local housingLockdown = Housing.currentHousingLockdown

    local housingRobbed = Housing.housingBeingRobbed

    local robTargets = {}
    if Housing.housingRobTargets[pPropertyId] ~= nil then
        robTargets = Housing.housingRobTargets[pPropertyId]
    end

    local robLocations = {}
    if Housing.robPosLocations[pPropertyId] ~= nil then
        robLocations = Housing.robPosLocations[pPropertyId]
    end

    local alarm = false
    if Housing.alarm[pPropertyId] ~= nil then
        alarm = Housing.alarm[pPropertyId]
    end

    local currentAccess = {}

    return finished, housingInformation, currentHousingLocks, isResult, housingLockdown, housingRobbed, robTargets, robLocations, alarm, currentAccess
end)

RPC.register("ev-phone:getHouseKeys", function(src, pHouseId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return {} end

    local keys = MySQL.query.await([[
        SELECT k.hid as house_id, k.cid AS player_cid, CONCAT(c.first_name," ",c.last_name) as player_name
        FROM housing_keys k
        INNER JOIN characters c ON c.id = k.cid
        WHERE k.hid = ?
    ]],
    { pHouseId })

    for i, v in ipairs(keys) do
        keys[i]["house_name"] = Housing.info[tonumber(v.house_id)]["Street"]
    end

    return keys
end)

RPC.register("ev-phone:giveKey", function(src, pHouseId, pPlayerId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return false, "ID not found" end

    local player = exports["ev-base"]:getModule("Player"):GetUser(pPlayerId) 
    local playerCid = user:getCurrentCharacter().id
    if not playerCid then return false, "ID not found" end

    local hasKey = MySQL.scalar.await([[
        SELECT id
        FROM housing_keys
        WHERE hid = ? AND cid = ?
    ]],
    { pHouseId, playerCid })

    if hasKey then
        return false, "The player already has the key to this house."
    end

    local insertId = MySQL.insert.await([[
        INSERT INTO housing_keys (hid, cid)
        VALUES (?, ?)
    ]],
    { pHouseId, playerCid })

    if not insertId or insertId < 1 then
        return false, "Database insert eror"
    end

    TriggerClientEvent("ev-phone:notification", pPlayerId, "fas fa-key", "Keys", "You received the property key " .. Housing.info[tonumber(pHouseId)]["Street"], 5000)
    TriggerClientEvent("ev-housing:refresh", pPlayerId)

    return true, "Key received"
end)

RPC.register("ev-phone:removeKey", function(src, pHouseId, pPlayerId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return false end

    local affectedRows = MySQL.update.await([[
        DELETE FROM housing_keys
        WHERE hid = ? AND cid = ?
    ]],
    { pHouseId, pPlayerId })

    if affectedRows and affectedRows > 0 then
        local pPlayerId = exports["ev-base"]:getSidWithCid(pPlayerId)
        if pPlayerId > 0 then
            TriggerClientEvent("ev-housing:refresh", pPlayerId)
        end

        return true
    end

    return false
end)

RPC.register("ev-phone:payHouse", function(src, pHouseId)
    if not pHouseId or not src then return false, "pHouseId or src not found" end

    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return false, "cid not found" end

    local Zone = GetHouseZone(pHouseId)
    local price = GetPriceFromZone(Zone)
    local tax = exports["ev-financials"]:PriceWithTaxString(price, "Property Tax")

    local success, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end
    local bank = exports["ev-financials"]:getAccountBalance(accountId)
    if bank < tax.total then
        return false, "You do not have $" .. tax.total .. " in your account"
    end

    local groupBank = exports["ev-groups"]:groupBank("real_estate")

    local comment = "Property rental payment " .. Housing.info[pHouseId]["Street"]
    local success, message = exports["ev-financials"]:transaction(accountId, groupBank, price, comment, cid, 5)
    if not success then
        return false, message
    end

    local affectedRows = MySQL.update.await([[
        UPDATE housing
        SET last_payment = last_payment + 604800
        WHERE hid = ?
    ]],
    { pHouseId })

    if not affectedRows or affectedRows < 1 then
        return false, "affectedRows ~= 1"
    end

    return true, "KEKW"
end)

RPC.register("ev-phone:removeSharedKey", function(src, pHouseId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return false end

    local affectedRows = MySQL.update.await([[
        DELETE FROM housing_keys
        WHERE hid = ? AND cid = ?
    ]],
    { pHouseId, cid })

    if affectedRows and affectedRows > 0 then
        TriggerClientEvent("ev-housing:refresh", src)
        return true
    end

    return false
end)

RPC.register("unlockProperty", function(src, pHouseId)
    if Housing.currentHousingLocks[pHouseId] ~= nil and Housing.currentHousingLocks[pHouseId] == false then
        return false, Housing.currentHousingLocks
    end
    local affectedRows = MySQL.update.await([[
        UPDATE housing
        SET status = ?
        WHERE hid = ?
    ]],
    { "unlock", tostring(pHouseId) })
    Housing.currentHousingLocks[pHouseId] = false
    return true, Housing.currentHousingLocks
end)

RPC.register("lockProperty", function(src, pHouseId)
    if Housing.currentHousingLocks[pHouseId] == nil then
        
        return false, Housing.currentHousingLocks
    end

    local affectedRows = MySQL.update.await([[
        UPDATE housing
        SET status = ?
        WHERE hid = ?
    ]],
    { "lock", tostring(pHouseId) })

    Housing.currentHousingLocks[pHouseId] = nil

    return true, Housing.currentHousingLocks
end)

RPC.register("SellOwnedProperty", function(src, pHouseId)
    local price = 0
    local Zone = GetHouseZone(pHouseId)
    local Price = GetPriceFromZone(Zone)
    
    local tax = exports["ev-financials"]:priceWithTax(Price, "Property Tax")
    price = tax.total / 2

    return price
end)

RPC.register("getHousingData", function(src, cid)
    return getHousingData(src, cid)
end)

RPC.register("property:getOwnerRaw", function(src, pPropertyId)
    local _information = MySQL.query.await([[
        SELECT *
        FROM housing
        WHERE hid = ?
    ]],
    { pPropertyId })
   
    if _information ~= nil then
        return _information
    end
end)

function getHousingData(src, cid)
    local result = MySQL.query.await([[
        SELECT *
        FROM character_motel
        WHERE cid = ?
    ]],
    { cid })

    local owned = getCurrentOwned(src)
    local access = currentKeys(src)

    return result[1].roomnum, result[1].btype, false, owned, access
end

function isPropertyAvailable(pPropertyId)
    local _information = MySQL.query.await([[
        SELECT *
        FROM housing
        WHERE hid = ?
    ]],
    { pPropertyId })

    if _information.hid then
        return false, "This Property Already Owned"
    end

    return true
end
