local UpcomingEvents = {}
local EventInvites = {}

-- Function to create an event
RPC.register("ev-phone:calendar:createEvent", function(data)
    -- Insert your logic to create an event here
    -- Assuming data has all necessary fields
    local eventId = #UpcomingEvents + 1 -- Generate a new ID based on current events
    local event = {
        id = eventId,
        name = data.name,
        date = data.date,
        participants = { data.characterId } -- Assuming characterId is passed in data
    }
    
    table.insert(UpcomingEvents, event)
    return true, "Event created successfully."
end)

-- Function to join an event
RPC.register("ev-phone:calendar:joinEvent", function(eventCode)
    -- Assuming eventCode maps to event ID, replace with your logic if necessary
    local event = UpcomingEvents[tonumber(eventCode)]
    if event then
        table.insert(event.participants, data.characterId)
        return true, "Successfully joined the event."
    else
        return false, "Event not found."
    end
end)

-- Function to send an invite
RPC.register("ev-phone:calendar:sendInvite", function(stateId, eventCode)
    -- Logic to send invite (could be a message or notification)
    local event = UpcomingEvents[tonumber(eventCode)]
    if event then
        -- Add the invite logic here, e.g., sending a message to the user
        return true, "Invite sent."
    else
        return false, "Event not found."
    end
end)

-- Function to leave an event
RPC.register("ev-phone:calendar:leaveEvent", function(eventId)
    local event = UpcomingEvents[tonumber(eventId)]
    if event then
        -- Assuming we remove the characterId from participants
        for i, participant in ipairs(event.participants) do
            if participant == data.characterId then
                table.remove(event.participants, i)
                break
            end
        end
        return true, "Left the event."
    else
        return false, "Event not found."
    end
end)

-- Function to get events
RPC.register("ev-phone:calendar:getEvents", function(characterId)
    local userEvents = {}
    for _, event in ipairs(UpcomingEvents) do
        if hasUserJoinedEvent(event, characterId) then -- Define your logic to check if the user is in the event
            table.insert(userEvents, event)
        end
    end
    return userEvents
end)

-- Function to edit an event
RPC.register("ev-phone:calendar:editEvent", function(eventData)
    -- Logic to edit the event
    local event = UpcomingEvents[tonumber(eventData.id)]
    if event then
        event.name = eventData.name
        event.date = eventData.date
        return true, "Event edited successfully."
    else
        return false, "Event not found."
    end
end)

-- Function to forcefully add an event
RPC.register("ev-phone:calendar:forceAddEvent", function(eventId, eventName)
    -- Logic to forcefully add an event
    local event = {
        id = eventId,
        name = eventName,
        date = os.date(), -- Set to current date/time or adjust as necessary
        participants = {}
    }
    
    table.insert(UpcomingEvents, event)
    return true, "Event forcefully added."
end)

-- Function to handle joining an event by ID
RPC.register("ev-phone:calendar:joinEventById", function(eventId)
    local event = UpcomingEvents[tonumber(eventId)]
    if event then
        -- Add character ID to participants
        table.insert(event.participants, data.characterId)
        return true
    else
        return false, "Event not found."
    end
end)

-- Function to get upcoming events
RPC.register("ev-phone:calendar:getUpcomingEvents", function(characterId)
    local upcoming = {}
    for _, event in ipairs(UpcomingEvents) do
        if hasUserJoinedEvent(event, characterId) then -- Define your logic to check if the user is in the event
            table.insert(upcoming, event)
        end
    end
    return upcoming
end)

-- Helper function to check if a user is in an event
function hasUserJoinedEvent(event, characterId)
    for _, participant in ipairs(event.participants) do
        if participant == characterId then
            return true
        end
    end
    return false
end

