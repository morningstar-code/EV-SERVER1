
RPC.register("rentals:purchaseVehicle", function(src, data)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)

    local accountResult, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not accountResult then return false, accountId end

    local balance = exports["ev-financials"]:getAccountBalance(accountId)

    if tonumber(user.character.cash) >= tonumber(data.price) then
        user:removeMoney(tonumber(data.price))
    elseif balance >= data.price then
        if not exports["ev-financials"]:adjustAccountBalance(accountId, "remove", data.price) then -- TODO: Make it go into a rental business account?
            return false
        end
    end

    return true, "done"
end)

RPC.register("rentals:getVehicleKey", function(src, vin)
    TriggerClientEvent("vehicle:keys:addNew", src, vin)
end)

RPC.register("ev:vehicles:rentalSpawn", function(src, model, coords, heading)
    -- exports["ev-vehicles"]:BasicSpawn(src, model, coords, heading, 'menu', nil, vin, addMods)

    local vehicle = CreateVehicle(model, coords.x, coords.y, coords.z, heading , true, false)
    local timeout = 100

    while not DoesEntityExist(vehicle) do
        Wait(10)
        timeout = timeout - 1
        if timeout <= 0 then
            return
        end
    end
    local pNet = NetworkGetNetworkIdFromEntity(vehicle)

    return pNet
end)