local Resource, Promises, CallIdentifier = GetCurrentResourceName(), {}, 0

RPC = {}

function ClearPromise(callID)
    Citizen.SetTimeout(5000, function()
        Promises[callID] = nil
    end)
end

function ParamPacker(...)
    local params, pack = {...} , {}

    for i = 1, 15, 1 do
        pack[i] = {param = params[i]}
    end

    return pack
end

function ParamUnpacker(params, index)
    local idx = index or 1

    if idx <= #params then
        return params[idx]["param"], ParamUnpacker(params, idx + 1)
    end
end

function UnPacker(params, index)
    local idx = index or 1

    if idx <= 15 then
        return params[idx], UnPacker(params, idx + 1)
    end
end

function TriggerNetEvent(pEvent, pSrc, ...)
    --print("[RPC] Triggering net event", pEvent, pSrc)
    local payload = msgpack.pack({...})

    if payload:len() < 5000 then
        TriggerClientEventInternal(pEvent, pSrc, payload, payload:len())
    else
        TriggerLatentClientEventInternal(pEvent, pSrc, payload, payload:len(), 128000)
    end
end

------------------------------------------------------------------
--                  (Trigger Server Calls)
------------------------------------------------------------------

function RPC.execute(name, src, ...)
    --print("[RPC] Executing", name, src)
    local callID, solved = CallIdentifier, false
    CallIdentifier = CallIdentifier + 1

    Promises[callID] = promise:new()

    TriggerNetEvent("rpc:request:" .. name, src, Resource, callID, ParamPacker(...), true)

    Citizen.SetTimeout(20000, function()
        if not solved then
            Promises[callID]:resolve({nil})
            TriggerEvent("rpc:server:timeout", Resource, name)
        end
    end)

    local response = Citizen.Await(Promises[callID])

    solved = true

    ClearPromise(callID)

    return ParamUnpacker(response)
end

RPC.executeLatent = RPC.execute

RegisterServerEvent("rpc:response")
AddEventHandler("rpc:response", function(origin, callID, response, state)
    if Resource == origin and Promises[callID] then
        --print("[RPC] Response", origin, callID, response, state)
        Promises[callID]:resolve(response)
    end
end)

RegisterServerEvent("rpc:server:timeout")
AddEventHandler("rpc:server:timeout",function(origin, name)
    --print("RPC [Timeout]",origin, name)
end)

RegisterServerEvent("rpc:client:error")
AddEventHandler("rpc:client:error",function(Resource, origin, name, error)
    print("RPC [Error]",Resource, origin, name, error)
end)

------------------------------------------------------------------
--                  (Receive Remote Calls)
------------------------------------------------------------------

function RPC.register(name, func)
    --print("[RPC] Registering", name)
    RegisterNetEvent("rpc:request:" .. name, function(origin, callID, params, packaged)
        --print("[RPC] Request", name, origin, callID, params, packaged)
        local src = source
        local response

        local success, error = pcall(function()
            if packaged then
                response = ParamPacker(func(src, ParamUnpacker(params)))
            else
                response = ParamPacker(func(src, UnPacker(params)))
            end
        end)

        if not success then
            TriggerNetEvent("rpc:client:error", src, Resource, origin, name, error)
        end

        if response == nil then
            response = {}
        end

        TriggerNetEvent("rpc:response", src, origin, callID, response, true)
    end)
end

function RPC.remove(name)
end