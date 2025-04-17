local function getAlias(alias, character)
  if alias ~= nil then return alias end
  return character.first_name .. " " .. character.last_name
end

RegisterUICallback("ev-ui:racingGetAllRaces", function(data, cb)
  local res = exports["ev-racing"]:getAllRaces()
  --local completed = RPC.execute("ev-racing:getFinishedRaces")
  --res.completed = completed
  cb({ data = res, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingGetEventConversation", function(data, cb)
  local res = RPC.execute("ev-racing:getEventConversation", data.eventId)
  cb({ data = res.data, meta = { ok = res.success, message = res.message or 'done' } })
end)

RegisterUICallback("ev-ui:racingSendMessage", function(data, cb)
  local success, message = RPC.execute("ev-racing:sendEventMessage", data.characterId, data.alias, data.eventId, data.message)
  cb({ data = {}, meta = { ok = success, message = message or 'done' } })
end)

RegisterUICallback("ev-ui:racingPreviewRace", function(data, cb)
  exports["ev-racing"]:previewRace(data.id)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingLocateRace", function(data, cb)
  exports["ev-racing"]:locateRace(data.id, data.eventId, data.race.reverse)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingNotifyRacers", function(data, cb)
  local success, message = RPC.execute("ev-racing:notifyRacers", data.alias, data.message, data.playerIds)
  cb({ data = {}, meta = { ok = success, message = message } })
end)

RegisterUICallback("ev-ui:racingCreateRace", function(data, cb)
  data.options.characterId = data.character.id
  data.options.alias = getAlias(data.options.alias, data.character)

  -- Hard-coded options
  data.options.lineBasedCheckpoints = true

  local err = exports["ev-racing"]:createPendingRace(data.id, data.options)
  if err ~= nil then
    cb({ data = res, meta = { ok = false, message = err } })
    return
  end
  cb({ data = res, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingDeleteRace", function(data, cb)
  local success = false
  local message = "Failed to delete race"
  if data.id then
    success = RPC.execute('ev-racing:deleteRace', data.id)
    if success then message = "" end
  end
  cb({ data = res, meta = { ok = success, message = message } })
end)

RegisterUICallback("ev-ui:racingJoinRace", function(data, cb)
  local canJoinOrErr = exports["ev-racing"]:canJoinOrStartRace(data.race.vehicleClass)
  if canJoinOrErr ~= true then
    cb({ data = {}, meta = { ok = false, message = canJoinOrErr } })
    return
  end
  local err = exports["ev-racing"]:joinRace(data.race.eventId, getAlias(data.alias, data.character), data.character.id, data.password)
  if err ~= nil then
    cb({ data = res, meta = { ok = false, message = err } })
    return
  end
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingStartRace", function(data, cb)
  local canJoinOrErr = exports["ev-racing"]:canJoinOrStartRace(data.race.vehicleClass)
  if canJoinOrErr ~= true then
    cb({ data = {}, meta = { ok = false, message = canJoinOrErr } })
    return
  end
  local err = exports["ev-racing"]:startRace(data.race.countdown)
  if err ~= nil then
    cb({ data = res, meta = { ok = false, message = err } })
    return
  end
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingLeaveRace", function(data, cb)
  exports["ev-racing"]:leaveRace()
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingEndRace", function(data, cb)
  exports["ev-racing"]:endRace()
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingKickFromRace", function(data, cb)
  RPC.execute("ev-racing:kickFromRace", data.raceId, data.playerId)
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingBanFromRace", function(data, cb)
  RPC.execute("ev-racing:banFromRace", data.raceId, data.playerId)
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingCreateMap", function(data, cb)
  -- local canCreate, errorMessage = RPC.execute("ev-racing:canCreateNewRace", data)
  -- if not canCreate then
  --   cb({ data = {}, meta = { ok = false, message = errorMessage } })
  --   return
  -- end
  local ped = PlayerPedId()
  local veh = GetVehiclePedIsIn(PlayerPedId(), false)
  if veh ~= 0 and GetPedInVehicleSeat(veh, -1) == ped then
    TriggerEvent("ev-racing:cmd:racecreate", data)
    cb({ data = {}, meta = { ok = true, message = 'done' } })
    exports["ev-ui"]:closeApplication("phone")
  else
    cb({ data = {}, meta = { ok = false, message = 'You are not driving a vehicle' } })
  end
end)

RegisterUICallback("ev-ui:racingFinishMap", function(data, cb)
  TriggerEvent("ev-racing:cmd:racecreatedone")
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingCancelMap", function(data, cb)
  TriggerEvent("ev-racing:cmd:racecreatecancel")
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingBestLapTimes", function(data, cb)
  local bestLapTimes = RPC.execute("ev-racing:bestLapTimes", data.id, data.vehicleClass, 10)
  local bestLapTimesForAlias = RPC.execute("ev-racing:bestLapTimesForAlias", data.id, exports["isPed"]:isPed("cid"), data.alias, data.vehicleClass, 1)
  local bestLapTimeForAlias = bestLapTimesForAlias ~= nil and bestLapTimesForAlias[1] or nil
  cb({ data = { bestLapTimes = bestLapTimes, bestLapTimeForAlias = bestLapTimeForAlias }, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingSetNightTime", function(data, cb)
  local isNightTime = exports["ev-weathersync"]:isNightTime()
  exports["ev-ui"]:sendAppEvent("phone", {
    action = "racing-night-time",
    isNightTime = isNightTime,
  })
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

-- RegisterUICallback("ev-ui:racingGetAllTournaments", function(data, cb)
--   local res = exports["ev-racing"]:getAllTournaments()
--   cb({ data = res, meta = { ok = true, message = 'done' } })
-- end)

RegisterUICallback("ev-ui:racingCreateTournament", function(data, cb)
  local err = RPC.execute("ev-racing:createTournament", data.options.name, getAlias(data.options.alias, data.character))
  if err then
    cb({ data = nil, meta = { ok = false, message = err } })
    return
  end
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingJoinTournament", function(data, cb)
  local err = RPC.execute("ev-racing:joinTournament", data.tournament.name, getAlias(data.alias, data.character), data.character.id)
  if err ~= nil then
    cb({ data = res, meta = { ok = false, message = err } })
    return
  end
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingLeaveTournament", function(data, cb)
  RPC.execute("ev-racing:leaveTournament", data.character.id)
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingEndTournament", function(data, cb)
  RPC.execute("ev-racing:endTournament", data.tournament.name)
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:racingGiveDongle", function(data, cb)
  local err = RPC.execute("ev-racing:giveRaceDongle", data.options.characterId)
  if err ~= nil then
    cb({ data = res, meta = { ok = false, message = err } })
    return
  end
  Wait(500)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

AddEventHandler("ev-racing:api:startingRace", function(startTime)
  TriggerEvent('DoLongHudText', "Starting in " .. tostring(startTime / 1000) .. " seconds", 1, 12000)
end)

AddEventHandler("ev-racing:api:updatedState", function(state)
  local data = {action = "racing-update"}
  if state.finishedRaces then
    data.completed = state.finishedRaces
  end
  if state.races then
    data.maps = state.races
  end
  if state.pendingRaces then
    data.pending = state.pendingRaces
  end
  if state.activeRaces then
    data.active = state.activeRaces
  end
  if state.tournaments then
    data.tournaments = state.tournaments
  end
  exports["ev-ui"]:sendAppEvent("phone", data)
end)

function TriggerPhoneNotification(title, body)
  SendUIMessage({
    source = "ev-nui",
    app = "phone",
    data = {
      action = "notification",
      target_app = "racing",
      title = title,
      body = body,
      show_even_if_app_active = true
    }
  })
end

AddEventHandler("ev-racing:api:addedPendingRace", function(race)
  if not race.sendNotification then return end
  local hasRaceUsbAndAlias = exports["ev-racing"]:getHasRaceUsbAndAlias()
  if not hasRaceUsbAndAlias.has_usb_racing or not hasRaceUsbAndAlias.racingAlias then return end
  exports["ev-ui"]:sendAppEvent("phone", {
    action = "racing-new-event",
    title = "From the PM",
    text = "Pending race available...",
  })
end)

AddEventHandler("ev-racing:api:playerJoinedYourRace", function(characterId, name)
  TriggerPhoneNotification("Race Join", name .. " joined your race")
end)

AddEventHandler("ev-racing:api:playerLeftYourRace", function(characterId, name)
  TriggerPhoneNotification("Race Leave", name .. " left your race")
end)
