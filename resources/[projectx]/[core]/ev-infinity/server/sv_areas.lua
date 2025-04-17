ActiveAreaEvents = {}

RPC.register('ev:sync:getActiveEvents', function()
    return ActiveAreaEvents
end)

function TriggerActiveAreaEvent(pEvent, pArea, pPos, pRadius, ...)
    local eventId = #ActiveAreaEvents + 1
    local pParams = {...}

    table.insert(ActiveAreaEvents, {
        id = eventId,
        event = pEvent,
        params = pParams,
        area = pArea
        -- area = {
        --     type = 1,
        --     target = pPos,
        --     radius = pRadius,
        --     inside = false
        -- }
    })

    TriggerClientEvent('ev:sync:active:area:start', -1, eventId, pEvent, pParams, pArea, pPos, pRadius)
end

exports("TriggerActiveAreaEvent", TriggerActiveAreaEvent)

function StopActiveAreaEvent(pEventId)
    TriggerClientEvent('ev:sync:active:area:stop', -1, pEventId)
    table.remove(ActiveAreaEvents, index)
end

exports("StopActiveAreaEvent", StopActiveAreaEvent)

function TriggerAreaEvent(pEvent, pPos, pRadius, ...)
    local nearbyPlayers = GetNearbyPlayers(pPos)
end