previewEnabled = false

RegisterNetEvent("ev-racing:addedActiveRace")
AddEventHandler("ev-racing:addedActiveRace", function(race)
    activeRaces[race.id] = race

    if not config.nui.hudOnly then
        SendNUIMessage({
            activeRaces = activeRaces
        })
    end

    TriggerEvent("ev-racing:api:addedActiveRace", race, activeRaces)
    TriggerEvent("ev-racing:api:updatedState", { activeRaces = activeRaces })
end)

RegisterNetEvent("ev-racing:removedActiveRace")
AddEventHandler("ev-racing:removedActiveRace", function(id)
    activeRaces[id] = nil

    if not config.nui.hudOnly then
        SendNUIMessage({
            activeRaces = activeRaces
        })
    end

    TriggerEvent("ev-racing:api:removedActiveRace", activeRaces)
    TriggerEvent("ev-racing:api:updatedState", { activeRaces = activeRaces })
end)

RegisterNetEvent("ev-racing:updatedActiveRace")
AddEventHandler("ev-racing:updatedActiveRace", function(race)
    if activeRaces[race.id] then
        activeRaces[race.id] = race
    end

    if not config.nui.hudOnly then
        SendNUIMessage({
            activeRaces = activeRaces
        })
    end

    TriggerEvent("ev-racing:api:updatedActiveRace", activeRaces)
    TriggerEvent("ev-racing:api:updatedState", { activeRaces = activeRaces })
end)

RegisterNetEvent("ev-racing:leaveRace")
AddEventHandler("ev-racing:leaveRace", function()
    leaveRace()
end)

RegisterNetEvent("ev-racing:endRace")
AddEventHandler("ev-racing:endRace", function(race)
    SendNUIMessage({
        showHUD = false
    })

    TriggerEvent("ev-racing:api:raceEnded", race)

    cleanupRace()
end)

RegisterNetEvent("ev-racing:raceHistory")
AddEventHandler("ev-racing:raceHistory", function(race)
    finishedRaces[#finishedRaces + 1] = race

    if race then
        if not config.nui.hudOnly then
            SendNUIMessage({
                leaderboardData = race
            })
        end
    end

    TriggerEvent("ev-racing:api:raceHistory", race)
    TriggerEvent("ev-racing:api:updatedState", { finishedRaces = finishedRaces })
end)

RegisterNetEvent("ev-racing:startRace")
AddEventHandler("ev-racing:startRace", function(race, startTime)
    TriggerEvent("ev-racing:api:startingRace", startTime)

    -- Wait for race countdown
    Citizen.Wait(startTime - 3000)

    SendNUIMessage({
        type = "countdown",
        start = 3,
    })

    PlaySoundFrontend(-1, "Beep_Red", "DLC_HEIST_HACKING_SNAKE_SOUNDS")
    Citizen.Wait(1000)
    PlaySoundFrontend(-1, "Beep_Red", "DLC_HEIST_HACKING_SNAKE_SOUNDS")
    Citizen.Wait(1000)
    PlaySoundFrontend(-1, "Beep_Red", "DLC_HEIST_HACKING_SNAKE_SOUNDS")
    Citizen.Wait(1000)
    PlaySoundFrontend(-1, "Oneshot_Final", "MP_MISSION_COUNTDOWN_SOUNDSET")

    if not curRace then
        initRace(race)
        TriggerEvent("ev-racing:api:raceStarted", race)
    end
end)

RegisterNetEvent("ev-racing:updatePosition")
AddEventHandler("ev-racing:updatePosition", function(position)
    print("Position is now: " .. position)
    SendNUIMessage({
        HUD = { position = position }
    })
end)

RegisterNetEvent("ev-racing:dnfRace")
AddEventHandler("ev-racing:dnfRace", function()
    SendNUIMessage({
        HUD = { dnf = true }
    })

    TriggerEvent("ev-racing:api:dnfRace", race)
    TriggerEvent("ev-racing:api:updatedState", {activeRaces=activeRaces})
end)

RegisterNetEvent("ev-racing:startDNFCountdown")
AddEventHandler("ev-racing:startDNFCountdown", function(dnfTime)
    SendNUIMessage({
        HUD = { dnfTime = dnfTime }
    })
end)

RegisterNetEvent("ev-racing:finishedRace")
AddEventHandler("ev-racing:finishedRace", function(position, time)
    SendNUIMessage({
        HUD = {
            position = position,
            finished = time,
        }
    })
    TriggerEvent("ev-racing:api:updatedState", {activeRaces=activeRaces})
end)

RegisterNetEvent("ev-racing:joinedRace")
AddEventHandler("ev-racing:joinedRace", function(race)
    if pendingRaces[race.eventId] then pendingRaces[race.eventId] = race end
    race.start.pos = tableToVector3(race.start.pos)
    if race.id ~= "random" then
        spawnCheckpointObjects(race.start, config.startObjectHash)
    end
    TriggerEvent("ev-racing:api:joinedRace", race)
    TriggerEvent("ev-racing:api:updatedState", {pendingRaces=pendingRaces})
end)

RegisterNetEvent("ev-racing:leftRace")
AddEventHandler("ev-racing:leftRace", function(race)
    if pendingRaces[race.eventId] then pendingRaces[race.eventId] = race end
    TriggerEvent("ev-racing:api:leftRace", race)
    TriggerEvent("ev-racing:api:updatedState", {pendingRaces=pendingRaces})
    cleanupProps()
end)

RegisterNetEvent("ev-racing:playerJoinedYourRace")
AddEventHandler("ev-racing:playerJoinedYourRace", function(characterId, name)
    if characterId == getCharacterId() then return end

    TriggerEvent("ev-racing:api:playerJoinedYourRace", characterId, name)
end)

RegisterNetEvent("ev-racing:playerLeftYourRace")
AddEventHandler("ev-racing:playerLeftYourRace", function(characterId, name)
    if characterId == getCharacterId() then return end

    TriggerEvent("ev-racing:api:playerLeftYourRace", characterId, name)
end)

RegisterNetEvent("ev-racing:addedPendingRace")
AddEventHandler("ev-racing:addedPendingRace", function(race)
    pendingRaces[race.id] = race

    if not config.nui.hudOnly then
        SendNUIMessage({
            pendingRaces = pendingRaces
        })
    end

    TriggerEvent("ev-racing:api:addedPendingRace", race, pendingRaces)
    TriggerEvent("ev-racing:api:updatedState", { pendingRaces = pendingRaces })
end)

RegisterNetEvent("ev-racing:removedPendingRace")
AddEventHandler("ev-racing:removedPendingRace", function(id)
    pendingRaces[id] = nil

    SendNUIMessage({ pendingRaces = pendingRaces })

    TriggerEvent("ev-racing:api:removedPendingRace", pendingRaces)
    TriggerEvent("ev-racing:api:updatedState", {pendingRaces=pendingRaces})
end)

RegisterNetEvent("ev-racing:updatedPendingRace")
AddEventHandler("ev-racing:updatedPendingRace", function(race)
    if pendingRaces[race.eventId] then pendingRaces[race.eventId] = race end
    if not config.nui.hudOnly then SendNUIMessage({pendingRaces=pendingRaces}) end
    TriggerEvent("ev-racing:api:updatedPendingRace", pendingRaces)
    TriggerEvent("ev-racing:api:updatedState", {pendingRaces=pendingRaces})
end)

RegisterNetEvent("ev-racing:startCreation")
AddEventHandler("ev-racing:startCreation", function()
    startRaceCreation()
end)

RegisterNetEvent("ev-racing:addedRace")
AddEventHandler("ev-racing:addedRace", function(newRace, newRaces)
    if not races then return end
    races = newRaces

    SendNUIMessage({
        races = newRaces
    })

    TriggerEvent("ev-racing:api:addedRace")
    TriggerEvent("ev-racing:api:updatedState", {races=races})
end)

AddEventHandler('DamageEvents:VehicleDamaged', function(vehicle, attacker, weapon, isMelee, damageTypeFlag)
    if not curRace or curRace.hitPenalty <= 0.0 or GetEntityModel(attacker) ~= config.checkpointObjectHash or vehicle ~= GetVehiclePedIsIn(PlayerPedId(), false) then return end
    additionalTotalTime = additionalTotalTime + curRace.hitPenalty * 1000
    additionalLapTime = additionalLapTime + curRace.hitPenalty * 1000
    PlaySoundFrontend(-1, "3_2_1", "HUD_MINI_GAME_SOUNDSET")
    SendNUIMessage({HUD={additionalTotalTime=additionalTotalTime, additionalLapTime=additionalLapTime}})
end)

AddEventHandler("onResourceStop", function (resourceName)
    if resourceName ~= GetCurrentResourceName() then return end

    cleanupProps()
    clearBlips()
    ClearGpsMultiRoute()
end)