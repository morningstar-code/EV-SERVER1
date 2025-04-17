policeList = {
    [1] = {
        model = "npolblazer",
        name = "4 Wheel Bike",
        retail_price = 5000,
        first_free = false,
    },
    [2] = {
        model = "npolvic",
        name = "Ford Victoria",
        retail_price = 15000,
        first_free = true,
    },
    [3] = {
        model = "npolmm",
        name = "NAGASAKI",
        retail_price = 20000,
        first_free = false,
    },
    [4] = {
        model = "npolexp",
        name = "Ford Explorer",
        retail_price = 25000,
        first_free = false,
    },
    [5] = {
        model = "npolchar",
        name = "Dodge Charger",
        retail_price = 35000,
        first_free = false,
    },
    [6] = {
        model = "npolchal",
        name = "Dodge Challenger",
        retail_price = 45000,
        first_free = false,
    },
    [7] = {
        model = "npolvette",
        name = "Chevrolet Corvette",
        retail_price = 65000,
        first_free = false,
    },
    [8] = {
        model = "npolstang",
        name = "Ford Mustang",
        retail_price = 55000,
        first_free = false,
    },
    [9] = {
        model = "polas350",
        name = "Helicopter",
        retail_price = 55000,
        first_free = false,
    },
}

emsList = {
    [1] = {
        model = "emsnspeedo",
        name = "Ambulance",
        retail_price = 5000,
        first_free = false,
    },
    [2] = {
        model = "EMSV",
        name = "Ambulance 2",
        retail_price = 5000,
        first_free = false,
    },
    [3] = {
        model = "emsaw139",
        name = "Helicopter",
        retail_price = 5000,
        first_free = false,
    },
}

RPC.register("polcars:getPolcars", function(src, zone)
    if zone == "police" then
        return policeList
    else
        return emsList
    end
end)

RPC.register("polcars:checkOwnedStatus", function(src, model)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local info = user:getCurrentCharacter()
    model = "npolvic"
    exports.oxmysql:execute("SELECT * FROM _vehicle WHERE cid = @cid", {["cid"] = info.id}, function(vehicles)  
        for k,v in pairs(vehicles) do 
            if vehicles[k].model == model then
                TriggerClientEvent("stupid:cunt", src, true)
                return
            end
        end
        TriggerClientEvent("stupid:cunt", src, false)
    end)
end)

RPC.register("polcars:purchasePolcar", function(src, vehicles, data, pJob)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local info = user:getCurrentCharacter()

    if vehicles == "police" then
        for k,v in pairs(policeList) do 
            if policeList[k].model == data.key then
                local bank = exports["ev-financials"]:getAccountBalance(6) 
                if bank > policeList[k].retail_price then
                    local vehicleData = exports["ev-vehicles"]:GenerateVehicleInfo(src, info.id, data.model, "pd", "pd", false, policeList[k].name, false, false, false, pJob)
                    local comment = "Bought " .. policeList[k].name .. " for " .. policeList[k].retail_price
                    TriggerEvent("ev:vehicles:InsertVehicleData", src, vehicleData)        

                    if not exports["ev-financials"]:DoTransaction(src, 6, 5, policeList[k].retail_price, comment, "Vehicle Sales", "purchase") then 
                        return false, "Not enough money in the San Andreas State Police Bank account!"
                    end

                    return true , "You purchased " .. policeList[k].name .. " you may find in the PD Shared Garage"
                else
                    return false, "Not enough money in the San Andreas State Police Bank account!"
                end
            end
        end
    else
        for k,v in pairs(emsList) do 
            if emsList[k].model == data.key then
                local bank = exports["ev-financials"]:getAccountBalance(12) 
                if bank > emsList[k].retail_price then
                    local vehicleData = exports["ev-vehicles"]:GenerateVehicleInfo(src, info.id, data.model, "pd", "pd", nil, emsList[k].name, false, false, false, pJob)
                    TriggerEvent("ev:vehicles:InsertVehicleData", src, vehicleData)        

                    local comment = "Bought " .. emsList[k].name .. " for " .. emsList[k].retail_price
                    if not exports["ev-financials"]:DoTransaction(src, 12, 5, emsList[k].retail_price, comment, "Vehicle Sales", "purchase") then 
                        return false, "Not enough money in the Emergency Medical Services Bank account!"
                    end

                    return true , "You purchased " .. emsList[k].name .. " you may find in the EMS Shared Garage"
                else
                    return false, "Not enough money in the Emergency Medical Services Bank account!"
                end
            end
        end
    end
end)