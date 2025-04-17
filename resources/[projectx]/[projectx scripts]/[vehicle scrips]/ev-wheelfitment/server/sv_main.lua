local isWheelFitmentInUse = false
local currentFitmentsToSet = {width = 0, fl = 0, fr = 0, rl = 0, rr = 0}

RPC.register("ev-wheelfitment_sv:saveWheelfitment", function(src, vin, currentFitmentsToSet)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    if not user then return end

    local data = MySQL.query.await([[
        SELECT *
        FROM _vehicle
        WHERE vin = ? 
    ]],
    { vin })

    if data[1] ~= nil then
        local metadata = json.decode(data[1].metadata)
        metadata.wheelFitment = currentFitmentsToSet

        local update = MySQL.update.await([[
            UPDATE _vehicle
            SET metadata = ?
            WHERE vin = ?
        ]],
        { json.encode(metadata), vin })
    end      
end)

RPC.register("ev-wheelfitment_sv:setIsWheelFitmentInUse", function(src, pBool)
    wheelInUse = pBool
end)

RPC.register("ev-wheelfitment_sv:getIsWheelFitmentInUse", function(src)
    return wheelInUse
end)

