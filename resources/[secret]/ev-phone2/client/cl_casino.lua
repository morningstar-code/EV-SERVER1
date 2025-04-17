-- Register the NUI callback for updating the casino event
RegisterUICallback("ev-ui:casino:updateEvent", function(data, cb)
    -- Extract data from the incoming request
    local autolock = data.event.autolock
    local key = data.event.key
    local title = data.event.title
    local description = data.event.description
    local minBet = data.event.minBet

    local success, result = RPC.execute("casino:updateEvent", autolock, key, title, description, minBet)

    cb({ data = result, meta = { ok = success, message = result } })
end)

RegisterUICallback("ev-ui:casinoGetSportsBookData", function(data, cb)
    local success, result = RPC.execute("ev-ui:casino:getEvents")
    cb({ data = {}, meta = { ok = success, message = result } })
end)

