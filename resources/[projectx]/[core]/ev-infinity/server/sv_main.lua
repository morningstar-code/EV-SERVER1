local PlayerCoords = {}

RegisterServerEvent('ev:infinity:player:ready')
AddEventHandler('ev:infinity:player:ready', function()
    local src = source
    local ped = GetPlayerPed(src)
    local playerCoords = GetEntityCoords(ped)
    PlayerCoords[src] = playerCoords    
    TriggerClientEvent('ev:infinity:player:coords', -1, PlayerCoords)
end)