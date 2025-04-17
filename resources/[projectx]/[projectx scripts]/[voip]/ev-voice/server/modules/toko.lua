function addPlayerToRadio(channel, netId)
	local serverID = netId or source

	if channel then
		TriggerClientEvent('ev:fiber:voice-event', serverID, 'radioPowerState', true)
		TriggerClientEvent('ev:fiber:voice-event', serverID, 'radioFrequency', channel)
		addPlayerToRadioR(serverID, channel, true)
	end
end

function removePlayerFromRadio(channel, netId)
	local serverID = netId or source

	removePlayerFromRadioR(serverID, channel)

	if channel then
		TriggerClientEvent('ev:fiber:voice-event', serverID, 'radioPowerState', false)
		TriggerClientEvent('ev:fiber:voice-event', serverID, 'radioFrequency', -1)
	end
end

function removePlayerFromAllRadio(netId)
	local serverID = netId or source

	TriggerClientEvent('ev:fiber:voice-event', serverID, 'radioPowerState', false)
	TriggerClientEvent('ev:fiber:voice-event', serverID, 'radioFrequency', -1)
end

RegisterNetEvent("TokoVoip:addPlayerToRadio")
AddEventHandler("TokoVoip:addPlayerToRadio", addPlayerToRadio)

RegisterServerEvent("TokoVoip:removePlayerFromRadio")
AddEventHandler("TokoVoip:removePlayerFromRadio", removePlayerFromRadio)

exports("removePlayerFromAllRadio", removePlayerFromAllRadio)

RegisterServerEvent("TokoVoip:removePlayerFromAllRadio")
AddEventHandler("TokoVoip:removePlayerFromAllRadio", removePlayerFromAllRadio)

RegisterServerEvent("TokoVoip:clientHasSelecterCharacter")
AddEventHandler("TokoVoip:clientHasSelecterCharacter", function()
	local src = source
	TriggerClientEvent('ev:fiber:voice-event', src, 'radioPowerState', false)
	TriggerClientEvent('ev:fiber:voice-event', src, 'radioFrequency', -1)
end)

exports("addPlayerToRadio", addPlayerToRadio)
exports("removePlayerFromRadio", removePlayerFromRadio)
