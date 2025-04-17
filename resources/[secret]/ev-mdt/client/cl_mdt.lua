local jobs = {
  ["police"] = true,
  ["doctor"] = true,
  ["doc"] = true,
  ["district attorney"] = true,
  ["judge"] = true,
  ["defender"] = true,
  ["mayor"] = true,
  ["county_clerk"] = true,
  ["state"] =  true,
}

function hasMdwAccess()
  local cj = exports["isPed"]:isPed("myJob")
  return jobs[cj] == true
end

local apartmentData = CacheableMap(function (ctx, cid)
  local result = RPC.execute("apartment:search", cid)
  return true, result
end, { timeToLive = 5 * 60 * 1000 })

local housingData = CacheableMap(function (ctx, cid)
  local result = RPC.execute("housing:search", cid)
  return true, result
end, { timeToLive = 5 * 60 * 1000 })

function LoadAnimationDic(dict)
  if not HasAnimDictLoaded(dict) then
      RequestAnimDict(dict)

      while not HasAnimDictLoaded(dict) do
          Citizen.Wait(0)
      end
  end
end

local function playAnimation()
  LoadAnimationDic("amb@code_human_in_bus_passenger_idles@female@tablet@base")
  TaskPlayAnim(PlayerPedId(), "amb@code_human_in_bus_passenger_idles@female@tablet@base", "base", 3.0, 3.0, -1, 49, 0, 0, 0, 0)
  TriggerEvent("attachItemPhone", "tablet01")
end

RegisterUICallback("ev-ui:mdtAction", function(data, cb)
  --print("[MDT] [LUA] Action: ", data.action, "data: ", json.encode(data.data) or "nil")
  local result = RPC.execute("ev-ui:mdtApiRequest", data) -- CPX.Procedures
  if (not result) then
    --print("[MDT] [LUA] Error: result was nil")
    cb({ data = {}, meta = { ok = false, message = 'error' } })
    return
  end
  --print("[MDT] [LUA] Action: ", data.action, "Result: ", json.encode(result) or "nil")
  cb({ data = result.message or {}, meta = { ok = result.success or false, message = result.message or 'ok' } })
end)

RegisterUICallback("ev-mdt:getVehiclesByCharacterId", function(data, cb)
  local data = RPC.execute("ev:vehicles:getPlayerVehicles", data.character.id, true)
  cb({ data = data or {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-mdt:getPlayerOnlineStatus", function(data, cb)
  local data = RPC.execute("ev-mdt:isPlayerOnline", data.character.id, true)
  cb({ data = data, meta = { ok = true, message = 'done' } })
end)

AddEventHandler("ev-ui:openMDW", function(data)
  if not hasMdwAccess() and not data.fromCmd and not data.publicApp then return end
  playAnimation()
  exports["ev-ui"]:openApplication("mdt", { publicApp = data.publicApp or false })
end)

AddEventHandler("ev-ui:application-closed", function(name)
  if name ~= "mdt" then return end
  StopAnimTask(PlayerPedId(), "amb@code_human_in_bus_passenger_idles@female@tablet@base", "base", 1.0)
  TriggerEvent("destroyPropPhone")
  SetPlayerControl(PlayerId(), 1, 0)
end)

RegisterUICallback("ev-ui:getHousingInformation", function(data, cb) -- This isn't working.
  local result = housingData.get(data.profile.id)
  cb({ data = result or {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-storageunits:client:getAccessLogs", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:getApartmentInformation", function (data, cb)
  local result = apartmentData.get(data.profile.id)
  cb({ data = result or {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-mdt:getUnitInformation", function (data, cb)
  local result = RPC.execute("ev-dispatch:getDispatchUnits")
  cb({ data = result, meta = { ok = true, message = 'done' } })
end)

-- RegisterUICallback("ev-ui:getHousingData", function (data, cb)
--   local houses = exports["ev-housing"]:retrieveHousingTableMapped()
--   cb({ data = houses, meta = { ok = true, message = 'done' } })
-- end)

RegisterUICallback("ev-ui:getPropertyOwner", function (data, cb)
  local owner = RPC.execute("property:getOwnerRaw", data.property_id)
  cb({ data = owner, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-mdt:setPropertyGps", function (data, cb)
  SetNewWaypoint(data.x, data.y)
  TriggerEvent("DoLongHudText", "GPS updated.")
  cb({ data = "ok", meta = { ok = true, message = 'done' } })
end)