function StartPhoneCall(callerId, targetId, callId)
    TriggerClientEvent("ev:voice:phone:call:start", callerId, targetId, callId)
    TriggerClientEvent("ev:voice:phone:call:start", targetId, callerId, callId) 
end

function StopPhoneCall(callerId, targetId, callId)
    TriggerClientEvent("ev:voice:phone:call:end", callerId, targetId, callId)
    TriggerClientEvent("ev:voice:phone:call:end", targetId, callerId, callId)
end

RegisterServerEvent("ev:voice:phone:server:call:start")
AddEventHandler("ev:voice:phone:server:call:start", StartPhoneCall)

RegisterServerEvent("ev:voice:phone:server:call:end")
AddEventHandler("ev:voice:phone:server:call:end", StopPhoneCall)