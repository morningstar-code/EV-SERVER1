Citizen.CreateThread(function()
	exports["ev-polyzone"]:AddBoxZone("spawnZone", vector3(-3962.55, 2014.91, 500.91), 31.2, 20.2,  {
		name="spawn",
        heading=340,
        minZ=498.51,
        maxZ=506.31
    })
end)


local listening = false

function checkPlayers()
    local playerId = PlayerId()

    listening = true

    Citizen.CreateThread(function()
        while listening do
            local players = GetActivePlayers()

            for _, player in ipairs(players) do
                if playerId ~= player and not NetworkIsPlayerConcealed(player) then
                    NetworkConcealPlayer(player, true, false)
                end
            end

            Citizen.Wait(100)
        end
    end)

    Citizen.CreateThread(function()
        while listening do
            DisableAllControlActions(0)
            DisableAllControlActions(1)
            Citizen.Wait(0)
        end
    end)
end

AddEventHandler("ev-polyzone:enter", function(name)
    if name ~= "spawnZone" then return end
    checkPlayers()
end)
AddEventHandler("ev-polyzone:exit", function(name)
    if name ~= "spawnZone" then return end
    listening = false
end)

RegisterNetEvent('onPlayerJoining')
AddEventHandler('onPlayerJoining', function(player)
    if not listening then return end

    local playerId = GetPlayerFromServerId(player)

    if (playerId == PlayerId()) then return end

    NetworkConcealPlayer(playerId, true, false)
end)