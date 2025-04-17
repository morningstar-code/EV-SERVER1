function getCarConfig(shop)
    -- the shop is the column name in the database
    local query = "SELECT * FROM _car_config"
    if shop == "pdm" then
        query = "SELECT * FROM _car_config WHERE pdm = 1"
    elseif shop == "tuner" then
        query = "SELECT * FROM _car_config WHERE tuner = 1"
    end

    local carConfig = Await(SQL.execute(query))
    if not carConfig then return {
        {
            active = true,
            name = "Sultan",
            brand = "Karin",
            group = "Sports",
            model = "sultan",
            hash = GetHashKey("sultan"),
            import_price = 100000,
            retail_price = 150000,
            current_stock = 5,
        }
    } end

    return carConfig
end

function getCarPresets()
    return {}
end

function changeSpawnedCar(location, index, model)
    local locationConfig = getConfigFor(location)
    if not locationConfig then return end

    local carSpawns = locationConfig.carSpawns
    local carSpawn = carSpawns[index]
    carSpawn.model = model

    TriggerClientEvent("showroom:updateCarSpawns", -1, carSpawns)

    return true
end

function offerVehicle(data)
    local stateId = data.state_id

    local serverId = FindPlayerIdById(stateId)
    if not serverId then return end

    TriggerClientEvent("showroom:purchaseVehiclePrompt", serverId, {
        price = data.price,
        tax = 0, -- TODO;
        _data = data
    })

    return true
end

function purchaseVehicle(purchee, model, data, location, isFromCatalog)
    print("purchaseVehicle", purchee, model, data, location, isFromCatalog)
    local _data = data._data
    local seller = _data.character
    local purchaser = exports["ev-base"]:getModule("Player"):GetUser(tonumber(purchee))
    if not purchaser then return false, "Unknown error" end

    local car = Await(SQL.execute("SELECT * FROM _car_config WHERE model = @model", {
        model = model
    }))
    if not car then return false, "Unknown error" end

    print("car valid")

    if tonumber(data.price) < tonumber(car[1].import_price) then return false, "Price too low" end
    if tonumber(car[1].current_stock) <= 0 then return false, "Car is not in stock" end

    print("price valid")

    local vin = exports["ev-vehicles"]:GetVehicleIdentifier(_data.vehicle_net_id)
    if not vin then return false, "Invalid VIN" end

    print("vin valid")

    local name = _data.vehicle_name

    local accountResult, accountId = exports["ev-financials"]:getDefaultBankAccount(purchaser.character.id, false, false)
    if not accountResult then return false, accountId end

    print("account valid")

    local balance = exports["ev-financials"]:getAccountBalance(accountId)

    if tonumber(balance) < tonumber(data.price) then return false, "Not enough balance in bank account" end

    local businessAccountResult, businessAccountId = exports["ev-financials"]:getBusinessAccountId(location or "pdm")
    if not businessAccountResult then return false, businessAccountId end

    print("business account valid")

    local transactionResult = exports["ev-financials"]:DoBusinessTransaction(-1, accountId, businessAccountId, tonumber(data.price), 3, "Vehicle Purchase", purchaser.character.id, tonumber(data.price), "purchase")
    if not transactionResult then return false, "Failed to complete transaction" end

    print("transaction valid")

    local vehicleInfo = exports["ev-vehicles"]:GenerateVehicleInfo(tonumber(purchee), purchaser.character.id, model, 'owned', location or "pdm")
    if not vehicleInfo then return false, "Unknown error" end

    print("vehicle info valid")

    local result = Await(SQL.execute('INSERT INTO _vehicle (cid, vin, model, state, garage, plate, name, type, degradation, metadata, damage, mods, appearance) VALUES (@cid, @vin, @model, @state, @garage, @plate, @name, @type, @degradation, @metadata, @damage, @mods, @appearance)',{
        ['@cid'] = purchaser.character.id,
        ['@vin'] = vin,
        ['@model'] = model,
        ['@state'] = "out",
        ['@garage'] = vehicleInfo.garage,
        ['@plate'] = vehicleInfo.plate,
        ['@name'] = nil,
        ['@type'] = vehicleInfo.type,
        ['@degradation'] = json.encode(vehicleInfo.degradation),
        ['@metadata'] = json.encode(vehicleInfo.metadata),
        ['@damage'] = json.encode(vehicleInfo.damage),
        ['@mods'] = json.encode(vehicleInfo.mods),
        ['@appearance'] = json.encode(vehicleInfo.appearance)
    }))

    if not result then return false, "Unknown error" end

    print("vehicle info inserted")

    local plate = vehicleInfo.plate
    SetVehicleNumberPlateText(NetworkGetEntityFromNetworkId(_data.vehicle_net_id), plate)

    local stock = Await(SQL.execute("UPDATE _car_config SET current_stock = current_stock - 1 WHERE model = @model", {
        model = model
    }))
    if not stock then return false, "Unknown error" end

    print("stock updated")

    local content = getRegistrationText(name, model, plate, vin, purchaser.character, seller)
    local title = model .. " - " .. plate
    local registration = exports["ev-phone"]:CreateDocument(purchaser.character.id, content, title, 4)
    if not registration then return false, "Unknown error" end

    print("registration created")
    
    exports["ev-vehicles"]:AddKey(purchee, vin)

    testDriveVehicles[_data.vehicle_net_id] = nil

    local carSale = Await(SQL.execute("INSERT INTO _car_sale (vin, model, sell_price, buyer_name, seller_name, sell_date) VALUES (@vin, @model, @sell_price, @buyer_name, @seller_name, @sell_date)", {
        vin = vin,
        model = model,
        sell_price = data.price,
        buyer_name = purchaser.character.first_name .. " " .. purchaser.character.last_name,
        seller_name = seller.first_name .. " " .. seller.last_name,
        sell_date = os.date("%Y-%m-%d")
    }))
    if not carSale then return false, "Unknown error" end

    print("car sale created")

    return true
end

function purchaseCatalogPrompt(data)
    return true
end

function purchaseJobVehicle(data)
    return true
end