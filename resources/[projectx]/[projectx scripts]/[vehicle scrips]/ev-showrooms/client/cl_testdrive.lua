local testDriveSpawnPoint3 = nil
local testDriveSpawnPoint4 = nil

function isTestDriveVehicle(veh)
  local result = RPC.execute("showroom:isTestDriveVehicle", VehToNet(veh))
  return result
end

function getTestDriveVehicleModelName(veh)
  local result = RPC.execute("showroom:getTestDriveVehicleModelName", VehToNet(veh))
  return result
end

function setTestDriveLocation(loc)
  if not loc then
    testDriveSpawnPoint3 = nil
    testDriveSpawnPoint4 = nil
    return
  end
  testDriveSpawnPoint3 = vector3(loc.x, loc.y, loc.z)
  testDriveSpawnPoint4 = loc
end

local function testDriveVehicle(model)
  if not testDriveSpawnPoint4 then
    return
  end
  if IsAnyVehicleNearPoint(testDriveSpawnPoint3, 3.00) then
    return
  end

  local hasStock = RPC.execute("showroom:hasStock", model)
  if not hasStock then
    return
  end

  local netId = RPC.execute("showroom:testDriveVehicle", model, testDriveSpawnPoint4, zoneName)

  if not netId then return TriggerEvent('DoLongHudText', 'Vehicle lost during shipping.', 2) end

  Citizen.CreateThread(function()
    RPC.execute("showroom:stockDecrease", model)
  end)

  -- DoScreenFadeOut(200)

  local veh = NetworkGetEntityFromNetworkId(netId)

  -- taken from old veh shop bullshit
  -- if model == "rumpo" then
  --   SetVehicleLivery(veh, 0)
  -- end

  local vehplate = "CAR"..math.random(10000, 99999)
  SetVehicleNumberPlateText(veh, vehplate)
  Citizen.Wait(100)
  SetVehicleOnGroundProperly(veh)
  -- TaskWarpPedIntoVehicle(PlayerPedId(), veh, -1)
  -- DoScreenFadeIn(2000)
end

local function returnCurrentVehicle()
  if not testDriveSpawnPoint4 then
    return
  end
  local veh = GetVehiclePedIsUsing(PlayerPedId())
  if not isTestDriveVehicle(veh) then
    return
  end
  if #(testDriveSpawnPoint3 - GetEntityCoords(PlayerPedId())) > 20.0 then
    return
  end

  DoScreenFadeOut(0)

  Citizen.CreateThread(function()
    Citizen.Wait(500)
    DoScreenFadeIn(2000)
  end)

  RPC.execute("showroom:stockIncrease", getTestDriveVehicleModelName(veh))
  RPC.execute("showroom:returnCurrentVehicle", VehToNet(veh))
end

RegisterCommand("returntestdrive", function()
  if not zoneName then return end
  local isEmployed = exports["ev-business"]:IsEmployedAt(zoneName)
  if not isEmployed then return end
  returnCurrentVehicle()
end)

local function savePreset()
  local vehicle = GetVehiclePedIsUsing(PlayerPedId())
  local netId = NetworkGetNetworkIdFromEntity(vehicle)
  local fitment = {}
  if DecorExistOn(vehicle, "ev-wheelfitment_applied") then
    fitment = {
        w_width = DecorGetFloat(vehicle, "ev-wheelfitment_w_width"),
        w_fl = DecorGetFloat(vehicle, "ev-wheelfitment_w_fl"),
        w_fr = DecorGetFloat(vehicle, "ev-wheelfitment_w_fr"),
        w_rl = DecorGetFloat(vehicle, "ev-wheelfitment_w_rl"),
        w_rr = DecorGetFloat(vehicle, "ev-wheelfitment_w_rr")
    }
  end
  return RPC.execute('showroom:saveTestDrivePreset', netId, fitment)
end

RegisterUICallback("ev-ui:showroomTestDrive", function(data, cb)
  if data.location == 'tuner' then
    local hasPerms = exports['ev-business']:HasPermission('tuner', 'hire')
    if not hasPerms then
      cb({ data = {}, meta = { ok = false, message = 'Permission denied' } })
      return
    end
  end
  testDriveVehicle(data.model)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:showroomTestDriveReturn", function(data, cb)
  returnCurrentVehicle()
  cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterUICallback("ev-ui:showroomTestDriveSavePreset", function(data, cb)
  local success = savePreset()
  cb({ data = {}, meta = { ok = success, message = success and 'done' or 'Could not save.'} })
end)