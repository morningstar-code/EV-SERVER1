ActiveCalls = {}

function FindPlayerIdById(id)
    for k,v in ipairs(GetPlayers()) do
        local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(v))
        local CitizenId = user:getCurrentCharacter().id
        if(CitizenId == id) then
            return v
        end
    end
end

function FindServerIdByNumber(number)
    for k,v in ipairs(GetPlayers()) do
        local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(v))
        local CitizenNumber = user.character.phone_number
        if(CitizenNumber == number) then
            return v
        end
    end
end

function getServerIdByPhoneNumber(pNumber)
    local serverId = FindServerIdByNumber(pNumber)

    if(serverId ~= nil) then
        return true, serverId
    else
        return false, "No player found with that number"
    end
end

function PromiseTimeout(time)
    local timeout = promise:new()

    Citizen.SetTimeout(time or 1000, function ()
        timeout:resolve(false)
    end)

    return timeout
end

function startPhoneCall(pSource, pCid, pCallNumber, pTargetNumber, pType, pName)
    local call = {}
    local result =  Await(SQL.execute('SELECT id FROM characters WHERE phone_number = @phone_number', {['phone_number'] = pTargetNumber}))
    local targetCid = result[1].id
    local targetId = FindPlayerIdById(targetCid)

    if tonumber(pCallNumber) == tonumber(pTargetNumber) then
        TriggerClientEvent("phone:call:inactive", pSource, pTargetNumber, nil)
        return
    end

    if ActiveCalls then
        for k,v in pairs(ActiveCalls) do
            if tonumber(pTargetNumber) == tonumber(v.caller.number) then
                TriggerClientEvent("phone:call:inactive", pSource, pTargetNumber, nil)
                return
            end
            if tonumber(pTargetNumber) == tonumber(v.target.number) then
                TriggerClientEvent("phone:call:inactive", pSource, pTargetNumber, nil)
                return
            end
        end
    end

    call.state = 1

    --call participants
    call.caller = { id = pSource, number = pCallNumber }
    call.target = { id = targetId, number = pTargetNumber }

    --promises for handling connection and disconnection
    call.establish = promise:new()
    call.completed = promise:new()

    local callId = registerCallData(call)

    if targetId ~= nil then -- check payphone
        TriggerClientEvent("phone:call:receive", call.target.id, pType == "PAYPHONE" and pName or call.caller.number, callId)
    end
    if pSource ~= nil then
        TriggerClientEvent("phone:call:dialing", call.caller.id, call.target.number, callId)
    end
    -- play sound for caller/receiver
    --call.target.soundId = triggerAudio(call.target.id, 1, 3.0, 'ringing', 0.5, 'playLooped')
    --call.caller.soundId = triggerAudio(call.caller.id, 1, 0.2, 'dialing', 0.5, 'playLooped')

    -- Time before automatically ending if no one answers or hangups
    local timeout = 30000 --PromiseTimeout(30, 1000)

    -- Race between the Promises and then we proceed to establish or complete the call depending of the winner
    promise.first({ call.establish, call.completed }):next(function (establish)
        if establish then
            establishPhoneCall(callId, pType, pName)
        else
            completePhoneCall(callId, pType, pName)
        end
    end)

    --call.completed:resolve(false)
end

function establishPhoneCall(callId, pType, pName)
    local call = ActiveCalls[callId]

    if call then
        -- set the call state to active
        call.state = 2
        -- Notify the participants
        if call.target.id ~= nil then
            TriggerClientEvent("phone:call:in-progress", call.target.id, pType == "PAYPHONE" and pName or call.caller.number, callId)
        end
        if call.caller.id ~= nil then
            TriggerClientEvent("phone:call:in-progress", call.caller.id, call.target.number, callId)
        end
        
        -- start the mumble call
        TriggerEvent("ev:voice:phone:server:call:start", tonumber(call.caller.id), tonumber(call.target.id), callId)
        --Once the promise is resolved we proceed to end the call 
        call.completed:next(function()
            completePhoneCall(callId, pType)
        end)
    end
end

function completePhoneCall(callId, pType, pName)
    local call = ActiveCalls[callId]

    if call then 
        --set the call state to completed
        call.state = 0
        if call.target.id ~= nil then
            TriggerClientEvent("phone:call:inactive", call.target.id, pType == "PAYPHONE" and pName or call.caller.number, callId)
        end
        if call.caller.id ~= nil then
            TriggerClientEvent("phone:call:inactive", call.caller.id, call.target.number, callId)
        end
        --stop the mumble call 
        TriggerEvent("ev:voice:phone:server:call:end", tonumber(call.caller.id), tonumber(call.target.id), callId)
        -- we clear the call data 
        clearCallData(callId)
    end
end

function acceptPhoneCall(pCallId)
    local call = ActiveCalls[pCallId]
    if call and call.state == 1 then
        call.establish:resolve(true)
    elseif call and call.state == 0 then
        return false, 'Caller Hung up'
    elseif not call then
        return false, 'Invalid Call ID'
    end
    return true, 'Call Established'
end

function endPhoneCall(pCallId)
    local call = ActiveCalls[pCallId]
    if call and call.state == 1 then
        call.completed:resolve(false)
    elseif call and call.state == 2 then
        call.completed:resolve(true)
    elseif not call then
        return false, 'Invalid Call ID'
    end
    return true, 'Call Completed'
end

function registerCallData(callData)
    local callId = #ActiveCalls +1
    ActiveCalls[callId] = callData 
    return callId
end

function clearCallData(callId)
    --Citizen.SetTimeout(30 * 1000, function ()
        ActiveCalls[callId] = nil
    --end)
end