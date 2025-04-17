local Config = json.decode(LoadResourceFile(GetCurrentResourceName(), "config.json"))

function SendReactMessage(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end exports("SendReactMessage", SendReactMessage)

RegisterNetEvent("ev-books:opencontract")
AddEventHandler("ev-books:opencontract", function(data)
    SendReactMessage('ev-books:setcontract', {
        contrato = Config[data]
    })
    SetNuiFocus(true, true)
end)

RegisterNetEvent("ev-books:openBookByMetadata")
AddEventHandler("ev-books:openBookByMetadata", function(metadaFull)
    SendReactMessage('ev-books:setcontract', {
        contrato = metadaFull
    })
    SetNuiFocus(true, true)
end)

RegisterNUICallback("ev-books:closeapp", function(data, cb) 
    SetNuiFocus(false, false)
    cb({})
end)    

RegisterCommand('createBook', function(source, args, raw)
    TriggerEvent('player:receiveItem', 'godbook', 1, false, {}, {contract = args[1]})
end)

RegisterCommand('bookTest', function(source, args, RawCommand)
    TriggerEvent('ev-books:opencontract', args[1])
end)
