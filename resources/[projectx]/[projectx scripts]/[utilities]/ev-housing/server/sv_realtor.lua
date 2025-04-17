local defaultInformations = {
    ["origin_offset"] = vector3(0.0, 0.0, 0.0),
    ["backdoor_coordinates"] = {
        ["internal"] = vector3(0.0, 0.0, 0.0),
        ["external"] = vector3(0.0, 0.0, 0.0),
    },
    ["garage_coordinates"] = vector4(0.0, 0.0, 0.0, 0.0),
    ["charChanger_offset"] = vector3(0.0, 0.0, 0.0),
    ["inventory_offset"] = vector3(0.0, 0.0, 0.0),
}

local housingEditing = {}

RegisterNetEvent("ev-housing:sell")
AddEventHandler("ev-housing:sell", function(pCid, pPropertyId)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local seller = user:getCurrentCharacter().id
    if not seller or seller == 0 then
        TriggerClientEvent("DoLongHudText", src, "Seller not found", 2)
        return
    end

    local pBuyer = exports["ev-base"]:getModule("Player"):GetUser(pCid) 
    local buyer = user:getCurrentCharacter().id
    if not buyer or buyer == 0 then
        TriggerClientEvent("DoLongHudText", src, "Buyer not found", 2)
        return
    end

    TriggerClientEvent("ev-housing:buy", buyer, pPropertyId, seller)
end)

RegisterNetEvent("CheckFurniture")
AddEventHandler("CheckFurniture", function(pData, pPropertyId)
    local src = source

    if housingEditing[pPropertyId] ~= nil then
        TriggerClientEvent("DoLongHudText", src, "Someone is already decorating this property", 2)
    else
        housingEditing[pPropertyId] = src
        TriggerClientEvent("ev-editor:loadEditor", src, pData)
    end
end)

RegisterNetEvent("exitFurniture")
AddEventHandler("exitFurniture", function(pPropertyId)
    if housingEditing[pPropertyId] ~= nil then
        housingEditing[pPropertyId] = nil
    end
end)

AddEventHandler("playerDropped", function()
	local src = source


    for k, v in pairs(housingEditing) do
        if v == src then
            housingEditing[k] = nil
        end
    end
end)

RPC.register("AttemptHousingContract", function(src, pPropertyId, pPropertyZone)
    if not pPropertyId or not src then return false, "propertyID or src not found" end

    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    local cat = "housing"

    if not cid or cid == 0 then
        return false, "ID not found"
    end

    local success, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end

    if not accountId then
        return false, "Error searching account"
    end

    local price = GetPriceFromZone(pPropertyZone)
    local bank = exports["ev-financials"]:getAccountBalance(accountId)
    local tax = exports["ev-financials"]:PriceWithTaxString(price, "Property Tax")

    if bank < tax.total then
        return false, "You do not have $" .. tax.total .. " in your account"
    end

    local s, v = isPropertyAvailable(pPropertyId)

    if not s then
        return s, v
    end

    local s = exports["ev-financials"]:adjustAccountBalance(accountId, "remove", tax.total)

    if not s then
        return false, "You do not have $" .. tax.total
    end
    
    if Housing.info[tonumber(pPropertyId)]["model"] == "ghost_stash_houses_01" then
        cat = "warehouse"
    end

    local insertId = MySQL.insert.await([[
        INSERT INTO housing (hid, cid, information, objects, last_payment, street, category)
        VALUES (?, ?, ?, ?, UNIX_TIMESTAMP(), ?, ?)
    ]],
    { pPropertyId, cid, json.encode(defaultInformations), "{}", Housing.info[tonumber(pPropertyId)]["Street"], cat})

    if not insertId or insertId < 1 then
        return false, "Database insert eror"
    end

    return true, {}
end)

RPC.register("ev-housing:rent", function(src, pPropertyId, pTotal, pTax)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid or cid == 0 then
        return false, "ID not found"
    end

    local success, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end
    local groupBank = exports["ev-groups"]:groupBank("real_estate")

    if not accountId or not groupBank then
        return false, "Error searching account"
    end

    local bank = exports["ev-financials"]:getAccountBalance(accountId)
    if bank < pTotal then
        return false, "You don't own $" .. pTotal .. " in your account"
    end

    local comment = "Property rental payment " .. Housing.info[tonumber(pPropertyId)]["Street"]
    local success, message = exports["ev-financials"]:transaction(accountId, groupBank, pTotal, comment, cid, 5)
    if not success then
        return false, message
    end

    local insertId = MySQL.insert.await([[
        INSERT INTO housing (hid, cid, information, objects, last_payment, street)
        VALUES (?, ?, ?, ?, UNIX_TIMESTAMP(), ?)
    ]],
    { pPropertyId, cid, json.encode(defaultInformations), "{}", Housing.info[tonumber(pPropertyId)]["Street"] })

    if not insertId or insertId < 1 then
        return false, "Database insert erorr"
    end

    TriggerClientEvent("DoLongHudText", src, "You rented " .. Housing.info[tonumber(pPropertyId)]["Street"])

    return true, getCurrentOwned(src)
end)

RPC.register("updateCurrentSelected", function(src, pPropertyId, pInformation, pOrigin)
    if pInformation["id"] then
        pInformation["id"] = nil
    end

    local affectedRows = MySQL.update.await([[
        UPDATE housing
        SET information = ?
        WHERE hid = ?
    ]],
    { json.encode(pInformation), pPropertyId })

    if not affectedRows or affectedRows < 1 then
        return false
    end

    local info = pInformation
    local name = Housing.info[pPropertyId]["Street"]

    local data = {
        ["houseid"] = pPropertyId,
        ["type"] = "car",
        ["pos"] = info.garage_coordinates,
        ["distance"] = 50,
        ["spaces"] = {info.garage_coordinates}
    }

    -- exports["ev-vehicles"]:setGarage(name, data, nil, false)

    return true
end)

RPC.register("objects:getObjects", function(src, pName)
    local data = {}
    data["name"] = pName
    data["objects"] = {}

    local result = MySQL.scalar.await([[
        SELECT objects
        FROM housing
        WHERE hid = ?
    ]],
    { pName })

    if result and type(result) == "string" then
        data["objects"] = json.decode(result)
    end

    return data
end)

RPC.register("objects:saveObjects", function(src, pDataToSend)
    print("HELLO!")
    local data = {}
    data["name"] = pDataToSend["name"]
    data["objects"] = pDataToSend["objects"]

    print(json.encode(pDataToSend["objects"]))
    print(pDataToSend["name"])

    local result = MySQL.update.await([[
        UPDATE housing
        SET objects = ?
        WHERE hid = ?
    ]],
    { json.encode(pDataToSend["objects"]), pDataToSend["name"] })

    return data
end)

RPC.register("ev-housing:owned", function(src)
    local result = MySQL.query.await([[
        SELECT hid
        FROM housing
    ]])

    local houses = {}
    for i, v in ipairs(result) do
        houses[v.hid] = true
    end

    return houses
end)

Citizen.CreateThread(function()
    local houses = MySQL.query.await([[
        SELECT hid, information
        FROM housing
    ]])

    for i, v in ipairs(houses) do
        local info = json.decode(v.information)
        local name = Housing.info[tonumber(v.hid)]["Street"]
        local vector = vector4(info.garage_coordinates["x"], info.garage_coordinates["y"], info.garage_coordinates["z"], info.garage_coordinates["w"])

        local data = {
            ["houseid"] = v.hid,
            ["type"] = "car",
            ["pos"] = vector,
            ["distance"] = 50,
            ["spaces"] = {vector}
        }

        -- exports["ev-vehicles"]:setGarage(name, data, nil, false)
    end
end)