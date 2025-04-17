function getPlayerVehiclesWithCoordinates(pCharacterId)
    local data = Await(SQL.execute("SELECT * FROM _vehicle WHERE cid = @cid", {
        cid = pCharacterId
    }))

    if not data then return {} end

    local entries = {}

    for k,v in pairs(data) do
        local damage = json.decode(v.damage) or {}

        entries[#entries+1] = {
            cid = v.cid,
            vin = v.vin,
            model = v.model,
            parking_state = v.state,
            parking_garage = v.garage,
            plate = v.plate,
            name = v.name,
            type = v.type,
            stats_engine = damage.engine,
            stats_body = damage.body,
            location = v.location
        }
    end

    return entries
end

function vehicleCoords(pPlate, pCoords) -- TODO: Make it use VINs instead of plates, cause of fake plates
    local update = Await(SQL.execute("UPDATE characters_cars SET location = @location WHERE plate = @plate", {
        location = json.encode({
            x = pCoords.x,
            y = pCoords.y,
            z = pCoords.z,
            h = pCoords.h
        }),
        plate = pPlate
    }))
end