-- RegisterNetEvent("ev:peds:rogue")
-- AddEventHandler("ev:peds:rogue", function(toDelete)
--     local src = source

--     local coords = GetEntityCoords(GetPlayerPed(src))
--     local players = exports["ev-infinity"]:GetNerbyPlayers(coords, 250)

--     for i, v in ipairs(players) do
--         TriggerClientEvent("ev:peds:rogue:delete", v, toDelete)
--     end
-- end)

RegisterNetEvent('ev:peds:rogue')
AddEventHandler('ev:peds:rogue', function(pRoguePeds)
    if pRoguePeds then
        for _, ped in ipairs(pRoguePeds) do
            if ped.owner ~= -1 and ped.owner ~= 0 then
                TriggerClientEvent('ev:peds:rogue:delete', ped.owner, ped.netId)
            end
        end
    end
end)

RegisterNetEvent('ev:peds:decor')
AddEventHandler('ev:peds:decor', function(pServerId, pNetId)
    if pServerId ~= -1 or pServerId ~= 0 then
        TriggerClientEvent('ev:peds:decor:set', pServerId, pNetId, 2, 'ScriptedPed', true)
    end
end)