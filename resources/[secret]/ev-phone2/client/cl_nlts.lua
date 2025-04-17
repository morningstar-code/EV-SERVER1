RegisterUICallback("ev-ui:nlts:getDrivers", function(data, cb)
    local success, drivers = RPC.execute("ev-ui:nlts:fetchDrivers")
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)

RegisterUICallback("ev-ui:nlts:signOnDuty", function(data, cb)
    local success, drivers = RPC.execute("ev-ui:nlts:addCharOnDuty")
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)

RegisterUICallback("ev-ui:nlts:signOffDuty", function(data, cb)
    local success, drivers = RPC.execute("ev-ui:nlts:removeCharFromDuty")
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)

RegisterUICallback("ev-ui:nlts:callDriver", function(data, cb)
    cb({data = {}, meta = { ok = true, message = "done" }})
    local myNumber = exports["isPed"]:isPed("phone_number")
    local driverNumber = data.driver.number

    if (tostring(myNumber) == tostring(driverNumber)) then
        return
    end
    
    -- If for some reason the driver number is null do nothing
    if driverNumber == nil then return end
    RPC.execute("phone:callStart", tostring(myNumber), tostring(driverNumber))
end)

RegisterUICallback("ev-ui:nlts:updateStatus", function(data, cb)
    local success, drivers = RPC.execute("ev-ui:nlts:updateDriverStatus", data.status)
    cb({data = drivers, meta = { ok = true, message = "done" }})
end)