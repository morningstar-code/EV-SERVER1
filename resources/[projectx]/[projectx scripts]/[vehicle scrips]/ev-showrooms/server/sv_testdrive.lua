testDriveVehicles = {}

function hasStock(model)
    local carConfig = Await(SQL.execute("SELECT * FROM _car_config WHERE model = @model", {
        model = model
    }))
    if not carConfig then return false end

    return carConfig[1].current_stock > 0 or false
end

function stockIncrease(model)
    local carConfig = Await(SQL.execute("SELECT * FROM _car_config WHERE model = @model", {
        model = model
    }))
    if not carConfig then return false end

    local currentStock = carConfig[1].current_stock
    local newStock = currentStock + 1

    local update = Await(SQL.execute("UPDATE _car_config SET current_stock = @newStock WHERE model = @model", {
        newStock = newStock,
        model = model
    }))
    if not update then return false end

    return true
end

function stockDecrease(model)
    local carConfig = Await(SQL.execute("SELECT * FROM _car_config WHERE model = @model", {
        model = model
    }))
    if not carConfig then return false end

    local currentStock = carConfig[1].current_stock
    local newStock = currentStock - 1

    local update = Await(SQL.execute("UPDATE _car_config SET current_stock = @newStock WHERE model = @model", {
        newStock = newStock,
        model = model
    }))
    if not update then return false end

    return true
end

function testDriveVehicle(source, model, testDriveSpawnPoint, zoneName)
    local spawnedVehicle = exports["ev-vehicles"]:BasicSpawn(source, model, {
        x = testDriveSpawnPoint.x,
        y = testDriveSpawnPoint.y,
        z = testDriveSpawnPoint.z
    }, testDriveSpawnPoint.w, zoneName or "menu")
    if not spawnedVehicle then return end
    
    testDriveVehicles[spawnedVehicle.netId] = {
        model = model
    }

    return spawnedVehicle.netId or false
end

function isTestDriveVehicle(netId)
    return testDriveVehicles and testDriveVehicles[netId] or false
end

function getTestDriveVehicleModelName(netId)
    return testDriveVehicles and testDriveVehicles[netId] and testDriveVehicles[netId].model or false
end

function saveTestDrivePreset(netId, fitment)
    return true
end

function returnCurrentVehicle(netId)
    testDriveVehicles[netId] = nil

    local vehicle = NetworkGetEntityFromNetworkId(netId)
    if not vehicle then return end

    DeleteEntity(vehicle)

    return true
end