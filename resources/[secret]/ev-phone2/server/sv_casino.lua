local function updateCasinoEventInDatabase(autolock, key, title, description, minBet, bettors, options)
    print()
    local query = [[
        UPDATE casino_events 
        SET autolock = @autolock, 
            title = @title, 
            description = @description, 
            min_bet = @minBet,
            bettors = @bettors,
            options = @options
        WHERE event_key = @key
    ]]
    
    local params = {
        ['@autolock'] = autolock,
        ['@title'] = title,
        ['@description'] = description,
        ['@minBet'] = minBet,
        ['@bettors'] = json.encode(bettors), -- Encode bettors as JSON
        ['@options'] = json.encode(options), -- Encode options as JSON
        ['@key'] = key
    }

    -- Execute the query using Await
    local result = Await(SQL.execute(query, params))

    -- Check if the query was successful
    if result and result.affectedRows > 0 then
        return true, "Event updated in database."
    else
        return false, "Failed to update event in database. Key may not exist."
    end
end


-- Register the RPC method to update the casino event
RPC.register("casino:updateEvent", function(autolock, key, title, description, minBet, bettors, options)
    -- Call the function to update the casino event in the database
    local success, result = updateCasinoEventInDatabase(autolock, key, title, description, minBet, bettors, options)

    if success then
        return true, result -- Return success and any relevant data
    else
        return false, "Failed to update event in database." 
    end
end)


local function getCasinoEventsFromDatabase()
    local query = [[
        SELECT event_key, autolock, title, description, min_bet, bettors, options
        FROM casino_events
    ]]

    -- Use Await to execute the query
    local results = Await(SQL.execute(query))

    if results then
        for _, event in ipairs(results) do
            event.bettors = json.decode(event.bettors) -- Decode JSON back to Lua table
            event.options = json.decode(event.options) -- Decode JSON back to Lua table
        end
        return true, results
    else
        return false, "Failed to retrieve events from the database." 
    end
end


-- Register the RPC method to get casino events
RPC.register("ev-ui:casino:getEvents", function()
    -- Execute the function to get the events from the database
    local success, result = getCasinoEventsFromDatabase()

    if success then
        return true, result -- Return success and the event data
    else
        return false, result.message
    end
end)

RPC.register("GetCurrentCasino", function(pSource, charId) 
    return getCurrentCasino(charId)
end)

function getCurrentCasino(charId) 
    local query = [[
        SELECT casino_chips
        FROM characters
        WHERE id = @id
    ]]

    local result = Await(SQL.execute(query, {
        id = charId
    }))

    print(result[1].casino_chips)

    if result then
        return result[1].casino_chips
    else
        return 0
    end
end
