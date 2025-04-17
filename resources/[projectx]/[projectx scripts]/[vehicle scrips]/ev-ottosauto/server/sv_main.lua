
--Rhodinium Ottos

RPC.register("ev-ottosauto:getVehicleOwner", function(src, vin)
    exports.oxmysql:execute("SELECT * FROM _vehicle WHERE `vin` = @vin",{["@vin"] = vin},function(result)
        if result[1] ~= nil then
            if result[1].sellable == "2" then
                return true
            else
                return false
            end
        end
        return false
    end)
end) 

RPC.register("ev-ottosauto:addVehicle", function(src, vehicleData)
    exports.oxmysql:execute("INSERT INTO _vehicle (vin, owner, sellable) VALUES (@vin, @owner, @sellable)", 
    {
        ["@vin"] = vehicleData.vin,
        ["@owner"] = vehicleData.owner,
        ["@sellable"] = vehicleData.sellable
    }, 
    function(result)
        if result then
            return true
        else
            return false
        end
    end)
end)